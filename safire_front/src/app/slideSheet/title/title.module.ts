import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TitlePageRoutingModule } from './title-routing.module';

import { TitlePage } from './title.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TitlePageRoutingModule
  ],
  declarations: [TitlePage]
})
export class TitlePageModule {}
