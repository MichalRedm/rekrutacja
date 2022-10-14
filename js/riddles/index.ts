const
    sol1 = <HTMLSpanElement>document.getElementById("sol1")!,
    sol2 = <HTMLSpanElement>document.getElementById("sol2")!;

sol1.innerText = String(reverseNumber(12345));

const tab = [1, 2, 3, 4, 5, 6, 7, 8, 9];
sol2.innerText = String(addEven(tab));

/**
 * Reverses a provided number.
 * 
 * @param n A positive integer.
 * @returns Provided number with digits in reverse order.
 */
 function reverseNumber(n: number): number {

    let result: number = 0,
        digit: number;
    
    while (n > 0) {
        digit = n % 10;
        result = 10 * result + digit;
        n = (n - digit) / 10;
    }

    return result;

}

/**
 * Calculates the sum of even elements of an array.
 * 
 * @param array An array of integers.
 * @returns Calculated sum.
 */
function addEven(array: number[]): number {

    let sum: number = 0;

    array.forEach(n => {
        if (n % 2 == 0) {
            sum += n;
        }
    });

    return sum;

}
