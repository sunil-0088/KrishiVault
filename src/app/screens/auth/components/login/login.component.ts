import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  isLoading = false;
  isGoogleLogin=false;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  async login() {
    if (this.loginForm!.valid) {
      this.isLoading = true;
      await this.authService.emailSignIn(
        this.loginForm!.value.email,
        this.loginForm!.value.password
      );
      this.isLoading = false;
    }
  }

  async googleAuth() {
    this.isGoogleLogin = true;
    await this.authService.googleSignIn();
    this.isGoogleLogin = false;
  }
}
