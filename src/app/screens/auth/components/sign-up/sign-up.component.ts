import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup | undefined;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      displayName: new FormControl('', Validators.required),
    });
  }
  signup() {
    if (this.signupForm!.valid) {
      this.authService.emailSignUp(
        this.signupForm!.value.email,
        this.signupForm!.value.password
      );
    }
  }
}