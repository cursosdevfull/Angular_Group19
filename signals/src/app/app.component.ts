import { Component } from '@angular/core';

import { InterpolacionComponent } from './interpolacion/interpolacion.component';
import { SignalComponent } from './signal/signal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [InterpolacionComponent, SignalComponent],
})
export class AppComponent {
  title = 'AppComponent';
}
