import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Mock, MockComponent } from 'ng-mocks';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { GoalService } from './services/goal.service';
import { of } from 'rxjs';
import { Goal } from './models/goal.model';
import { By } from '@angular/platform-browser';
import { GoalFormComponent } from './components/goal-form/goal-form.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let goals: Goal[];

  beforeEach(async () => {
    goals = [
      {
        id: 1,
        due_date: '2020-01-01T00:00:00',
        progress: 60,
        title: 'Goal 1',
        user: 'test',
      },
      {
        id: 2,
        due_date: '2020-01-01T00:00:00',
        progress: 60,
        title: 'Goal 2',
        user: 'test',
      },
    ];
    const goalServiceSpy = jasmine.createSpyObj('GoalService', ['getGoals']);
    goalServiceSpy.getGoals.and.returnValue(of(goals));

    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockComponent(GoalListComponent),
        MockComponent(ModalComponent),
        MockComponent(LoginFormComponent),
        MockComponent(GoalFormComponent),
      ],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: GoalService,
          useValue: goalServiceSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display goal list component and pass goals', () => {
    const goalListComponent = fixture.debugElement.query(
      By.directive(GoalListComponent)
    ).componentInstance;

    expect(goalListComponent.goals).toEqual(goals);
  });

  it('should display login form', () => {
    const loginForm = fixture.debugElement.query(
      By.directive(LoginFormComponent)
    ).componentInstance;
    expect(loginForm).toBeTruthy();
  });

  it('should display goal form', () => {
    const passedGoal = goals[0];
    component.goalToEdit = passedGoal;

    component.showGoalForm = true;
    fixture.detectChanges();

    const goalForm = fixture.debugElement.query(
      By.directive(GoalFormComponent)
    ).componentInstance;

    expect(goalForm.editGoal).toBe(passedGoal);
    expect(goalForm).toBeTruthy();
  });
});
