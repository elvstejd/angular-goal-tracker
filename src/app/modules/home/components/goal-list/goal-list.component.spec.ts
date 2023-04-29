import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalListComponent } from './goal-list.component';
import { MockComponent } from 'ng-mocks';
import { GoalItemComponent } from '../goal-item/goal-item.component';
import { By } from '@angular/platform-browser';
import { Goal } from '../../models/goal.model';

describe('GoalListComponent', () => {
  let component: GoalListComponent;
  let fixture: ComponentFixture<GoalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalListComponent, MockComponent(GoalItemComponent)],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an "Add goal" button', () => {
    const addButton = fixture.debugElement.query(By.css('button'));
    expect(addButton.nativeElement.textContent).toContain('Add goal');
  });

  it('should display a list of goals', () => {
    const goals: Goal[] = [
      {
        id: 1,
        due_date: '2020-01-01T00:00:00',
        progress: 60,
        title: 'Goal 1',
        user: 'test',
      },
      {
        id: 2,
        due_date: '2020-01-01T00:00:00',
        progress: 60,
        title: 'Goal 2',
        user: 'test',
      },
    ];

    component.goals = goals;
    fixture.detectChanges();

    const goalItems = fixture.debugElement.queryAll(
      By.directive(GoalItemComponent)
    );
    expect(goalItems.length).toBe(goals.length);

    spyOn(component.onGoalClick, 'emit');

    goalItems.forEach((goalItem, index) => {
      const goal = goals[index];
      spyOn(goalItem.componentInstance.onClick, 'emit');

      goalItem.triggerEventHandler('onClick', goal.id);

      expect(component.onGoalClick.emit).toHaveBeenCalledWith(goal.id);
    });
  });

  it('should emit Add Goal event when add button is clicked', () => {
    spyOn(component.onAddGoalClick, 'emit');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.onAddGoalClick.emit).toHaveBeenCalled();
  });
});
