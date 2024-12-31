import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

const modules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatDividerModule,
];

@Component({
  selector: 'cdev-header',
  standalone: true,
  imports: [...modules],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  name!: string;
  lastname!: string;

  ngOnInit() {
    const token = sessionStorage.getItem('accessToken') as string;
    const payload: any = jwtDecode(token);
    this.name = payload.name;
    this.lastname = payload.lastname;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/auth']);
  }
}
