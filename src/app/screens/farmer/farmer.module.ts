import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmerComponent } from './farmer.component';
import { FarmerSideNavComponent } from './farmer-side-nav/farmer-side-nav.component';
import { FarmerContentComponent } from './farmer-content/farmer-content.component';



@NgModule({
  declarations: [
    FarmerComponent,
    FarmerSideNavComponent,
    FarmerContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FarmerModule { }
