import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalFormComponent } from './goal-form.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Goal } from '../../models/goal.model';

describe('GoalFormComponent', () => {
  let component: GoalFormComponent;
  let fixture: ComponentFixture<GoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalFormComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have current date as date input default', () => {
    const today = new Date().toISOString().substring(0, 10);
    const dateInput = fixture.debugElement.query(
      By.css('input[type="date"]')
    ).nativeElement;
    expect(dateInput.value).toBe(today);
  });

  it('should end up calling onSubmit event emitter when submit button is clicked', () => {
    spyOn(component.onSubmit, 'emit');
    const submitBtn =
      fixture.debugElement.nativeElement.querySelector('button');
    submitBtn.click();
    console.log(submitBtn);

    expect(component.onSubmit.emit).toHaveBeenCalledWith({
      ...component.formData,
      due_date: component.formData.due_date + 'T00:00:00',
    });
  });

  it('should be populate input fields when goal to edit is passed', () => {
    const goal: Goal = {
      id: 1,
      title: 'Goal 1',
      progress: 50,
      due_date: '2023-01-01T00:00:00',
      user: 'test',
    };
    component.editGoal = goal;
    component.ngOnInit();
    fixture.detectChanges();

    const titleInput =
      fixture.debugElement.nativeElement.querySelector('input[type="text"]');
    titleInput.dispatchEvent(new Event('input'));
    const dateInput =
      fixture.debugElement.nativeElement.querySelector('input[type="date"]');
    const progressInput = fixture.debugElement.nativeElement.querySelector(
      'input[type="number"]'
    );

    expect(titleInput.getAttribute('ng-reflect-model')).toBe(goal.title);
    expect(dateInput.getAttribute('ng-reflect-model')).toBe(
      goal.due_date.substring(0, 10)
    );
    expect(parseInt(progressInput.getAttribute('ng-reflect-model'))).toBe(
      goal.progress
    );
  });

  it("should display 'Edit' on submit button when goal is passed containing an id", () => {
    const goal: Goal = {
      id: 1,
      title: 'Goal 1',
      progress: 50,
      due_date: '2023-01-01T00:00:00',
      user: 'test',
    };
    component.editGoal = goal;
    component.ngOnInit();
    fixture.detectChanges();

    const submitBtn =
      fixture.debugElement.nativeElement.querySelector('button.bg-blue-600');

    expect(submitBtn.textContent.trim()).toBe('Edit');
  });

  it('should call onDeleteClick event emitter when delete button is called', () => {
    const goal: Goal = {
      id: 1,
      title: 'Goal 1',
      progress: 50,
      due_date: '2023-01-01T00:00:00',
      user: 'test',
    };
    spyOn(component.onDeleteClick, 'emit');
    component.editGoal = goal;
    component.ngOnInit();
    fixture.detectChanges();
    const deleteBtn =
      fixture.debugElement.nativeElement.querySelector('button.bg-red-600');
    deleteBtn.click();

    expect(component.onDeleteClick.emit).toHaveBeenCalledWith(goal.id);
  });
});
