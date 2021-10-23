import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomePage } from './userhome.page';

const routes: Routes = [
  {
    path: '',
    component: UserHomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserHomePageRoutingModule {}
