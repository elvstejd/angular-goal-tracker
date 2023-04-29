import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display passed title', () => {
    const myTitle = 'Hello world!';
    component.title = myTitle;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.nativeElement.querySelector('h1');
    expect(titleElement.textContent.trim()).toBe(myTitle);
  });

  it('should display passed subtitle', () => {
    const mySubtitle = 'Hello world!';
    component.subtitle = mySubtitle;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.nativeElement.querySelector('p');
    expect(titleElement.textContent.trim()).toBe(mySubtitle);
  });

  it('should emit onClose event emitter when gray overlay is clicked', () => {
    spyOn(component.onClose, 'emit');
    const grayOverlay = fixture.debugElement.nativeElement.querySelector(
      '.bg-gray-500.opacity-75'
    );
    grayOverlay.click();
    expect(component.onClose.emit).toHaveBeenCalled();
  });
});
