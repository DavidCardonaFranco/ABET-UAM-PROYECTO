import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Activity } from '../../../models/activity';
import { ActivitiesService } from '../../../services/activities.service';
import { Location } from '@angular/common';
import { Subject } from 'src/app/models/subject';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  activity_id:number = 0;
  sendTry: boolean = false;
  theActivity: Activity = {
    "name": "",
    "description":"",
    "start_date": new Date(),
    "end_date": new Date(),
    "subject_id": 0,
  }
  subjects: Subject[] = [];
  selectedSubjectID: number = 0;
  date_s: string = "";
  date_e: string = "";

  constructor(private activityService: ActivitiesService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private location: Location,
              private subjectService: SubjectsService,
              ) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.activity_id = this.activeRoute.snapshot.params['id'];
    this.getActivity(this.activity_id)
   } else {
    this.createMode = true;
   }
   this.getSubjects();
  }

  getSubjects() {
    this.subjectService.index().subscribe(response => {
      this.subjects = response.data;
    });
  }

  getActivity(id:number) {
   this.activityService.show(id).
      subscribe(response => {
      this.theActivity = response.data;
      this.selectedSubjectID = this.theActivity.subject_id !== undefined ? this.theActivity.subject_id : 0;
      //this.theActivity.start_date = new Date(response.data.start_date.toISOString().substring(0, 10));
    });
  }

  create(): void {
      this.sendTry = true;
      this.theActivity.subject_id = this.selectedSubjectID
      console.log(this.theActivity)
      this.activityService.create(this.theActivity).
      subscribe((data: any) => {
       Swal.fire(
         'Created',
         'The activity has been created successfully',
         'success'
       )
       this.router.navigate(["/Activities/list"]);
      });
    console.log("Create activity"+JSON.stringify(this.theActivity));
  }

  update(): void {
      this.sendTry = true;
      this.activityService.update(this.theActivity).
      subscribe((response) => {
       Swal.fire(
         'Updated',
         'The activity has been updated successfully',
         'success'
       )
       this.router.navigate(["/Activities/list"]);
      });
    console.log("Update activity"+JSON.stringify(this.theActivity));
  }

  goBack(): void {
    this.location.back();
  }
}
