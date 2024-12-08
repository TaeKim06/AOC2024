function make_grid(){
    const fs = require('fs');
    const path = require('path');
    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim();
    let grid = input.split(`\n`).map((str) => str.split(''));

    return grid;
}


function inbounds(i, j, rows, columns, direction, size = 3){
    // Find if XMAS would be within the bounds of the grid
    let di = i + direction[0] * size;
    let dj = j + direction[1] * size;

    if(0 <= di && di < rows && 0 <= dj && dj < columns){
        return true;
    }
    return false;
}

function check_XMAS(i, j, grid, direction){
    // Check direction for XMAS in the right order
    let is_M = grid[i + direction[0] * 1][j + direction[1] * 1];
    let is_A = grid[i + direction[0] * 2][j + direction[1] * 2];
    let is_S = grid[i + direction[0] * 3][j + direction[1] * 3];

    if(!(is_M === "M")){
        return 0;
    }
    if(!(is_A === "A")){
        return 0;
    }
    if(!(is_S === "S")){
        return 0;
    }
    return 1;
    
}

function check_MAS(i, j, grid, direction){

}


const part_one = function(){  

    /*
    (-1, -1), (-1, 0), (-1, 1)
    (0, -1),       ,   (0, 1)
    (1, -1),  (1, 0),  (1, 1)
    
    changes in i and j to move around the graph
    */
    // const north = [-1, 0];
    // const northeast = [-1, 1];
    // const east = [0, 1];
    // const southeast = [1, 1];
    // const south = [1, 0];
    // const southwest = [1, -1];
    // const west = [0, -1];
    // const northwest = [-1, -1];


    let grid = make_grid();
    const compass = [
        [-1, 0],  // North
        [-1, 1],  // Northeast
        [0, 1],   // East
        [1, 1],   // Southeast
        [1, 0],   // South
        [1, -1],  // Southwest
        [0, -1],  // West
        [-1, -1]  // Northwest
    ]


    let rows = grid.length;
    let result = 0;


    for (let i = 0; i < rows; i++){
        let columns = grid[i].length;
        for(let j = 0; j < columns; j++){
            if(grid[i][j] === "X"){
                for (const direction of compass){
                    if(inbounds(i, j, rows, columns, direction)){
                        result += check_XMAS(i, j, grid, direction);
                    }
                }
            }
        }
    }

    console.log(`The total number of XMASes is: ${result}`);

}

const part_two = function(){
    let grid = make_grid();
    let rows = grid.length;
    let result = 0;


    // Adjust parameters to not check any edges as they can't be X MASes
    for(let i = 1; i < rows - 1; i++){
        let columns = grid[i].length;
        for(let j = 1; j < columns - 1; j++){
            
            if(grid[i][j] === "A"){

                let northeast = grid[i - 1][j + 1] 
                let southwest = grid[i + 1][j - 1] 
                let southeast = grid[i + 1][j + 1] 
                let northwest = grid[i - 1][j - 1]
                 
                // Brute force checking diagonals for matches
                if(((northeast === 'M' && southwest === 'S') || (northeast === 'S' && southwest === 'M')) && 
                    ((southeast === 'M' && northwest === 'S') || (southeast === 'S' && northwest === 'M'))){
                        result++;
                }
            }
        }
    }

    console.log(`The total number of X-MASes 💀💀 is: ${result}`);

}



part_one();
part_two();