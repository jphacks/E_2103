import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SliderTutorialPageRoutingModule } from './slider-tutorial-routing.module';

import { SliderTutorialPage } from './slider-tutorial.page';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SliderTutorialPageRoutingModule,
    SwiperModule,
  ],
  declarations: [SliderTutorialPage]
})
export class SliderTutorialPageModule {}
