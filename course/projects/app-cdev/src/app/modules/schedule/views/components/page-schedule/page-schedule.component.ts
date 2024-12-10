import { Component } from '@angular/core';

import {
  ContainerComponent,
  ExportOptionsComponent,
  PaginatorComponent,
  TableComponent,
  TitleComponent,
} from '../../../../../../../../app-cdev-lib/src/public-api';
import { TMetadata } from '../../../../core/types/metadata';
import { BaseComponent } from '../../../../core/views/base.component';

@Component({
  selector: 'cdev-page-schedule',
  standalone: true,
  imports: [
    TitleComponent,
    ContainerComponent,
    TableComponent,
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

  metadata: TMetadata = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'website', title: 'Website' },
  ];

  override dataOriginal = [
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

  constructor() {
    super();
    this.length = this.dataOriginal.length;
    this.loadPage(0);
  }
}
