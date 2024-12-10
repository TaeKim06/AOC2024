const fs = require('node:fs');
const input = fs.readFileSync('./05/input.txt', 'utf-8');
const [raw_rules, raw_manuals] = input.split('\r\n\r\n');

// Creating a hashmap of rules with keys being what needs to come before and values being things that can come after
// MAP STRUCTURE: (Key, [SET of potential values])
let rules = new Map();
let manual_list = [];
for(let rule of raw_rules.split('\r\n')){
    let [key, value] = rule.split('|');

    let parsed_key = parseInt(key);
    let parsed_value = parseInt(value);

    if(rules.has(parsed_key)){
        rules.get(parsed_key).add(parsed_value);
    }
    else{
        rules.set(parsed_key, new Set([parsed_value]));
    }
}

// Make a manual list of nums
for(let manual of raw_manuals.split('\r\n')){
    let int_arr = [];
    for(let value of manual.split(',')){
        int_arr.push(parseInt(value));
    }
    manual_list.push(int_arr);
}
   
function part_one(){

    let result = 0;
    let total_correct = 0;
    let illegal = [];

    for(const manual of manual_list){
        let i = 0;
        let previous_pages = [];
        let legal = true;
        
        while(legal && i < manual.length){

            let num = manual[i];
            let new_rule = rules.get(num);

            if (!new_rule){
                previous_pages.push(num);
            }
            else{
                for(let page of previous_pages){
                    if (new_rule.has(page)){
                        legal = false;
                        break;
                    }
                }
                previous_pages.push(num);
            }
            i++;
        }
        if(legal){
            let middle_num = Math.round(manual.length/2 - 1);
            result += manual[middle_num];
            total_correct++;
        }
        else{
            illegal.push(manual);
        }
    }
    
    console.log(`The sum of the middle pages for every safe manual is: ${result}`);
    // console.log(rules);
    console.log(total_correct);
    part_two(illegal);
    
}

// Takes the illegal inputs from part one and fixes them and sums the middle values
const part_two = function(illegal){

    let result = 0;
    // Check each illegal array and go through swapping the values until the new arrays lead to legal arrays
    for(let manual of illegal){
        let previous_pages = [];
        let corrected = false;
        let i = 0;

        // console.log(manual);

        while(!corrected && i < manual.length){
            let num = manual[i];
            let new_rule = rules.get(num);
            let adjusted = false;


            // Just push the new value so we can compare the list of currently checked pages
            previous_pages.push(num);

            // If no new rule then just continue
            if (!new_rule){
                i++;
                continue;
            }

            // If there is a new rule, check if there is a rule break and if there is, swap the values
            for(let j = 0; j < previous_pages.length - 1; j++){

                // check the legality of the current list by bubble sorting
                let curr = previous_pages[j];
                let next = previous_pages[j + 1];
                let next_rule = rules.get(next);

                
                if(!next_rule){
                    continue;
                }

                // If there is a rule break: swap the positions in the array and check if there are still rulebreaks
                if(next_rule.has(curr)){
                    let temp = next;
                    previous_pages[j + 1] = curr;
                    previous_pages[j] = temp;
                    adjusted = true;
                    j = 0;
                }
            }
            i++;
        }

        let middle_num = Math.round(previous_pages.length/2 - 1);
        result += previous_pages[middle_num];

    }

    console.log(`The sum of the middle pages for every fixed manual is: ${result}`);

}

part_one();
