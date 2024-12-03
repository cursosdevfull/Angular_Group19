import { Component, effect } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

import { LayoutService } from '../../../app-cdev-lib/src/public-api';
import { HeaderComponent } from './modules/core/views/components/header/header.component';
import { MenuComponent } from './modules/core/views/components/menu/menu.component';

const modules = [MatSidenavModule, RouterOutlet];
const components = [HeaderComponent, MenuComponent];

@Component({
  selector: 'cdev-root',
  standalone: true,
  imports: [...modules, ...components],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'appCDev';

  showMenu = true;
  showHeader = true;

  constructor(private readonly layoutService: LayoutService) {
    effect(() => {
      this.showMenu = this.layoutService.showMenu();
      this.showHeader = this.layoutService.showHeader();
    });
  }
}
