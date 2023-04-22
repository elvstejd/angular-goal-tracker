import { Component, Input } from '@angular/core';
import { Goal } from 'src/app/modules/models/goal';

@Component({
  selector: 'app-goal-item',
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.css'],
})
export class GoalItemComponent {
  @Input() goal!: Goal;
}
