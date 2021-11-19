import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./slides/slides.module').then(m => m.SlidesPageModule)
  },
  {
    path: 'userhome',
    loadChildren: () => import('./userhome/userhome.module').then( m => m.UserHomePageModule)
  },
  {
    path: 'userpage',
    loadChildren: () => import('./userpage/userpage.module').then( m => m.UserpagePageModule)
  },
  {
    path: 'new_project',
    loadChildren: () => import('./new_project/new_project.module').then( m => m.NewProjectPageModule)
  },
  {
    path: 'new_project/:project_id',
    loadChildren: () => import('./new_project/new_project.module').then( m => m.NewProjectPageModule)
  },
  {
    path: 'article/:project_id',
    loadChildren: () => import('./article/article.module').then( m => m.ArticlePageModule)
  },
  {
    path: 'feedback/:project_id',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'rate-modal',
    loadChildren: () => import('./rate-modal/rate-modal.module').then( m => m.RateModalPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'practice/:project_id',
    loadChildren: () => import('./practice/practice.module').then( m => m.PracticePageModule)
  },
  {
    path: 'slider-tutorial',
    loadChildren: () => import('./modals/slider-tutorial/slider-tutorial.module').then( m => m.SliderTutorialPageModule)
  },
  /*{
    path: 'title',
    loadChildren: () => import('./title/title.module').then( m => m.TitlePageModule)
  },
  {
    path: 'member',
    loadChildren: () => import('./member/member.module').then( m => m.MemberPageModule)
  },
  {
    path: 'background',
    loadChildren: () => import('./background/background.module').then( m => m.BackgroundPageModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then( m => m.ProjectPageModule)
  },
  {
    path: 'points',
    loadChildren: () => import('./points/points.module').then( m => m.PointsPageModule)
  },
  {
    path: 'tech',
    loadChildren: () => import('./tech/tech.module').then( m => m.TechPageModule)
  }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
