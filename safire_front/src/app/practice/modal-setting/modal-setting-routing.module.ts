import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalSettingPage } from './modal-setting.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalSettingPageRoutingModule {}
