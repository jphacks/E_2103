import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProjectPage } from './new_project.page';

const routes: Routes = [
  {
    path: '',
    component: NewProjectPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewProjectPageRoutingModule {}
