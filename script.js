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
let direction;
let changingDirection;

function startGame() {
    snake = [
        { x: gridSize * 5, y: gridSize * 5 },
        { x: gridSize * 4, y: gridSize * 5 },
        { x: gridSize * 3, y: gridSize * 5 }
    ];
    direction = { x: gridSize, y: 0 };
    changingDirection = false;

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
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.keyCode;
    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;

    if (keyPressed === 37 && !goingRight) {
        direction = { x: -gridSize, y: 0 };
    } else if (keyPressed === 38 && !goingDown) {
        direction = { x: 0, y: -gridSize };
    } else if (keyPressed === 39 && !goingLeft) {
        direction = { x: gridSize, y: 0 };
    } else if (keyPressed === 40 && !goingUp) {
        direction = { x: 0, y: gridSize };
    }
}

function buttonDirection(directionInput) {
    if (changingDirection) return;
    changingDirection = true;

    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;

    switch(directionInput) {
        case 'left':
            if (!goingRight) direction = { x: -gridSize, y: 0 };
            break;
        case 'up':
            if (!goingDown) direction = { x: 0, y: -gridSize };
            break;
        case 'right':
            if (!goingLeft) direction = { x: gridSize, y: 0 };
            break;
        case 'down':
            if (!goingUp) direction = { x: 0, y: gridSize };
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
        alert("Game Over!");
        document.location.reload();
        return;
    }

    changingDirection = false;
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        main();
    }, 100);
}

playButton.addEventListener('click', startGame);
document.addEventListener("keydown", changeDirection);

upButton.addEventListener('click', () => buttonDirection('up'));
downButton.addEventListener('click', () => buttonDirection('down'));
leftButton.addEventListener('click', () => buttonDirection('left'));
rightButton.addEventListener('click', () => buttonDirection('right'));
