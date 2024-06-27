import { Component, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
 
  loginForm: FormGroup;
  registerForm: FormGroup;
  showRegister = false;

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder
  ) {
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
