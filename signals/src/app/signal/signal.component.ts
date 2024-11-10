import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css',
})
export class SignalComponent {
  a = signal(10);
  b = signal(20);
  result = computed(() => this.a() + this.b());

  userList = signal(['Lina', 'Juan', 'Pedro', 'Maria']);
  messageUserTotal = 'Total users: 0';
  nameMostLarge = '';
  nameMostShort = '';

  //messageUserTotal = computed(() => `Total users: ${this.userList().length}`);

  constructor() {
    effect(() => {
      const total = this.userList().length;
      this.messageUserTotal = `Total users: ${total}`;
      this.calculateNameMostLarge();
      this.calculateNameMostShort();
    });

    setTimeout(() => {
      this.b.set(50);

      this.userList.update((prevList: string[]) => [
        ...prevList,
        'Leo',
        'Pericles',
      ]);
    }, 3000);
  }

  calculateNameMostLarge() {
    this.nameMostLarge = this.userList().reduce((prev, current) =>
      prev.length > current.length ? prev : current
    );
  }

  calculateNameMostShort() {
    this.nameMostShort = this.userList().reduce((prev, current) =>
      prev.length < current.length ? prev : current
    );
  }

  /*   a = 10;
  b = 20;

  constructor() {
    const result = this.a + this.b;
    setTimeout(() => {
      this.b = 50;
      console.log('result', result);
      console.log('this.a', this.a);
      console.log('this.b', this.b);
    }, 2000);
  } */
}
