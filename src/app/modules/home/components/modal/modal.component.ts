import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Output() onClose = new EventEmitter();

  @HostListener('document:keydown.escape')
  handleEscapeIntent() {
    this.onClose.emit();
  }
}
