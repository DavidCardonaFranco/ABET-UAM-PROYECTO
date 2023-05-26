import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Rubric } from '../../../models/rubric';
import { RubricsService } from '../../../services/rubrics.service';
import { Router } from '@angular/router';
import { SecuritiesService } from 'src/app/services/security.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = ['Name', 'Description', 'Options'];
  theRubrics:Rubric[] = [];

  constructor(private rubricsService: RubricsService,
              private securitiesService: SecuritiesService,
              private router:Router) { }

  ngOnInit(): void {
    this.listRubrics();
    this.hasPermissions();
  }

  deletePermissions:boolean = false;
  updatePermissions:boolean = false;
  createPermissions:boolean = false;
  options:boolean = false;

  hasPermissions(): void {
    const role = this.securitiesService.getRole();
    const expectedRolesDelete = ['1','2'];
    const expectedRolesUpdate = ['1','2'];
    const expectedRolesCreate = ['1','2'];

    if (expectedRolesDelete.includes(role)) {
      this.deletePermissions = true;
    }
    if (expectedRolesUpdate.includes(role)) {
      this.updatePermissions = true;
    }
    if (expectedRolesCreate.includes(role)) {
      this.createPermissions = true;
    }

    if (this.deletePermissions || this.updatePermissions) {
      this.columns = ['Name', 'Description', 'Options'];
      this.options = true;
    }else {
      this.columns = ['Name', 'Description'];
      this.options = false;
    }
  }

  listRubrics(): void {
    this.rubricsService.index().subscribe(response => {
      console.log(response);
      this.theRubrics = response.data;
    });
  }

  createRubric():void{
    this.router.navigate(['/Rubrics/create']);
    console.log("creating rubric");
  }

  updateRubric(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    this.router.navigate(['/Rubrics/update/'+id])
    console.log("updating to: "+id);
  }

  deleteRubric(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    console.log("deleting: "+id);
    Swal.fire({
        title: 'Delete rubric',
        text: "Sure you want to delete this rubric?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
    }).then((result) => {
        if (result.isConfirmed) {
        this.rubricsService.destroy(id).subscribe(data => {
            Swal.fire(
            'Delete!',
            'The rubric is successfully deleted',
            'success'
            )
            this.ngOnInit();
        });
        }
    })
  }
}


