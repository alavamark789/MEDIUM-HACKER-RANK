'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => inputString += inputStdin);
process.stdin.on('end', () => {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function main() {
    const [n] = readLine().trim().split(' ').map(Number);
    const arr = readLine().trim().split(' ').map(Number);

    const lisLength = Array(n).fill(1);
    const paths = Array(n).fill(0).map(() => []);

    for (let i = 0; i < n; i++) {
        paths[i].push([arr[i]]);
        for (let j = 0; j < i; j++) {
            if (arr[i] > arr[j]) {
                if (lisLength[j] + 1 > lisLength[i]) {
                    lisLength[i] = lisLength[j] + 1;
                    paths[i] = paths[j].map(p => [...p, arr[i]]);
                } else if (lisLength[j] + 1 === lisLength[i]) {
                    paths[i].push(...paths[j].map(p => [...p, arr[i]]));
                }
            }
        }
    }

    const maxLen = Math.max(...lisLength);
    let allLIS = [];
    for (let i = 0; i < n; i++) {
        if (lisLength[i] === maxLen) {
            allLIS.push(...paths[i]);
        }
    }

    const uniqueLIS = Array.from(new Set(allLIS.map(x => x.join(','))))
                           .map(x => x.split(',').map(Number));

    uniqueLIS.sort((a, b) => {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return b[i] - a[i];
        }
        return 0;
    });

    console.log(uniqueLIS[0].join(' '));
}
