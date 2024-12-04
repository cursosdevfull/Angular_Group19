import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  ContainerComponent,
  TableComponent,
  TitleComponent,
} from '../../../../../../../../app-cdev-lib/src/public-api';
import { TMetadata } from '../../../../core/types/metadata';
import { BaseComponent } from '../../../../core/views/base.component';

@Component({
  selector: 'cdev-page-teacher',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TitleComponent,
    ContainerComponent,
    TableComponent,
  ],
  templateUrl: './page-teacher.component.html',
  styleUrls: ['./page-teacher.component.css'],
})
export class PageTeacherComponent extends BaseComponent {
  title = 'Teachers';
  icon = 'school';

  metadata: TMetadata = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'subject', title: 'Subject' },
  ];

  data = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      subject: 'Mathematics',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      subject: 'Physics',
    },
    // Agrega más datos de teachers aquí
  ];
}
