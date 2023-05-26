import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProffesorSubject } from '../../../models/proffesor-subject';
import { ProffesorsSubjectsService } from '../../../services/proffesor-subject.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/user.service';
import { Subject } from '../../../models/subject';
import { SubjectsService } from '../../../services/subjects.service';
import { SecuritiesService } from 'src/app/services/security.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns: string[] = [];
  theProffesorSubjects: ProffesorSubject[] = [];
  proffesors: User[] = [];
  subjects: Subject[] = [];

  constructor(private proffesorsSubjectsService: ProffesorsSubjectsService,
              private usersService: UsersService,
              private subjectsService: SubjectsService,
              private securitiesService: SecuritiesService,
              private router: Router) { }

  ngOnInit(): void {
    this.listProffesorSubjects();
    this.getProffesors();
    this.getSubjects();
    this.hasPermissions();
  }

  deletePermissions:boolean = false;
  updatePermissions:boolean = false;
  createPermissions:boolean = false;
  options:boolean = false;

  hasPermissions(): void {
    const role = this.securitiesService.getRole();
    const expectedRolesDelete = ['1'];
    const expectedRolesUpdate = ['1'];
    const expectedRolesCreate = ['1'];

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
      this.columns = ['Proffesor', 'Subject', 'Options'];
      this.options = true;
    }else {
      this.columns = ['Proffesor', 'Subject'];
      this.options = false;
    }
  }

  listProffesorSubjects(): void {
    this.proffesorsSubjectsService.index().subscribe(response => {
      console.log(response);
      this.theProffesorSubjects = response.data;
    });
  }

  getProffesors() {
    this.usersService.index().subscribe(response => {
      this.proffesors = response.data;
    });
  }

  getSubjects() {
    this.subjectsService.index().subscribe(response => {
      this.subjects = response.data;
    });
  }

  getProffesorName(id: number | undefined): string {
    if (id === undefined) {
      return '';
    }

    const proffesor = this.proffesors.find(proffesor => proffesor.id === id);
    return proffesor?.name || '';
  }

  getSubjectName(id: number | undefined): string {
    if (id === undefined) {
      return '';
    }

    const subject = this.subjects.find(subject => subject.id === id);
    return subject?.name || '';
  }

  createProffesorSubject(): void {
    this.router.navigate(['/ProffesorsSubjects/create']);
    console.log("Creating proffesor subject");
  }

  updateProffesorSubject(id: number | undefined): void {
    if (id === undefined) {
      console.error("Id is undefined");
      return;
    }

    this.router.navigate(['/ProffesorsSubjects/update/' + id]);
    console.log("Updating to: " + id);
  }

  deleteProffesorSubject(id: number | undefined): void {
    if (id === undefined) {
      console.error("Id is undefined");
      return;
    }

    console.log("Deleting: " + id);
    Swal.fire({
      title: 'Delete proffesor subject',
      text: "Sure you want to delete this proffesor subject?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proffesorsSubjectsService.destroy(id).subscribe(data => {
          Swal.fire(
            'Delete!',
            'The proffesor subject is successfully deleted',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}

