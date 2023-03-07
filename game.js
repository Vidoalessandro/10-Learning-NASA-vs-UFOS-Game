const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const upButton = document.querySelector('#up');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');
const downButton = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const result = document.querySelector('#result');



window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined
};

const winPosition = {
    x: undefined,
    y: undefined
};

let enemyPositions = [];
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let TimeInterval;
const recordTime = localStorage.getItem('record_time');

function startGame(){

    console.log({canvasSize, elementsSize});

    game.font = (elementsSize - 12) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if(!map){
        gameWin();
        return
    }

    if(!timeStart){
        timeStart = Date.now();
        TimeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log(mapRows);
    console.log(mapRowCols)
    console.log(map);

    // Lives

    showLives();

    // Clear map

    game.clearRect(0, 0, canvasSize, canvasSize);

    // Clear enemies array

    enemyPositions = [];

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
            else if(col == 'L'){
                winPosition.x = posX;
                winPosition.y = posY;
            }
            else if(col == 'I'){
                winPosition.x = posX;
                winPosition.y = posY;
            }
            else if(col == 'G'){
                winPosition.x = posX;
                winPosition.y = posY;
            }
            else if(col == 'X'){
                enemyPositions.push({
                    x: posX,
                    y: posY
                });
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
    
    const winCollisionX = playerPosition.x.toFixed(2) == winPosition.x.toFixed(2);
    const winCollisionY = playerPosition.y.toFixed(2) == winPosition.y.toFixed(2);
    const winCollision = winCollisionX && winCollisionY;

    if(winCollision){
        levelWin();
    }

    const enemyCollisions = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollisionX && enemyCollisionY;
    });

    if(enemyCollisions){
        setTimeout(levelFail, 100);
        game.fillText(emojis['SHIP_COLLISION'], playerPosition.x, playerPosition.y);
        return;

    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
    console.log('You win');
    level++;
    startGame(); 
}

function levelFail(){
    lives--;
    if(lives <= 0){
        level = 0;
        lives = 3;
        clearInterval(TimeInterval);
        timeStart = Date.now();
        TimeInterval = setInterval(showTime, 100);

    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin(){
    console.log('You finished the game');
    clearInterval(TimeInterval);

    const playerTime = formatTime(Date.now() - timeStart);

    if(recordTime){
        if(recordTime >= playerTime){
            localStorage.setItem('record_time', playerTime);
            result.innerHTML = 'Yeah! new record 💪🏻';
        } else {
            result.innerHTML = 'Cheer up, you can top it next time 🙌🏻';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        result.innerHTML = 'Your first score! let\'s see if you get over it 🤩';
    }
    
    console.log({recordTime, playerTime});
}

function showLives(){
    const heartsArray = Array(lives).fill(emojis['HEART']);
    spanLives.innerHTML = '';
    heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime(){
    timePlayer = formatTime(Date.now() - timeStart);
    spanTime.innerHTML = timePlayer;
}

function formatTime(ms){
    const cs = parseInt(ms/10) % 100
    const seg = parseInt(ms/1000) % 60
    const min = parseInt(ms/60000) % 60
    const csStr = `${cs}`.padStart(2,"0")
    const segStr = `${seg}`.padStart(2,"0")
    const minStr = `${min}`.padStart(2,"0")
    return`${minStr}:${segStr}:${csStr}`
}

function showRecord(){
    if(!recordTime){
    } else {
        spanRecord.innerHTML = localStorage.getItem('record_time') + '🔥';
    }
    return;   
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