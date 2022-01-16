export const day5 = (input: Array<Line>): number => {
    return part2Solution(input);
}

const part2Solution = (input: Array<Line>): number => {
    // create a Map of string to number 
    // where string will be a specific coordinate (x,y) and the number is how many times traversed
    const seen = new Map<string, number>();
    let overlappedPoints = 0;

    // iterate over each line, if vertical or horizontal, walk the line ;)
    input.forEach(line => {
        if (isVertical(line)) {
            const {y1, y2} = line;  
            const [start, end] = y1 > y2 ? [y2, y1] : [y1, y2];
            for (let y = start; y <= end; y++) {
                const point = `${line.x1},${y}`;
                const count = seen.has(point) ? seen.get(point)+1 : 1;
                seen.set(point, count)
                if (count == 2) {
                    overlappedPoints++;
                }
            }
        } else if (isHorizontal(line)) {
            const {x1, x2} = line;  
            const [start, end] = x1 > x2 ? [x2, x1] : [x1, x2];
            for (let x = start; x <= end; x++) {
                const point = `${x},${line.y1}`;
                const count = seen.has(point) ? seen.get(point)+1 : 1;
                seen.set(point, count)
                if (count == 2) {
                    overlappedPoints++;
                }
            }
        } else if (isDiagonal(line)) {
            const {x1, x2, y1, y2} = line;
            const [startX, endX] = x1 > x2 ? [x2, x1] : [x1, x2];
            // y = mx + b 
            const m = (y2-y1)/(x2-x1);
            const b = y1 - m * x1; 

            for (let x = startX; x <= endX; x++) {
                const y = m * x + b;
                const point = `${x},${y}`;
                const count = seen.has(point) ? seen.get(point)+1 : 1;
                seen.set(point, count)
                if (count == 2) {
                    overlappedPoints++;
                }
            }
        }
    })

    // add coordinate to Map, increment counter if spot has already been walked, , increment counter if second time
    return overlappedPoints;
    
}

const part1Solution = (input: Array<Line>): number => {
    // create a Map of string to number 
    // where string will be a specific coordinate (x,y) and the number is how many times traversed
    const seen = new Map<string, number>();
    let overlappedPoints = 0;

    // iterate over each line, if vertical or horizontal, walk the line ;)
    input.forEach(line => {
        if (isVertical(line)) {
            const {y1, y2} = line;  
            const [start, end] = y1 > y2 ? [y2, y1] : [y1, y2];
            for (let y = start; y <= end; y++) {
                const point = `${line.x1},${y}`;
                const count = seen.has(point) ? seen.get(point)+1 : 1;
                seen.set(point, count)
                if (count == 2) {
                    overlappedPoints++;
                }
            }
        } else if (isHorizontal(line)) {
            const {x1, x2} = line;  
            const [start, end] = x1 > x2 ? [x2, x1] : [x1, x2];
            for (let x = start; x <= end; x++) {
                const point = `${x},${line.y1}`;
                const count = seen.has(point) ? seen.get(point)+1 : 1;
                seen.set(point, count)
                if (count == 2) {
                    overlappedPoints++;
                }
            }
        } 
    })

    // add coordinate to Map, increment counter if spot has already been walked, , increment counter if second time
    return overlappedPoints;
}

const isDiagonal = (line: Line): boolean => {
    const {x1, x2, y1, y2} = line;
    const [diffX, diffY] = [x2-x1, y2-y1];
    return Math.pow(diffY / diffX, 2) === 1;
}

const isVertical = (line: Line): boolean => {
    const {x1, x2} = line;  
    return x1 === x2;
}

const isHorizontal = (line: Line): boolean => {
    const {y1, y2} = line;  
    return y1 === y2;
}

interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export const parseDay5Input = (file: string): Array<Line> => {
    // trim new line off the end of the input file
    return file.trimEnd().split("\n").map(entry => {
        const coords = entry.split(" -> ");
        const [x1, y1] = coords[0].split(",").map(e => parseInt(e, 10))
        const [x2, y2] = coords[1].split(",").map(e => parseInt(e, 10))
        return {x1, y1, x2, y2};
    });
    
}