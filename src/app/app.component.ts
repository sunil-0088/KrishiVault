import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  [x: string]: any;
  loginForm: FormGroup;
  registerForm: FormGroup;
  showRegister = false;
  signInState = 'in';

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
      .then((userCredential) => {
        if (userCredential.user!.emailVerified) {
          console.log('Login successful:', userCredential);
        } else {
          alert('Please verify your email before logging in.');
          this.afAuth.signOut(); // Log out the user
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }

  showRegistration() {
    this.showRegister = !this.showRegister;
    this.signInState = this.showRegister ? 'void' : 'in';
  }

  register() {
    const { email, password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Registration successful:', userCredential);
        userCredential
          .user!.sendEmailVerification()
          .then(() => console.log('Verification email sent'))
          .catch((error) =>
            console.error('Error sending verification email:', error)
          );
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  }

  googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('Google Sign-In successful:', result);
      })
      .catch((error) => {
        console.error('Google Sign-In error:', error);
      });
  }
}
