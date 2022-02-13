/**
 * Template for solutions for a given day
 */

type ProcessedInput = any;

export const solve = (input: ProcessedInput, part: number): number => {
  switch (part) {
    case 1:
      return part1Solution(input);
    case 2:
      return part2Solution(input);
    default:
      return -1;
  }
};

const part2Solution = (input: ProcessedInput): number => {
  return -1;
};

const part1Solution = (input: ProcessedInput): number => {
  return -1;
};

export const parseInput = (file: string): ProcessedInput => {
  const input = file
    .trimEnd()
    .split('\n')
    .map((row) => row);
  return input;
};
