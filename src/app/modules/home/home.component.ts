import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { GoalStoreService } from './services/goal-store.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Goal } from './models/goal.model';
import { GoalService } from './services/goal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showLoginModal = false;
  showGoalForm = false;
  goal$!: Observable<Goal[]>;
  goalToEdit: Goal | null = null;

  constructor(
    private goalService: GoalService,
    private goalStoreService: GoalStoreService,
    private authService: AuthService
  ) {
    this.goal$ = goalStoreService.goal$;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user.username === '') {
        this.showLoginModal = true;
      } else {
        this.showLoginModal = false;
      }
    });
  }

  openAddGoalModal() {
    this.goalToEdit = null;
    this.showGoalForm = true;
  }

  closeGoalModal() {
    this.showGoalForm = false;
  }

  openEditGoalModal(goalId: number) {
    const goal = this.goalStoreService.getGoal(goalId);
    if (goal) {
      this.showGoalForm = true;
      this.goalToEdit = goal;
    }
  }

  async handleGoalSubmit(goal: Goal) {
    if (goal.id) {
      // we are updating an existing goal
      this.goalStoreService.updateGoal(goal.id, goal);
      this.goalService.updateGoal(goal).subscribe();
    } else {
      // we are adding a new goal
      const tempId = (await firstValueFrom(this.goal$)).length + 1.11;
      this.goalStoreService.addGoal({ ...goal, id: tempId });
      this.goalService.postGoal(goal).subscribe((goal) => {
        this.goalStoreService.updateGoal(tempId, goal);
      });
    }

    this.showGoalForm = false;
  }
}
