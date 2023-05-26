import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Outcome } from '../../../models/outcome';
import { OutcomesService } from '../../../services/outcomes.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/user.service';
import { SecuritiesService } from 'src/app/services/security.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns: string[] = [];
  theOutcomes: Outcome[] = [];
  Users: User[] = [];

  constructor(private outcomeService: OutcomesService,
              private userService: UsersService,
              private securitiesService: SecuritiesService,
              private router: Router) {}
  ngOnInit(): void {
    this.listOutcomes();
    this.getLeaders();
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
      this.columns = ['Name', 'Description', 'Grade', 'Leader', 'Options'];
      this.options = true;
    }else {
      this.columns = ['Name', 'Description', 'Grade', 'Leader'];
      this.options = false;
    }
  }

  listOutcomes(): void {
    this.outcomeService.index().subscribe(response => {
      console.log(response);
      this.theOutcomes = response.data;
    });
  }

  getLeaders() {
    this.userService.index().subscribe(response => {
      this.Users = response.data;
    });
  }

  getLeaderName(id: number | undefined): string {
    if (id === undefined) {
      return '';
    }

    const leader = this.Users.find(leader => leader.id === id);
    return leader?.name || '';
  }

  createOutcome(): void {
    this.router.navigate(['/Outcomes/create']);
    console.log("Creating outcome");
  }

  updateOutcome(id: number | undefined): void {
    if (id === undefined) {
      console.error("Id is undefined");
      return;
    }

    this.router.navigate(['/Outcomes/update/' + id]);
    console.log("Updating to: " + id);
  }

  deleteOutcome(id: number | undefined): void {
    if (id === undefined) {
      console.error("Id is undefined");
      return;
    }

    console.log("Deleting: " + id);
    Swal.fire({
      title: 'Delete outcome',
      text: "Sure you want to delete this outcome?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.outcomeService.destroy(id).subscribe(data => {
          Swal.fire(
            'Delete!',
            'The outcome is successfully deleted',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
