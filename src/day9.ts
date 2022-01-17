type ProcessedInput = Array<Array<number>>;
interface BasinCoordinate extends Coordinate {
  basinId: number;
  height: number;
}
interface Coordinate {
  row: number;
  col: number;
}
class SmokeBasin {
  static NULL_BASIN_ID: number = -1;
  static MAX_SMOKE_BASIN_HEIGHT: number = 9;

  input: ProcessedInput;
  basinMap: BasinCoordinate[][];
  basinCounters: number[];
  constructor(input: ProcessedInput) {
    this.input = input;
    this.basinMap = [];
    this.basinCounters = [];
    for (let r = 0; r < input.length; r++) {
      this.basinMap[r] = [];
      for (let c = 0; c < input[r].length; c++) {
        this.basinMap[r][c] = {
          basinId: SmokeBasin.NULL_BASIN_ID,
          height: input[r][c],
          row: r,
          col: c,
        };
      }
    }
  }

  getBasinCoord(coord: Coordinate): BasinCoordinate {
    return this.basinMap[coord.row][coord.col];
  }

  setBasinCoord(coord: BasinCoordinate): BasinCoordinate {
    return (this.basinMap[coord.row][coord.col] = coord);
  }

  incrementBasinCounter(basinId: number) {
    if (this.basinCounters[basinId] === undefined) {
      this.basinCounters[basinId] = 1;
    } else {
      this.basinCounters[basinId]++;
    }
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
  return part2Solution(input);
};

const buildBasin = (
  basin: SmokeBasin,
  currPosition: BasinCoordinate,
  basinId: number
): boolean => {
  // skip invalid or seen positions
  if (
    currPosition.basinId !== SmokeBasin.NULL_BASIN_ID ||
    currPosition.height === SmokeBasin.MAX_SMOKE_BASIN_HEIGHT
  ) {
    // return false so we know we shouldn't increment the basinId
    return false;
  }

  // mark this position with its basin Id (aka seen)
  currPosition.basinId = basinId;
  basin.setBasinCoord(currPosition);
  basin.incrementBasinCounter(basinId);

  // get adjacent spots && recursively build basin
  basin
    .getAdjacentSpots(currPosition)
    .map((s) => basin.getBasinCoord(s))
    .forEach((bc) => {
      // we don't care about the return value here because
      // only the first invocation for a given basin is relevant
      buildBasin(basin, bc, basinId);
    });
  // return true so we know we should increment the basinId
  return true;
};

const part2Solution = (input: ProcessedInput): number => {
  // iterate over array item by item and check adjacent values where possible
  const basin = new SmokeBasin(input);
  let basinId = 0;
  const numRows = input.length;
  const numCols = input[0]?.length;
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      const currPosition = basin.getBasinCoord({ row: r, col: c });
      if (buildBasin(basin, currPosition, basinId)) {
        // because we're doing recursive searching, we know all nearby spots have been seen
        // for a given basinId, thus basinId can be incremented
        basinId++;
      }
    }
  }

  return basin.basinCounters
    .sort((a, b) => b - a) // sort basin counters in descending order
    .slice(0, 3) // take the first three
    .reduce((acc, curr) => acc * curr, 1); // multiply them together
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
