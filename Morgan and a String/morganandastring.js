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

function morganAndString(a, b) {
    let i = 0, j = 0;
    let result = '';
    while (i < a.length || j < b.length) {
        if (i === a.length) {
            result += b[j++];
        } else if (j === b.length) {
            result += a[i++];
        } else if (a.slice(i) < b.slice(j)) {
            result += a[i++];
        } else {
            result += b[j++];
        }
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine().trim(), 10);
    for (let tItr = 0; tItr < t; tItr++) {
        const a = readLine();
        const b = readLine();
        const result = morganAndString(a, b);
        ws.write(result + '\n');
    }
    ws.end();
}
