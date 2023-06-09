import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalItemComponent } from './goal-item.component';
import { Goal } from 'src/app/modules/home/models/goal.model';
import { MockComponent, MockPipe } from 'ng-mocks';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { By } from '@angular/platform-browser';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { RelativeDatePipe } from '../../pipes/relative-date.pipe';

describe('GoalItemComponent', () => {
  let component: GoalItemComponent;
  let fixture: ComponentFixture<GoalItemComponent>;
  let progressBar: ProgressBarComponent;

  const goal: Goal = {
    id: 1,
    title: 'Finish Project',
    due_date: '2023-05-31',
    progress: 50,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GoalItemComponent,
        MockComponent(ProgressBarComponent),
        MockPipe(RelativeDatePipe, () => 'in 2 days'),
        MockPipe(SentenceCasePipe, () => 'In 2 days'),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalItemComponent);
    component = fixture.componentInstance;
    component.goal = goal;
    fixture.detectChanges();

    progressBar = fixture.debugElement.query(
      By.directive(ProgressBarComponent)
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with goal input', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.border-2')).toBeTruthy();
    expect(element.querySelector('.border-2 p')?.textContent).toBe(
      'Finish Project'
    );
    expect(
      element.querySelector('.border-2 .text-gray-500')?.textContent?.trim()
    ).toBe('In 2 days');
  });

  it('should render a progress bar and pass a progress prop', () => {
    expect(progressBar).toBeTruthy();
    expect(progressBar.progress).toBe(50);
  });

  it('should emit when goal item is clicked', () => {
    spyOn(component.onClick, 'emit');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.onClick.emit).toHaveBeenCalled();
  });
});
