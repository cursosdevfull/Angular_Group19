import { Component } from '@angular/core';

import {
  ContainerComponent,
  TableComponent,
  TitleComponent,
} from '../../../../../../../../app-cdev-lib/src/public-api';
import { TMetadata } from '../../../../core/types/metadata';
import { BaseComponent } from '../../../../core/views/base.component';

@Component({
  selector: 'cdev-page-course',
  standalone: true,
  imports: [TitleComponent, ContainerComponent, TableComponent],
  templateUrl: './page-course.component.html',
  styleUrl: './page-course.component.css',
})
export class PageCourseComponent extends BaseComponent {
  title = 'Course';
  icon = 'settings';
  length = 0;

  metadata: TMetadata = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'website', title: 'Website' },
  ];

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'leanne.graha@email.com',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'ervin.howell@email.com',
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'clementine.bauch@email.com',
      phone: '1-463-123-4447',
      website: 'ramiro.info',
    },
    {
      id: 4,
      name: 'Leanne Graham',
      email: 'leanne.graha@email.com',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
    },
    {
      id: 5,
      name: 'Ervin Howell',
      email: 'ervin.howell@email.com',
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
    },
    {
      id: 6,
      name: 'Clementine Bauch',
      email: 'clementine.bauch@email.com',
      phone: '1-463-123-4447',
      website: 'ramiro.info',
    },
  ];
}
