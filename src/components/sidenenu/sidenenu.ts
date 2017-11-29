import { Component } from '@angular/core';

/**
 * Generated class for the SidenenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidenenu',
  templateUrl: 'sidenenu.html'
})
export class SidenenuComponent {

  text: string;

  constructor() {
    console.log('Hello SidenenuComponent Component');
    this.text = 'Hello World';
  }

}
