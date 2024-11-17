import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  result1 = 40;
  result2 = 20;

  students = ['John', 'Doe', 'Jane', 'Doe'];

  invoices = [
    { number: 1, amount: 100, year: 2024 },
    { number: 2, amount: 200, year: 2024 },
    { number: 3, amount: 300, year: 2024 },
    { number: 4, amount: 400, year: 2023 },
    { number: 5, amount: 500, year: 2022 },
    { number: 6, amount: 600, year: 2021 },
    { number: 7, amount: 700, year: 2020 },
  ];

  user = {
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  };

  courses = [];

  userRole = 'auditor';

  get invoices2024() {
    return this.invoices.filter((invoice) => invoice.year === 2024);
  }

  get invoices2023() {
    return this.invoices.filter((invoice) => invoice.year === 2023);
  }

  get invoicesBefore2023() {
    return this.invoices.filter((invoice) => invoice.year < 2023);
  }
}
