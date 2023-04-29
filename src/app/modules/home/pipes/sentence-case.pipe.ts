import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase',
})
export class SentenceCasePipe implements PipeTransform {
  transform(value: string): string {
    const firstChar = value.charAt(0).toUpperCase();
    const restOfStr = value.slice(1).toLowerCase();
    return `${firstChar}${restOfStr}`;
  }
}
