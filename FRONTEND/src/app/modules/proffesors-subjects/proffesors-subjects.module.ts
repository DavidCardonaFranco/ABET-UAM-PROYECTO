import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ProffesorsSubjectsRoutingModule } from './proffesors-subjects-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ProffesorsSubjectsRoutingModule,
    FormsModule,
  ]
})
export class ProffesorsSubjectsModule { }
