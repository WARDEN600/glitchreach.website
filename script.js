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
