import { Observable } from 'rxjs';

import { ResultPage } from '../../core/types/result-page';
import { Schedule, STATUS } from '../application/schedule';

export type SchedulePort = {
  getAll(): Observable<Schedule[]>;
  getByPage(page: number, limit: number): Observable<ResultPage<Schedule>>;
  update(data: {
    scheduleId: string;
    courseId: string;
    title: string;
    status: STATUS;
  }): Observable<Object>;
  delete(data: { scheduleId: string }): Observable<Object>;
  create(data: {
    courseId: string;
    title: string;
  }): Observable<Object>;
};
