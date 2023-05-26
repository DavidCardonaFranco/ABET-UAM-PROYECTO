import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OutcomeSubject } from '../../../models/outcome-subject';
import { OutcomesSubjectsService } from '../../../services/outcome-subject.service';
import { Location } from '@angular/common';
import { Outcome } from '../../../models/outcome';
import { OutcomesService } from '../../../services/outcomes.service';
import { Subject } from '../../../models/subject';
import { SubjectsService } from '../../../services/subjects.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  outcomeSubject_id:number = 0;
  sendTry: boolean = false;
  theOutcomeSubject: OutcomeSubject = {
    "id_outcome": 0,
    "subject_id": 0,
  }
  outcomes: Outcome[] = [];
  subjects: Subject[] = [];

  constructor(private outcomesSubjectsService: OutcomesSubjectsService,
              private outcomeService: OutcomesService,
              private subjectService: SubjectsService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.outcomeSubject_id = this.activeRoute.snapshot.params['id'];
    this.getOutcomeSubject(this.outcomeSubject_id);
   } else {
    this.createMode = true;
   }
   this.getOutcomes();
   this.getSubjects();
  }

  getOutcomes() {
    this.outcomeService.index().subscribe(response => {
      this.outcomes = response.data;
    });
  }

  getSubjects() {
    this.subjectService.index().subscribe(response => {
      this.subjects = response.data;
    });
  }

  getOutcomeSubject(id: number) {
   this.outcomesSubjectsService.show(id).
      subscribe(response => {
      this.theOutcomeSubject = response.data;
    });
  }

  create(): void {
      this.sendTry = true;
      this.outcomesSubjectsService.create(this.theOutcomeSubject).
      subscribe((data: any) => {
       Swal.fire(
         'Created',
         'The outcome subject has been created successfully',
         'success'
       )
       this.router.navigate(["/OutcomesSubjects/list"]);
      });
    console.log("Create outcome subject" + JSON.stringify(this.theOutcomeSubject));
  }

  update(): void {
      this.sendTry = true;
      this.outcomesSubjectsService.update(this.theOutcomeSubject).
      subscribe((response) => {
       Swal.fire(
         'Updated',
         'The outcome subject has been updated successfully',
         'success'
       )
       this.router.navigate(["/OutcomesSubjects/list"]);
      });
    console.log("Update outcome subject" + JSON.stringify(this.theOutcomeSubject));
  }

  goBack(): void {
    this.location.back();
  }
}
