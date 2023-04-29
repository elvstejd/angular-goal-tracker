import { TestBed } from '@angular/core/testing';

import { GoalStoreService } from './goal-store.service';
import { Goal } from '../models/goal.model';
import { firstValueFrom } from 'rxjs';

describe('GoalStoreService', () => {
  let service: GoalStoreService;
  let goals: Goal[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalStoreService);
    goals = [
      {
        id: 1,
        title: 'Goal 1',
        due_date: '2023-04-01T00:00:00',
        progress: 100,
        user: 'test',
      },
      {
        id: 2,
        title: 'Goal 2',
        due_date: '2023-04-01T00:00:00',
        progress: 100,
        user: 'test',
      },
    ];
    service.setGoals(goals);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set goals', () => {
    const otherGoals = [
      {
        id: 3,
        title: 'Goal 1',
        due_date: '2023-04-01T00:00:00',
        progress: 100,
        user: 'test',
      },
    ];
    service.setGoals(otherGoals);
    expect(service.goalSubject.value).toEqual(otherGoals);
  });

  it('should get a goal by id', () => {
    const goal = service.getGoal(1);
    expect(goal).toEqual(goals[0]);
  });

  it('should update a goal', () => {
    service.updateGoal(2, {
      ...goals[1],
      progress: 50,
    });

    const goal = service.getGoal(2);
    expect(goal?.progress).toBe(50);
  });

  it('should add a goal', () => {
    service.addGoal({
      id: 3,
      due_date: '2023-04-01T00:00:00',
      title: 'Goal 3',
      progress: 78,
      user: 'test',
    });
    expect(service.goalSubject.value.length).toBe(goals.length + 1);
    expect(service.goalSubject.value[2].title).toBe('Goal 3');
  });

  it('should delete a goal', () => {
    service.deleteGoal(1);
    expect(service.goalSubject.value.length).toBe(1);
    expect(service.goalSubject.value[0].id).toBe(2);
  });

  it('should get goals from goal$', async () => {
    const goalsFromStream = await firstValueFrom(service.goal$);
    expect(goalsFromStream).toEqual(goals);
  });
});
