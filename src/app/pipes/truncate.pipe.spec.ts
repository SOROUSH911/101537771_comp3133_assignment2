import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate long strings', () => {
    expect(pipe.transform('This is a very long string that should be truncated', 20)).toBe(
      'This is a very long ...'
    );
  });

  it('should not truncate short strings', () => {
    expect(pipe.transform('Short', 25)).toBe('Short');
  });

  it('should handle null', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should handle undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should handle empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should use custom trail', () => {
    expect(pipe.transform('Hello World', 5, '---')).toBe('Hello---');
  });

  it('should use default limit of 25', () => {
    const str = 'A'.repeat(30);
    const result = pipe.transform(str);
    expect(result).toBe('A'.repeat(25) + '...');
  });
});
