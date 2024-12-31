import { Component, effect, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import { AuthAdapter } from '../../../adapters/auth.adapter';
import { AuthApplication } from '../../../application/auth.application';
import { User } from '../../../application/user';

@Component({
  selector: 'cdev-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  visibilityPassword = 'password';
  router = inject(Router);
  formGroup!: FormGroup;
  authAdapter = inject(AuthAdapter);

  constructor(
    private readonly fb: FormBuilder,
    private readonly application: AuthApplication
  ) {
    effect(() => {
      const registerResult = this.authAdapter.registerResult();
      if (registerResult) {
        const { accessToken, refreshToken } = registerResult.tokens;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        this.router.navigate(['/auth', 'qr']);
      }
    });

    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.nonNullable.group(
      {
        name: [null, [Validators.required]],
        lastname: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/g
            ),
          ],
        ],
        confirm: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/g
            ),
          ],
        ],
      },
      { validators: this.matchPassword }
    );
  }

  register(): void {
    const { valid } = this.formGroup;
    if (valid) {
      const { name, lastname, email, password } = this.formGroup.value;
      const user = new User(
        name,
        lastname,
        email,
        password,
        'd18d0d20-d686-4520-a33c-e5e7653382bc'
      );
      this.application.register(user);
    }
  }

  changeVisibility() {
    this.visibilityPassword =
      this.visibilityPassword === 'password' ? 'text' : 'password';
  }

  matchPassword(control: AbstractControl) {
    const ctrlPassword = control.get('password');
    const ctrlConfirm = control.get('confirm');

    if (!ctrlPassword || !ctrlConfirm) {
      return null;
    }

    const password = ctrlPassword.value;
    const confirm = ctrlConfirm.value;

    if (!password || !confirm) {
      return null;
    }

    return password === confirm ? null : { notMatch: true };
  }
}
