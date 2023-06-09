import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root',
})
export class GoalStoreService {
  goalSubject = new BehaviorSubject<Goal[]>([]);
  goal$ = this.goalSubject.asObservable();

  setGoals(goals: Goal[]) {
    this.goalSubject.next(goals);
  }

  getGoal(goalId: number) {
    const goals = this.goalSubject.getValue();
    return goals.find((goal) => goal.id === goalId);
  }

  addGoal(goal: Goal) {
    const goals = this.goalSubject.getValue();
    this.goalSubject.next([...goals, goal]);
  }

  updateGoal(goalId: number, newGoal: Goal) {
    let goals = this.goalSubject.getValue();
    goals = goals.map((goal) => {
      if (goal.id === goalId) {
        return newGoal;
      }
      return goal;
    });
    this.goalSubject.next(goals);
  }

  deleteGoal(goalId: number) {
    let goals = this.goalSubject.getValue();
    goals = goals.filter((goal) => goal.id !== goalId);
    this.goalSubject.next(goals);
  }
}
