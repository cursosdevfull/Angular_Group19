import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'observables';

  constructor() {
    const observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next('Execution started');
        observer.next('Execution completed');
        console.log('Time elapsed: 2 segs');
      }, 2000);

      setTimeout(() => {
        observer.error('Error occurred');
      }, 4000);

      setTimeout(() => {
        observer.next('Execution started');
        observer.next('Execution completed');
        console.log('Time elapsed: 2 segs');
      }, 6000);
    });

    observable.subscribe(
      (message) => console.log(message),
      (error) => console.log(error),
      () => console.log('Completed')
    );
  }
}
