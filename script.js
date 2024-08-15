const playButton = document.getElementById('playButton');
const gameContainer = document.getElementById('gameContainer');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

const gridSize = 20;
canvas.width = 400;
canvas.height = 400;

let snake = [];
let food;
let direction = { x: gridSize, y: 0 };
let changingDirection = false;
let score = 0;

function startGame() {
    snake = [
        { x: gridSize * 5, y: gridSize * 5 },
        { x: gridSize * 4, y: gridSize * 5 },
        { x: gridSize * 3, y: gridSize * 5 }
    ];
    direction = { x: gridSize, y: 0 };
    changingDirection = false;
    score = 0;

    createFood();
    gameContainer.style.display = 'block';
    main();
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(snakePart.x, snakePart.y, gridSize, gridSize);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        createFood();
        score++;
    } else {
        snake.pop();
    }
}

function buttonDirection(directionInput) {
    if (changingDirection) return;
    changingDirection = true;

    switch(directionInput) {
        case 'left':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'up':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'right':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
        case 'down':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
    }
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    };
}

function drawFood() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function gameOver() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function main() {
    if (gameOver()) {
        alert("Game Over! Your score was " + score);
        document.location.reload();
        return;
    }

    changingDirection = false;
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        drawScore();
        main();
    }, 100);
}

playButton.addEventListener('click', startGame);

upButton.addEventListener('click', () => buttonDirection('up'));
downButton.addEventListener('click', () => buttonDirection('down'));
leftButton.addEventListener('click', () => buttonDirection('left'));
rightButton.addEventListener('click', () => buttonDirection('right'));
