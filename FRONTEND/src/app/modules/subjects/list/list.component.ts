import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from '../../../models/subject';
import { SubjectsService } from '../../../services/subjects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = ['name', 'description', 'credits', 'code', 'options'];
  theSubjects:Subject[] = [];

  constructor(private subjectsService: SubjectsService,
              private router:Router) { }

  ngOnInit(): void {
    this.listSubjects();
  }

  listSubjects(): void {
    this.subjectsService.index().subscribe(response => {
      console.log(response);
      this.theSubjects = response.data;
    });
  }

  createSubject():void{
    this.router.navigate(['/Subjects/create']);
    console.log("creating subject");
  }

  updateSubject(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    this.router.navigate(['/Subjects/update/'+id])
    console.log("updating to: "+id);
  }

  deleteSubject(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    console.log("deleting: "+id);
    Swal.fire({
      text: "Sure you want to delete this subject?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete'
  }).then((result) => {
      if (result.isConfirmed) {
      this.subjectsService.destroy(id).subscribe(data => {
          Swal.fire(
          'Delete!',
          'The subject is successfully deleted',
          'success'
          )
          this.ngOnInit();
      });
      }
  })
}
}

