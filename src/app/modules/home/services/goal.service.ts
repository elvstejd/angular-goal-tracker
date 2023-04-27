import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../models/goal.model';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  apiURL = environment.apiUrl + '/goals';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getGoals() {
    return this.http.get<Goal[]>(this.apiURL);
  }

  postGoal(goal: Goal) {
    const user = this.authService.getUserFromLocalStorage();
    return this.http.post<Goal>(this.apiURL, { ...goal, user: user?.username });
  }

  deleteGoal(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  updateGoal(goal: Goal) {
    return this.http.put(`${this.apiURL}/${goal.id}`, goal);
  }
}
