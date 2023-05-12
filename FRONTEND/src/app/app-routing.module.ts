import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Activities',
    loadChildren: () => import('./modules/activities/activities.module').then(m => m.ActivitiesModule)
  },
  {
    path: 'Evaluations',
    loadChildren: () => import('./modules/evaluations/evaluations.module').then(m => m.EvaluationsModule)
  },
  {
    path: 'Leaders',
    loadChildren: () => import('./modules/leaders/leaders.module').then(m => m.LeadersModule)
  },
  {
    path: 'Proffesors',
    loadChildren: () => import('./modules/proffesors/proffesors.module').then(m => m.ProffesorsModule)
  },
  {
    path: 'Rubrics',
    loadChildren: () => import('./modules/rubrics/rubrics.module').then(m => m.RubricsModule)
  },
  {
    path: 'Subjects',
    loadChildren: () => import('./modules/subjects/subjects.module').then(m => m.SubjectsModule)
  }
  /*
  {
    path: 'Activities/create', component: CreateComponent
  },
  { path: 'Activities/list', component: ListComponent}
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
