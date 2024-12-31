import { inject, Injectable, signal } from '@angular/core';

import { ResultPage } from '../../core/types/result-page';
import { CourseAdapter } from '../adapters/course.adapter';
import { CoursePort } from '../ports/course.port';
import { Course, STATUS } from './course';

@Injectable({ providedIn: 'root' })
export class CourseApplication {
  courses = signal<Course[]>([]);
  courseByPage = signal<ResultPage<Course>>({
    data: [],
    total: 0,
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
  });
  port: CoursePort = inject(CourseAdapter);
  courseTransactionEnd = signal<number>(0);

  getAll() {
    this.port
      .getAll()
      .subscribe((response) => this.courses.update(() => response));
  }

  getByPage(page: number, limit: number) {
    this.port
      .getByPage(page, limit)
      .subscribe((response) => this.courseByPage.update(() => response));
  }

  update(data: { courseId: string; title: string; status: STATUS }) {
    this.port
      .update(data)
      .subscribe(() => this.courseTransactionEnd.set(new Date().getTime()));
  }

  insert(data: { title: string }) {
    this.port
      .create(data)
      .subscribe(() => this.courseTransactionEnd.set(new Date().getTime()));
  }

  delete(data: { courseId: string }) {
    this.port
      .delete(data)
      .subscribe(() => this.courseTransactionEnd.set(new Date().getTime()));
  }
}
