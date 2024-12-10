import { Component, Inject, inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { ExportService } from '../../../services/export.service';
import { Info } from '../../../services/info.type';

type OptionsToExport = 'EXCEL' | 'PDF';
type SubOptionsToExport = 0 | 1 | 2;

@Component({
  selector: 'cdevlib-options',
  standalone: true,
  imports: [MatListModule, MatIconModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css',
})
export class OptionsComponent {
  exportService = inject(ExportService);

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private readonly info: Info,
    private readonly matBottomSheetRef: MatBottomSheetRef
  ) {}

  exportTo(option: OptionsToExport, subOption: SubOptionsToExport = 0) {
    console.log('Exporting to', option, 'with suboption', subOption);
    if (option === 'EXCEL') {
      this.exportService.exportToExcel(this.info);
    }

    if (option === 'PDF') {
      this.exportService.exportToPDF(this.info, subOption);
    }

    this.matBottomSheetRef.dismiss();
  }
}
