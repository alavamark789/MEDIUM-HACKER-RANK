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

function gridlandMetro(n, m, k, track) {
    let tracksByRow = new Map();

    for (let [r, c1, c2] of track) {
        if (!tracksByRow.has(r)) tracksByRow.set(r, []);
        tracksByRow.get(r).push([c1, c2]);
    }

    let occupied = 0;

    for (let [row, segments] of tracksByRow) {
        segments.sort((a, b) => a[0] - b[0]);
        let merged = [];
        for (let [start, end] of segments) {
            if (merged.length === 0 || merged[merged.length - 1][1] < start - 1) {
                merged.push([start, end]);
            } else {
                merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
            }
        }
        for (let [start, end] of merged) occupied += end - start + 1;
    }

    return n * m - occupied;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || '/dev/stdout');

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);
    const k = parseInt(firstMultipleInput[2], 10);

    let track = Array(k);
    for (let i = 0; i < k; i++) {
        track[i] = readLine().replace(/\s+$/g, '').split(' ').map(Number);
    }

    const result = gridlandMetro(n, m, k, track);
    ws.write(result + '\n');
    ws.end();
}
