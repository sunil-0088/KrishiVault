import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

export const PasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmpassword = control.get('confirmPassword');
  if (password && confirmpassword && password.value != confirmpassword.value) {
    return {
      passwordmatcherror: true,
    };
  }
  return null;
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signupForm: FormGroup | undefined;

  isLoading = false;
  isGoogleLogin = false;

  private userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}
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
      },
      { validators: PasswordValidator } as AbstractControlOptions
    );
  }

  async signup() {
    if (this.signupForm!.valid) {
      this.isLoading = true;
      await this.authService.emailSignUp(
        this.signupForm!.value.email,
        this.signupForm!.value.password
      );
      this.signupForm?.reset();
      this.isLoading = false;
    } else {
      this.signupForm!.markAllAsTouched();
    }
  }
  async googleAuth() {
    this.isGoogleLogin = true;
    await this.authService.googleSignIn();
    this.userSubscription = this.authService.user$.subscribe((data) => {
      if (data?.role) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/auth/role-details']);
      }
    });
    this.isGoogleLogin = false;
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
