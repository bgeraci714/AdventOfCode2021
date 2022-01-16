export const day3 = (input: Array<string>): number => {
    const maxNumber = findNumberWithCountComparitor(input.slice(0), (count, size) => {
        if ( count === Math.floor(size / 2)) {
            return "1"
        } else if (count === size) {
            return "1"
        } else if (count === 0) {
            return "0"
        } else if (count > Math.floor(size / 2)) {
            return "1"
        } else {
            return "0"
        }
    });

    const minNumber = findNumberWithCountComparitor(input.slice(0), (count, size) => {
        if ( count === Math.floor(size / 2)) {
            return "0"
        } else if (count === size) {
            return "0"
        } else if (count === 0) {
            return "1"
        } else if (count > Math.floor(size / 2)) {
            return "0"
        } else {
            return "1"
        }
    });

    return maxNumber * minNumber;
}

const findNumberWithCountComparitor = (input: Array<string>, comparitorCallback: (count: number, size: number) => string): number => {
    let pattern = "";
    let mutatedInput = input; 
    
    for (let i = 0; i < mutatedInput[0].length; i++) {
        let count = 0;
        mutatedInput.forEach(val => {
            count += +val.charAt(i);
        });
        pattern += comparitorCallback(count, mutatedInput.length);
        mutatedInput = mutatedInput.filter(val => val.startsWith(pattern));
        
        // exit loop if there's only one item in the list
        if (mutatedInput.length === 1) {
            i = input.length;
        }
    }
    return parseInt(mutatedInput[0], 2);
}

export const parseDay3Input = (file: string): Array<string> => {
    return file.split("\n");
}