import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import {
  ContainerComponent,
  ExportOptionsComponent,
  PaginatorComponent,
  TableComponent,
  TitleComponent,
} from '../../../../../../../../app-cdev-lib/src/public-api';
import { TMetadata } from '../../../../core/types/metadata';
import { BaseComponent } from '../../../../core/views/base.component';
import { ScheduleApplication } from '../../../application/schedule.application';

@Component({
  selector: 'cdev-page-schedule',
  standalone: true,
  imports: [
    TitleComponent,
    ContainerComponent,
    TableComponent,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    PaginatorComponent,
    ExportOptionsComponent,
  ],
  templateUrl: './page-schedule.component.html',
  styleUrl: './page-schedule.component.css',
})
export class PageScheduleComponent extends BaseComponent {
  title = 'Schedule';
  icon = 'schedule';

  filename = 'schedules';
  subject = "Schedule's data";

  application = inject(ScheduleApplication);

  metadata: TMetadata = [
    { field: 'courseId', title: 'Course ID' },
    { field: 'title', title: 'Title' },
    { field: 'slug', title: 'Slug' },
    { field: 'status', title: 'Status' },
  ];

  constructor() {
    super();
    this.loadPage(0);

    effect(() => {
      const result = this.application.scheduleByPage();
      this.data = result.data;
      this.length = result.total;
    });

    effect(() => {
      const result = this.application.schedules();
      if (result.length > 0) this.executeExport(result);
    });
  }

  override loadPage(page: number) {
    this.currentPage = page;
    this.application.getByPage(page + 1, this.pageSize);
  }

  override exportData() {
    this.application.getAll();
  }
}
