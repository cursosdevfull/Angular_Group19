import { ModuleWithProviders, NgModule } from '@angular/core';

import { LayoutService } from './layout.service';
import { layoutToken } from './layout.token';
import { LayoutConfig } from './layout.type';

@NgModule()
export class LayoutModule {
  static forRoot(config: LayoutConfig): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: [
        {
          provide: layoutToken,
          useValue: config,
        },
        LayoutService,
      ],
    };
  }
}
