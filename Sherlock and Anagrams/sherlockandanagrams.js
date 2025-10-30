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

function sherlockAndAnagrams(s) {
    let map = new Map();
    let count = 0;
    for (let len = 1; len <= s.length; len++) {
        for (let i = 0; i <= s.length - len; i++) {
            let sub = s.slice(i, i + len).split('').sort().join('');
            map.set(sub, (map.get(sub) || 0) + 1);
        }
    }
    for (let freq of map.values()) {
        if (freq > 1) count += (freq * (freq - 1)) / 2;
    }
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const q = parseInt(readLine().trim(), 10);
    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();
        const result = sherlockAndAnagrams(s);
        ws.write(result + '\n');
    }
    ws.end();
}
