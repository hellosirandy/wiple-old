import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'radio-button',
  templateUrl: 'radio-button.html'
})
export class RadioButtonComponent {
  @Input() selected: boolean=false;

  constructor() {
  }

}
