import { Component, Input } from '@angular/core';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'category-item',
  templateUrl: 'category-item.html'
})
export class CategoryItemComponent {
  @Input() category: string;
  @Input() amount: number;

  private mobile: boolean=false;

  constructor(
    public plt: Platform
  ) {
    this.mobile = plt.is('mobile');
  }

}
