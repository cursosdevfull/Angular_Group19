import { Inject, Injectable, signal } from '@angular/core';

import { layoutToken } from './layout.token';
import { LayoutConfig } from './layout.type';

@Injectable()
export class LayoutService {
  showMenu = signal<boolean>(false);
  showHeader = signal<boolean>(false);

  constructor(@Inject(layoutToken) private readonly config: LayoutConfig) {
    this.updateLayoutConfig(config);
  }

  changeConfigLayout(config: Partial<LayoutConfig>): void {
    const newConfig = { ...this.config, ...config };
    this.updateLayoutConfig(newConfig);
  }

  updateLayoutConfig(config: LayoutConfig): void {
    this.showMenu.set(config.showMenu);
    this.showHeader.set(config.showHeader);
  }
}
