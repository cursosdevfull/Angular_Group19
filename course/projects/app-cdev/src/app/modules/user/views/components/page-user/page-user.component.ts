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
import { UserApplication } from '../../../application/user.application';

@Component({
  selector: 'cdev-page-user',
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
  templateUrl: './page-user.component.html',
  styleUrl: './page-user.component.css',
})
export class PageUserComponent extends BaseComponent {
  title = 'User';
  icon = 'people';
  filename = 'users';
  subject = "User's data";

  application = inject(UserApplication);

  metadata: TMetadata = [
    { field: 'userId', title: 'ID' },
    { field: 'name', title: 'Name' },
    { field: 'lastname', title: 'Lastname' },
    { field: 'email', title: 'Email' },
  ];

  constructor() {
    super();
    this.loadPage(0);

    effect(() => {
      const result = this.application.userByPage();
      this.data = result.data;
      this.length = result.total;
    });

    effect(() => {
      const result = this.application.users();
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
