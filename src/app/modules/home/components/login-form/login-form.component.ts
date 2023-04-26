import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

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

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.formData).subscribe(() => {
      console.log('Logged in');
      window.location.reload();
    });
  }
}
