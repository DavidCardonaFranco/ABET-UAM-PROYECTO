import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Indicator } from '../../../models/indicator';
import { IndicatorsService } from '../../../services/indicators.service';
import { Location } from '@angular/common';
import { Outcome } from '../../../models/outcome';
import { OutcomesService } from '../../../services/outcomes.service';

export enum values {
  NotTurnedIn = 'Not Turned In',
  Insufficient = 'Insufficient',
  Approved = 'Approved',
  Noticeable = 'Noticeable',
  Outstanding = 'Outstanding',
}

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  indicator_id:number = 0;
  sendTry: boolean = false;
  theIndicator: Indicator = {
    "name": "",
    "expected_value": "",
    "real_value": "",
    "id_outcome": 0,
  }
  outcomes: Outcome[] = [];
  expectedValues: string[] = Object.values(values);
  realValues: string[] = Object.values(values);

  constructor(private indicatorService: IndicatorsService,
              private outcomeService: OutcomesService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.indicator_id = this.activeRoute.snapshot.params['id'];
    this.getIndicator(this.indicator_id)
   } else {
    this.createMode = true;
   }
   this.getOutcomes();
  }

  getOutcomes() {
    this.outcomeService.index().subscribe(response => {
      this.outcomes = response.data;
    });
  }

  getIndicator(id: number) {
   this.indicatorService.show(id).
      subscribe(response => {
      this.theIndicator = response.data;
    });
  }

  create(): void {
      this.sendTry = true;
      this.indicatorService.create(this.theIndicator).
      subscribe((data: any) => {
       Swal.fire(
         'Created',
         'The indicator has been created successfully',
         'success'
       )
       this.router.navigate(["/Indicators/list"]);
      });
    console.log("Create indicator" + JSON.stringify(this.theIndicator));
  }

  update(): void {
      this.sendTry = true;
      this.indicatorService.update(this.theIndicator).
      subscribe((response) => {
       Swal.fire(
         'Updated',
         'The indicator has been updated successfully',
         'success'
       )
       this.router.navigate(["/Indicators/list"]);
      });
    console.log("Update indicator" + JSON.stringify(this.theIndicator));
  }

  goBack(): void {
    this.location.back();
  }
}

