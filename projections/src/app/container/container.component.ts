import {
  Component,
  contentChild,
  effect,
  ElementRef,
  viewChild,
  viewChildren,
} from '@angular/core';

import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
  h1Selector = viewChild<ElementRef>('header');
  content01 = contentChild<ElementRef>('content01');
  //itemComponent = viewChild(ItemComponent);
  items = viewChildren(ItemComponent);

  /*   @ViewChild('header') h1Selector!: ElementRef;
  @ContentChild('content01') content01!: ElementRef; */

  constructor() {
    effect(() => {
      console.log('this.h1Selector', this.h1Selector());
      const el = this.h1Selector();
      if (el) {
        el.nativeElement.style.color = 'red';
      }
    });

    effect(() => {
      console.log('this.content01', this.content01());
      const el = this.content01();
      if (el) {
        el.nativeElement.style.color = 'blue';
      }
    });

    effect(() => {
      const items = this.items();
      console.log('this.items', items);

      if (items) {
        items.forEach((item, index) => {
          item.title = `Item ${index + 1}`;
          item.toUpperCase();
        });
      }
    });
  }

  /*   ngAfterViewInit() {
    this.h1Selector.nativeElement.textContent = 'Hello, Angular!';
  }

  ngAfterContentInit() {
    console.log('this.content01', this.content01);
  } */
}
