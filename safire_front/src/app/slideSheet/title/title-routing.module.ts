import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TitlePage } from './title.page';

const routes: Routes = [
  {
    path: '',
    component: TitlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TitlePageRoutingModule {}
