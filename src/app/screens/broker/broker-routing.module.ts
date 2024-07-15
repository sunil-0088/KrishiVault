

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BuyoutComponent } from './components/buyout/buyout.component';
import { FarmersComponent } from './components/farmers/farmers.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'buyout',
        component: BuyoutComponent,
      },
      {
        path: 'farmers',
        component: FarmersComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrokerRoutingModule {}
