export const solve = (input: Array<number>): number => {
    return part2Solution(input);
}

const part2Solution = (input: Array<number>): number => {
    if (input.length <= 0) {
        return 0;
    }
    // iterate over list once to find min and max 
    let [min, max] = [input[0], input[0]];
    for (let i = 0; i < input.length; i++) {
        if (input[i] < min) {
            min = input[i];
        } else if (input[i] > max) {
            max = input[i];
        }
    }

    const distanceSolutions = Array<number>();

    // iterate from min to max value 
    let minPosition = min;
    let minDistance = Infinity;  
    for (let i = min; i <= max; i++) {
        let currDistance = 0; 
        for (let j = 0; j < input.length; j++) {
            currDistance += getDistance(i, input[j], distanceSolutions);
        }
        if (currDistance < minDistance) {
            minPosition = i; 
            minDistance = currDistance;
        }
    }
    return minDistance;
}

const getDistance= (position: number, submarineLocation: number, solutions:Array<number>) => {
    const distance = (Math.max(position, submarineLocation) - Math.min(position, submarineLocation));
    if (solutions[distance] !== undefined) {
        return solutions[distance];
    }
    let sum = 0;
    for (let i = 1; i <= distance; i++) {
        sum += i; 
    }
    solutions[distance] = sum;
    return sum;
    
}

const part1Solution = (input: Array<number>): number => {
    if (input.length <= 0) {
        return 0;
    }
    // iterate over list once to find min and max 
    let [min, max] = [input[0], input[0]];
    for (let i = 0; i < input.length; i++) {
        if (input[i] < min) {
            min = input[i];
        } else if (input[i] > max) {
            max = input[i];
        }
    }

    // iterate from min to max value 
    let minPosition = min;
    let minDistance = Infinity;  
    for (let i = min; i <= max; i++) {
        let currDistance = 0; 
        for (let j = 0; j < input.length; j++) {
            currDistance += (Math.max(i, input[j]) - Math.min(i, input[j]));
        }
        if (currDistance < minDistance) {
            minPosition = i; 
            minDistance = currDistance;
        }
    }
    return minDistance;
}



export const parseInput = (file: string): Array<number> => {
    // trim new line off the end of the input file
    return file.trimEnd().split(",").map(e => parseInt(e, 10));
    
}