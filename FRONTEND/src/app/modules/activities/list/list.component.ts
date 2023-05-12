import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Activity } from '../../../models/activity';
import { ActivitiesService } from '../../../services/activities.service';
import { Router } from '@angular/router';
import { SubjectsService } from 'src/app/services/subjects.service';
import { Subject } from 'src/app/models/subject';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = [/*'id',*/ 'name', 'description', 'start date', 'end date', 'subject', 'options'];
  theActivities:Activity[] = [];

  constructor(private activitiesService: ActivitiesService,
              private router:Router,
              private subjectService: SubjectsService,) { }

  ngOnInit(): void {
    this.listActivities();
    this.getSubjects();
  }

  subjects: Subject[] = [];

  listActivities(): void {
    this.activitiesService.index().subscribe(response => {
      console.log(response);
      this.theActivities = response.data;
    });
  }

  getSubjects() {
    this.subjectService.index().subscribe(response => {
      this.subjects = response.data;
    });
  }
  getSubjectName(id: number | undefined): string {
    if (id === undefined) {
      return '';
    }

    const subject = this.subjects.find(subject => subject.id === id);
    return subject?.name || '';
  }

  createActivity():void{
    this.router.navigate(['/Activities/create']);
    console.log("creando actividad");
  }

  updateActivity(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    this.router.navigate(['/Activities/update/'+id])
    console.log("actualizando a: "+id);
  }


  deleteActivity(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete activity',
        text: "Sure you want to delete this activity?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
    }).then((result) => {
        if (result.isConfirmed) {
        this.activitiesService.destroy(id).subscribe(data => {
            Swal.fire(
            'Delete!',
            'The activity is successfully deleted',
            'success'
            )
            this.ngOnInit();
        });
        }
    })
  }

}
