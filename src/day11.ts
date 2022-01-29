type ProcessedInput = InputItem[][];

interface Coordinate {
  row: number;
  col: number;
}

type InputItem = Octopus;

type Octopus = {
  energyLevel: number;
  hasFlashedThisRound: boolean;
  neighbors: Octopus[];
};

export const solve = (input: ProcessedInput): number => {
  return part2Solution(input);
};

const part2Solution = (input: ProcessedInput): number => {
  const numOctopuses = input.length * input[0].length;
  for (let step = 1; true; step++) {
    let count = 0;
    iterateOver2dInput(input, (item) => {
      item.energyLevel++;
    });

    // iterate and perform the flashes for octopuses that have an energy above 9
    iterateOver2dInput(input, (item) => {
      count += recursiveFlash(item);
    });

    // every octopus flashed in this round!
    if (count === numOctopuses) {
      return step;
    }

    // loop around and reset
    iterateOver2dInput(input, (item) => {
      const { energyLevel, hasFlashedThisRound } = item;
      item.energyLevel = hasFlashedThisRound ? 0 : energyLevel;
      item.hasFlashedThisRound = false;
    });
  }
  return -1;
};

// const iterateOverInput = (input: ProcessedInput, callback(item: Octopus, row: number, col: number, input))

const part1Solution = (input: ProcessedInput): number => {
  let count = 0;
  const NUM_STEPS = 100;
  for (let step = 1; step < NUM_STEPS + 1; step++) {
    iterateOver2dInput(input, (item) => {
      item.energyLevel++;
    });

    // iterate and perform the flashes for octopuses that have an energy above 9
    iterateOver2dInput(input, (item) => {
      count += recursiveFlash(item);
    });

    // loop around and reset
    iterateOver2dInput(input, (item) => {
      const { energyLevel, hasFlashedThisRound } = item;
      item.energyLevel = hasFlashedThisRound ? 0 : energyLevel;
      item.hasFlashedThisRound = false;
    });
  }
  return count;
};

export const parseInput = (file: string): ProcessedInput => {
  const input = file
    .trimEnd()
    .split('\n')
    .map((row) =>
      row.split('').map((energyLevel) => ({
        energyLevel: parseInt(energyLevel, 10),
        hasFlashedThisRound: false,
        neighbors: [],
      }))
    );

  iterateOver2dInput(input, (item, row, col) => {
    item.neighbors = getNeighbors(input, { row, col });
  });
  return input;
};

const recursiveFlash = (item: Octopus): number => {
  let count = 0;
  if (item.hasFlashedThisRound) {
    // has already flashed, don't add to the count
    return count;
  }
  if (item.energyLevel > 9) {
    // hasn't flashed and energy level is over 9, FLASH!
    item.hasFlashedThisRound = true;
    count++;

    // recursively flash neighbors and add to count
    item.neighbors.forEach((neighbor) => {
      neighbor.energyLevel++;
      count += recursiveFlash(neighbor);
    });
  }
  return count;
};

const iterateOver2dInput = (
  input: ProcessedInput,
  callback: (item: InputItem, row?: number, col?: number) => void
) => {
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const curr = input[row][col];
      callback(curr, row, col);
    }
  }
};

const getNeighbors = (input: ProcessedInput, coord: Coordinate): Octopus[] => {
  return getAdjacentSpots(input, coord).map(({ row, col }) => input[row][col]);
};

const getAdjacentSpots = (
  input: ProcessedInput,
  coord: Coordinate
): Array<Coordinate> => {
  return [
    getSpotUp(input, coord),
    getSpotDown(input, coord),
    getSpotLeft(input, coord),
    getSpotRight(input, coord),
    getSpotLeftUp(input, coord),
    getSpotLeftDown(input, coord),
    getSpotRightUp(input, coord),
    getSpotRightDown(input, coord),
  ].filter((c) => c !== null);
};

const getSpotUp = (
  input: ProcessedInput,
  coord: Coordinate
): Coordinate | null => {
  const up = coord.row - 1;
  return up >= 0 ? { row: up, col: coord.col } : null;
};

const getSpotDown = (
  input: ProcessedInput,
  coord: Coordinate
): Coordinate | null => {
  const down = coord.row + 1;
  return down < input.length ? { row: down, col: coord.col } : null;
};

const getSpotRight = (
  input: ProcessedInput,
  coord: Coordinate
): Coordinate | null => {
  const right = coord.col + 1;
  return right < input[0].length ? { row: coord.row, col: right } : null;
};

const getSpotLeft = (
  input: ProcessedInput,
  coord: Coordinate
): Coordinate | null => {
  const left = coord.col - 1;
  return coord.col - 1 >= 0 ? { row: coord.row, col: left } : null;
};

const getSpotLeftUp = (
  input: ProcessedInput,
  coord: Coordinate
): Coordinate | null => {
  const left = coord.col - 1;
  const up = coord.row - 1;
  return left >= 0 && up >= 0 ? { row: up, col: left } : null;
};

const getSpotLeftDown = (
  input: ProcessedInput,
  coord: Coordinate
): Coordinate | null => {
  const left = coord.col - 1;
  const down = coord.row + 1;
  return left >= 0 && down < input.length ? { row: down, col: left } : null;
};

const getSpotRightUp = (
  input: ProcessedInput,
  coord: Coordinate
): Coordinate | null => {
  const right = coord.col + 1;
  const up = coord.row - 1;
  return right < input[0].length && up >= 0 ? { row: up, col: right } : null;
};

const getSpotRightDown = (
  input: ProcessedInput,
  coord: Coordinate
): Coordinate | null => {
  const right = coord.col + 1;
  const down = coord.row + 1;
  return right < input[0].length && down < input.length
    ? { row: down, col: right }
    : null;
};
