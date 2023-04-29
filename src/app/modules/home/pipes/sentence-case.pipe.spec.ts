import { pipe } from 'rxjs';
import { SentenceCasePipe } from './sentence-case.pipe';

describe('SentenceCasePipe', () => {
  let pipe: SentenceCasePipe;

  beforeEach(() => {
    pipe = new SentenceCasePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize the first character of word or sentence', () => {
    const input = 'hello world';
    const output = 'Hello world';

    expect(pipe.transform(input)).toBe(output);
  });

  it('should return empty string when empty string is passed', () => {
    const input = '';
    const output = '';

    expect(pipe.transform(input)).toBe(output);
  });
});
