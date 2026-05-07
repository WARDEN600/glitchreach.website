/* ============================================================
   GLITCH REACH — ENHANCED SCRIPT.JS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ===== DETECT TOUCH / MOBILE =====
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isSmallScreen = window.innerWidth <= 768;

  // ===== CUSTOM CURSOR (desktop only) =====
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
    function animateTrail() {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';
      requestAnimationFrame(animateTrail);
    }
    animateTrail();
  }

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ===== HAMBURGER =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // ===== SMOOTH SCROLL =====
  window.smoothScrollTo = function(selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ===== HERO 3D TILT CARD (desktop only) =====
  const heroCard = document.getElementById('heroCard');
  if (heroCard && !isTouchDevice) {
    const cardInner = heroCard.querySelector('.card-inner');
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      cardInner.style.transform = `rotateY(${dx * 18}deg) rotateX(${-dy * 12}deg) translateZ(10px)`;
    });
    heroCard.addEventListener('mouseleave', () => {
      cardInner.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
    });
  }

  // ===== MAGNETIC BUTTONS (desktop only) =====
  if (!isTouchDevice) {
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ===== SERVICE CARDS 3D HOVER (desktop only) =====
  function setupCard3D(card) {
    if (isTouchDevice) return;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-12px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  }

  // ===== ABOUT VISUAL 3D (desktop only) =====
  const aboutVisual = document.getElementById('aboutVisual');
  if (aboutVisual && !isTouchDevice) {
    aboutVisual.addEventListener('mousemove', (e) => {
      const rect = aboutVisual.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width/2) / (rect.width/2);
      const dy = (e.clientY - rect.top - rect.height/2) / (rect.height/2);
      aboutVisual.style.transform = `perspective(1000px) rotateY(${dx * -8}deg) rotateX(${dy * 5}deg)`;
    });
    aboutVisual.addEventListener('mouseleave', () => {
      aboutVisual.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
  }

  // ===== SERVICE SLIDER =====
  const slides = document.querySelectorAll('.service-slide');
  let currentSlide = 0;

  function rotateSlides() {
    slides.forEach(s => s.classList.remove('active'));
    slides[currentSlide].classList.add('active');
    currentSlide = (currentSlide + 1) % slides.length;
  }
  rotateSlides();
  setInterval(rotateSlides, 2800);

  // ===== SCROLL REVEAL =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('visible');
          if (el.classList.contains('s-card')) setupCard3D(el);
        }, delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.scroll-reveal, .s-card').forEach((el, i) => {
    if (el.classList.contains('s-card')) {
      el.dataset.delay = (i % 3) * 100;
    }
    revealObserver.observe(el);
  });

  // ===== COUNTER ANIMATION =====
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(ease * target);
      if (t < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  // ===== PARTICLE BACKGROUND =====
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  let particles = [];
  // Fewer particles on mobile for performance
  const COUNT = isSmallScreen ? 30 : (window.innerWidth < 1200 ? 60 : 90);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(197,255,92,${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = dx * dx + dy * dy;
        if (dist < 10000) {
          const alpha = (1 - dist / 10000) * 0.07;
          ctx.strokeStyle = `rgba(197,255,92,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Mouse-particle interaction (desktop only)
  let mx = -1000, my = -1000;
  if (!isTouchDevice) {
    canvas.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      // Repel from mouse
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.x += (dx / dist) * force * 2;
        p.y += (dy / dist) * force * 2;
      }
      p.update();
      p.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ===== GLITCH TEXT EFFECT (desktop only) =====
  if (!isTouchDevice) {
    const lines = document.querySelectorAll('.hero-title .line');
    let glitchActive = false;

    function glitchEffect() {
      if (glitchActive) return;
      glitchActive = true;
      let count = 0;
      const interval = setInterval(() => {
        lines.forEach(l => {
          l.style.textShadow = Math.random() > 0.5
            ? `${(Math.random()-0.5)*8}px 0 #c5ff5c, ${(Math.random()-0.5)*6}px 0 rgba(255,0,100,0.5)`
            : 'none';
        });
        count++;
        if (count > 6) {
          clearInterval(interval);
          lines.forEach(l => l.style.textShadow = 'none');
          glitchActive = false;
        }
      }, 60);
    }
    setInterval(glitchEffect, 4000);
  }

  // ===== SECTION PARALLAX (desktop only) =====
  if (!isTouchDevice) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        heroTitle.style.transform = `translateY(${scrollY * 0.12}px)`;
      }
    }, { passive: true });
  }

}); // end DOMContentLoaded

// ===== MODAL =====
function openContactModal() {
  document.getElementById('contactModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeContactModal() {
  document.getElementById('contactModal').classList.remove('active');
  document.body.style.overflow = '';
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('contactModal');
  if (e.target === modal) closeContactModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeContactModal();
});
