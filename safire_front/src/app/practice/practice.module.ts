import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PracticePageRoutingModule } from './practice-routing.module';

import { PracticePage } from './practice.page';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PracticePageRoutingModule,
    ComponentsModule,
  ],
  exports: [],
  declarations: [PracticePage]
})
export class PracticePageModule {}
