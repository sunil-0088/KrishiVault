import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/screens/auth/modal/user';
import { AuthService } from 'src/app/screens/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user:User | undefined | null;
  isAuthRouteActive: boolean = false;

  constructor(private authService: AuthService,private router: Router) {}
  ngOnInit(): void {
     this.authService.user$.subscribe((data)=>{
      this.user=data;
     });
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthRouteActive = this.isAuthRoute();
      }
    });
  }

  async logOut() {
    await this.authService.signOut();
  }


  isAuthRoute(): boolean {
    return this.router.url.startsWith('/auth');
  }
}
