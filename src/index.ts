import * as fs from 'fs';
import * as path from 'path';
import { parseInput, solve } from './day11';

/**
 * Make sure you update the above './dayN' to the current problem day
 * along with the PROBLEM_DAY variable
 */
const PROBLEM_DAY = 11;

export function main() {
  // get input file
  const inputPath = path.join(
    __dirname,
    '..',
    'input_files',
    `input${PROBLEM_DAY}.txt`
  );
  const file = fs.readFileSync(inputPath, 'utf8');

  // const parsedInput = getSampleInput();
  const parsedInput = parseInput(file);

  // console.log(parsedInput);
  const solution: number = solve(parsedInput);

  console.log(`solution = ${solution}`);
}

main();
