const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

const game = new GameOfLife();

window.onload = () => {
    
    game.drawInit();
    game.gameSetUp();
    game.fillArray();
    game.gridInit();

}

window.setInterval(() => {game.runGame();}, 30);