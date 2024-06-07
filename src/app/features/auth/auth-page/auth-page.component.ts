import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)',
        }),
        animate(300),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            opacity: 0,
            transform: 'translateX(100%)',
          })
        ),
      ]),
    ]),
  ],
})
export class AuthPageComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  showRegister = false;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('Login successful:', user);
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }

  showRegistration() {
    this.showRegister = !this.showRegister;
  }

  register() {
    const { email, password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('Registration successful:', user);
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  }
}
