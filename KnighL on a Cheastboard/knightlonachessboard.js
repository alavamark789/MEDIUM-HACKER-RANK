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

function knightlOnAChessboard(n) {
    const result = Array.from({ length: n - 1 }, () => Array(n - 1).fill(-1));

    function bfs(a, b) {
        const visited = Array.from({ length: n }, () => Array(n).fill(false));
        const queue = [[0, 0, 0]]; // [x, y, moves]
        visited[0][0] = true;

        const dirs = [
            [a, b], [a, -b], [-a, b], [-a, -b],
            [b, a], [b, -a], [-b, a], [-b, -a]
        ];

        while (queue.length > 0) {
            const [x, y, moves] = queue.shift();
            if (x === n - 1 && y === n - 1) return moves;

            for (let [dx, dy] of dirs) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny]) {
                    visited[nx][ny] = true;
                    queue.push([nx, ny, moves + 1]);
                }
            }
        }

        return -1; // unreachable
    }

    for (let a = 1; a < n; a++) {
        for (let b = 1; b < n; b++) {
            result[a - 1][b - 1] = bfs(a, b);
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH || '/dev/stdout');
    const n = parseInt(readLine().trim(), 10);
    const result = knightlOnAChessboard(n);
    ws.write(result.map(x => x.join(' ')).join('\n') + '\n');
    ws.end();
}
