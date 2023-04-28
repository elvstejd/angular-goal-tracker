import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { GoalService } from '../../services/goal.service';
import { GoalStoreService } from '../../services/goal-store.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  formData = {
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private goalService: GoalService,
    private goalStoreService: GoalStoreService
  ) {}

  onSubmit() {
    this.authService.login(this.formData).subscribe(() => {
      this.goalService.getGoals().subscribe((goals) => {
        this.goalStoreService.setGoals(goals);
      });
    });
  }
}
