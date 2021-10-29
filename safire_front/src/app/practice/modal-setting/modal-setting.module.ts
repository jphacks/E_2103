import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSettingPageRoutingModule } from './modal-setting-routing.module';

import { ModalSettingPage } from './modal-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSettingPageRoutingModule
  ],
  declarations: [ModalSettingPage]
})
export class ModalSettingPageModule {}
