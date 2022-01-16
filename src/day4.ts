export const day4 = (input: BingoInput): number => {
    return part2Solution(input);
}

const part2Solution = (input: BingoInput): number => {
    // found will be a mapping of 
    // BingoCardId to rows and cols 
    const found = input.foundEntries;
    let winners = new Set<number>();
    let solutions = [];
    input.bingoNumbers.forEach(calledNum => {
        input.cardReverseIndex.get(calledNum).forEach(entry => {
            const calledEntries = found.get(entry.cardId);
            calledEntries.rows.push(entry.row);
            calledEntries.cols.push(entry.col);
            const index = calledEntries.unfoundNumbers.indexOf(calledNum);
            if (index !== -1) {
                calledEntries.unfoundNumbers[index] = 0;
            }
        
            // check if there's a winner by adding up rows and columns
            const matchingRowsCount = calledEntries.rows.reduce((n, x) => n + (x === entry.row ? 1 : 0), 0)
            const matchingColsCount = calledEntries.cols.reduce((n, x) => n + (x === entry.col ? 1 : 0), 0)
            
            if ((matchingRowsCount === 5 || matchingColsCount === 5) && !winners.has(entry.cardId)) {
                winners.add(entry.cardId);
                // SOLUTION = sum of all unmarked numbers on the board then multiply by the number that was just called
                solutions.push(calledEntries.unfoundNumbers.reduce((acc, curr) => acc + curr, 0) * calledNum);
            }
            found.set(entry.cardId, calledEntries);
        });
    })
    return solutions.pop();
}

const part1Solution = (input: BingoInput): number => {
    // found will be a mapping of 
    // BingoCardId to rows and cols 
    const found = input.foundEntries;
    let cardId = -1;
    let solution = -1;
    input.bingoNumbers.some(calledNum => {
        input.cardReverseIndex.get(calledNum).some(entry => {
            const calledEntries = found.get(entry.cardId);
            calledEntries.rows.push(entry.row);
            calledEntries.cols.push(entry.col);
            const index = calledEntries.unfoundNumbers.indexOf(calledNum);
            if (index !== -1) {
                calledEntries.unfoundNumbers[index] = 0;
            }
        

            // check if there's a winner
            const matchingRowsCount = calledEntries.rows.reduce((n, x) => n + (x === entry.row ? 1 : 0), 0)
            const matchingColsCount = calledEntries.cols.reduce((n, x) => n + (x === entry.col ? 1 : 0), 0)
            
            if (matchingRowsCount === 5 || matchingColsCount === 5) {
                cardId = entry.cardId;
                // SOLUTION = sum of all unmarked numbers on the board then multiply by the number that was just called
                solution = calledEntries.unfoundNumbers.reduce((acc, curr) => acc + curr, 0) * calledNum;
            }
            found.set(entry.cardId, calledEntries);
            return cardId !== -1;
        });
        return cardId !== -1;
    })
    return solution;
}

interface FoundEntries {
    rows: Array<number>;
    cols: Array<number>;
    foundNumbers: Array<number>;
    unfoundNumbers: Array<number>;
}

interface BingoEntry {
    bingoNum: number;
    cardId: number;
    row: number;
    col: number;
}

export const parseDay4Input = (file: string): BingoInput => {
    const parsedFile = file.split("\n\n");
    
    // format = first entry is bingo numbers
    // the rest of the entries are individual bingo cards newline delimited
    const bingoNumbers = parsedFile[0].split(",").map(e => parseInt(e, 10));
    const bingoEntries = new Map<number, Array<BingoEntry>>();
    const found = new Map<number, FoundEntries>();

    parsedFile.slice(1)
        .forEach((card, cardId) => card.split("\n") // split card up into rows
            .forEach((row, rowIndex) => { // split row in columns 
                // initialize foundEntries datastructure
                const foundEntry = found.has(cardId) ? found.get(cardId) : {cols: [], rows:[], foundNumbers: [], unfoundNumbers: []};

                row.split(" ").filter(val => val !== "").forEach((bingoNum, colIndex) => {  // with column and row index, build BingoEntry
                    const bingoVal = parseInt(bingoNum, 10)
                    foundEntry.unfoundNumbers.push(bingoVal);
                    if (bingoVal == NaN) {
                        console.error(`Got NaN value for cardId: ${cardId}, row: ${row}`)
                    }

                    const entry = {
                        bingoNum: bingoVal,
                        cardId,
                        row: rowIndex, 
                        col: colIndex
                    };

                    const valEntries = bingoEntries.has(bingoVal) ? bingoEntries.get(bingoVal) : new Array<BingoEntry>();
                    valEntries.push(entry);
                    bingoEntries.set(bingoVal, valEntries);
                    found.set(cardId, foundEntry);
            })
        }));
    return new BingoInput(bingoNumbers, bingoEntries, found)
}

class BingoInput {
    bingoNumbers: Array<number>;
    cardReverseIndex: Map<number, Array<BingoEntry>>;
    foundEntries: Map<number, FoundEntries>;

    constructor(bingoNumbers: Array<number>, bingoEntries: Map<number, Array<BingoEntry>>, foundEntries: Map<number, FoundEntries>) {
        this.bingoNumbers = bingoNumbers;
        this.cardReverseIndex = bingoEntries;
        this.foundEntries = foundEntries;
    }

}