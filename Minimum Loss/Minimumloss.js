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

function minimumLoss(price) {
    // Store each price with its original index (year)
    const arr = price.map((p, idx) => [p, idx]);

    // Sort by price ascending
    arr.sort((a, b) => a[0] - b[0]);

    let minLoss = Infinity;

    for (let i = 1; i < arr.length; i++) {
        const [p1, idx1] = arr[i - 1];
        const [p2, idx2] = arr[i];

        // Only valid if higher price bought before lower price
        if (idx1 > idx2) {
            minLoss = Math.min(minLoss, p2 - p1);
        }
    }

    return minLoss;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || '/dev/stdout');

    const n = parseInt(readLine().trim(), 10);
    const price = readLine().replace(/\s+$/g, '').split(' ').map(Number);

    const result = minimumLoss(price);
    ws.write(result + '\n');
    ws.end();
}
