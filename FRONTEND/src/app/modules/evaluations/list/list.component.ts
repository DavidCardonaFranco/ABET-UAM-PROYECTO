import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Evaluation } from '../../../models/evaluation';
import { EvaluationsService } from '../../../services/evaluations.service';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { SecuritiesService } from 'src/app/services/security.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = [];
  theEvaluations:Evaluation[] = [];
  activities: Activity[] = [];

  constructor(private evaluationsService: EvaluationsService,
              private securitiesService: SecuritiesService,
              private activitiesService: ActivitiesService,
              private router:Router) { }

  ngOnInit(): void {
    this.listEvaluations();
    this.getActivities();
    this.hasPermissions();
  }

  deletePermissions:boolean = false;
  updatePermissions:boolean = false;
  createPermissions:boolean = false;
  options:boolean = false;

  hasPermissions(): void {
    const role = this.securitiesService.getRole();
    const expectedRolesDelete = ['1','4'];
    const expectedRolesUpdate = ['1','4'];
    const expectedRolesCreate = ['1','4'];

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
      this.columns = ['Grade','Activity', 'Options'];
      this.options = true;
    }else {
      this.columns = ['Grade','Activity']
      this.options = false;
    }
  }

  getActivities() {
    this.activitiesService.index().subscribe(response => {
      this.activities = response.data;
    });
  }

  getActivityName(id: number | undefined): string {
    if (id === undefined) {
      return '';
    }

    const activity = this.activities.find(activity => activity.id === id);
    return activity?.name || '';
  }

  listEvaluations(): void {
    this.evaluationsService.index().subscribe(response => {
      console.log(response);
      this.theEvaluations = response.data;
    });
  }

  createEvaluation():void{
    this.router.navigate(['/Evaluations/create']);
    console.log("creando evaluación");
  }

  updateEvaluation(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    this.router.navigate(['/Evaluations/update/'+id])
    console.log("actualizando a: "+id);
  }

  deleteEvaluation(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete evaluation',
        text: "Sure you want to delete this evaluation?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
    }).then((result) => {
        if (result.isConfirmed) {
        this.evaluationsService.destroy(id).subscribe(data => {
            Swal.fire(
            'Delete!',
            'The evaluation is successfully deleted',
            'success'
            )
            this.ngOnInit();
        });
        }
    })
  }
}
