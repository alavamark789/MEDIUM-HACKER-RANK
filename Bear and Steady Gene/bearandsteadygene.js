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

function steadyGene(gene) {
    const n = gene.length;
    const target = n / 4;
    const count = {A:0, C:0, G:0, T:0};
    for (let ch of gene) count[ch]++;

    if (Object.values(count).every(c => c <= target)) return 0;

    let left = 0, minLen = n;
    for (let right = 0; right < n; right++) {
        count[gene[right]]--;
        while (left <= right && Object.values(count).every(c => c <= target)) {
            minLen = Math.min(minLen, right - left + 1);
            count[gene[left]]++;
            left++;
        }
    }

    return minLen;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const n = parseInt(readLine().trim(), 10);
    const gene = readLine();
    const result = steadyGene(gene);
    ws.write(result + '\n');
    ws.end();
}
