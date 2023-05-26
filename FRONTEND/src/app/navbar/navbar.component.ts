import { Component, OnInit } from '@angular/core';
import { SecuritiesService } from '../services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public securitiesService: SecuritiesService, private router: Router){}

  ngOnInit(): void {
    this.hasPermissions();
  }

  getActivities:boolean = false;
  getEvaluations:boolean = false;
  getUsers:boolean = false;
  getRubrics:boolean = false;
  getSubjects:boolean = false;
  getIndicators:boolean = false;
  getOutcomes:boolean = false;
  getIndicatorsRubrics:boolean = false;
  getOutcomesSubjects:boolean = false;
  getProffesorsSubjects:boolean = false;

  hasPermissions(): void {
    const role = this.securitiesService.getRole();
    const expectedGetActivities = ['1','2', '3', '4'];
    if (expectedGetActivities.includes(role)) {
      this.getActivities = true;
    }

    const expectedGetEvaluations = ['1','2', '3', '4'];
    if (expectedGetEvaluations.includes(role)) {
      this.getEvaluations = true;
    }

    const expectedGetUsers = ['1', '2','3'];
    if (expectedGetUsers.includes(role)) {
      this.getUsers = true;
    }

    const expectedGetRubrics = ['1', '2','3','4'];
    if (expectedGetRubrics.includes(role)) {
      this.getRubrics = true;
    }

    const expectedGetSubjects = ['1', '2', '3', '4'];
    if (expectedGetSubjects.includes(role)) {
      this.getSubjects = true;
    }

    const expectedGetIndicators = ['1', '2', '3'];
    if (expectedGetIndicators.includes(role)) {
      this.getIndicators = true;
    }

    const expectedGetOutcomes = ['1', '2','3','4'];
    if (expectedGetOutcomes.includes(role)) {
      this.getOutcomes = true;
    }

    const expectedGetIndicatorsRubrics = ['1', '2','3'];
    if (expectedGetIndicatorsRubrics.includes(role)) {
      this.getIndicatorsRubrics = true;
    }

    const expectedGetOutcomesSubjects = ['1', '2','3','4'];
    if (expectedGetOutcomesSubjects.includes(role)) {
      this.getOutcomesSubjects = true;
    }

    const expectedGetProffesorsSubjects = ['1','3'];
    if (expectedGetProffesorsSubjects.includes(role)) {
      this.getProffesorsSubjects = true;
    }
  }

  onLogout(): void {
    this.securitiesService.logout({email: '', password: ''}); // Aquí puedes poner cualquier objeto de Security, ya que no lo estás utilizando realmente para el método de logout.
    this.router.navigate(['/Securities/login']);
  }
}
