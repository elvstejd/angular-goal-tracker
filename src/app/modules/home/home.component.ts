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
  showAddGoalForm = false;
  goal$!: Observable<Goal[]>;

  constructor(
    private goalService: GoalService,
    private goalStoreService: GoalStoreService,
    private authService: AuthService
  ) {
    this.goal$ = goalStoreService.goal$;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      console.log(user, 'user changed');

      if (user.username === '') {
        this.showLoginModal = true;
      } else {
        this.showLoginModal = false;
      }
    });
  }

  openAddGoalModal() {
    this.showAddGoalForm = true;
  }

  closeAddGoalModal() {
    this.showAddGoalForm = false;
  }

  async handleAddGoal(goal: Goal) {
    const tempId = (await firstValueFrom(this.goal$)).length + 1.11;

    this.goalStoreService.addGoal({ ...goal, id: tempId });
    this.showAddGoalForm = false;

    this.goalService.postGoal(goal).subscribe((goal) => {
      this.goalStoreService.updateGoal(tempId, goal);
    });
  }
}
