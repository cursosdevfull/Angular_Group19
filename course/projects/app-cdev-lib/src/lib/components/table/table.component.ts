import {
  Component,
  computed,
  contentChildren,
  effect,
  input,
  viewChild,
} from '@angular/core';
import {
  MatColumnDef,
  MatTable,
  MatTableModule,
} from '@angular/material/table';

import { TMetadata } from '../../../../../app-cdev/src/app/modules/core/types/metadata';

@Component({
  selector: 'cdevlib-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  columnDefs = contentChildren<MatColumnDef>(MatColumnDef);
  table = viewChild.required<MatTable<any>>(MatTable);

  metadata = input.required<TMetadata>();
  data = input.required<any[]>();

  displayedColumns: string[] = [];
  titleColumns = computed(() =>
    this.metadata().reduce((accum: any, value: any) => {
      accum[value.field] = value.title;
      return accum;
    }, {})
  );

  constructor() {
    effect(() => {
      this.displayedColumns = this.metadata().map((m) => m.field);
      console.log('this.displayedColumns', this.displayedColumns);
    });

    effect(() => {
      const columns = this.columnDefs();

      if (columns) {
        columns.forEach((column) => {
          console.log('column', column);
          console.log(this.displayedColumns.includes(column.name));
          if (!this.displayedColumns.includes(column.name)) {
            this.table()?.addColumnDef(column);
            this.displayedColumns.push(column.name);
          }
        });
        console.log('this.displayedColumns2', this.displayedColumns);
      }
    });
  }
}
