import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
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
    private taostr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.user$;
        } else {
          return of(null);
        }
      }),
      tap((user) => {
        if (user) {
          // this.router.navigate(['home']);
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

      await credential.user?.sendEmailVerification();

      await this.afAuth.signOut();
      this.taostr.success(
        'Sign up successful. Please check your email to verify your account.'
      );
      return this.updateUserData(credential.user);
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
        return;
      }
      return this.updateUserData(credential.user);
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        this.taostr.error('Invalid Credential!, Check your email or password');
        return;
      } else {
        this.taostr.error(error.message);
        return;
      }
    }
  }

  private async updateUserData(user: any) {
    debugger;
    const userRef = this.afs.doc<User>(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    try {
      await userRef.set(data, { merge: true });
    } catch (error) {
      console.log('Error updating user data:', error);
    }
  }
  async signOut() {
    await this.afAuth.signOut();
  }

  async ForgotPassword(passwordResetEmail: string) {
    try {
      var isUserExits: boolean = await this.userExists(passwordResetEmail);

      if (isUserExits) {
        await this.afAuth.sendPasswordResetEmail(passwordResetEmail);

        this.taostr.success('Password reset email sent, check your inbox.');
        return;
      } else {
        this.taostr.info(
          'Entered Email is not associated with an account !'
        );
      }
      console.log(isUserExits);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      this.taostr.info(
        'An error occurred while resetting your password. Please try again.'
      );
    } finally {
      return;
    }
  }
  async userExists(email: string): Promise<boolean> {
    const querySnapshot = await this.afs
      .collection('users', (ref) => ref.where('email', '==', email))
      .get()
      .toPromise();
    return !querySnapshot!.empty;
  }
}
