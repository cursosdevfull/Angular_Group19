import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ParametersService } from '../../core/services/parameters.service';
import { ResultPage } from '../../core/types/result-page';
import { Course, STATUS } from '../application/course';
import { CoursePort } from '../ports/course.port';
import { CourseDto } from './dtos/course.dto';

@Injectable({
  providedIn: 'root',
})
export class CourseAdapter implements CoursePort {
  private readonly http = inject(HttpClient);
  private readonly parameters = inject(ParametersService);

  getAll(): Observable<Course[]> {
    return this.http
      .get(`${this.parameters.apiUrl}/v1/course`)
      .pipe(map((response) => CourseDto.fromDataToResponse(response)));
  }
  getByPage(page: number, limit: number): Observable<ResultPage<Course>> {
    return this.http
      .get(`${this.parameters.apiUrl}/v1/course/page/${page}/size/${limit}`)
      .pipe(map((response) => CourseDto.fromDataToResponse(response)));
  }

  create(data: { title: string }): Observable<Object> {
    return this.http.post(`${this.parameters.apiUrl}/v1/course`, data);
  }

  update(data: {
    courseId: string;
    title: string;
    status: STATUS;
  }): Observable<Object> {
    return this.http.put(
      `${this.parameters.apiUrl}/v1/course/${data.courseId}`,
      { title: data.title, status: data.status }
    );
  }

  delete(data: { courseId: string }): Observable<Object> {
    return this.http.delete(
      `${this.parameters.apiUrl}/v1/course/${data.courseId}`
    );
  }
}
