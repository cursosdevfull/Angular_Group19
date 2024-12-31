import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { ParametersService } from '../../core/services/parameters.service';
import { User } from '../application/user';
import { AuthPort } from '../ports/auth.port';
import {
  AuthDto,
  AuthResponse,
  ResultLoginResponse,
  ResultRegisterDataResponse,
  ResultRegisterResponse,
  ResultTokensResponse,
} from './dtos/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthAdapter implements AuthPort {
  private readonly http = inject(HttpClient);
  private readonly parameters = inject(ParametersService);
  registerResult = signal<ResultRegisterDataResponse | undefined>(undefined);
  activeResult = signal<boolean | undefined>(undefined);
  loginResult = signal<ResultTokensResponse | undefined>(undefined);
  loginVerify2FA = signal<ResultTokensResponse | undefined>(undefined);

  register(user: User): void {
    const { name, lastname, email, password, roleId } = user.properties();
    this.http
      .post<AuthResponse<ResultRegisterResponse>>(
        `${this.parameters.apiUrl}/v1/auth/register`,
        { name, lastname, email, password, roles: [{ roleId }] }
      )
      .subscribe((response: AuthResponse<ResultRegisterResponse>) => {
        this.registerResult.update(() =>
          AuthDto.fromDataToInfoRegister(response)
        );
      });
  }

  activate2FA(token: string, secret: string): void {
    this.http
      .post<AuthResponse<ResultLoginResponse>>(
        `${this.parameters.apiUrl}/v1/auth/enable-2fa`,
        { token, secret }
      )
      .subscribe((response: AuthResponse<ResultLoginResponse>) => {
        this.activeResult.update(() => true);
      });
  }

  login(email: string, password: string, recaptchaCode: string): void {
    this.http
      .post<AuthResponse<ResultLoginResponse>>(
        `${this.parameters.apiUrl}/v1/auth/login`,
        { email, password, recaptchaCode }
      )
      .subscribe((response: AuthResponse<ResultLoginResponse>) => {
        this.loginResult.update(() => AuthDto.fromDataToTokens(response));
      });
  }

  verifyToken(token: string): void {
    this.http
      .post<AuthResponse<ResultLoginResponse>>(
        `${this.parameters.apiUrl}/v1/auth/verify-2fa`,
        { token }
      )
      .subscribe((response: AuthResponse<ResultLoginResponse>) => {
        this.loginVerify2FA.update(() => AuthDto.fromDataToTokens(response));
      });
  }

  isUserLogged(): boolean {
    return !!sessionStorage.getItem('accessToken');
  }
}
