type ProcessedInput = Array<Entry>;
type Entry = {
  signals: Array<string>;
  digits: Array<string>;
};

const DIGIT_MAPPING = {
  abcefg: '0',
  cf: '1',
  acdeg: '2',
  acdfg: '3',
  bcdf: '4',
  abdfg: '5',
  abdefg: '6',
  acf: '7',
  abcdefg: '8',
  abcdfg: '9',
};

export const solve = (input: ProcessedInput): number => {
  return part2Solution(input);
};

const part2Solution = (input: ProcessedInput): number => {
  let sum = 0;
  input.forEach((entry) => {
    const signalMapping: Map<string, string> = new Map();
    const seven: string = entry.signals.find((s) => s.length === 3);
    const one: string = entry.signals.find((s) => s.length === 2);
    const four: string = entry.signals.find((s) => s.length === 4);
    // const eight: string = entry.signals.find((s) => s.length === 7);
    const sixSignals: Array<string> = entry.signals
      .filter((s) => s.length === 6)
      .map((s) => {
        return s
          .split('')
          .filter(
            (s) => !(four.split('').includes(s) || seven.split('').includes(s))
          )
          .join('');
      });

    const g: string = sixSignals.find((s) => s.length === 1);
    signalMapping.set('g', g);

    const e: string = sixSignals
      .find((s) => s.length === 2)
      .split('')
      .find((segment) => segment !== g);
    signalMapping.set('e', e);

    const a: string = seven
      .split('')
      .filter((s) => !one.split('').includes(s))
      .join();
    signalMapping.set('a', a);

    const fiveSignals: Array<string> = entry.signals
      .filter((s) => s.length === 5)
      .map((s) => {
        return s
          .split('')
          .filter(
            (s) =>
              !(
                seven.split('').includes(s) ||
                s === signalMapping.get('e') ||
                s === signalMapping.get('g')
              )
          )
          .join('');
      });

    const d: string = fiveSignals.find((s) => s.length === 1);
    signalMapping.set('d', d);
    const b: string = fiveSignals
      .find((s) => s.length === 2)
      .split('')
      .find((s) => s !== signalMapping.get('d'));

    signalMapping.set('b', b);
    const f: string = entry.signals
      .filter((s) => s.length === 5)
      .find(
        (s) =>
          s.includes(signalMapping.get('a')) &&
          s.includes(signalMapping.get('b')) &&
          s.includes(signalMapping.get('d')) &&
          s.includes(signalMapping.get('g'))
      )
      .replace(signalMapping.get('a'), '')
      .replace(signalMapping.get('b'), '')
      .replace(signalMapping.get('d'), '')
      .replace(signalMapping.get('g'), '');
    signalMapping.set('f', f);

    const c: string = one.replace(signalMapping.get('f'), '');
    signalMapping.set('c', c);
    // signal mapping is now complete

    // need the reverse mapping to convert from scrambled to unscrambled
    const reverseMapping: Map<string, string> = new Map();
    signalMapping.forEach((value, key) => {
      reverseMapping.set(value, key);
    });

    // iterate over digits and convert values
    const unscrambledDigits: Array<string> = entry.digits.map((d) =>
      d
        .split('')
        .map((s) => reverseMapping.get(s))
        .sort(comparitor)
        .join('')
    );

    // convert them to digits
    const numericDigit: string = unscrambledDigits
      .map((digit) => DIGIT_MAPPING[digit])
      .join('');

    // console.log(numericDigit);
    const value = parseInt(numericDigit, 10);

    // add to sum
    sum += value;
  });

  return sum;
};

const part1Solution = (input: ProcessedInput): number => {
  const lengthOfKnownDigits = [2, 3, 4, 7];
  return input.reduce((acc, curr) => {
    return (
      acc +
      curr.digits?.reduce((count, digit) => {
        return count + (lengthOfKnownDigits.includes(digit.length) ? 1 : 0);
      }, 0)
    );
  }, 0);
};

export const parseInput = (file: string): ProcessedInput => {
  // trim new line off the end of the input file
  return file
    .trimEnd()
    .split('\n')
    .map((row) => {
      // it's important to sort the values because we want to be able to easily compare signals and digits
      const [signals, digits] = row
        .split(' | ') // break up file input into signals and digits
        .map((e) => e.split(' ')) // split into individual signals/digit entries
        .map((s) => s.flatMap(alphabetizeSignals)); // alphabetize individual signals for matching

      return {
        signals,
        digits,
      };
    });
};

const alphabetizeSignals = (signal: string) =>
  signal.split('').sort(comparitor).join('');

const comparitor = (a: string, b: string) => ('' + a).localeCompare(b);

export const getSampleInput = (): ProcessedInput => {
  return [
    {
      signals: [
        'abcdefg',
        'bcdef',
        'acdfg',
        'abcdf',
        'abd',
        'abcdef',
        'bcdefg',
        'abef',
        'abcdeg',
        'ab',
      ],
      digits: ['bcdef', 'abcdf', 'bcdef', 'abcdf'],
    },
  ];
};
