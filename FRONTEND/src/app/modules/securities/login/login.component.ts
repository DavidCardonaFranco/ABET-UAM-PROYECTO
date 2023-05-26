import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SecuritiesService } from '../../../services/security.service';
import { Location } from '@angular/common';
import { Security } from '../../../models/security';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  error = '';
  theSecurity: Security = new Security();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private securitiesService: SecuritiesService,
    private location: Location
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.returnUrl = this.router.url;
  }

  ngOnInit() {}

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (emailControl && passwordControl) {
      this.theSecurity.email = emailControl.value;
      this.theSecurity.password = passwordControl.value;

      this.loading = true;
      this.securitiesService.login(this.theSecurity)
        .subscribe(
          data => {
            Swal.fire(
              'Logged in',
              'You have logged in successfully',
              'success'
            );
            console.log(data);
            console.log(this.securitiesService.getToken());
            this.router.navigate(['/']);  // Navega a la página de inicio
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    }
  }

  onCancel() {
    this.location.back();
  }
}
