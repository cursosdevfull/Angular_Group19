import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

import { LayoutService } from '../../../../../../../../app-cdev-lib/src/public-api';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'cdev-page-login',
  standalone: true,
  imports: [LoginComponent, LottieComponent],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css',
})
export class PageLoginComponent {
  options: AnimationOptions = {
    path: '/assets/lotties/portada.json',
  };

  constructor(private readonly layoutService: LayoutService) {
    this.layoutService.changeConfigLayout({
      showMenu: false,
      showHeader: false,
    });
  }
}
