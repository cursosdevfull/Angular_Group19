import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

const modules = [MatIconModule, RouterLink, RouterLinkActive];

type MenuItem = {
  route: string;
  icon: string;
  title: string;
};

@Component({
  selector: 'cdev-menu',
  standalone: true,
  imports: [...modules],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    { route: '/dashboard', icon: 'dashboard', title: 'Dashboard' },
    { route: '/user', icon: 'people', title: 'Users' },
    { route: '/course', icon: 'settings', title: 'Courses' },
    { route: '/schedule', icon: 'schedule', title: 'Schedule' },
    { route: '/teacher', icon: 'school', title: 'Teachers' }, // Nuevo elemento agregado
  ];
}
