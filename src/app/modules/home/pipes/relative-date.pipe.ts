import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate',
})
export class RelativeDatePipe implements PipeTransform {
  today: Date;

  constructor() {
    this.today = new Date();
  }

  transform(value: string): unknown {
    const target = new Date(value);

    const isTheSameDate =
      this.today.getFullYear() === target.getFullYear() &&
      this.today.getMonth() === target.getMonth() &&
      this.today.getDate() === target.getDate();

    if (isTheSameDate) return 'today';

    const daysApart: number = Math.ceil(
      (target.getTime() - this.today.getTime()) / (1000 * 3600 * 24)
    ); // positive numbers means future, negative numbers means past

    if (daysApart === -1) return 'yesterday';
    if (daysApart < 1) return `${Math.abs(daysApart)} days ago`;

    if (daysApart === 1) return 'tomorrow';
    return `in ${daysApart} days`;
  }
}
