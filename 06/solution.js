const fs = require('node:fs');
const { versions } = require('node:process');
const input = fs.readFileSync('./06/input.txt', "utf-8");

// create a map of the input, make note of the starting position of the guard
// create a second map that keeps track of whether or not a position is visited using 0s and 1s

/*
MAP VISUALIZATION
[ 
    (-1, -1), (-1, 0), (-1, 1)
    (0, -1),       ,   (0, 1)
    (1, -1),  (1, 0),  (1, 1)
]
*/

let map = input.split('\r\n');
let visited_map = new Array(map.length);


// Guard will keep track of the current i,j position of the ^ value, as well as which direction it is facing
const guard = {};

for(let i = 0; i < map.length; i++){
    visited_map[i] = new Array(map[i].length);
    for(let j = 0; j < map[i].length; j++){
        // i = row value, j = col value

        if(map[i][j] === '^'){
            guard.row = i;
            guard.column = j;
            guard.direction = 1;
            visited_map[i][j] = 1;
        }
        else{
            visited_map[i][j] = 0;
        }
    }
}

// console.log(map);
// console.log(visited_map);



function printformattedmap(visited_map){

    visited_map.forEach(row => console.log(row.join('')));

}


function inbounds(row, column){
    if (row >= 0 && row < map.length && column >= 0 && column < map[row].length){
        return true;
    }
    return false;
}

function move(guard, di, dj){
    let i = guard.row;
    let j = guard.column;

    while(inbounds(i + di, j + dj)){
        if(map[i + di][j + dj] === '#'){
            // a True signal means the guard just hit an obstacle
            return true;
        }
        guard.row += di;
        guard.column += dj;
        i = guard.row;
        j = guard.column;
        visited_map[i][j] = 1;
    }
    // Use a false as a signal that the guard has moved out of bounds and to stop the program
    return false;
}

function part_one(){

    let still_walking = true;

    while(still_walking){
        switch(guard.direction){
            case 1: // Up
                // if true, change directions to the right, else guard has left the map
                if (move(guard, -1, 0)){
                    guard.direction = 2;
                }
                else{
                    still_walking = false;
                }
                break;
            case 2: // Right
                if (move(guard, 0, 1)){
                    guard.direction = 3;
                }
                else{
                    still_walking = false;
                }
                break;
            case 3: // Down
                if (move(guard, 1, 0)){
                    guard.direction = 4;
                }
                else{
                    still_walking = false;
                }
                break;
            case 4: // Left
                if (move(guard, 0, -1)){
                    guard.direction = 1;
                }
                else{
                    still_walking = false;
                }
                break;
        }

    }

    printformattedmap(visited_map);
    
    let result = 0;
    for(let row of visited_map){
        result += row.filter(item => item === 1).length;
    }
    console.log(`The total number of unique tiles visited by the guard is: ${result}`)
}

part_one();