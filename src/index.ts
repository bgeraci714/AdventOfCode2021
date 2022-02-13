import * as fs from 'fs';
import * as path from 'path';
import { parseInput, solve } from './day12';

/**
 * Make sure you update the above './dayN' to the current problem day
 * along with the PROBLEM_DAY variable
 */
const PROBLEM_DAY = 12;
const PART = 1;

export function main() {
  const expectedSampleSolution = 10;
  const sampleSolution = testInput(PROBLEM_DAY, PART, true);
  if (sampleSolution !== expectedSampleSolution) {
    console.log(
      `Sample solution of ${sampleSolution} does not match expected value of ${expectedSampleSolution}`
    );
    return;
  }

  console.log(`Sample solution matches!`);

  const solution = testInput(PROBLEM_DAY, PART);
  console.log(`Solution = ${solution}`);
}

main();

const testInput = (
  problemDay: number,
  part: number,
  isSample?: boolean
): number => {
  // get input file reflective of whether it's a sample or not
  const pathPieces = isSample
    ? [__dirname, '..', 'input_files', 'sample', `input${problemDay}.txt`]
    : [__dirname, '..', 'input_files', `input${problemDay}.txt`];

  const inputPath = path.join(...pathPieces);
  const file = fs.readFileSync(inputPath, 'utf8');
  const parsedInput = parseInput(file);

  // solve the problem
  return solve(parsedInput, part);
};
