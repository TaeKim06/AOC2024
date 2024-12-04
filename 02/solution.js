function inc(values) {
    // Increasing Function Implemented Iteratively
    for (let i = 0; i < values.length - 1; i++) {
        let curr = values[i];
        let next = values[i + 1];

        if (!(curr < next && next - curr <= 3 && next - curr >= 1)) {
            return false;
        }
    }
    return true;
}

function dec(values, index = 0) {
    // Decreasing function Implemented Recursively
    if (index >= values.length - 1){
        return true;
    }

    let curr = values[index];
    let next = values[index + 1];
    if(!(curr > next && curr - next <= 3 && curr - next >= 1)){
        return false;
    }
    return dec(values, index + 1);
}

const part_one = function(){
    const fs = require('fs');
    const path = require('path');
    
    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim();
    
    const lines = input.split('\n');
    
    let safe_levels = 0;
    for (let i = 0; i < lines.length; i++){
        let values = lines[i].trim().split(/\s+/).map(Number);
    
        let increasing = inc(values);
        let decreasing = dec(values);
        console.log(`Level ${i + 1}: increasing: ${increasing}, decreasing: ${decreasing}`);
    
        if (increasing || decreasing){
            safe_levels += 1;
        }
    }
    // let testArray = [6, 7, 9, 10, 12, 13, 16, 19];
    // console.log(inc(testArray)); // Output: true
    console.log(safe_levels);
}

const part_two = function(){

}

part_one();
part_two();