import { Routes } from '@angular/router';

import { PageLoginComponent } from './modules/auth/views/pages/page-login/page-login.component';
import { NotFoundComponent } from './modules/core/views/components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        './modules/dashboard/views/components/page-dashboard/page-dashboard.component'
      ).then((m) => m.PageDashboardComponent),
  },
  {
    path: 'user',
    loadComponent: () =>
      import(
        './modules/user/views/components/page-user/page-user.component'
      ).then((m) => m.PageUserComponent),
  },
  {
    path: 'course',
    loadComponent: () =>
      import(
        './modules/course/views/components/page-course/page-course.component'
      ).then((m) => m.PageCourseComponent),
  },
  {
    path: 'schedule',
    loadComponent: () =>
      import(
        './modules/schedule/views/components/page-schedule/page-schedule.component'
      ).then((m) => m.PageScheduleComponent),
  },
  {
    path: 'teacher',
    loadComponent: () =>
      import(
        './modules/teacher/views/components/page-teacher/page-teacher.component'
      ).then((m) => m.PageTeacherComponent),
  },
  { path: 'login', component: PageLoginComponent },
  { path: '**', component: NotFoundComponent },
];
