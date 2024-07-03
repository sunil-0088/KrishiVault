import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { User } from '../modal/user';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async initialize(): Promise<any> {
    return Promise.resolve();
  }
  user$!: Observable<User | null | undefined>;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private router: Router,
    private taostr: ToastrService
  ) {
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.router.navigate(['home']);
    //   } else {
    //     this.router.navigate(['auth']);
    //   }
    // });
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
      tap((user) => {
        if (user) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['auth']);
        }
      }),
      catchError((error) => {
        console.error('Error in AuthService:', error);
        return of(null);
      })
    );
    this.user$.subscribe((data) => {
      console.log(data);
    });

    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     console.log(user);
    //     this.userData.displayName = user.displayName!;
    //     this.userData.uid = user.uid;
    //     this.userData.email = user.email!;
    //     this.userData.emailVerified = user.emailVerified;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!);
    //   } else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //   }
    // });
  }

  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async emailSignUp(email: string, password: string) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Send email verification
      await credential.user?.sendEmailVerification();

      // Sign out the user immediately after sending the verification email
      await this.afAuth.signOut();
      this.taostr.success(
        'Sign up successful. Please check your email to verify your account.'
      );
    } catch (error: any) {
      console.error('Sign up error:', error.code);
      this.taostr.error(error.message);
    }
  }

  async emailSignIn(email: string, password: string) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (!credential.user?.emailVerified) {
        await this.afAuth.signOut();
        this.taostr.error('Please verify your email before Login.');
      }

      return this.updateUserData(credential.user);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this.taostr.error(
          'This email is not registered. Please sign up first.'
        );
      } else {
        console.error(error);
        throw error;
      }
    }
  }

  private async updateUserData(user: any) {
    const userRef = this.afs.doc<User>(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Anonymous',
      photoURL: user.photoURL || 'https://example.com/default-avatar.png',
      emailVerified: user.emailVerified || true, // Ensure emailVerified is set to true
    };

    try {
      await userRef.set(data, { merge: true }); // Use async/await for clarity
    } catch (error) {
      console.log('Error updating user data:', error);
    }
  }
  async signOut() {
    await this.afAuth.signOut();
  }

  async ForgotPassword(passwordResetEmail: string) {
  try {
    debugger
    const signInMethods = await this.afAuth.fetchSignInMethodsForEmail(passwordResetEmail);
    if (signInMethods.length === 0) {
      window.alert('The email address you entered is not associated with an account. Please check and try again.');
      return; // Exit the function if user doesn't exist
    }

    await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
    window.alert('Password reset email sent, check your inbox.');
  } catch (error) {
    // Handle other potential errors during email sending
    console.error('Error sending password reset email:', error);
    window.alert('An error occurred while resetting your password. Please try again.');
  }
}
  // Sign in with email/password
  //   async SignIn(email: string, password: string) {
  //     try {
  //       const result = await this.afAuth.signInWithEmailAndPassword(
  //         email,
  //         password
  //       );
  //       this.SetUserData(result.user);
  //       this.afAuth.authState.subscribe((user_1) => {
  //         if (user_1) {
  //           this.router.navigate(['/home']);
  //         }
  //       });
  //     } catch (error: any) {
  //       window.alert(error.message);
  //     }
  //   }
  //   // Sign up with email/password
  //   async SignUp(email: string, password: string) {
  //     try {
  //       const result = await this.afAuth.createUserWithEmailAndPassword(
  //         email,
  //         password
  //       );
  //       /* Call the SendVerificaitonMail() function when new user sign
  //       up and returns promise */
  //       this.SendVerificationMail();
  //       this.SetUserData(result.user);
  //     } catch (error: any) {
  //       window.alert(error.message);
  //     }
  //   }

  //   // Send email verfificaiton when new user sign up

  //   // Reset Forggot password

  //   // Returns true when user is looged in and email is verified
  //   get isLoggedIn(): boolean {
  //     const user = JSON.parse(localStorage.getItem('user')!);
  //     return user !== null && user.emailVerified !== false ? true : false;
  //   } // Sign in with Google
  //   async GoogleAuth() {
  //     return this.AuthLogin(new GoogleAuthProvider()).then((res: any) => {
  //       this.router.navigate(['dashboard']);
  //     });
  //   }

  //   // Auth logic to run auth providers
  //   async AuthLogin(provider: any) {
  //     return this.afAuth
  //       .signInWithPopup(provider)
  //       .then((result) => {
  //         this.router.navigate(['dashboard']);
  //         this.SetUserData(result.user);
  //       })
  //       .catch((error) => {
  //         window.alert(error);
  //       });
  //   }

  //   /* Setting up user data when sign in with username/password,
  //   sign up with username/password and sign in with social auth
  //   provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  //   SetUserData(user: any) {
  //     const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //       `users/${user.uid}`
  //     );
  //     const userData: User = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName,
  //       photoURL: user.photoURL,
  //       emailVerified: user.emailVerified,
  //     };
  //     return userRef.set(userData, {
  //       merge: true,
  //     });
  //   } // Sign out
  //   async SignOut() {
  //     return this.afAuth.signOut().then(() => {
  //       localStorage.removeItem('user');
  //       this.router.navigate(['sign-in']);
  //     });
  //   }
}
