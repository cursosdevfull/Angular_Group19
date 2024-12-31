import { Observable } from 'rxjs';

import { ResultPage } from '../../core/types/result-page';
import { User } from '../application/user';

export type UserPort = {
  getAll(): Observable<User[]>;
  getByPage(page: number, limit: number): Observable<ResultPage<User>>;
  update(data: {
    userId: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
  }): Observable<Object>;
  delete(data: { userId: string }): Observable<Object>;
  create(data: {
    name: string;
    lastname: string;
    email: string;
    password: string;
  }): Observable<Object>;
};
