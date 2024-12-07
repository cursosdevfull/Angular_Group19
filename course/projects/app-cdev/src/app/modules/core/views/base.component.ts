import { inject } from '@angular/core';

import { LayoutService } from '../../../../../../app-cdev-lib/src/public-api';
import { TMetadata } from '../types/metadata';

export abstract class BaseComponent {
  abstract title: string;
  abstract icon: string;
  abstract data: any[];
  abstract metadata: TMetadata;
  abstract length: number;

  private readonly layoutService = inject(LayoutService);
  protected pageSize = 25;
  protected currentPage = 0;

  constructor() {
    this.layoutService.changeConfigLayout({
      showMenu: true,
      showHeader: true,
    });
  }
}
