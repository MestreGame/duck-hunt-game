const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let score = 0;
let ducks = [];
let gameOver = false;

const duckImage = new Image();
duckImage.src = 'imagen/patos.jpg';

const backgroundImage = new Image();
backgroundImage.src = 'imagen/fundo.webp';

function createDuck() {
    const duck = {
        x: Math.random() * (canvas.width - 50),
        y: Math.random() * (canvas.height - 50),
        width: 50,
        height: 50,
        speedX: 2 + Math.random() * 3,
        speedY: 2 + Math.random() * 3,
    };
    ducks.push(duck);
}

function drawDucks() {
    ducks.forEach(duck => {
        ctx.drawImage(duckImage, duck.x, duck.y, duck.width, duck.height);
    });
}

function moveDucks() {
    ducks.forEach(duck => {
        duck.x += duck.speedX;
        duck.y += duck.speedY;

        if (duck.x <= 0 || duck.x + duck.width >= canvas.width) {
            duck.speedX *= -1;
        }
        if (duck.y <= 0 || duck.y + duck.height >= canvas.height) {
            duck.speedY *= -1;
        }
    });
}

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function updateGame() {
    drawBackground();
    moveDucks();
    drawDucks();

    if (!gameOver) {
        requestAnimationFrame(updateGame);
    }
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    ducks.forEach((duck, index) => {
        if (
            mouseX >= duck.x &&
            mouseX <= duck.x + duck.width &&
            mouseY >= duck.y &&
            mouseY <= duck.y + duck.height
        ) {
            ducks.splice(index, 1);
            score += 10;
            document.getElementById('score').innerText = score;
        }
    });

    if (ducks.length === 0) {
        gameOver = true;
        document.getElementById('finalScore').value = score;
        document.getElementById('scoreForm').style.display = 'block';
    }
});

document.getElementById('saveButton').addEventListener('click', function() {
    saveScore();
});

document.getElementById('continueButton').addEventListener('click', function() {
    restartGame();
    document.getElementById('scoreForm').style.display = 'none';
});

function saveScore() {
    const score = document.getElementById('finalScore').value;

    fetch('save_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'score=' + score
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').innerText = data;
        restartGame();
        document.getElementById('scoreForm').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
}

function restartGame() {
    score = 0;
    document.getElementById('score').innerText = score;
    ducks = [];
    for (let i = 0; i < 5; i++) {
        createDuck();
    }
    gameOver = false;
    updateGame();
}

for (let i = 0; i < 5; i++) {
    createDuck();
}

updateGame();
