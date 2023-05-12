import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { RubricsRoutingModule } from './rubrics-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    RubricsRoutingModule,
    FormsModule,
  ]
})
export class RubricsModule { }
