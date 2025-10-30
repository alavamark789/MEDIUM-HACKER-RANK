'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function missingNumbers(arr, brr) {
    const countArr = new Map();
    const countBrr = new Map();

    // Count frequencies in arr
    for (let num of arr) {
        countArr.set(num, (countArr.get(num) || 0) + 1);
    }

    // Count frequencies in brr
    for (let num of brr) {
        countBrr.set(num, (countBrr.get(num) || 0) + 1);
    }

    const missing = [];

    for (let [num, freq] of countBrr.entries()) {
        if (!countArr.has(num) || countArr.get(num) < freq) {
            missing.push(num);
        }
    }

    return missing.sort((a, b) => a - b);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || '/dev/stdout');

    const n = parseInt(readLine().trim(), 10);
    const arr = readLine().replace(/\s+$/g, '').split(' ').map(Number);
    const m = parseInt(readLine().trim(), 10);
    const brr = readLine().replace(/\s+$/g, '').split(' ').map(Number);

    const result = missingNumbers(arr, brr);
    ws.write(result.join(' ') + '\n');
    ws.end();
}
x