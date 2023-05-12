import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from '../../../models/subject';
import { SubjectsService } from '../../../services/subjects.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  subject_id:number = 0;
  sendTry: boolean = false;
  theSubject: Subject = {
    "name": "",
    "description": "",
    "credits": 0,
    "code": "",
  }

  constructor(private subjectService: SubjectsService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.subject_id = this.activeRoute.snapshot.params['id'];
    this.getSubject(this.subject_id)
   } else {
    this.createMode = true;
   }
  }

  getSubject(id:number) {
   this.subjectService.show(id).
      subscribe(response => {
      this.theSubject = response.data;
    });
  }

  create(): void {
      this.sendTry = true;
      this.subjectService.create(this.theSubject).
      subscribe((data: any) => {
       Swal.fire(
         'Created',
         'The subject has been created successfully',
         'success'
       )
       this.router.navigate(["/Subjects/list"]);
      });
    console.log("Create subject"+JSON.stringify(this.theSubject));
  }

  update(): void {
      this.sendTry = true;
      this.subjectService.update(this.theSubject).
      subscribe((response) => {
       Swal.fire(
         'Updated',
         'The subject has been updated successfully',
         'success'
       )
       this.router.navigate(["/Subjects/list"]);
      });
    console.log("Update subject"+JSON.stringify(this.theSubject));
  }

  goBack(): void {
    this.location.back();
  }
}
