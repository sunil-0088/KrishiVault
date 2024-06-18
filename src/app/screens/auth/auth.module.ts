import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent, SignInComponent, AuthComponent],
  imports: [CommonModule, RouterModule, AuthRoutingModule],
})
export class AuthModule {}
