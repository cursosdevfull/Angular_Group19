import { JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Auxiliar01, token, Utils, Utils02 } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'providers';
  endpoint = '';

  layout: any;
  utils: any;

  constructor(
    @Inject('apiEndpoint') parameterEndpoint: string,
    @Inject('layout') layout: any,
    @Inject('utils') utils: any,
    @Inject(Auxiliar01) auxiliar01: Utils,
    //@Inject(Utils) utils02: Utils
    utils02: Utils,
    @Inject(token) token: string,
    private utilsProvide02: Utils02,
    @Inject('appConfig') private config: Record<string, any>
  ) {
    this.layout = layout;
    this.endpoint = parameterEndpoint;
    this.utils = utils;

    console.log(auxiliar01.getFullname('John', 'Doe'));
    console.log(utils02.getFullname('Jane', 'Doe'));
    console.log('token', token);
    this.utilsProvide02.execute();
    console.log(this.config);
  }
}
