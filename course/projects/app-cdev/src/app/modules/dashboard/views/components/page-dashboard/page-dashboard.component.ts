import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ContainerComponent, LayoutService, TitleComponent } from '../../../../../../../../app-cdev-lib/src/public-api';
import { GraphComponent } from '../graph/graph/graph.component';

@Component({
  selector: 'cdev-page-dashboard',
  standalone: true,
  imports: [TitleComponent, ContainerComponent, MatIconModule, GraphComponent],
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css',
})
export class PageDashboardComponent {
  title = 'Dashboard';
  icon = 'dashboard';

  constructor(private readonly layoutService: LayoutService) {
    this.layoutService.changeConfigLayout({
      showMenu: true,
      showHeader: true,
    });
  }
}
