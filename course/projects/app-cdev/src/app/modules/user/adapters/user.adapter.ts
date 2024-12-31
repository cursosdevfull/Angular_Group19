import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ParametersService } from '../../core/services/parameters.service';
import { ResultPage } from '../../core/types/result-page';
import { User } from '../application/user';
import { UserPort } from '../ports/user.port';
import { UserDto } from './dtos/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserAdapter implements UserPort {
  private readonly http = inject(HttpClient);
  private readonly parameters = inject(ParametersService);

  getAll(): Observable<User[]> {
    return this.http
      .get(`${this.parameters.apiUrl}/v1/user`)
      .pipe(map((response) => UserDto.fromDataToResponse(response)));
  }
  getByPage(page: number, limit: number): Observable<ResultPage<User>> {
    return this.http
      .get(`${this.parameters.apiUrl}/v1/user/page/${page}/size/${limit}`)
      .pipe(map((response) => UserDto.fromDataToResponse(response)));
  }

  create(data: {
    name: string;
    lastname: string;
    email: string;
    password: string;
  }): Observable<Object> {
    return this.http.post(`${this.parameters.apiUrl}/v1/user`, data);
  }

  update(data: {
    userId: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
  }): Observable<Object> {
    return this.http.put(`${this.parameters.apiUrl}/v1/user/${data.userId}`, {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    });
  }

  delete(data: { userId: string }): Observable<Object> {
    return this.http.delete(`${this.parameters.apiUrl}/v1/user/${data.userId}`);
  }
}
