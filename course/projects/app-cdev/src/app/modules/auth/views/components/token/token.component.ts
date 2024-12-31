import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import { SocketService } from '../../../../core/services/socket.service';
import { AuthAdapter } from '../../../adapters/auth.adapter';
import { AuthApplication } from '../../../application/auth.application';

@Component({
  selector: 'cdev-token',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './token.component.html',
  styleUrl: './token.component.css',
})
export class TokenComponent {
  visibilityPassword = 'password';
  router = inject(Router);
  adapter = inject(AuthAdapter);
  formGroup!: FormGroup;
  socket = inject(SocketService);

  constructor(
    private readonly fb: FormBuilder,
    private readonly application: AuthApplication
  ) {
    this.createForm();

    effect(() => {
      const tokens = this.adapter.loginVerify2FA();
      if (tokens) {
        const { accessToken, refreshToken } = tokens;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        this.router.navigate(['/dashboard']);
        this.socket.connect();
      }
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      token: [
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  sentToken(): void {
    const { valid } = this.formGroup;
    if (valid) {
      const { token } = this.formGroup.value;

      this.application.verifyToken(token);
    }
  }
}
