// 1 greater than specified in the problem because "0" is a valid counting day
// so an internal timer of "6" means 6 days plus the 0th, hence 7
const INTERNAL_TIMER_RESET_VALUE = 7;
const INTERNAL_TIMER_NEW_VALUE = 9;
const NUMBER_OF_DAYS = 256;

export const day6 = (input: Array<number>): number => {
    return part1Solution(input);
}

const part2Solution = (input: Array<number>): number => {
    return 2;
}

const part1Solution = (input: Array<number>): number => {
    const memo = new Array<Array<number>>();
    for (let i = 0; i <= INTERNAL_TIMER_NEW_VALUE+1; i++) {
        memo[i] = [];
        for (let j = 0; j <= NUMBER_OF_DAYS+1; j++) {
            memo[i].push(-1);
        }
    }
    return input.reduce((acc, curr) => acc + getProgeny(memo, curr, NUMBER_OF_DAYS), input.length);
}

const getProgeny = (memo: Array<Array<number>>, internalTimer:number, daysRemaining: number): number => {
    if (memo[internalTimer][daysRemaining] !== -1) {
        // console.log(internalTimer, daysRemaining, memo[internalTimer][daysRemaining])
        return memo[internalTimer][daysRemaining];
    }
    let count = 0;
    for (let i = daysRemaining - internalTimer; i > 0; i -= INTERNAL_TIMER_RESET_VALUE) {
        count += 1 + getProgeny(memo, INTERNAL_TIMER_NEW_VALUE, i);
    }
    memo[internalTimer][daysRemaining] = count;
    return count;
}




export const parseDay6Input = (file: string): Array<number> => {
    // trim new line off the end of the input file
    return file.trimEnd().split(",").map(e => parseInt(e, 10));
    
}