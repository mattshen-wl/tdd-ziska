import { round } from '../src/math';

describe('error cases', () => {
  it('should report error if precision is negative', () => {
    expect(() => round(5, -1)).toThrow(new Error('precision has to be non-negative integer'));
  });

  it('should report error if value is not a number', () => {
    const value = 'abc';
    expect(() => round(value, 0)).toThrow(new Error(`${value} is not a number`));
  });
});

describe('positive cases', () => {
  it('positive numbers without precision', () => {
    expect(round(11.16)).toBe(11);
    expect(round(13.87)).toBe(14);
    expect(round(50.5)).toBe(51);
  });

  it('positive numbers with precision 2', () => {
    expect(round(0.1116, 2)).toBe(0.11);
    expect(round(0.1387, 2)).toBe(0.14);
    expect(round(0.505, 2)).toBe(0.51);
  });

  it('negative number without precision', () => {
    expect(round(-11.16)).toBe(-11);
    expect(round(-13.87)).toBe(-14);
    expect(round(-50.5)).toBe(-51);
  });

  it('negative number with precision 2', () => {
    expect(round(-0.1116, 2)).toBe(-0.11);
    expect(round(-0.1387, 2)).toBe(-0.14);
    expect(round(-0.505, 2)).toBe(-0.51);
  });
});
