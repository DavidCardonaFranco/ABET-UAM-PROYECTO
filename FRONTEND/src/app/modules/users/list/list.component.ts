import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { RolesService } from '../../../services/roles.service';
import { Role } from 'src/app/models/role';
import { SecuritiesService } from 'src/app/services/security.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = [];
  theUsers:User[] = [];
  roles:Role[] = [];

  constructor(private UsersService: UsersService,private rolesService: RolesService,
              private securitiesService: SecuritiesService,
              private router:Router) { }

  ngOnInit(): void {
    this.listUsers();
    this.getRoles();
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
      this.columns = ['Name', 'Email', 'Role', 'Options'];
      this.options = true;
    }else {
      this.columns = ['Name', 'Email'];
      this.options = false;
    }
  }

  getRoles() {
    this.rolesService.index().subscribe(response => {
      this.roles = response.data;
    });
  }

  getRoleName(id: number | undefined): string {
    if (id === undefined) {
      return '';
    }

    const role = this.roles.find(role => role.id === id);
    return role?.name || '';
  }

  listUsers(): void {
    this.UsersService.index().subscribe(response => {
      console.log(response);
      this.theUsers = response.data;
    });
  }

  createUser():void{
    this.router.navigate(['/Users/create']);
  }

  updateUser(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    this.router.navigate(['/Users/update/'+id])
  }

  deleteUser(id: number | undefined): void {
    if (id === undefined) {
        console.error("Id is undefined");
        return;
    }

    console.log("eliminando a: "+id);
    Swal.fire({
        title: 'Delete User',
        text: "Sure you want to delete this User?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
    }).then((result) => {
        if (result.isConfirmed) {
        this.UsersService.destroy(id).subscribe(data => {
            Swal.fire(
            'Delete!',
            'The User is successfully deleted',
            'success'
            )
            this.ngOnInit();
        });
        }
    })
  }
}
