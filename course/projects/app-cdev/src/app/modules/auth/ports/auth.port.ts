import { User } from '../application/user';

export type AuthPort = {
  register(user: User): void;
  activate2FA(token: string, secret: string): void;
  login(email: string, password: string, recaptchaCode: string): void;
  verifyToken(token: string): void;
  isUserLogged(): boolean;
};
