import {
  Component,
  contentChildren,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import {
  MatColumnDef,
  MatTable,
  MatTableModule,
} from '@angular/material/table';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-om-perfect-scrollbar';

import { TMetadata } from '../../../../../app-cdev/src/app/modules/core/types/metadata';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@Component({
  selector: 'cdevlib-table',
  standalone: true,
  imports: [MatTableModule, PerfectScrollbarModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class TableComponent {
  columnDefs = contentChildren<MatColumnDef>(MatColumnDef);
  table = viewChild.required<MatTable<any>>(MatTable);

  metadata = input.required<TMetadata>();
  data = input.required<any[]>();
  edit = output<any>();

  displayedColumns: string[] = [];

  constructor() {
    effect(() => {
      const metadata = this.metadata();
      if (metadata) {
        this.displayedColumns = metadata.map((m) => m.field);
      }
    });

    effect(() => {
      const columns = this.columnDefs();

      if (columns) {
        columns.forEach((column) => {
          if (!this.displayedColumns.includes(column.name)) {
            this.table()?.addColumnDef(column);
            this.displayedColumns.push(column.name);
          }
        });
      }
    });
  }

  onEdit(row: any) {
    this.edit.emit(row);
  }
}
