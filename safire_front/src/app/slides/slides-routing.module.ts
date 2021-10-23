import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlidesPage } from './slides.page';

const routes: Routes = [
  {
    path: 'slides',
    component: SlidesPage,
    children: [
      {
        path: 'title',
        loadChildren: () => import('../slideSheet/title/title.module').then(m => m.TitlePageModule)
      },
      /*{
        path: 'member',
        loadChildren: () => import('../slides/member/member.module').then(m => m.MemberPageModule)
      },*/
      {
        path: 'background',
        loadChildren: () => import('../slideSheet/background/background.module').then(m => m.BackgroundPageModule)
      },
      /*{
        path: 'project',
        loadChildren: () => import('../slideSheet/project/project.module').then(m => m.ProjectPageModule)
      },*/
      {
        path: 'points',
        loadChildren: () => import('../slideSheet/points/points.module').then(m => m.PointsPageModule)
      },
      {
        path: 'tech',
        loadChildren: () => import('../slideSheet/tech/tech.module').then(m => m.TechPageModule)
      },
      {
        path: '',
        redirectTo: '/slides/title',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/slides/title',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SlidesPageRoutingModule {}
