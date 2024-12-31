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
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css',
})
export class QRComponent {
  visibilityPassword = 'password';
  router = inject(Router);
  adapter = inject(AuthAdapter);
  formGroup!: FormGroup;
  qrCode: string | undefined;
  secret: string | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly application: AuthApplication
  ) {
    this.createForm();
    const result = this.adapter.registerResult();
    this.qrCode = result?.qrCode;
    this.secret = result?.secret;
  }

  createForm() {
    this.formGroup = this.fb.group({
      token: [
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      secret: [this.secret],
    });

    effect(() => {
      const activeResult = this.adapter.activeResult();
      if (activeResult) {
        this.router.navigate(['/auth']);
      }
    });
  }

  activate2FA(): void {
    const { valid } = this.formGroup;
    if (valid) {
      const { token } = this.formGroup.value;
      this.application.activate2FA(token, this.secret as string);
    }
  }
}
