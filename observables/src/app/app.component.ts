import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'observables';
  subscription: Subscription;

  constructor() {
    const observable = new Observable((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('Execution started');
        console.log('Time elapsed: 2 segs');
      }, 2000);

      /*       setTimeout(() => {
        observer.error('Error occurred');
      }, 4000); */

      setTimeout(() => {
        observer.next('Execution completed');
        //console.log('Time elapsed: 2 segs');
      }, 6000);

      setTimeout(() => {
        observer.complete();
        console.log('Observation ended. Time elapsed: 2 segs');
      }, 8000);

      setTimeout(() => {
        observer.next("This won't be printed");
      }, 10000);
    });

    this.subscription = observable.subscribe({
      next: (message) => console.log(message),
      error: (error) => console.log(error),
      complete: () => console.log('Completed'),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
