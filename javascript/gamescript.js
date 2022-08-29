
var canvas = document.getElementById("myCanvas");
var win = window,
  doc = document,
  docElem = doc.documentElement,
  body = doc.getElementsByTagName('body')[0],
  screenWidth = (win.innerWidth || docElem.clientWidth || body.clientWidth) / 2,
  screenHeight = (win.innerHeight || docElem.clientHeight || body.clientHeight) / 2;
canvas.width = screenWidth;
canvas.height = screenHeight;
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 10;
var dy = -10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var brickWidth = 75;
var brickHeight = 20;
var brinkBorder = 1;

var brickRowCount = Math.round((screenWidth - brickOffsetLeft * 2) / (brickWidth + brinkBorder) - 1);
var brickColumnCount = 5;

var score = 0;
var lives = 3;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect) {
  return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
//The rectangle should have x,y,width,height properties
var rect = {
  x: screenWidth / 2 - 50,
  y: screenHeight / 2 - 50,
  width: 100,
  height: 100
};

var arc = {
  x: screenWidth / 2,
  y: screenHeight / 2,
  radius: 50,
}
function drawButton(ctx, radius, options) {
  options = options || {};
  ctx.save();

  ctx.strokeStyle = "white";
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(arc.x, arc.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  ctx.lineWidth = options.lineWidth || 2;
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  let angle = (options.angle || 0.5 * Math.PI) / 2;
  ctx.beginPath();
  ctx.moveTo(arc.x + radius, arc.y);
  ctx.lineTo(
    arc.x + Math.cos(Math.PI - angle) * radius,
    arc.y + Math.sin(Math.PI - angle) * radius
  );
  ctx.lineTo(
    arc.x + Math.cos(Math.PI + angle) * radius,
    arc.y + Math.sin(Math.PI + angle) * radius
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
drawButton(context, 50);
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ff0000";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (r * (brickWidth + brinkBorder)) + brickOffsetLeft;
        var brickY = (c * (brickHeight + brinkBorder)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
drawBricks();
drawBall();
drawPaddle();
//Binding the click event on the canvas
canvas.addEventListener('click', function (evt) {
  var mousePos = getMousePos(canvas, evt);
  if (isInside(mousePos, rect)) {
    function collisionDetection() {
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          var b = bricks[c][r];
          if (b.status == 1) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              dy = -dy;
              b.status = 0;
              score++;
              if (score == brickRowCount * brickColumnCount) {
                alert("YOU WIN, CONGRATS!");
                document.location.reload();
                
              }
            }
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      }
      else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        }
        else {
          lives--;
          if (!lives) {
            alert("GAME OVER");
            document.location.reload();
          }
          else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 10;
            dy = -10;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }
      paddleX = x - paddleWidth / 2;
      x += dx;
      y += dy;
      requestAnimationFrame(draw);
    }
    draw();
  }
}, false);

