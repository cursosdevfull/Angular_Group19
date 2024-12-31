import { Routes } from '@angular/router';

import { LoginComponent } from './views/components/login/login.component';
import { QRComponent } from './views/components/qr/qr.component';
import { RegisterComponent } from './views/components/register/register.component';
import { TokenComponent } from './views/components/token/token.component';
import { PageLoginComponent } from './views/pages/page-login/page-login.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: PageLoginComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'token', component: TokenComponent },
      { path: 'qr', component: QRComponent },
    ],
  },
];
