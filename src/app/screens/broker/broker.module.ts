import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokerComponent } from './broker.component';
import { BrokerSideNavComponent } from './broker-side-nav/broker-side-nav.component';
import { BrokerContentComponent } from './broker-content/broker-content.component';



@NgModule({
  declarations: [
    BrokerComponent,
    BrokerSideNavComponent,
    BrokerContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BrokerModule { }
