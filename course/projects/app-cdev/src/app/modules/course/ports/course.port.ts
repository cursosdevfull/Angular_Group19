import { Observable } from 'rxjs';

import { ResultPage } from '../../core/types/result-page';
import { Course, STATUS } from '../application/course';

export type CoursePort = {
  getAll(): Observable<Course[]>;
  getByPage(page: number, limit: number): Observable<ResultPage<Course>>;
  update(data: {
    courseId: string;
    title: string;
    status: STATUS;
  }): Observable<Object>;
  delete(data: { courseId: string }): Observable<Object>;
  create(data: { title: string }): Observable<Object>;
};
