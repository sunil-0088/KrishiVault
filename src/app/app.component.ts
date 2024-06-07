import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthPageComponent } from "./features/auth/auth-page/auth-page.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, AuthPageComponent]
})
export class AppComponent {
  title = 'KrishiVault';
}
