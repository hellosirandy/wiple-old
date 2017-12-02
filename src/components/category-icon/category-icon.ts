import { Component, Input } from '@angular/core';
@Component({
  selector: 'category-icon',
  templateUrl: 'category-icon.html'
})
export class CategoryIconComponent{
  @Input() button: boolean=false;
  @Input() selected: boolean=false;
  @Input() category: string='';

  constructor() {
    
  }

  getClass() {
    const classes = [this.category];
    if (this.button) {
      classes.push('button');
      if (this.selected) {
        classes.push('selected');
      }
    } 
    return classes;
  }

}
