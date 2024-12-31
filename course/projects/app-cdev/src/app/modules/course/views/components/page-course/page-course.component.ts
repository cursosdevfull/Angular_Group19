import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import {
  ConfirmComponent,
  ContainerComponent,
  ExportOptionsComponent,
  PaginatorComponent,
  TableComponent,
  TitleComponent,
} from '../../../../../../../../app-cdev-lib/src/public-api';
import { SocketService } from '../../../../core/services/socket.service';
import { TMetadata } from '../../../../core/types/metadata';
import { BaseComponent } from '../../../../core/views/base.component';
import { CourseApplication } from '../../../application/course.application';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'cdev-page-course',
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
    MatDialogModule,
  ],
  templateUrl: './page-course.component.html',
  styleUrl: './page-course.component.css',
})
export class PageCourseComponent extends BaseComponent {
  title = 'Course';
  icon = 'settings';

  filename = 'courses';
  subject = "Course's data";

  application = inject(CourseApplication);
  dialog = inject(MatDialog);
  socket = inject(SocketService);

  metadata: TMetadata = [
    { field: 'courseId', title: 'ID' },
    { field: 'title', title: 'Title' },
    { field: 'slug', title: 'Slug' },
    { field: 'status', title: 'Status' },
  ];

  constructor() {
    super();
    this.loadPage(0);
    this.handlerSubscriptionSocket();

    effect(() => {
      const result = this.application.courseByPage();
      this.data = result.data;
      this.length = result.total;
    });

    effect(() => {
      const result = this.application.courses();
      if (result.length > 0) this.executeExport(result);
    });

    effect(() => {
      const courseTransactionEnd = this.application.courseTransactionEnd();
      if (courseTransactionEnd) {
        this.loadPage(this.currentPage);
      }
    });

    effect(() => {
      const response = this.socket.notificationData();
      if (response) {
        const action = response.action;

        if (action === 'UPDATE') {
          const { courseId, ...restData } = response.data;
          const course = this.data.find((item) => item.courseId === courseId);

          if (course) {
            Object.assign(course, restData);
          }
        } else if (action === 'DELETE' || action === 'CREATE') {
          this.loadPage(this.currentPage);
        }
      }
    });
  }

  override loadPage(page: number) {
    this.currentPage = page;
    this.application.getByPage(page + 1, this.pageSize);
  }

  override exportData() {
    this.application.getAll();
  }

  openForm(data?: any) {
    const reference: MatDialogRef<FormComponent> = this.dialog.open(
      FormComponent,
      {
        data,
        panelClass: 'modal-form-course',
        disableClose: true,
      }
    );

    reference.afterClosed().subscribe({
      next: (result) => {
        if (!result) return;
        result.courseId ? this.update(result) : this.insert(result);
      },
    });
  }

  update(data: any) {
    this.application.update(data);
  }

  insert(data: any) {
    this.application.insert(data);
  }

  handlerSubscriptionSocket() {
    this.socket.subscribe('course:subscribe');
    this.socket.getNotifications('NOTIFICATION_COURSE');
  }

  delete(evt: any, data: any) {
    evt.stopPropagation();

    const reference = this.dialog.open(ConfirmComponent, {
      panelClass: 'modal-confirm',
      disableClose: true,
    });
    reference.componentInstance.message =
      'This action cannot be undone. Are you sure?';
    reference.afterClosed().subscribe({
      next: (result) => {
        if (!result) return;
        this.application.delete(data);
      },
    });
  }
}
