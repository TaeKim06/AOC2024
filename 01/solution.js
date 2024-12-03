const part_one = function(){
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
}

const part_two = function(){
    const fs = require('fs');
    const path = require('path');

    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim();

    // Joining paths
    const filePath = path.join(__dirname, 'input.txt');
    console.log(filePath); // Outputs a platform-specific path


    const lines = input.split('\n');
    let left_arr = [];
    let right_arr = []; 
    const map = new Map();

    for (let i = 0; i < lines.length; i++){
        let values = lines[i].split(/\s+/);
        left_arr[i] = values[0];
        
        if(map.has(values[1])){
            let new_value = map.get(values[1]) + 1;
            map.set(values[1], new_value);
        }
        else{
            map.set(values[1], 1);
        }
    }
    let result = 0;
    for (let i = 0; i < left_arr.length; i++){
        if(map.has(left_arr[i])){
            result += left_arr[i] * map.get(left_arr[i]);
        }
    }

    console.log(result);
}

part_one();
part_two();