'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', () => {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function balancedSums(arr) {
    const total = arr.reduce((a, b) => a + b, 0);
    let leftSum = 0;

    for (let num of arr) {
        if (leftSum === total - leftSum - num) {
            return "YES";
        }
        leftSum += num;
    }

    return "NO";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || '/dev/stdout');

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine().trim(), 10);
        const arr = readLine().replace(/\s+$/g, '').split(' ').map(Number);
        const result = balancedSums(arr);
        ws.write(result + '\n');
    }

    ws.end();
}
