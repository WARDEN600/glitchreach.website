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