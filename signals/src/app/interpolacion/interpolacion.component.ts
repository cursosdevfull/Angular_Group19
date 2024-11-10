import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-interpolacion',
  standalone: true,
  imports: [],
  templateUrl: './interpolacion.component.html',
  styleUrl: './interpolacion.component.css',
})
export class InterpolacionComponent {
  title = 'InterpolacionComponent';
  username = signal('');

  onPress() {
    console.log('Button pressed');
  }

  captureInput(event: any) {
    this.username.set(event.target.value);
  }
}
