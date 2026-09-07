const canvas=document.getElementById("confetti");
const ctx=canvas.getContext("2d");
let pieces=[], animationId;
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
addEventListener("resize",resize);resize();

function confettiBurst(){
  for(let i=0;i<150;i++){
    pieces.push({
      x:innerWidth/2+(Math.random()-.5)*120,
      y:innerHeight*.25,
      vx:(Math.random()-.5)*12,
      vy:Math.random()*-10-3,
      size:Math.random()*8+4,
      rot:Math.random()*Math.PI,
      vr:(Math.random()-.5)*.25,
      life:Math.random()*100+80
    });
  }
  if(!animationId) animate();
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pieces=pieces.filter(p=>p.life>0);
  pieces.forEach(p=>{
    p.x+=p.vx;p.vy+=.22;p.y+=p.vy;p.rot+=p.vr;p.life--;
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
    ctx.fillStyle=["#ff6f91","#f5b544","#9ad8d8","#c49be8","#ff9f68"][Math.floor(Math.random()*5)];
    ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*.55);ctx.restore();
  });
  animationId=pieces.length?requestAnimationFrame(animate):(cancelAnimationFrame(animationId),null);
}
function showSurprise(){
  document.getElementById("surprise").classList.toggle("show");
  confettiBurst();
}
function celebrate(){confettiBurst();}
window.addEventListener("load",()=>setTimeout(confettiBurst,500));
