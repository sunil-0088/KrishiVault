import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../modal/user';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss'],
})
export class RoleDetailsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImage: File | null = null;
  selectedImageUrl: string | ArrayBuffer | null = null;
  userdata!: User;
  userForm: FormGroup | undefined;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.authService.user$.subscribe((data) => {
      console.log(data);
      this.userdata = data!;
      this.creteUserForm(this.userdata);
    });
  }

  creteUserForm(user: User) {
    this.userForm = this.fb.group({
      fullname: [user.displayName ?? ''],
      role: this.fb.group({
        farmer: [{ value: true, disabled: false }],
        broker: [{ value: false, disabled: true }],
      }),
    });
  }

  onRoleChange(role: string): void {
    var farmer = this.userForm!.get('role.farmer');
    var broker = this.userForm!.get('role.broker');

    if (role === 'farmer') {
      if (farmer?.value) {
        this.userForm!.get('role.broker')?.disable();
      } else {
        this.userForm!.get('role.broker')?.enable();
      }
    } else {
      if (role === 'broker') {
        if (broker?.value) {
          this.userForm!.get('role.farmer')?.disable();
        } else {
          this.userForm!.get('role.farmer')?.enable();
        }
      }
    }
  }
  selectFile(): void {
    this.fileInput.nativeElement.click();
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
   onSubmit(){
    console.log(this.userForm?.value);
    
   }
}
