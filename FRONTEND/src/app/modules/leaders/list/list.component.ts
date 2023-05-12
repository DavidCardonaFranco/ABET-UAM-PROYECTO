import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Leader } from '../../../models/leader';
import { LeadersService } from '../../../services/leaders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = ['name', 'email', 'options'];
  theLeaders:Leader[] = [];

  constructor(private leadersService: LeadersService,
              private router:Router) { }

  ngOnInit(): void {
    this.listLeaders();
  }

  listLeaders(): void {
    this.leadersService.index().subscribe(response => {
      console.log(response);
      this.theLeaders = response.data;
    });
  }

  createLeader():void{
    this.router.navigate(['/Leaders/create']);
    console.log("creating leader");
  }

  updateLeader(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    this.router.navigate(['/Leaders/update/'+id])
    console.log("updating to: "+id);
  }

  deleteLeader(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    console.log("deleting: "+id);
    Swal.fire({
        title: 'Delete leader',
        text: "Sure you want to delete this leader?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
    }).then((result) => {
        if (result.isConfirmed) {
        this.leadersService.destroy(id).subscribe(data => {
            Swal.fire(
            'Delete!',
            'The leader is successfully deleted',
            'success'
            )
            this.ngOnInit();
        });
        }
    })
  }
}
