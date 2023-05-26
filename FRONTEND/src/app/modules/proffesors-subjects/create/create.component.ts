import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProffesorSubject } from '../../../models/proffesor-subject';
import { ProffesorsSubjectsService } from '../../../services/proffesor-subject.service';
import { Location } from '@angular/common';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/user.service';
import { Subject } from '../../../models/subject';
import { SubjectsService } from '../../../services/subjects.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  proffesorSubject_id:number = 0;
  sendTry: boolean = false;
  theProffesorSubject: ProffesorSubject = {
    "proffesor_id": 0,
    "subject_id": 0,
  }
  users: User[] = [];
  subjects: Subject[] = [];

  constructor(private proffesorsSubjectsService: ProffesorsSubjectsService,
              private userService: UsersService,
              private subjectService: SubjectsService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.proffesorSubject_id = this.activeRoute.snapshot.params['id'];
    this.getProffesorSubject(this.proffesorSubject_id);
   } else {
    this.createMode = true;
   }
   this.getProffesors();
   this.getSubjects();
  }
  getProffesors() {
    this.userService.index().subscribe(response => {
      this.users = response.data.filter(user => user.role_id === 4);
    });
  }

  getSubjects() {
    this.subjectService.index().subscribe(response => {
      this.subjects = response.data;
    });
  }

  getProffesorSubject(id: number) {
   this.proffesorsSubjectsService.show(id).
      subscribe(response => {
      this.theProffesorSubject = response.data;
    });
  }

  create(): void {
      this.sendTry = true;
      this.proffesorsSubjectsService.create(this.theProffesorSubject).
      subscribe((data: any) => {
       Swal.fire(
         'Created',
         'The proffesor subject has been created successfully',
         'success'
       )
       this.router.navigate(["/ProffesorsSubjects/list"]);
      });
    console.log("Create proffesor subject" + JSON.stringify(this.theProffesorSubject));
  }

  update(): void {
      this.sendTry = true;
      this.proffesorsSubjectsService.update(this.theProffesorSubject).
      subscribe((response) => {
       Swal.fire(
         'Updated',
         'The proffesor subject has been updated successfully',
         'success'
       )
       this.router.navigate(["/ProffesorsSubjects/list"]);
      });
    console.log("Update proffesor subject" + JSON.stringify(this.theProffesorSubject));
  }

  goBack(): void {
    this.location.back();
  }
}

