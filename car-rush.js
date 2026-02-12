const canvas2=document.getElementById("carCanvas");
const ctx2=canvas2.getContext("2d");

let car={x:250,y:350,width:50,height:30};
let obstacles=[{x:Math.random()*550,y:-50,width:50,height:20}];
let speed=3;

document.addEventListener("keydown", e=>{
    if(e.key==="ArrowLeft") car.x-=20;
    if(e.key==="ArrowRight") car.x+=20;
});

function drawCar(){
    ctx2.fillStyle="blue";
    ctx2.fillRect(car.x,car.y,car.width,car.height);
}

function drawObs(){
    ctx2.fillStyle="red";
    obstacles.forEach(o=>ctx2.fillRect(o.x,o.y,o.width,o.height));
}

function updateCar(){
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    obstacles.forEach(o=>o.y+=speed);
    if(obstacles[0].y>400){
        obstacles[0].y=-50;
        obstacles[0].x=Math.random()*550;
    }
    drawCar();
    drawObs();
    requestAnimationFrame(updateCar);
}
updateCar();
