import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard'; // Asegúrate de ajustar la ruta para que apunte a tu guard
import { roleGuard } from './role.guard';

export const routes: Routes = [
  {
    path: 'Activities',
    loadChildren: () => import('./modules/activities/activities.module').then(m => m.ActivitiesModule),
    canActivate: [roleGuard, authGuard],
    data: { expectedRoles: ['1','2','3','4'] }

  },
  {
    path: 'Evaluations',
    loadChildren: () => import('./modules/evaluations/evaluations.module').then(m => m.EvaluationsModule),
    canActivate: [roleGuard, authGuard],
    data: { expectedRoles: ['1','2','3','4'] }
  },
  {
    path: 'Users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    canActivate: [roleGuard, authGuard],
    data: { expectedRoles: ['1','2','3'] }
  },
  {
    path: 'Rubrics',
    loadChildren: () => import('./modules/rubrics/rubrics.module').then(m => m.RubricsModule),
    canActivate: [roleGuard, authGuard],
    data: { expectedRoles: ['1','2','3','4'] }
  },
  {
    path: 'Subjects',
    loadChildren: () => import('./modules/subjects/subjects.module').then(m => m.SubjectsModule),
    canActivate: [roleGuard, authGuard],
    data: { expectedRoles: ['1','2','3','4'] }
  },
  {
    path: 'Indicators',
    loadChildren: () => import('./modules/indicators/indicators.module').then(m => m.IndicatorsModule),
    canActivate: [roleGuard, authGuard],
    data: { expectedRoles: ['1','2','3'] }
  },
  {
    path: 'Outcomes',
    loadChildren: () => import('./modules/outcomes/outcomes.module').then(m => m.OutcomesModule),
    canActivate: [roleGuard, authGuard],
    data: { expectedRoles: ['1','2','3','4'] }
  },
  {
    path: 'IndicatorsRubrics',
    loadChildren: () => import('./modules/indicators-rubrics/indicators-rubrics.module').then(m => m.IndicatorsRubricsModule),
    canActivate: [roleGuard, authGuard],
    data: { expectedRoles: ['1','2','3','4'] }
  },
  {
    path: 'OutcomesSubjects',
    loadChildren: () => import('./modules/outcomes-subjects/outcomes-subjects.module').then(m => m.OutcomesSubjectsModule),
    canActivate: [roleGuard, authGuard],
    data: { expectedRoles: ['1','2','3','4'] }
  },
  {
    path: 'ProffesorsSubjects',
    loadChildren: () => import('./modules/proffesors-subjects/proffesors-subjects.module').then(m => m.ProffesorsSubjectsModule),
    canActivate: [roleGuard, authGuard],
    data: { expectedRoles: ['1','2','3'] }
  },
  {
    path: 'Securities',
    loadChildren: () => import('./modules/securities/securities.module').then(m => m.SecuritiesModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
