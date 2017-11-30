import { Component } from '@angular/core';

/**
 * Generated class for the SidebarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidebar',
  templateUrl: 'sidebar.html'
})
export class SidebarComponent {

  text: string;

  constructor() {
    console.log('Hello SidebarComponent Component');
    this.text = 'Hello World';
  }

}
