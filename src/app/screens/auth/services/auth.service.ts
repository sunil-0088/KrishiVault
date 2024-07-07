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
          return this.afs
            .collection('users')
            .doc<User>(user.uid)
            .valueChanges();;
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
    this.router.navigate(["/auth/role-details"])
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
      this.taostr.error(this.getCustomErrorMessage(error.code));
    }
  }

  async emailSignIn(email: string, password: string) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (!credential.user?.emailVerified) {
        // await credential.user?.sendEmailVerification();
        await this.afAuth.signOut();
        this.taostr.error('Please verify your email before Login.');
        return;
      }
      return this.updateUserData(credential.user);
    } catch (error: any) {
      this.taostr.error(this.getCustomErrorMessage(error.code));
      return;
    }
  }

  private async updateUserData(user: any) {
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
        this.taostr.info(this.getCustomErrorMessage('auth/user-not-found'));
      }
      console.log(isUserExits);
    } catch (error: any) {
      console.error('Error sending password reset email:', error);
      this.taostr.info(this.getCustomErrorMessage(error.code));
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

  getCustomErrorMessage(errorCode: string) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'The email address is already in use.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/operation-not-allowed':
        return 'Operation not allowed. Please contact support.';
      case 'auth/weak-password':
        return 'The password is too weak.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/invalid-verification-code':
        return 'The verification code is not valid.';
      case 'auth/invalid-verification-id':
        return 'The verification ID is not valid.';
      case 'auth/credential-already-in-use':
        return 'This credential is already associated with a different user account.';
      case 'auth/invalid-credential':
        return 'The credential is not valid.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email but different sign-in credentials. Please sign in using the original method.';
      case 'auth/requires-recent-login':
        return 'This operation requires a recent login. Please log in again.';
      case 'auth/too-many-requests':
        return 'We have detected too many requests from your device. Please try again later.';
      case 'auth/timeout':
        return 'The operation has timed out. Please try again.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection and try again.';
      case 'auth/internal-error':
        return 'An internal error has occurred. Please try again.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  }
}
