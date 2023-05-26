import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { OutcomesSubjectsRoutingModule } from './outcomes-subjects-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    OutcomesSubjectsRoutingModule,
    FormsModule,
  ]
})
export class OutcomesSubjectsModule { }
