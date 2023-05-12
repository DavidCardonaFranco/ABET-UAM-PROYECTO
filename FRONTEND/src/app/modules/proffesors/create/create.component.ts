import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Proffesor } from '../../../models/proffesor';
import { ProffesorsService } from '../../../services/proffesors.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  proffesor_id:number = 0;
  sendTry: boolean = false;
  theProffesor: Proffesor = {
    "name": "",
    "email": "",
    "password": "",
  }

  constructor(private proffesorService: ProffesorsService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.proffesor_id = this.activeRoute.snapshot.params['id'];
    this.getProffesor(this.proffesor_id)
   } else {
    this.createMode = true;
   }
  }

  getProffesor(id:number) {
   this.proffesorService.show(id).
      subscribe(response => {
      this.theProffesor = response.data;
    });
  }

  create(): void {
      this.sendTry = true;
      console.log(this.theProffesor)
      this.proffesorService.create(this.theProffesor).
      subscribe((data: any) => {
        Swal.fire(
          'Created',
          'The proffesor has been created successfully',
          'success'
        )
        this.router.navigate(["/Proffesors/list"]);
       });
     console.log("Create proffesor"+JSON.stringify(this.theProffesor));
   }

   update(): void {
       this.sendTry = true;
       this.proffesorService.update(this.theProffesor).
       subscribe((response) => {
        Swal.fire(
          'Updated',
          'The proffesor has been updated successfully',
          'success'
        )
        this.router.navigate(["/Proffesors/list"]);
       });
     console.log("Update proffesor"+JSON.stringify(this.theProffesor));
   }

   goBack(): void {
     this.location.back();
   }
 }
