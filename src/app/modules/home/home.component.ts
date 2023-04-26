import { Component, OnInit } from '@angular/core';
import { Goal } from './models/goal.model';
import { GoalService } from './services/goal.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  goals: Goal[] = [];
  showLoginModal = false;
  showAddGoalForm = false;

  constructor(
    private goalService: GoalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.goalService.getGoals().subscribe((goals) => {
      this.goals = goals;
    });

    this.authService.user$.subscribe((user) => {
      console.log(user, 'user changed');

      if (user.username === '') {
        this.showLoginModal = true;
      } else {
        this.showLoginModal = false;
      }
    });
  }

  handleAddGoalClick() {
    this.showAddGoalForm = true;
  }
}
