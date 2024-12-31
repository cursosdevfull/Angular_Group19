import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ParametersService } from '../../core/services/parameters.service';
import { ResultPage } from '../../core/types/result-page';
import { Schedule, STATUS } from '../application/schedule';
import { SchedulePort } from '../ports/schedule.port';
import { ScheduleDto } from './dtos/schedule.dto';

@Injectable({ providedIn: 'root' })
export class ScheduleAdapter implements SchedulePort {
  private readonly http = inject(HttpClient);
  private readonly parameters = inject(ParametersService);

  getAll(): Observable<Schedule[]> {
    return this.http
      .get(`${this.parameters.apiUrl}/v1/schedule`)
      .pipe(map((response) => ScheduleDto.fromDataToResponse(response)));
  }

  getByPage(page: number, limit: number): Observable<ResultPage<Schedule>> {
    return this.http
      .get(`${this.parameters.apiUrl}/v1/course/page/${page}/size/${limit}`)
      .pipe(map((response) => ScheduleDto.fromDataToResponse(response)));
  }

  update(data: {
    scheduleId: string;
    courseId: string;
    title: string;
    status: STATUS;
  }): Observable<Object> {
    throw new Error('Method not implemented.');
  }
  delete(data: { scheduleId: string }): Observable<Object> {
    throw new Error('Method not implemented.');
  }
  create(data: { courseId: string; title: string }): Observable<Object> {
    throw new Error('Method not implemented.');
  }
}
