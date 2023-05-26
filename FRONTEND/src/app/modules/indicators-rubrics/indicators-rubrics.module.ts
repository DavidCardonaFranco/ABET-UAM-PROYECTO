import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { IndicatorsRubricsRoutingModule } from './indicators-rubrics-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    IndicatorsRubricsRoutingModule,
    FormsModule,
  ]
})
export class IndicatorsRubricsModule { }
