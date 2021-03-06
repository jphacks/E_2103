import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PracticePage } from './practice.page';

const routes: Routes = [
  {
    path: '',
    component: PracticePage
  },
  {
    path: 'modal-setting',
    loadChildren: () => import('./modal-setting/modal-setting.module').then( m => m.ModalSettingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticePageRoutingModule {}
