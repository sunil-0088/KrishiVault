import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmerComponent } from './farmer.component';
import { FarmerSideNavComponent } from './components/farmer-side-nav/farmer-side-nav.component';
import { FarmerRoutingModule } from './farmer-routing.module';

@NgModule({
  declarations: [
    FarmerComponent,
    FarmerSideNavComponent,
  ],
  imports: [
    CommonModule,
    FarmerRoutingModule
  ]
})
export class FarmerModule { }
