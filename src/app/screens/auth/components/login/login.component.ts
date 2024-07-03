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
  login() {
    if (this.loginForm!.valid) {
      this.authService.emailSignIn(
        this.loginForm!.value.email,
        this.loginForm!.value.password
      );
    }
  }

  googleAuth(){
    this.authService.googleSignIn();
  }
}
