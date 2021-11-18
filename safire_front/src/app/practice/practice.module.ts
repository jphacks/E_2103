import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PracticePageRoutingModule } from './practice-routing.module';

import { PracticePage } from './practice.page';

import { HeaderComponent } from '../components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PracticePageRoutingModule
  ],
  exports: [HeaderComponent],
  declarations: [PracticePage, HeaderComponent]
})
export class PracticePageModule {}
