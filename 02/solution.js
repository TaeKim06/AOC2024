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
        let values = lines[i].trim()
            .split(/\s+/)
            .map(Number);
        
        let increasing = inc(values);
        let decreasing = dec(values);
    
        if (increasing || decreasing){
            safe_levels += 1;
        }
    }
    console.log(`There are ${safe_levels} safe levels.`);
}

const part_two = function(){
    const fs = require('fs');
    const path = require('path');

    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim();
    const lines = input.split('\n');

    let safe_levels = 0;

    for (let i = 0; i < lines.length; i++){
        let values = lines[i].trim()
            .split(/\s+/)
            .map(Number);

        // Check if its just safe
        let increasing = inc(values);
        let decreasing = dec(values);

        if (increasing || decreasing){
            safe_levels += 1;
            continue;
        }

        // If the level isn't safe check if it is safe when dampened
        // Brute force checking every possible dampened version of nonsafe arrays
        for (let j = 0; j < values.length; j++){
            // ... makes it so that the values from the values.slice() function get spread out as if they were individual elements in the new array
            let dampened_array = [
                ...values.slice(0, j), 
                ...values.slice(j + 1) 
            ];

             let increasing2 = inc(dampened_array);
             let decreasing2 = dec(dampened_array);

            if (increasing2 || decreasing2){
                safe_levels += 1;
                break;
            }
        }
    }
    console.log(`There are ${safe_levels} safe levels.`);

}

part_one();
part_two();