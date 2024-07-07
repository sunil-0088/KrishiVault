import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../modal/user';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss'],
})
export class RoleDetailsComponent implements OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedImage: File | null = null;
  selectedImageUrl: string | ArrayBuffer | null = null;

  userdata!: User;
  userForm: FormGroup | undefined;

  isLoading: boolean = false;
  private userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userSubscription = this.authService.user$.subscribe((data) => {
      this.userdata = data!;
      this.creteUserForm(this.userdata);
      this.selectedImageUrl = this.userdata.photoURL;
    });
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  creteUserForm(user: User) {
    this.userForm = this.fb.group({
      fullname: [user.displayName ?? ''],
      role: this.fb.group({
        farmer: [{ value: false, disabled: false }],
        broker: [{ value: false, disabled: false }],
      }),
    });
    if (user) {
      if (user.role === 'farmer'||user.role==null) {
        this.userForm!.get('role.farmer')?.setValue(true);
      } else {
        if (user.role === 'broker') {
          this.userForm!.get('role.broker')?.setValue(true);
        }
      }
    }
  }

  onRoleChange(role: string): void {
    var farmer = this.userForm!.get('role.farmer');
    var broker = this.userForm!.get('role.broker');

    if (role === 'farmer') {
      if (farmer?.value) {
        this.userForm!.get('role.broker')?.reset();
      } else {
        this.userForm!.get('role.farmer')?.setValue(true);
      }
    } else {
      if (role === 'broker') {
        if (broker?.value) {
          this.userForm!.get('role.farmer')?.reset();
        } else {
          this.userForm!.get('role.broker')?.setValue(true);
        }
      }
    }
  }
  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  removeFile() {
    if (this.selectedImageUrl === this.userdata.photoURL) {
      this.selectedImageUrl = null;
      this.selectedImage = null;
    } else {
      this.selectedImageUrl = this.userdata.photoURL;
      this.selectedImage = null;
    }
  }
  async onFileSelected(event: any): Promise<void> {
    this.selectedImage = event.target.files[0] as File;
    this.previewSelectedImage();
  }

  previewSelectedImage(): void {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImageUrl = e.target?.result!;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }
  async onSubmit() {
    this.isLoading = true;
    try {
      if (this.selectedImageUrl != this.userdata.photoURL) {
        this.userdata.photoURL = await this.authService.uploadImage(
          this.userdata.uid,
          this.selectedImage!
        );
      }

      this.userdata.displayName = this.userForm?.value.fullname;
      this.userdata.role = this.getRole(this.userForm?.value.role);
      await this.authService.updateUserData(this.userdata);

      this.router.navigate(['/home']);

    } catch (error: any) {
      this.toastr.error('Unable to save user data, Please try again!');
    } finally {
      this.isLoading = false;
    }
  }

  getRole(roleObject: { [key: string]: boolean }): string | null {
    for (const role in roleObject) {
      if (roleObject[role] === true) {
        return role;
      }
    }
    return 'farmer';
  }
}
