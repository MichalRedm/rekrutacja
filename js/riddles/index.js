"use strict";
const sol1 = document.getElementById("sol1"), sol2 = document.getElementById("sol2");
sol1.innerText = String(reverseNumber(12345));
const tab = [1, 2, 3, 4, 5, 6, 7, 8, 9];
sol2.innerText = String(addEven(tab));
function reverseNumber(n) {
    let result = 0, digit;
    while (n > 0) {
        digit = n % 10;
        result = 10 * result + digit;
        n = (n - digit) / 10;
    }
    return result;
}
function addEven(array) {
    let sum = 0;
    array.forEach(n => {
        if (n % 2 == 0) {
            sum += n;
        }
    });
    return sum;
}
