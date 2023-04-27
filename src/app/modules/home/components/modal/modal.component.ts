import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Output() onClose = new EventEmitter();

  handleEscapeIntent() {
    this.onClose.emit();
  }
}
