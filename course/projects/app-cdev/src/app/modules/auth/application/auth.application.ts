import { Inject, Injectable } from '@angular/core';

import { AuthAdapter } from '../adapters/auth.adapter';
import { AuthPort } from '../ports/auth.port';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthApplication {
  constructor(@Inject(AuthAdapter) private readonly port: AuthPort) {}

  register(user: User) {
    this.port.register(user);
  }

  activate2FA(token: string, secret: string) {
    this.port.activate2FA(token, secret);
  }

  login(email: string, password: string, recaptchaCode: string) {
    this.port.login(email, password, recaptchaCode);
  }

  verifyToken(token: string) {
    this.port.verifyToken(token);
  }
}
