import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Indicator } from '../../../models/indicator';
import { IndicatorsService } from '../../../services/indicators.service';
import { Router } from '@angular/router';
import { Outcome } from '../../../models/outcome';
import { OutcomesService } from '../../../services/outcomes.service';
import { SecuritiesService } from 'src/app/services/security.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns: string[] = [];
  theIndicators: Indicator[] = [];
  outcomes: Outcome[] = [];

  constructor(private indicatorService: IndicatorsService,
              private securitiesService: SecuritiesService,
              private outcomeService: OutcomesService,
              private router: Router) { }

  ngOnInit(): void {
    this.listIndicators();
    this.getOutcomes();
    this.hasPermissions();
  }

  deletePermissions:boolean = false;
  updatePermissions:boolean = false;
  createPermissions:boolean = false;
  options:boolean = false;

  hasPermissions(): void {
    const role = this.securitiesService.getRole();
    const expectedRolesDelete = ['1','2'];
    const expectedRolesUpdate = ['1','2','3'];
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
      this.columns = ['Name', 'Expected value', 'Real value', 'Outcome', 'Options'];
      this.options = true;
    }else {
      this.columns = ['Name', 'Expected value', 'Real value', 'Outcome']
      this.options = false;
    }
  }

  listIndicators(): void {
    this.indicatorService.index().subscribe(response => {
      console.log(response);
      this.theIndicators = response.data;
    });
  }

  getOutcomes() {
    this.outcomeService.index().subscribe(response => {
      this.outcomes = response.data;
    });
  }

  getOutcomeName(id: number | undefined): string {
    if (id === undefined) {
      return '';
    }

    const outcome = this.outcomes.find(outcome => outcome.id === id);
    return outcome?.name || '';
  }

  createIndicator(): void {
    this.router.navigate(['/Indicators/create']);
    console.log("creating indicator");
  }

  updateIndicator(id: number | undefined): void {
    if (id === undefined) {
      console.error("Id is undefined");
      return;
    }

    this.router.navigate(['/Indicators/update/' + id]);
    console.log("updating to: " + id);
  }

  deleteIndicator(id: number | undefined): void {
    if (id === undefined) {
      console.error("Id is undefined");
      return;
    }

    console.log("deleting: " + id);
    Swal.fire({
      title: 'Delete indicator',
      text: "Sure you want to delete this indicator?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.indicatorService.destroy(id).subscribe(data => {
          Swal.fire(
            'Delete!',
            'The indicator is successfully deleted',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}

