import { Component } from '@angular/core';

import { InformationComponent } from './information';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [InformationComponent, ProductListComponent],
  styleUrls: ['./app.component.css'],
})
export class App {}
