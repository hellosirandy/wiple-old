import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'edit-expense-phase-three',
  templateUrl: 'edit-expense-phase-three.html'
})
export class EditExpensePhaseThreeComponent implements OnInit {
  @Output() goBack = new EventEmitter<void>();

  private opacity: 0|1=0;

  constructor() {
    
  }

  ngOnInit() {
    setTimeout(() => {
      this.opacity = 1;
    }, 100);
  }

  handleBackClick() {
    this.goBack.emit();
  }

}
