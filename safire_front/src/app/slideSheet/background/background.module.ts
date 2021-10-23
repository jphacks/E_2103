import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BackgroundPageRoutingModule } from './background-routing.module';

import { BackgroundPage } from './background.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BackgroundPageRoutingModule
  ],
  declarations: [BackgroundPage]
})
export class BackgroundPageModule {}
