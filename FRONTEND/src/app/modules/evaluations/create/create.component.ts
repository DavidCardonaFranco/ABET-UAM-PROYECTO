import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Evaluation } from '../../../models/evaluation';
import { EvaluationsService } from '../../../services/evaluations.service';
import { Location } from '@angular/common';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode: boolean = true;
  evaluation_id: number = 0;
  sendTry: boolean = false;
  theEvaluation: Evaluation = {
    "grade": 0,
  }

  activities: Activity[] = [];

  constructor(private evaluationService: EvaluationsService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private activitiesService: ActivitiesService,
              private location: Location) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.evaluation_id = this.activeRoute.snapshot.params['id'];
    this.getEvaluation(this.evaluation_id)
   } else {
    this.createMode = true;
   }
   this.getActivities();
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

  getEvaluation(id:number) {
   this.evaluationService.show(id).
      subscribe(response => {
      this.theEvaluation = response.data;
    });
  }

  create(): void {
      this.sendTry = true;
      console.log(this.theEvaluation)
      this.evaluationService.create(this.theEvaluation).
      subscribe((data: any) => {
       Swal.fire(
         'Created',
         'The evaluation has been created successfully',
         'success'
       )
       this.router.navigate(["/Evaluations/list"]);
      });
    console.log("Create evaluation"+JSON.stringify(this.theEvaluation));
  }

  update(): void {
      this.sendTry = true;
      this.evaluationService.update(this.theEvaluation).
      subscribe((response) => {
       Swal.fire(
         'Updated',
         'The evaluation has been updated successfully',
         'success'
       )
       this.router.navigate(["/Evaluations/list"]);
      });
    console.log("Update evaluation"+JSON.stringify(this.theEvaluation));
  }

  goBack(): void {
    this.location.back();
  }
}
