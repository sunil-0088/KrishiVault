import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmerComponent } from './farmer.component';
import { FarmerSideNavComponent } from './components/farmer-side-nav/farmer-side-nav.component';
import { FarmerRoutingModule } from './farmer-routing.module';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { BrokersComponent } from './components/brokers/brokers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    FarmerComponent,
    FarmerSideNavComponent,
    ExpensesComponent,
    BrokersComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FarmerRoutingModule
  ]
})
export class FarmerModule { }
