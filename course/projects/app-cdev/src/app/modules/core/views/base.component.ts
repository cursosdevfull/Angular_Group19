import { inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import {
  LayoutService,
  OptionsComponent,
} from '../../../../../../app-cdev-lib/src/public-api';
import { TMetadata } from '../types/metadata';

export abstract class BaseComponent {
  private readonly layoutService = inject(LayoutService);
  protected pageSize = 25;
  protected currentPage = 0;

  abstract title: string;
  abstract icon: string;
  abstract metadata: TMetadata;
  abstract filename: string;
  abstract subject: string;

  data: any[] = [];
  dataOriginal: any[] = [];
  length: number = 0;
  bottonSheet = inject(MatBottomSheet);

  constructor() {
    this.layoutService.changeConfigLayout({
      showMenu: true,
      showHeader: true,
    });
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.data = this.dataOriginal.slice(
      page * this.pageSize,
      (page + 1) * this.pageSize
    );
  }

  onPage(page: number) {
    this.loadPage(page);
  }

  exportData() {
    this.bottonSheet.open(OptionsComponent, {
      data: {
        records: this.dataOriginal,
        metadata: this.metadata,
        filename: this.filename,
        subject: this.subject,
      },
    });
  }

  executeExport(data: any[]) {
    this.bottonSheet.open(OptionsComponent, {
      data: {
        records: data,
        metadata: this.metadata,
        filename: this.filename,
        subject: this.subject,
      },
    });
  }
}
