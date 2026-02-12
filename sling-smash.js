const canvas = document.getElementById("slingCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 80, y: 300, radius: 15, dx: 0, dy: 0, dragging:false };
let target = { x: 700, y: 300, width: 40, height: 40, destroyed:false };
let launched = false;
let gravity = 0.3;

function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI*2);
    ctx.fillStyle="red";
    ctx.fill();
}

function drawTarget() {
    if(!target.destroyed){
        ctx.fillStyle="orange";
        ctx.fillRect(target.x, target.y, target.width, target.height);
    }
}

canvas.addEventListener("mousedown", e=>{
    let rect=canvas.getBoundingClientRect();
    let mx=e.clientX-rect.left;
    let my=e.clientY-rect.top;
    if(Math.hypot(mx-bird.x,my-bird.y)<bird.radius){
        bird.dragging=true;
    }
});
canvas.addEventListener("mousemove", e=>{
    if(bird.dragging){
        let rect=canvas.getBoundingClientRect();
        bird.x=e.clientX-rect.left;
        bird.y=e.clientY-rect.top;
    }
});
canvas.addEventListener("mouseup", e=>{
    if(bird.dragging){
        bird.dragging=false;
        launched=true;
        bird.dx=(80-bird.x)*0.2;
        bird.dy=(300-bird.y)*0.2;
    }
});

function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(launched){
        bird.dy+=gravity;
        bird.x+=bird.dx;
        bird.y+=bird.dy;
    }
    // Collision
    if(!target.destroyed &&
        bird.x>target.x && bird.x<target.x+target.width &&
        bird.y>target.y && bird.y<target.y+target.height){
        target.destroyed=true;
    }
    drawBird();
    drawTarget();
    requestAnimationFrame(update);
}
update();
