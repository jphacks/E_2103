import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateModalPageRoutingModule } from './rate-modal-routing.module';

import { RateModalPage } from './rate-modal.page';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateModalPageRoutingModule,
    MatSliderModule
  ],
  declarations: [RateModalPage]
})
export class RateModalPageModule {}
