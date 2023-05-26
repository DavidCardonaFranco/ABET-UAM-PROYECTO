import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IndicatorRubric } from '../../../models/indicator-rubric';
import { IndicatorsRubricsService } from '../../../services/indicator-rubric.service';
import { Router } from '@angular/router';
import { Rubric } from '../../../models/rubric';
import { RubricsService } from '../../../services/rubrics.service';
import { Indicator } from '../../../models/indicator';
import { IndicatorsService } from '../../../services/indicators.service';
import { SecuritiesService } from 'src/app/services/security.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns: string[] = [];
  theIndicatorRubrics: IndicatorRubric[] = [];
  rubrics: Rubric[] = [];
  indicators: Indicator[] = [];

  constructor(private indicatorsRubricsService: IndicatorsRubricsService,
              private rubricService: RubricsService,
              private indicatorService: IndicatorsService,
              private securitiesService: SecuritiesService,
              private router: Router) { }

  ngOnInit(): void {
    this.listIndicatorRubrics();
    this.getRubrics();
    this.getIndicators();
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
      this.columns = ['Rubric', 'Indicator', 'Options'];
      this.options = true;
    }else {
      this.columns = ['Rubric', 'Indicator'];
      this.options = false;
    }
  }

  listIndicatorRubrics(): void {
    this.indicatorsRubricsService.index().subscribe(response => {
      console.log(response);
      this.theIndicatorRubrics = response.data;
    });
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

  getRubricName(id: number | undefined): string {
    if (id === undefined) {
      return '';
    }

    const rubric = this.rubrics.find(rubric => rubric.id === id);
    return rubric?.name || '';
  }

  getIndicatorName(id: number | undefined): string {
    if (id === undefined) {
      return '';
    }

    const indicator = this.indicators.find(indicator => indicator.id === id);
    return indicator?.name || '';
  }

  createIndicatorRubric(): void {
    this.router.navigate(['/IndicatorsRubrics/create']);
    console.log("Creating indicator rubric");
  }

  updateIndicatorRubric(id: number | undefined): void {
    if (id === undefined) {
      console.error("Id is undefined");
      return;
    }

    this.router.navigate(['/IndicatorsRubrics/update/' + id]);
    console.log("Updating to: " + id);
  }

  deleteIndicatorRubric(id: number | undefined): void {
    if (id === undefined) {
      console.error("Id is undefined");
      return;
    }

    console.log("Deleting: " + id);
    Swal.fire({
      title: 'Delete indicator rubric',
      text: "Sure you want to delete this indicator rubric?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.indicatorsRubricsService.destroy(id).subscribe(data => {
          Swal.fire(
            'Delete!',
            'The indicator rubric is successfully deleted',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}

