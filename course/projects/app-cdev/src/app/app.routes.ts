import { Routes } from '@angular/router';

import { authenticationGuard } from './modules/core/guards/authentication.guard';
import { authorizationGuard } from './modules/core/guards/authorization.guard';
import { NotFoundComponent } from './modules/core/views/components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [authenticationGuard, authorizationGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import(
        './modules/dashboard/views/components/page-dashboard/page-dashboard.component'
      ).then((m) => m.PageDashboardComponent),
  },
  {
    path: 'user',
    canActivate: [authenticationGuard, authorizationGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import(
        './modules/user/views/components/page-user/page-user.component'
      ).then((m) => m.PageUserComponent),
  },
  {
    path: 'course',
    canActivate: [authenticationGuard, authorizationGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import(
        './modules/course/views/components/page-course/page-course.component'
      ).then((m) => m.PageCourseComponent),
  },
  {
    path: 'schedule',
    canActivate: [authenticationGuard, authorizationGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import(
        './modules/schedule/views/components/page-schedule/page-schedule.component'
      ).then((m) => m.PageScheduleComponent),
  },
  {
    path: 'teacher',
    canActivate: [authenticationGuard, authorizationGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import(
        './modules/teacher/views/components/page-teacher/page-teacher.component'
      ).then((m) => m.PageTeacherComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.authRoutes),
  },
  { path: '**', component: NotFoundComponent },
];
