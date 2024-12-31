import { inject, Injectable, signal } from '@angular/core';

import { ResultPage } from '../../core/types/result-page';
import { ScheduleAdapter } from '../adapters/schedule.adapter';
import { SchedulePort } from '../ports/schedule.port';
import { Schedule } from './schedule';

@Injectable({ providedIn: 'root' })
export class ScheduleApplication {
  schedules = signal<Schedule[]>([]);
  scheduleByPage = signal<ResultPage<Schedule>>({
    data: [],
    total: 0,
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
  });
  port: SchedulePort = inject(ScheduleAdapter);

  getAll() {
    this.port
      .getAll()
      .subscribe((response) => this.schedules.update(() => response));
  }

  getByPage(page: number, limit: number) {
    this.port
      .getByPage(page, limit)
      .subscribe((response) => this.scheduleByPage.update(() => response));
  }
}
