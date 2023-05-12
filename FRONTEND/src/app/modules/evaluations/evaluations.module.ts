import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EvaluationsRoutingModule } from './evaluations-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    EvaluationsRoutingModule,
    FormsModule,
  ]
})
export class EvaluationsModule { }
