import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IndicatorRubric } from '../../../models/indicator-rubric';
import { IndicatorsRubricsService } from '../../../services/indicator-rubric.service';
import { Location } from '@angular/common';
import { Rubric } from '../../../models/rubric';
import { RubricsService } from '../../../services/rubrics.service';
import { Indicator } from '../../../models/indicator';
import { IndicatorsService } from '../../../services/indicators.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  createMode:boolean = true;
  indicatorRubric_id:number = 0;
  sendTry: boolean = false;
  theIndicatorRubric: IndicatorRubric = {
    "id_rubric": 0,
    "id_indicator": 0,
  }
  rubrics: Rubric[] = [];
  indicators: Indicator[] = [];

  constructor(private indicatorsRubricsService: IndicatorsRubricsService,
              private rubricService: RubricsService,
              private indicatorService: IndicatorsService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
   if (this.activeRoute.snapshot.params['id']) {
    this.createMode = false;
    this.indicatorRubric_id = this.activeRoute.snapshot.params['id'];
    this.getIndicatorRubric(this.indicatorRubric_id);
   }
   else {
    this.createMode = true;
   }
   this.getRubrics();
   this.getIndicators();
  }

  getRubrics() {
    this.rubricService.index().subscribe(response => {
      this.rubrics = response.data;
    });
  }

  getIndicators() {
    this.indicatorService.index().subscribe(response => {
      this.indicators = response.data;
    });
  }

  getIndicatorRubric(id: number) {
   this.indicatorsRubricsService.show(id).
      subscribe(response => {
      this.theIndicatorRubric = response.data;
    });
  }

  create(): void {
      this.sendTry = true;
      this.indicatorsRubricsService.create(this.theIndicatorRubric).
      subscribe((data: any) => {
       Swal.fire(
         'Created',
         'The indicator rubric has been created successfully',
         'success'
       )
       this.router.navigate(["/IndicatorsRubrics/list"]);
      });
    console.log("Create indicator rubric" + JSON.stringify(this.theIndicatorRubric));
  }

  update(): void {
      this.sendTry = true;
      this.indicatorsRubricsService.update(this.theIndicatorRubric).
      subscribe((response) => {
       Swal.fire(
         'Updated',
         'The indicator rubric has been updated successfully',
         'success'
       )
       this.router.navigate(["/IndicatorsRubrics/list"]);
      });
    console.log("Update indicator rubric" + JSON.stringify(this.theIndicatorRubric));
  }

  goBack(): void {
    this.location.back();
  }
}
