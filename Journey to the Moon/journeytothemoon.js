'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', () => {
    inputString = inputString.trim().split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function journeyToMoon(n, astronaut) {
    // Build adjacency list for astronauts from same country
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of astronaut) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // DFS to find size of each connected component (country)
    const visited = Array(n).fill(false);
    const countries = [];

    function dfs(node) {
        visited[node] = true;
        let size = 1;
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) {
                size += dfs(neighbor);
            }
        }
        return size;
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            countries.push(dfs(i));
        }
    }

    // Count valid pairs from different countries
    let total = 0;
    let sum = 0;
    for (const size of countries) {
        total += sum * size;
        sum += size;
    }

    return total;
}

function main() {
    const firstMultipleInput = readLine().trim().split(' ');
    const n = parseInt(firstMultipleInput[0], 10);
    const p = parseInt(firstMultipleInput[1], 10);

    const astronaut = Array(p);
    for (let i = 0; i < p; i++) {
        astronaut[i] = readLine().trim().split(' ').map(Number);
    }

    const result = journeyToMoon(n, astronaut);
    console.log(result);
}
