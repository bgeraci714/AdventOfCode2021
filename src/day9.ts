type ProcessedInput = Array<Array<number>>;
interface Coordinate {
  row: number;
  col: number;
}
class SmokeBasin {
  input: ProcessedInput;
  constructor(input: ProcessedInput) {
    this.input = input;
  }

  getHeight(coord: Coordinate): number {
    return this.input[coord.row][coord.col];
  }

  getAdjacentSpots(coord: Coordinate): Array<Coordinate> {
    return [
      this.getSpotUp(coord),
      this.getSpotDown(coord),
      this.getSpotLeft(coord),
      this.getSpotRight(coord),
    ].filter((c) => c !== null);
  }

  getSpotUp(coord: Coordinate): Coordinate | null {
    const up = coord.row - 1;
    return up >= 0 ? { row: up, col: coord.col } : null;
  }

  getSpotDown(coord: Coordinate): Coordinate | null {
    const down = coord.row + 1;
    return down < this.input.length ? { row: down, col: coord.col } : null;
  }

  getSpotRight(coord: Coordinate): Coordinate | null {
    const right = coord.col + 1;
    return right < this.input[0].length ? { row: coord.row, col: right } : null;
  }

  getSpotLeft(coord: Coordinate): Coordinate | null {
    const left = coord.col - 1;
    return coord.col - 1 >= 0 ? { row: coord.row, col: left } : null;
  }
}

export const solve = (input: ProcessedInput): number => {
  return part1Solution(input);
};

const part2Solution = (input: ProcessedInput): number => {
  return 0;
};

const part1Solution = (input: ProcessedInput): number => {
  // iterate over array item by item and check adjacent values where possible
  const basin = new SmokeBasin(input);
  let sum = 0;
  const numRows = input.length;
  const numCols = input[0]?.length;
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      const currPosition = { row: r, col: c };
      const currHeight = basin.getHeight(currPosition);
      const spotsToCheck = basin.getAdjacentSpots(currPosition);

      const isLocalMinimum =
        spotsToCheck.filter((s) => basin.getHeight(s) <= currHeight).length ===
        0;

      if (isLocalMinimum) {
        sum += 1 + currHeight;
      }
    }
  }
  return sum;
};

export const parseInput = (file: string): ProcessedInput => {
  return file
    .trimEnd()
    .split('\n')
    .map((row) => row.split('').map((num) => parseInt(num, 10)));
};

export const getSampleInput = (): ProcessedInput => {
  return [
    [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
    [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
    [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
    [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
    [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
  ];
};
