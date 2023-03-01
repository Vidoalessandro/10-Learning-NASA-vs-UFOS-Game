const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;

function startGame(){

    console.log({canvasSize, elementsSize});

    game.font = (elementsSize - 12) + 'px Verdana';
    game.textAlign = 'end';

    for(let i = 1; i <= 10; i++){
        game.fillText(emojis['X'], elementsSize, elementsSize * i);
    }
}

function setCanvasSize(){

    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize / 10) - 2;

    startGame();
}