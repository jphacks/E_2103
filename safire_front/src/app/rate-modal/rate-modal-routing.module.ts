import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateModalPage } from './rate-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RateModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateModalPageRoutingModule {}
