import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../models/goal.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  apiURL = environment.apiUrl + '/goals';

  constructor(private http: HttpClient) {}

  getGoals() {
    return this.http.get<Goal[]>(this.apiURL);
  }

  postGoal(goal: Goal) {
    return this.http.post(this.apiURL, goal);
  }

  deleteGoal(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  updateGoal(goal: Goal) {
    return this.http.put(`${this.apiURL}/${goal.id}`, goal);
  }
}
