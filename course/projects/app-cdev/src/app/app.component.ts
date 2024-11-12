import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PageLoginComponent } from './modules/auth/views/pages/page-login/page-login.component';

@Component({
  selector: 'cdev-root',
  standalone: true,
  imports: [RouterOutlet, PageLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'appCDev';
}
