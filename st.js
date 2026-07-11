// Replace this with your girlfriend's birthdate in YYYY-MM-DD format.
const secretDate = '2007-01-30';
const loadingScreen = document.getElementById('loading-screen');
const passwordScreen = document.getElementById('password-screen');
const passwordForm = document.getElementById('password-form');
const passwordMessage = document.getElementById('password-message');
const site = document.getElementById('site');
const audio = document.getElementById('romance-audio');
const musicToggle = document.getElementById('music-toggle');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const memoryModal = document.getElementById('memory-modal');
const memoryModalImage = document.getElementById('memory-modal-image');
const memoryModalTitle = document.getElementById('memory-modal-title');
const memoryModalText = document.getElementById('memory-modal-text');
const popup = document.getElementById('popup');
const finalButton = document.getElementById('final-button');
const popupClose = document.getElementById('popup-close');
const lightboxClose = document.getElementById('lightbox-close');
const memoryModalClose = document.getElementById('memory-modal-close');
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('locked');
  setTimeout(() => loadingScreen.classList.add('hidden'), 1200);

  const starsContainer = document.getElementById('stars');
  createStars(starsContainer, 70);
  createFloatingHearts();

  passwordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const enteredDate = document.getElementById('secret-date').value;

    if (enteredDate === secretDate) {
      passwordScreen.classList.add('unlocking');
      passwordMessage.textContent = 'Welcome, my love.';
      setTimeout(() => {
        document.body.classList.remove('locked');
        document.body.classList.add('unlocked');
        site.classList.add('visible');
        startAnimations();
        playAudio();
        if (window.innerWidth <= 768) {
          setTimeout(() => scrollToSection('story'), 700);
        }
      }, 1400);
    } else {
      passwordMessage.textContent = 'Oops... Only the Queen of My Heart knows the secret.';
      passwordMessage.animate([
        { transform: 'translateX(-4px)' },
        { transform: 'translateX(4px)' },
        { transform: 'translateX(0)' }
      ], { duration: 300, iterations: 2 });
    }
  });

  document.querySelectorAll('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-scroll-target');
      scrollToSection(targetId);
    });
  });

  document.querySelectorAll('.gallery-card img').forEach((image) => {
    image.addEventListener('click', () => {
      lightboxImage.src = image.src;
      lightbox.classList.add('show');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  [lightboxClose, lightbox].forEach((element) => {
    element.addEventListener('click', () => {
      lightbox.classList.remove('show');
      lightbox.setAttribute('aria-hidden', 'true');
    });
  });

  document.querySelectorAll('.memory-card').forEach((card) => {
    card.addEventListener('click', () => {
      memoryModalImage.src = card.dataset.image;
      memoryModalImage.alt = card.dataset.title;
      memoryModalTitle.textContent = card.dataset.title;
      memoryModalText.textContent = card.dataset.message;
      memoryModal.classList.add('show');
      memoryModal.setAttribute('aria-hidden', 'false');
    });
  });

  const memoryModalCard = document.querySelector('.memory-modal-card');
  memoryModalCard.addEventListener('click', (event) => event.stopPropagation());

  [memoryModalClose, memoryModal].forEach((element) => {
    element.addEventListener('click', () => {
      memoryModal.classList.remove('show');
      memoryModal.setAttribute('aria-hidden', 'true');
    });
  });

  finalButton.addEventListener('click', () => {
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
  });

  popupClose.addEventListener('click', () => {
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
  });

  musicToggle.addEventListener('click', toggleMusic);

  window.addEventListener('mousemove', (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  window.addEventListener('click', (event) => {
    createHeartTrail(event.clientX, event.clientY);
  });

  if ('IntersectionObserver' in window) {
    observeCounters();
  }
});

function scrollToSection(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - 24;
  window.scrollTo({ top, behavior: 'smooth' });
}

function scrollToSection(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - 24;
  window.scrollTo({ top, behavior: 'smooth' });
}

function startAnimations() {
  if (window.Lenis) {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, lerp: 0.1 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-content', { duration: 1.2, y: 50, opacity: 0, ease: 'power3.out' });
    gsap.from('.timeline-card', {
      scrollTrigger: { trigger: '.timeline-grid', start: 'top 80%' },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8
    });

    gsap.utils.toArray('[data-reveal]').forEach((element) => {
      gsap.from(element, {
        scrollTrigger: { trigger: element, start: 'top 85%' },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });
    });
  }
}

function createStars(container, count) {
  for (let i = 0; i < count; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(star);
  }
}

function createFloatingHearts() {
  const hearts = ['💖', '💗', '💞', '💘'];
  const container = document.createElement('div');
  container.className = 'floating-hearts';
  document.body.appendChild(container);

  setInterval(() => {
    const heart = document.createElement('span');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = '100vh';
    heart.style.fontSize = `${1 + Math.random() * 1.3}rem`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1';
    heart.animate([
      { transform: 'translateY(0) scale(1)', opacity: 0.8 },
      { transform: 'translateY(-110vh) scale(0.1)', opacity: 0 }
    ], { duration: 4000, easing: 'ease-out' });
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 900);
}

function createHeartTrail(x, y) {
  const trail = document.createElement('span');
  trail.className = 'heart-trail';
  trail.textContent = '💖';
  trail.style.left = `${x}px`;
  trail.style.top = `${y}px`;
  trail.style.setProperty('--x', `${(Math.random() - 0.5) * 120}px`);
  trail.style.setProperty('--y', `${-140 - Math.random() * 80}px`);
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 900);
}

function playAudio() {
  if (audio) {
    audio.volume = 0.35;
    audio.play().catch(() => {});
  }
}

function toggleMusic() {
  if (!audio) return;
  if (audio.muted) {
    audio.muted = false;
    musicToggle.textContent = 'Mute / Unmute';
  } else {
    audio.muted = true;
    musicToggle.textContent = 'Unmuted';
  }
}

function observeCounters() {
  const counters = document.querySelectorAll('.counter-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.7 });

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
  const target = Number(element.dataset.target);
  let current = 0;
  const duration = 1600;
  const step = Math.max(1, Math.floor(target / 120));
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    current = Math.round(target * progress);
    element.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}
