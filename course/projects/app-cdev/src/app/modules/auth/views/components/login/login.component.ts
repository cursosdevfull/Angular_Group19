import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';

import { AuthAdapter } from '../../../adapters/auth.adapter';
import { AuthApplication } from '../../../application/auth.application';

@Component({
  selector: 'cdev-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Len6pMpAAAAAHGxLZDXxvPwRLu4W8DjOpdIs13r',
      } as RecaptchaSettings,
    },
  ],
})
export class LoginComponent {
  visibilityPassword = 'password';
  router = inject(Router);
  adapter = inject(AuthAdapter);
  formGroup!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly application: AuthApplication
  ) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      recaptchaCode: [null, Validators.required],
    });

    effect(() => {
      const tokens = this.adapter.loginResult();
      if (tokens) {
        const { accessToken, refreshToken } = tokens;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        this.router.navigate(['/auth', 'token']);
      }
    });
  }

  login(): void {
    const { valid } = this.formGroup;
    if (valid) {
      const { email, password, recaptchaCode } = this.formGroup.value;
      this.application.login(email, password, recaptchaCode);
    }
  }

  changeVisibility() {
    this.visibilityPassword =
      this.visibilityPassword === 'password' ? 'text' : 'password';
  }
}
