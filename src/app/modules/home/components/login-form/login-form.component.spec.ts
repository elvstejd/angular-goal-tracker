import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { of } from 'rxjs';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        {
          provide: 'AuthService',
          useValue: jasmine.createSpyObj('AuthService', ['login']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have username, password and submit input', () => {
    const username = fixture.nativeElement.querySelector(
      'input[name="username"]'
    );
    const password = fixture.nativeElement.querySelector(
      'input[name="password"]'
    );
    const submit = fixture.nativeElement.querySelector('button[type="submit"]');

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    expect(submit).toBeTruthy();
  });

  it('should call onSubmit() when submit button is clicked', () => {
    spyOn(component, 'onSubmit');

    const submit = fixture.nativeElement.querySelector('button[type="submit"]');
    submit.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call authService.login() when onSubmit() is called with form values', () => {
    const user = {
      username: 'test',
      token: 'test',
    };

    spyOn(authService, 'login').and.returnValue(of(user));

    spyOn(component, 'reloadPage');

    component.formData = {
      username: 'test',
      password: 'test',
    };

    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith(component.formData);
  });
});
