import { Component } from '@angular/core';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  title: string = 'Item';

  toUpperCase() {
    this.title = this.title.toUpperCase();
  }
}
