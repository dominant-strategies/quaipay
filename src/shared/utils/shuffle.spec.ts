import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('should work strings[]', () => {
    const input = 'This is a string array'.split(' ');
    const output = shuffle(input);

    expect(output).toHaveLength(input.length);
    expect(output).not.toStrictEqual(input);
    expect(output.sort()).toStrictEqual(input.sort());
  });
  it('should work numbers[]', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const output = shuffle(input);

    expect(output).toHaveLength(input.length);
    expect(output).not.toStrictEqual(input);
    expect(output.sort()).toStrictEqual(input.sort());
  });
});
