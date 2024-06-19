import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './screens/auth/auth.component';
import { NewsComponent } from './screens/news/news.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./screens/auth/auth.module').then((m) => m.AuthModule),
    component: AuthComponent,
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./screens/news/news.module').then((m) => m.NewsModule),
    component: NewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
