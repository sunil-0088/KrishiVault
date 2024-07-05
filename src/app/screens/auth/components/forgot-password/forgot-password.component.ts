import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  isLoading:boolean=false;
  resetForm: FormGroup | undefined;
  constructor(private authService: AuthService,private fb: FormBuilder) {}
  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get email(){
    return this.resetForm?.get('email')
  }
  async sendResetLink() {
    if (this.resetForm!.valid) {
      this.isLoading=true;
       await this.authService.ForgotPassword(this.resetForm!.value.email);
       this.resetForm?.reset();
       this.isLoading=false;
    }
  }
}
