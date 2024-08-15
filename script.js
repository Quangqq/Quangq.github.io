const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
canvas.width = 400;
canvas.height = 400;

let snake = [
    { x: gridSize * 5, y: gridSize * 5 },
    { x: gridSize * 4, y: gridSize * 5 },
    { x: gridSize * 3, y: gridSize * 5 }
];

let food = { x: gridSize * 10, y: gridSize * 10 };
let direction = { x: gridSize, y: 0 };
let changingDirection = false;

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

document.addEventListener("keydown", changeDirection);
createFood();
main();
