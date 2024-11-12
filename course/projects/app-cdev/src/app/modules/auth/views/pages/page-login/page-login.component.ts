import { Component } from '@angular/core';

import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'cdev-page-login',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css',
})
export class PageLoginComponent {}
