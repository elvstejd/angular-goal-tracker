import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Goal } from '../../models/goal.model';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css'],
})
export class GoalFormComponent implements OnInit {
  formData = {
    title: '',
    due_date: new Date().toISOString().substring(0, 10),
    progress: 0,
  };
  @Output() onSubmit = new EventEmitter<typeof this.formData>();
  @Input() editGoal: Goal | null = null;
  buttonLabel = 'Add';

  ngOnInit(): void {
    if (this.editGoal) {
      this.buttonLabel = 'Edit';
      this.formData = {
        ...this.editGoal,
        due_date: this.editGoal.due_date.substring(0, 10),
      };
    }
  }

  handleSubmit() {
    this.onSubmit.emit({
      ...this.formData,
      due_date: this.formData.due_date + 'T00:00:00',
    });
  }
}
