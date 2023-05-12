import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { ProffesorsRoutingModule } from './proffesors-routing.module';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ProffesorsRoutingModule,
    FormsModule,
  ]
})
export class ProffesorsModule { }
