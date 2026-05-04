function scrollToServices(){
document.getElementById("services").scrollIntoView({behavior:"smooth"});
}

/* CONTACT MODAL */
function openContactModal(){
document.getElementById("contactModal").classList.add("active");
}

function closeContactModal(){
document.getElementById("contactModal").classList.remove("active");
}

/* SLIDER */
const slides=document.querySelectorAll(".service-slide");
let index=0;

setInterval(()=>{
slides.forEach(s=>s.classList.remove("active"));
slides[index].classList.add("active");
index=(index+1)%slides.length;
},2500);

/* BACKGROUND */
const canvas=document.getElementById("bgCanvas");
const ctx=canvas.getContext("2d");

function resize(){
canvas.width=innerWidth;
canvas.height=innerHeight;
}
resize();
window.addEventListener("resize",resize);

let particles=[];

for(let i=0;i<120;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
dx:(Math.random()-0.5)*0.5,
dy:(Math.random()-0.5)*0.5
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.x+=p.dx;
p.y+=p.dy;

ctx.fillStyle="#c5ff5c";
ctx.fillRect(p.x,p.y,2,2);
});

requestAnimationFrame(animate);
}

animate();
