import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

@NgModule({
  declarations: [NavBarComponent, AccessDeniedComponent],
  imports: [CommonModule,RouterModule],
  exports:[NavBarComponent]
})
export class SharedModule {

}
