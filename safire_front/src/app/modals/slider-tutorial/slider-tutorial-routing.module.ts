import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SliderTutorialPage } from './slider-tutorial.page';

const routes: Routes = [
  {
    path: '',
    component: SliderTutorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SliderTutorialPageRoutingModule {}
