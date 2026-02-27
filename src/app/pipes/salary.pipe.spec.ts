import { SalaryPipe } from './salary.pipe';

describe('SalaryPipe', () => {
  let pipe: SalaryPipe;

  beforeEach(() => {
    pipe = new SalaryPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a number as currency', () => {
    expect(pipe.transform(75000)).toBe('$75,000.00');
  });

  it('should format zero', () => {
    expect(pipe.transform(0)).toBe('$0.00');
  });

  it('should handle null', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should handle undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should accept custom currency symbol', () => {
    expect(pipe.transform(1000, '€')).toBe('€1,000.00');
  });

  it('should format large numbers', () => {
    expect(pipe.transform(1234567.89)).toBe('$1,234,567.89');
  });
});
