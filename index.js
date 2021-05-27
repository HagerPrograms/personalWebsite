const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

const game = new GameOfLife();

window.onload = () => {
    console.log('HERE');
    game.gridInit();
}