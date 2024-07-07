import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RoleDetailsComponent } from './components/role-details/role-details.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    RoleDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
  ],

  exports: [AuthComponent],
})
export class AuthModule {}
