import { Component } from '@angular/core';
import { AuthService } from 'src/app/screens/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private authService: AuthService) {}

  async logOut() {
    await this.authService.signOut();
  }
}
