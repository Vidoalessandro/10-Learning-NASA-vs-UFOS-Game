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

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[[col]];
            const posX = elementsSize * (colI + 1) + 5;
            const posY = elementsSize * (rowI + 1) - 7;
            game.fillText(emoji, posX, posY);
        });
    });

    /*for(let row = 1; row <= 10; row++){
        for(let col = 1; col <= 10; col++){
            game.fillText(emojis[mapRowCols[row - 1][col -1]], elementsSize * col + 5, elementsSize * row - 7);
        }
    }*/
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

function moveUp(){
    console.log('up');
}
function moveLeft(){
    console.log('left');
}
function moveRight(){
    console.log('right');
}
function moveDown(){
    console.log('Down');
}

window.addEventListener('keydown', moveByKeys);

function moveByKeys(event){
    if(event.key == 'ArrowUp') moveUp();
    else if(event.key == 'ArrowLeft') moveLeft();
    else if(event.key == 'ArrowRight') moveRight();
    else if(event.key == 'ArrowDown') moveDown();
}