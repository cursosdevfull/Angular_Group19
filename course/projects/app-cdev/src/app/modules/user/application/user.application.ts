import { inject, Injectable, signal } from '@angular/core';

import { ResultPage } from '../../core/types/result-page';
import { UserAdapter } from '../adapters/user.adapter';
import { UserPort } from '../ports/user.port';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserApplication {
  users = signal<User[]>([]);
  userByPage = signal<ResultPage<User>>({
    data: [],
    total: 0,
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
  });
  port: UserPort = inject(UserAdapter);

  getAll() {
    this.port
      .getAll()
      .subscribe((response) => this.users.update(() => response));
  }

  getByPage(page: number, limit: number) {
    this.port
      .getByPage(page, limit)
      .subscribe((response) => this.userByPage.update(() => response));
  }
}
