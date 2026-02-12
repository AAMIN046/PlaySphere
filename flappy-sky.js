const canvas3=document.getElementById("flappyCanvas");
const ctx3=canvas3.getContext("2d");

let bird={x:50,y:200,vy:0};
let gravity=0.5;
let lift=-10;
let pipes=[{x:400,y:Math.random()*200+50,width:50,height:150}];

document.addEventListener("keydown", e=>{ bird.vy=lift; });
canvas3.addEventListener("touchstart", ()=>{ bird.vy=lift; });

function draw(){
    ctx3.clearRect(0,0,canvas3.width,canvas3.height);
    bird.vy+=gravity;
    bird.y+=bird.vy;

    ctx3.fillStyle="yellow";
    ctx3.fillRect(bird.x,bird.y,20,20);

    ctx3.fillStyle="green";
    pipes.forEach(p=>{
        p.x-=3;
        ctx3.fillRect(p.x,0,p.width,p.y);
        ctx3.fillRect(p.x,p.y+100,p.width,canvas3.height-p.y-100);
        if(p.x+50<0){ p.x=400; p.y=Math.random()*200+50; }
    });

    requestAnimationFrame(draw);
}
draw();
