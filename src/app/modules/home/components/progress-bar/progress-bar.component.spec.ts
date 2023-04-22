import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default input', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.font-semibold')?.textContent).toEqual('0%');
    expect(element.querySelector('.border-2')).toBeTruthy();
    expect(element.querySelector('.transition-transform')).toBeTruthy();
  });

  it('should update progress bar when input changes', () => {
    component.progress = 50;
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const innerBar = element.querySelector(
      '.transition-transform'
    ) as HTMLElement;
    expect(element.querySelector('.font-semibold')?.textContent).toBe('50%');
    expect(innerBar.style.width).toBe('50%');
  });

  it('should change color when progress is complete', () => {
    component.progress = 100;
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.text-green-400')).toBeTruthy();
    expect(element.querySelector('.border-green-400')).toBeTruthy();
    expect(element.querySelector('.bg-green-400')).toBeTruthy();
  });
});
