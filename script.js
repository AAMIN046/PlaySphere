const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let level = 1;
let gravity = 0.4;
let launched = false;
let birdIndex = 0;

let birds = [];
let cats = [];
let explosions = [];

function createBird() {
    return {
        x: 150,
        y: 320,
        radius: 15,
        dx: 0,
        dy: 0,
        dragging: false
    };
}

function createCats(level) {
    let arr = [];
    for (let i = 0; i < level + 2; i++) {
        arr.push({
            x: 650 + i * 50,
            y: 320,
            width: 40,
            height: 40,
            destroyed: false
        });
    }
    return arr;
}

birds = [createBird(), createBird(), createBird()];
cats = createCats(level);

function getCurrentBird() {
    return birds[birdIndex];
}

function startDrag(x, y) {
    let bird = getCurrentBird();
    if (!launched) bird.dragging = true;
}

function moveDrag(x, y) {
    let bird = getCurrentBird();
    if (bird.dragging) {
        bird.x = x;
        bird.y = y;
    }
}

function endDrag() {
    let bird = getCurrentBird();
    if (bird.dragging) {
        bird.dragging = false;
        launched = true;
        bird.dx = (150 - bird.x) * 0.2;
        bird.dy = (320 - bird.y) * 0.2;
    }
}

canvas.addEventListener("mousedown", e => {
    let rect = canvas.getBoundingClientRect();
    startDrag(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener("mousemove", e => {
    let rect = canvas.getBoundingClientRect();
    moveDrag(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener("mouseup", endDrag);

canvas.addEventListener("touchstart", e => {
    let rect = canvas.getBoundingClientRect();
    let touch = e.touches[0];
    startDrag(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvas.addEventListener("touchmove", e => {
    let rect = canvas.getBoundingClientRect();
    let touch = e.touches[0];
    moveDrag(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvas.addEventListener("touchend", endDrag);

function drawBird(bird) {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
}

function drawCats() {
    cats.forEach(cat => {
        if (!cat.destroyed) {
            ctx.fillStyle = "orange";
            ctx.fillRect(cat.x, cat.y, cat.width, cat.height);
        }
    });
}

function drawExplosions() {
    explosions.forEach((exp, index) => {
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        exp.radius += 2;
        if (exp.radius > 30) explosions.splice(index, 1);
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let bird = getCurrentBird();

    if (launched) {
        bird.dy += gravity;
        bird.x += bird.dx;
        bird.y += bird.dy;
    }

    if (bird.y > 380) {
        launched = false;
        birdIndex++;
        if (birdIndex >= birds.length) {
            birdIndex = 0;
            nextLevel();
        }
    }

    cats.forEach(cat => {
        if (!cat.destroyed &&
            bird.x > cat.x &&
            bird.x < cat.x + cat.width &&
            bird.y > cat.y &&
            bird.y < cat.y + cat.height) {

            cat.destroyed = true;
            score += 20;
            document.getElementById("score").innerText = score;
            explosions.push({x: cat.x + 20, y: cat.y + 20, radius: 5});
        }
    });

    drawBird(bird);
    drawCats();
    drawExplosions();

    requestAnimationFrame(update);
}

function nextLevel() {
    level++;
    document.getElementById("level").innerText = level;
    cats = createCats(level);
    birds = [createBird(), createBird(), createBird()];
}

function resetGame() {
    score = 0;
    level = 1;
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
    cats = createCats(level);
    birds = [createBird(), createBird(), createBird()];
}

update();
