import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup | undefined;

  isLoading = false;
  isGoogleLogin = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createForm();
  }
  get email() {
    return this.signupForm!.get('email');
  }
  get password() {
    return this.signupForm!.get('password');
  }

  get confirmPassword() {
    return this.signupForm!.get('confirmPassword');
  }
  createForm() {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      }
    );
  }

  get passwordMatch() {
    return (
      this.password?.value == this.confirmPassword?.value
    );
  }
  async signup() {
    if (this.signupForm!.valid) {
      this.isLoading = true;
      await this.authService.emailSignUp(
        this.signupForm!.value.email,
        this.signupForm!.value.password
      );
      this.isLoading = false;
    } else {
      this.signupForm!.markAllAsTouched();
    }
  }
  async googleAuth() {
    this.isGoogleLogin = true;
    await this.authService.googleSignIn();
    this.isGoogleLogin = false;
  }
}
