import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css'],
})
export class GoalFormComponent {
  formData = {
    title: '',
    due_date: new Date().toISOString().substring(0, 10),
    progress: 0,
  };
  @Output() onSubmit = new EventEmitter<typeof this.formData>();

  handleSubmit() {
    this.onSubmit.emit({
      ...this.formData,
      due_date: this.formData.due_date + 'T00:00:00',
    });
  }
}
