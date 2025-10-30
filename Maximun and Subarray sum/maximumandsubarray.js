'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => inputString += inputStdin);
process.stdin.on('end', () => { inputString = inputString.split('\n'); main(); });

function readLine() {
    return inputString[currentLine++];
}

// Binary search: find index of smallest number in sortedArr > target
function upperBound(sortedArr, target) {
    let left = 0, right = sortedArr.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (sortedArr[mid] > target) right = mid;
        else left = mid + 1;
    }
    return left < sortedArr.length ? left : null;
}

function maximumSum(a, m) {
    const prefix = [];
    let curr = 0;
    let maxMod = 0;
    const sorted = [];

    for (let num of a) {
        curr = (curr + num % m + m) % m; // handle negative numbers
        maxMod = Math.max(maxMod, curr);

        const ubIndex = upperBound(sorted, curr);
        if (ubIndex !== null) {
            const nextPrefix = sorted[ubIndex];
            maxMod = Math.max(maxMod, (curr - nextPrefix + m) % m);
        }

        // Insert curr into sorted array at correct position
        let pos = upperBound(sorted, curr - 1);
        if (pos === null) pos = sorted.length;
        sorted.splice(pos, 0, curr);
    }

    return maxMod;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || '/dev/stdout');

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const [n, m] = readLine().replace(/\s+$/g, '').split(' ').map(Number);
        const a = readLine().replace(/\s+$/g, '').split(' ').map(Number);

        const result = maximumSum(a, m);
        ws.write(result + '\n');
    }

    ws.end();
}
