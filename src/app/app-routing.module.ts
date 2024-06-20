import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './screens/auth/auth.component';
import { NewsComponent } from './screens/news/news.component';
import { HomeComponent } from './screens/home/home.component';
import { MandiPricesComponent } from './screens/mandi-prices/mandi-prices.component';
import { AboutUsComponent } from './screens/about-us/about-us.component';
import { WeatherComponent } from './screens/weather/weather.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
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
  {
    path: 'home',
    loadChildren: () =>
      import('./screens/home/home.module').then((m) => m.HomeModule),
    component: HomeComponent,
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./screens/about-us/about-us.module').then((m) => m.AboutUsModule),
    component: AboutUsComponent,
  },
  {
    path: 'weather',
    loadChildren: () =>
      import('./screens/weather/weather.module').then((m) => m.WeatherModule),
    component: WeatherComponent,
  },
  {
    path: 'mandi-prices',
    loadChildren: () =>
      import('./screens/mandi-prices/mandi-prices.module').then((m) => m.MandiPricesModule),
    component: MandiPricesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
