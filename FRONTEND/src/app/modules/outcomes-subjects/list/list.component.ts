import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { OutcomeSubject } from '../../../models/outcome-subject';
import { OutcomesSubjectsService } from '../../../services/outcome-subject.service';
import { Router } from '@angular/router';
import { Outcome } from '../../../models/outcome';
import { OutcomesService } from '../../../services/outcomes.service';
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
  theOutcomesSubjects: OutcomeSubject[] = [];
  outcomes: Outcome[] = [];
  subjects: Subject[] = [];

  constructor(private outcomesSubjectsService: OutcomesSubjectsService,
              private outcomeService: OutcomesService,
              private subjectService: SubjectsService,
              private securitiesService: SecuritiesService,
              private router: Router) { }

  ngOnInit(): void {
    this.listOutcomesSubjects();
    this.getOutcomes();
    this.getSubjects();
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
      this.columns = ['Outcome', 'Subject', 'Options'];
      this.options = true;
    }else {
      this.columns = ['Outcome', 'Subject'];
      this.options = false;
    }
  }

  listOutcomesSubjects(): void {
    this.outcomesSubjectsService.index().subscribe(response => {
      console.log(response);
      this.theOutcomesSubjects = response.data;
    });
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

  getOutcomeName(id: number | undefined): string {
    if (id === undefined) {
      return '';
    }

    const outcome = this.outcomes.find(outcome => outcome.id === id);
    return outcome?.name || '';
  }

  getSubjectName(id: number | undefined): string {
    if (id === undefined) {
      return '';
    }

    const subject = this.subjects.find(subject => subject.id === id);
    return subject?.name || '';
  }

  createOutcomeSubject(): void {
    this.router.navigate(['/OutcomesSubjects/create']);
    console.log("Creating outcome subject");
  }

  updateOutcomeSubject(id: number | undefined): void {
    if (id === undefined) {
      console.error("Id is undefined");
      return;
    }

    this.router.navigate(['/OutcomesSubjects/update/' + id]);
    console.log("Updating to: " + id);
  }

  deleteOutcomeSubject(id: number | undefined): void {
    if (id === undefined) {
      console.error("Id is undefined");
      return;
    }

    console.log("Deleting: " + id);
    Swal.fire({
      title: 'Delete outcome subject',
      text: "Sure you want to delete this outcome subject?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.outcomesSubjectsService.destroy(id).subscribe(data => {
          Swal.fire(
            'Delete!',
            'The outcome subject is successfully deleted',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}

