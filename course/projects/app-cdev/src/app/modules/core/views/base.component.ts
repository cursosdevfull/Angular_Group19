import { inject } from '@angular/core';

import { LayoutService } from '../../../../../../app-cdev-lib/src/public-api';
import { TMetadata } from '../types/metadata';

export abstract class BaseComponent {
  abstract title: string;
  abstract icon: string;
  abstract data: any[];
  abstract metadata: TMetadata;
  private readonly layoutService = inject(LayoutService);

  constructor() {
    this.layoutService.changeConfigLayout({
      showMenu: true,
      showHeader: true,
    });
  }
}
