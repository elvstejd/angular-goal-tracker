import { RelativeDatePipe } from './relative-date.pipe';

describe('RelativeDatePipe', () => {
  let pipe: RelativeDatePipe;
  let today: Date;

  beforeEach(() => {
    pipe = new RelativeDatePipe();
    today = new Date();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it("should return 'x days ago' for differences of more than -1 days", () => {
    const n = generateRandomIntBetween(2, 10);
    const nDaysAgo = addDays(today, -n).toISOString();

    expect(pipe.transform(nDaysAgo)).toBe(`${n} days ago`);
  });

  it("should return 'yesterday' for differences of -1 days", () => {
    const yesterday = addDays(today, -1).toISOString();
    expect(pipe.transform(yesterday)).toBe('yesterday');
  });

  it("should return 'today' for differences of 0 days", () => {
    expect(pipe.transform(today.toISOString())).toBe('today');
  });

  it("should return 'tomorrow' for differences of +1 days", () => {
    const tomorrow = addDays(today, 1).toISOString();
    expect(pipe.transform(tomorrow)).toBe('tomorrow');
  });

  it("should return 'in x days' for differences of more than 1 days", () => {
    const n = generateRandomIntBetween(2, 10);
    const inNDays = addDays(today, n).toISOString();

    expect(pipe.transform(inNDays)).toBe(`in ${n} days`);
  });
});

function generateRandomIntBetween(a: number, b: number): number {
  if (a > b) {
    [a, b] = [b, a];
  }
  const range = b - a + 1;
  const randomInt = Math.ceil(Math.random() * range) + a;

  return randomInt;
}

function addDays(date: Date, days: number): Date {
  const dateCopy = new Date(date);
  dateCopy.setDate(dateCopy.getDate() + days);
  return dateCopy;
}
