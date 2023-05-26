import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/user.service';
import { Location } from '@angular/common';
import { RolesService } from 'src/app/services/roles.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  User_id:number = 0;
  sendTry: boolean = false;
  theUser: User = {
    "name": "",
    "email": "",
    "password": "",
    "role_id": 0,
  }
  roles: Role[]=[];

  constructor(private UserService: UsersService, private rolesService: RolesService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.User_id = this.activeRoute.snapshot.params['id'];
    this.getUser(this.User_id)
   } else {
    this.createMode = true;
   }
   this.getRoles();
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
  getUser(id:number) {
   this.UserService.show(id).
      subscribe(response => {
      this.theUser = response.data;
    });
  }

  create(): void {
      this.sendTry = true;
      console.log(this.theUser)
      this.UserService.create(this.theUser).
      subscribe((data: any) => {
        Swal.fire(
          'Created',
          'The User has been created successfully',
          'success'
        )
        this.router.navigate(["/Users/list"]);
       });
     console.log("Create User"+JSON.stringify(this.theUser));
   }

   update(): void {
       this.sendTry = true;
       this.UserService.update(this.theUser).
       subscribe((response) => {
        Swal.fire(
          'Updated',
          'The User has been updated successfully',
          'success'
        )
        this.router.navigate(["/Users/list"]);
       });
     console.log("Update User"+JSON.stringify(this.theUser));
   }

   goBack(): void {
     this.location.back();
   }
 }
