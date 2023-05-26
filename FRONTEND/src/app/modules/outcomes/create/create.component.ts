import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Outcome } from '../../../models/outcome';
import { OutcomesService } from '../../../services/outcomes.service';
import { Location } from '@angular/common';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/user.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  outcome_id:number = 0;
  sendTry: boolean = false;
  theOutcome: Outcome = {
    "name": "",
    "description": "",
    "grade": 0,
    "id_leader": 0,
  }
  Users: User[] = [];

  constructor(private outcomeService: OutcomesService,
              private UserService: UsersService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.outcome_id = this.activeRoute.snapshot.params['id'];
    this.getOutcome(this.outcome_id);
   } else {
    this.createMode = true;
   }
   this.getLeaders();
  }

  getLeaders() {
    this.UserService.index().subscribe(response => {
      this.Users = response.data.filter(user => user.role_id === 3);
    });
  }

  getOutcome(id: number) {
   this.outcomeService.show(id).
      subscribe(response => {
      this.theOutcome = response.data;
    });
  }

  create(): void {
      this.sendTry = true;
      this.outcomeService.create(this.theOutcome).
      subscribe((data: any) => {
       Swal.fire(
         'Created',
         'The outcome has been created successfully',
         'success'
       )
       this.router.navigate(["/Outcomes/list"]);
      });
    console.log("Create outcome" + JSON.stringify(this.theOutcome));
  }

  update(): void {
      this.sendTry = true;
      this.outcomeService.update(this.theOutcome).
      subscribe((response) => {
       Swal.fire(
         'Updated',
         'The outcome has been updated successfully',
         'success'
       )
       this.router.navigate(["/Outcomes/list"]);
      });
    console.log("Update outcome" + JSON.stringify(this.theOutcome));
  }

  goBack(): void {
    this.location.back();
  }
}

