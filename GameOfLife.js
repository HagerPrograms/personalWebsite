/*
Author: Seth Hager

Heavily based upon https://levelup.gitconnected.com/conways-game-of-life-in-javascript-9498ae1958fe
slightly modified.

Each iteration will be modified to suit my needs.


*/


class GameOfLife{

    constructor(){
        //defining size for each cell 
        this.cellSize = 5;
        //color for dead cells
        this.deadColor = "#FFFFFF";
        //color for alive cells
        this.aliveColor = "#000000";
        //simple math for counting how many rows we need
        this.cellsInColumns = Math.floor(canvas.width / this.cellSize);
        //same thing but for columns
        this.cellsInRows = Math.floor(canvas.height / this.cellSize);
        //2d array that holds current life cycle
        this.activeArray = [];
        //2d array that holds previous life cycle
        this.inactiveArray = [];
        
    
        this.gridInit = () => {
            
            ctx.strokeStyle = '#aaaaaa';
            ctx.lineWidth = 1;
            ctx.beginPath();
            
            for(let x = 0; x < this.cellsInColumns; x++){
                ctx.moveTo(x*this.cellSize,0);
                ctx.lineTo(x*this.cellSize,canvas.height);
                ctx.stroke();
            }
            for(let y = 0; y < this.cellsInRows; y++){
                ctx.moveTo(0, y*this.cellSize);
                ctx.lineTo(canvas.width, y*this.cellSize);
                ctx.stroke();
            }
            
        };
        
        this.arrayInit = () => {
            for(let i = 0; i < this.cellsInRows; i++){
                this.activeArray[i] = [];
                this.inactiveArray[i] = [];
                for(let j = 0; j < this.cellsInColumns; j++){
                    this.activeArray[i][j] = 0;
                    this.inactiveArray[i][j] = 0
                }
            }            
            this.activeArray[20][20] = 1;
            this.activeArray[21][21] = 1;
            this.activeArray[21][22] = 1;
            this.activeArray[20][22] = 1;
            this.activeArray[19][22] = 1;

        };
        
        this.fillArray = () => {
            for (let i = 0; i < this.cellsInRows; i++){
                for(let j = 0; j < this.cellsInColumns; j++){
                    let color;
                    if(this.activeArray[i][j] === 1)
                        color = this.aliveColor;
                    else 
                        color = this.deadColor;
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                }
            }

        };

        this.setCellValueHelper = (row,col) => {
        try{
            return (this.activeArray[row][col]) ? this.activeArray[row][col] : 0;
        } 
        catch{
            return 0;
        }
        };

        this.countNeighbors = (row,col) => {
            var totNeighbors = 0;
            totNeighbors += this.setCellValueHelper(row - 1, col - 1);
            totNeighbors += this.setCellValueHelper(row - 1, col);
            totNeighbors += this.setCellValueHelper(row - 1, col + 1);
            totNeighbors += this.setCellValueHelper(row, col - 1);
            totNeighbors += this.setCellValueHelper(row, col + 1);
            totNeighbors += this.setCellValueHelper(row + 1, col - 1);
            totNeighbors += this.setCellValueHelper(row + 1, col);
            totNeighbors += this.setCellValueHelper(row + 1, col + 1);
            return totNeighbors;
        };

        this.updateCellValue = (row,col) => {
            const total = this.countNeighbors(row,col);

            if(total > 3 || total < 2){
                return 0;
            }

            if(this.activeArray[row][col] === 0 && total === 3){
                return 1;
            }

            return this.activeArray[row][col];

        }

        this.updateLifeCycle = () => {

            for(let i = 0; i < this.cellsInRows; i++){
                for(let j = 0; j < this.cellsInColumns; j++){
                    let newState = this.updateCellValue(i,j);
                    this.inactiveArray[i][j] = newState;
                }
            }
            this.activeArray = this.inactiveArray.map(a => ({...a}));

        };

        this.gameSetUp = () => {
            this.arrayInit();
        };

        this.runGame = () => {
            this.updateLifeCycle();
            this.fillArray();
            this.gridInit();
        };

    }
};