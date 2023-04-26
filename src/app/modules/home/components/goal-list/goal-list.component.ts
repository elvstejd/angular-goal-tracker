import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Goal } from '../../models/goal.model';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css'],
})
export class GoalListComponent {
  @Output() onAddGoalClick = new EventEmitter<void>();
  @Input() goals: Goal[] = [];

  handleAddGoalClick() {
    this.onAddGoalClick.emit();
  }
}
