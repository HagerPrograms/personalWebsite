class GameOfLife{

    constructor(){
        //defining size for each cell 
        this.cellSize = 10;
        //color for dead cells
        this.deadColor = "#000000";
        //color for alive cells
        this.aliveColor = "#FFFFFF";
        //simple math for counting how many rows we need
        this.cellsInColumns = Math.floor(canvas.width / this.cellSize);
        //same thing but for columns
        this.cellsInRows = Math.floor(canvas.height / this.cellSize);
        //2d array that holds current life cycle
        this.activeArray = [];
        //2d array that holds previous life cycle
        this.inactiveArray = [];
        
    
        this.gridInit = () => {
            
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'white';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.fillRect(0,0,canvas.width,canvas.height)
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
            
        }
    }
};