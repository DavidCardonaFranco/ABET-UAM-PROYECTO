import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Leader } from '../../../models/leader';
import { LeadersService } from '../../../services/leaders.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  leader_id:number = 0;
  sendTry: boolean = false;
  theLeader: Leader = {
    "name": "",
    "email": "",
    "password": "",
  }

  constructor(private leaderService: LeadersService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.leader_id = this.activeRoute.snapshot.params['id'];
    this.getLeader(this.leader_id)
   } else {
    this.createMode = true;
   }
  }

  getLeader(id:number) {
   this.leaderService.show(id).
      subscribe(response => {
      this.theLeader = response.data;
    });
  }

  create(): void {
      this.sendTry = true;
      console.log(this.theLeader)
      this.leaderService.create(this.theLeader).
      subscribe((data: any) => {
       Swal.fire(
         'Created',
         'The leader has been created successfully',
         'success'
       )
       this.router.navigate(["/Leaders/list"]);
      });
    console.log("Create leader"+JSON.stringify(this.theLeader));
  }

  update(): void {
    this.sendTry = true;
    this.leaderService.update(this.theLeader).
    subscribe((response) => {
     Swal.fire(
       'Updated',
       'The leader has been updated successfully',
       'success'
     )
     this.router.navigate(["/Leaders/list"]);
    });
  console.log("Update leader"+JSON.stringify(this.theLeader));
}

goBack(): void {
  this.location.back();
}
}

