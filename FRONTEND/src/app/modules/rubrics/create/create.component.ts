import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rubric } from '../../../models/rubric';
import { RubricsService } from '../../../services/rubrics.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  rubric_id:number = 0;
  sendTry: boolean = false;
  theRubric: Rubric = {
    "name": "",
    "description": "",
  }

  constructor(private rubricService: RubricsService,
              private router:Router,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.rubric_id = this.activeRoute.snapshot.params['id'];
    this.getRubric(this.rubric_id)
   } else {
    this.createMode = true;
   }
  }

  getRubric(id:number) {
   this.rubricService.show(id).
      subscribe(response => {
      this.theRubric = response.data;
    });
  }

  create(): void {
      this.sendTry = true;
      console.log(this.theRubric)
      this.rubricService.create(this.theRubric).
      subscribe((data: any) => {
       Swal.fire(
         'Created',
         'The rubric has been created successfully',
         'success'
       )
       this.router.navigate(["/Rubrics/list"]);
      });
    console.log("Create rubric"+JSON.stringify(this.theRubric));
  }

  update(): void {
      this.sendTry = true;
      this.rubricService.update(this.theRubric).
      subscribe(() => {
        Swal.fire(
          'Updated',
          'The rubric has been updated successfully',
          'success'
        )
        this.router.navigate(["/Rubrics/list"]);
       });
     console.log("Update rubric"+JSON.stringify(this.theRubric));
   }

   goBack(): void {
     this.location.back();
   }
 }
