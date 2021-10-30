import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { IonicModule } from '@ionic/angular';

import { ModalResultPageRoutingModule } from './modal-result-routing.module';

import { ModalResultPage } from './modal-result.page';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalResultPageRoutingModule,
    ChartsModule
  ],
  exports: [ChartComponent],
  declarations: [ModalResultPage, ChartComponent]
})
export class ModalResultPageModule {}
