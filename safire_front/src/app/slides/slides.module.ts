import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SlidesPageRoutingModule } from './slides-routing.module';

import { SlidesPage } from './slides.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SlidesPageRoutingModule
  ],
  declarations: [SlidesPage]
})
export class SlidesPageModule {}
