type ProcessedInput = string[];

const closingToOpening = new Map<string, string>([
  [')', '('],
  [']', '['],
  ['}', '{'],
  ['>', '<'],
]);

const CORRUPT_POINT_VALUES = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const INCOMPLETE_POINT_VALUES = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

export const solve = (input: ProcessedInput): number => {
  return part2Solution(input);
};

const part2Solution = (input: ProcessedInput): number => {
  const scores: number[] = [];
  const openingToClosing = new Map<string, string>(
    Array.from(closingToOpening, (e) => [e[1], e[0]])
  );

  for (let i = 0; i < input.length; i++) {
    let stack: string[] = [];
    for (let j = 0; j < input[i].length; j++) {
      const currChar = input[i].charAt(j);

      // if closing character, pop off the stack and see if they match
      if (closingToOpening.has(currChar)) {
        const openingChar = closingToOpening.get(currChar);
        // if the last opening character we saw doesn't match
        if (stack.length === 0 || stack.pop() !== openingChar) {
          // reset this so that we don't create a score for a corrupt line
          stack.length = 0;

          // exit out of loop early
          j = input[i].length;
        }
      } else {
        // opening character, add to the stack
        stack.push(currChar);
      }
    }

    // if we're at the end of the line, complete it
    // this if is here to verify we only add scores for incomplete lines
    if (stack.length > 0) {
      let score = 0;
      while (stack.length > 0) {
        const match = openingToClosing.get(stack.pop());
        score *= 5;
        score += INCOMPLETE_POINT_VALUES[match];
      }
      scores.push(score);
    }
  }

  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
};

const part1Solution = (input: ProcessedInput): number => {
  let sum = 0;
  const stack: string[] = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const currChar = input[i].charAt(j);

      // if closing character, pop off the stack and see if they match
      if (closingToOpening.has(currChar)) {
        const openingChar = closingToOpening.get(currChar);
        // if the last opening character we saw doesn't match
        if (stack.length === 0 || stack.pop() !== openingChar) {
          sum += CORRUPT_POINT_VALUES[currChar];

          // reset loop for next line
          j = 0;
          i++;
        }
      } else {
        // opening character, add to the stack
        stack.push(currChar);
      }
    }
  }
  return sum;
};

export const parseInput = (file: string): ProcessedInput => {
  return file.trimEnd().split('\n');
};

// export const getSampleInput = (): ProcessedInput => {

// };
