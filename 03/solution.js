function mul(num1, num2){
    return num1 * num2;
}

function check(regex, substring){
    if(regex.test(substring)){
        return true;
    }
    return false;
}


const part_one = function(){
    const fs = require('fs');
    const path = require('path');
    
    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim();
    
    let regex = /mul\(\d+,\d+\)/g;
    let matches = input.match(regex);
    let result = 0;

    for (let i = 0; i < matches.length; i++){
        regex = /\((\d+),(\d+)\)/g;

        let nums = regex.exec(matches[i]);
        let num1 = parseInt(nums[1], 10);
        let num2 = parseInt(nums[2], 10);

        result += mul(num1, num2);
    }
    
    console.log(`The total result is: ${result}`);

}

const part_two = function(){
    const fs = require('fs');
    const path = require('path');

    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim();

    let regex_mul = /^mul\(\d+,\d+\)/;
    let regex_do = /^do\(\)/;
    let regex_dont = /^don't\(\)/;
    let find_nums = /\((\d+),(\d+)\)/;


    let active = true;
    let result = 0;
    for (let i = 0; i < input.length; i++){
        let char = input[i];
        // Things to do when active:
        // Check for correct mul calls
        // Check for correct don't calls
        if (active){
            if (char === 'm'){
                const substring = input.slice(i);
                if (check(regex_mul, substring)){
                    let regex = /\((\d+),(\d+)\)/;

                    let nums = find_nums.exec(substring);
                    let num1 = parseInt(nums[1], 10);
                    let num2 = parseInt(nums[2], 10);

                    result += mul(num1, num2);
                }

                
            }
            if (char === 'd'){
                const substring = input.slice(i);
                if(check(regex_dont, substring)){
                    active = false;
                }
            }
        }
        // Things to do when inactive:
        // Check for do call
        else {
            if (char === 'd'){
                const substring = input.slice(i);
                if (check(regex_do, substring)){
                    active = true;
                }
            }
        }
    }
    console.log(`The total result is: ${result}`)
}

part_one();
part_two()