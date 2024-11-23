import { Component } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-component1',
  standalone: true,
  imports: [],
  templateUrl: './component1.component.html',
  styleUrl: './component1.component.css',
})
export class Component1Component {
  observableInterval = interval(1000);
  subject: Subject<void> = new Subject<void>();

  constructor() {
    this.observableInterval.pipe(takeUntil(this.subject)).subscribe({
      next: (value) => console.log(value),
    });
  }

  ngOnDestroy() {
    this.subject.next();
    this.subject.unsubscribe();
  }
}
