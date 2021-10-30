import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalResultPage } from './modal-result.page';

const routes: Routes = [
  {
    path: '',
    component: ModalResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalResultPageRoutingModule {}
