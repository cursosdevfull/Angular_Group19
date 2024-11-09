import { Component } from '@angular/core';

import { DetailComponent } from './detail.component';

@Component({
  standalone: true,
  selector: 'information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  imports: [DetailComponent],
})
export class InformationComponent {}
