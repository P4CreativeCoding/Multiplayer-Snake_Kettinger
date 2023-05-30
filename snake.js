// Set up the canvas and score display
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Set up the snakes and scores
let snake1 = [{ x: 10, y: 10 }];
let dx1 = 10;
let dy1 = 0;

let snake2 = [{ x: canvasWidth - 20, y: canvasHeight - 20 }];
let dx2 = -10;
let dy2 = 0;

let food = getRandomFood();

// Set up the game loop
setInterval(gameLoop, 100);

function gameLoop() {
  clearCanvas();
  moveSnake(snake1, dx1, dy1);
  moveSnake(snake2, dx2, dy2);
  drawSnake(snake1, "black");
  drawSnake(snake2, "blue");
  drawFood();
  checkCollision(snake1);
  checkCollision(snake2);
}

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function moveSnake(snake, dx, dy) {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (!ateFood()) {
    snake.pop();
  } else {
    food = getRandomFood();
  }
}

function drawSnake(snake, color) {
  ctx.fillStyle = color;
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
}

function getRandomFood() {
  return {
    x: Math.floor(Math.random() * (canvasWidth / 10)) * 10,
    y: Math.floor(Math.random() * (canvasHeight / 10)) * 10,
  };
}

function ateFood() {
  return (
    (snake1[0].x === food.x && snake1[0].y === food.y) ||
    (snake2[0].x === food.x && snake2[0].y === food.y)
  );
}

function checkCollision(snake) {
  // Check if snake hits the wall
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvasWidth ||
    snake[0].y < 0 ||
    snake[0].y >= canvasHeight
  ) {
    resetGame();
  }

  // Check if snake hits itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      resetGame();
    }
  }
}

function resetGame() {
  // Reset snakes and food positions
  snake1 = [{ x: 10, y: 10 }];
  dx1 = 10;
  dy1 = 0;

  snake2 = [{ x: canvasWidth - 20, y: canvasHeight - 20 }];
  dx2 = -10;
  dy2 = 0;

  food = getRandomFood();

  // Display game over message
  alert("Game over!");

  // Refresh the page
  location.reload();
}

// Handle user input
document.addEventListener("keydown", (event) => {
  // Player 1 controls (arrow keys)
  if (event.keyCode === 37 && dx1 === 0) {
    dx1 = -10;
    dy1 = 0;
  } else if (event.keyCode === 38 && dy1 === 0) {
    dx1 = 0;
    dy1 = -10;
  } else if (event.keyCode === 39 && dx1 === 0) {
    dx1 = 10;
    dy1 = 0;
  } else if (event.keyCode === 40 && dy1 === 0) {
    dx1 = 0;
    dy1 = 10;
  }

  // Player 2 controls (w, a, s, d)
  if (event.key === "a" && dx2 === 0) {
    dx2 = -10;
    dy2 = 0;
  } else if (event.key === "w" && dy2 === 0) {
    dx2 = 0;
    dy2 = -10;
  } else if (event.key === "d" && dx2 === 0) {
    dx2 = 10;
    dy2 = 0;
  } else if (event.key === "s" && dy2 === 0) {
    dx2 = 0;
    dy2 = 10;
  }
});
