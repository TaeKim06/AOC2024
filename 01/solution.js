const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim();

// Joining paths
const filePath = path.join(__dirname, 'input.txt');
console.log(filePath); // Outputs a platform-specific path


const lines = input.split('\n');
let left_arr = [];
let right_arr = []; 

for (let i = 0; i < lines.length; i++){
    let values = lines[i].split(/\s+/);
    left_arr[i] = values[0];
    right_arr[i] = values[1];
}

left_arr.sort((a, b) => a - b);
right_arr.sort((a, b) => a - b);

let result = 0;
for (let i = 0; i < left_arr.length; i++){
    result += Math.abs(parseInt(left_arr[i]) - parseInt(right_arr[i]))
}

console.log(`Day 1 Solution: ${result}`);