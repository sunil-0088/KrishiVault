import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokerComponent } from './broker.component';
import { BrokerSideNavComponent } from './components/broker-side-nav/broker-side-nav.component';
import { BrokerRoutingModule } from './broker-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BuyoutComponent } from './components/buyout/buyout.component';
import { FarmersComponent } from './components/farmers/farmers.component';
import { TransactionsComponent } from './components/transactions/transactions.component';



@NgModule({
  declarations: [
    BrokerComponent,
    BrokerSideNavComponent,
    DashboardComponent,
    BuyoutComponent,
    FarmersComponent,
    TransactionsComponent,
  ],
  imports: [
    CommonModule,
    BrokerRoutingModule,

  ]
})
export class BrokerModule { }
