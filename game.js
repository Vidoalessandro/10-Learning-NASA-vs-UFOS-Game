const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const upButton = document.querySelector('#up');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');
const downButton = document.querySelector('#down');


window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined
};

function startGame(){

    console.log({canvasSize, elementsSize});

    game.font = (elementsSize - 12) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log(mapRows);
    console.log(mapRowCols)
    console.log(map);

    // Clear map

    game.clearRect(0, 0, canvasSize, canvasSize);

    // Rendering with forEach

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[[col]];
            const posX = elementsSize * (colI + 1) + 5;
            const posY = elementsSize * (rowI + 1) - 7;
            if(col == 'O'){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log(playerPosition);
                }
            }
            game.fillText(emoji, posX, posY);
        });
    });

    // Rendering with for

    /*for(let row = 1; row <= 10; row++){
        for(let col = 1; col <= 10; col++){
            game.fillText(emojis[mapRowCols[row - 1][col -1]], elementsSize * col + 5, elementsSize * row - 7);
        }
    }*/

    movePlayer();
}

function setCanvasSize(){

    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize / 10) - 1;

    startGame();
}
  
upButton.addEventListener('click', moveUp);
leftButton.addEventListener('click', moveLeft);
rightButton.addEventListener('click', moveRight);
downButton.addEventListener('click', moveDown);

function movePlayer(){
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveUp(){
    console.log('up');

    if((playerPosition.y - elementsSize) < 0){
        console.log('OUT');
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveLeft(){
    console.log('left');
    if((playerPosition.x - elementsSize) < elementsSize){
        console.log('OUT');
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}

function moveRight(){
    if((playerPosition.x + elementsSize) > canvasSize){
        console.log('OUT');
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
}

function moveDown(){
    console.log('Down');
    if((playerPosition.y + elementsSize) > canvasSize){
        console.log('OUT');
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}

window.addEventListener('keydown', moveByKeys);

function moveByKeys(event){
    if(event.key == 'ArrowUp') moveUp();
    else if(event.key == 'ArrowLeft') moveLeft();
    else if(event.key == 'ArrowRight') moveRight();
    else if(event.key == 'ArrowDown') moveDown();
}