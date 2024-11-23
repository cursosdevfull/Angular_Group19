import { Routes } from '@angular/router';

import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';

export const routes: Routes = [
  { path: '', component: Component1Component },
  { path: 'c2', component: Component2Component },
];
