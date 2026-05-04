document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll('.service-slide');
    let currentSlide = 0;

    function rotateSlides() {

        slides.forEach((slide) => {
            slide.classList.remove('active');
        });

        slides[currentSlide].classList.add('active');

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
    }

    rotateSlides();

    setInterval(() => {
        rotateSlides();
    }, 2500);

});
function openContactModal(){
    document.getElementById('contactModal').classList.add('active');
}

function closeContactModal(){
    document.getElementById('contactModal').classList.remove('active');
}

window.addEventListener('click',(e)=>{
    const modal = document.getElementById('contactModal');

    if(e.target === modal){
        modal.classList.remove('active');
    }
});
function scrollToServices() {
    const servicesSection = document.getElementById('services');

    servicesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
gsap.registerPlugin(ScrollTrigger);

gsap.to(window, {
    scrollTo: {y: "max"},
    duration: 0
});

document.querySelectorAll("a[href^='#']").forEach(anchor=>{
    anchor.addEventListener("click", function(e){
        e.preventDefault();

        gsap.to(window,{
            duration:1,
            scrollTo:this.getAttribute("href"),
            ease:"power3.out"
        });
    });
});
gsap.utils.toArray(".section").forEach((section)=>{
    gsap.from(section, {
        opacity:0,
        y:80,
        duration:1.2,
        ease:"power3.out",
        scrollTrigger:{
            trigger:section,
            start:"top 85%",
        }
    });
});

gsap.utils.toArray(".service-card").forEach((card)=>{
    gsap.from(card, {
        opacity:0,
        y:60,
        scale:0.95,
        duration:0.8,
        ease:"power2.out",
        scrollTrigger:{
            trigger:card,
            start:"top 90%",
        }
    });
});
document.querySelectorAll(".magnetic").forEach(btn=>{
    btn.addEventListener("mousemove",(e)=>{
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;

        btn.style.transform = `translate(${x*0.3}px, ${y*0.3}px)`;
    });

    btn.addEventListener("mouseleave",()=>{
        btn.style.transform = "translate(0,0)";
    });
});
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

class Particle {
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*2 + 0.5;
        this.speedX = Math.random()*0.6 - 0.3;
        this.speedY = Math.random()*0.6 - 0.3;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw(){
        ctx.fillStyle = "rgba(197,255,92,0.7)";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

function initParticles(){
    particles = [];
    for(let i=0;i<100;i++){
        particles.push(new Particle());
    }
}

function connect(){
    for(let a=0;a<particles.length;a++){
        for(let b=a;b<particles.length;b++){
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let dist = dx*dx + dy*dy;

            if(dist < 12000){
                ctx.strokeStyle = "rgba(197,255,92,0.08)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        p.update();
        p.draw();
    });

    connect();

    requestAnimationFrame(animate);
}

initParticles();
animate();
