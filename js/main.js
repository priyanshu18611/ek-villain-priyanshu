/* ============================================
   EK VILLAIN — FULL REDESIGN
   Advanced Cinematic Interactions
   ============================================ */

(function () {
  'use strict';

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ==================== STATE ====================
  let lenis;
  let isVillainMode = false;
  let cursor = { x: 0, y: 0 };
  let cursorEl, cursorDot, cursorRing;

  // ==================== PRELOADER ====================
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const fill = document.getElementById('preloaderFill');
    const status = document.getElementById('preloaderStatus');
    const countdownNum = document.getElementById('countdownNum');
    const ringProgress = document.getElementById('ringProgress');

    const circumference = 2 * Math.PI * 54;
    ringProgress.style.strokeDasharray = circumference;

    const messages = [
      'INITIALIZING ARCHIVE...',
      'LOADING SYSTEMS...',
      'CALIBRATING LENS...',
      'RENDERING SCENES...',
      'FINALIZING...'
    ];

    let progress = 0;
    const duration = 2800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      progress = Math.min(elapsed / duration, 1);

      fill.style.width = `${progress * 100}%`;
      ringProgress.style.strokeDashoffset = circumference * (1 - progress);

      const count = Math.max(1, Math.ceil(5 * (1 - progress)));
      countdownNum.textContent = count;

      const msgIndex = Math.min(Math.floor(progress * messages.length), messages.length - 1);
      status.textContent = messages[msgIndex];

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Finish
        countdownNum.textContent = '0';
        status.textContent = 'ENTERING ARCHIVE';
        setTimeout(() => {
          preloader.classList.add('hidden');
          document.body.classList.remove('loading');
          initApp();
        }, 400);
      }
    }

    document.body.classList.add('loading');
    requestAnimationFrame(update);
  }

  // ==================== LENIS SMOOTH SCROLL ====================
  function initLenis() {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // ==================== CUSTOM CURSOR ====================
  function initCursor() {
    cursorEl = document.getElementById('cursor');
    cursorDot = cursorEl.querySelector('.cursor-dot');
    cursorRing = cursorEl.querySelector('.cursor-ring');

    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;

    window.addEventListener('mousemove', (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    });

    // Magnetic elements
    const magneticEls = document.querySelectorAll('.magnetic');
    magneticEls.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorEl.classList.add('hover'));
      el.addEventListener('mouseleave', () => {
        cursorEl.classList.remove('hover');
        gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' });
      });
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Hover on links & buttons
    document.querySelectorAll('a, button, .project-card, .filter-btn').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorEl.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorEl.classList.remove('hover'));
    });

    function animateCursor() {
      // Smooth ring follow
      ringX += (cursor.x - ringX) * 0.15;
      ringY += (cursor.y - ringY) * 0.15;
      // Faster dot
      dotX += (cursor.x - dotX) * 0.35;
      dotY += (cursor.y - dotY) * 0.35;

      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // ==================== HERO THREE.JS PARTICLES ====================
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xe63946,
      size: 0.35,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle ambient points (white)
    const geo2 = geometry.clone();
    const mat2 = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.25,
      sizeAttenuation: true
    });
    const particles2 = new THREE.Points(geo2, mat2);
    scene.add(particles2);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
      requestAnimationFrame(animate);

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        // Soft boundaries
        if (Math.abs(pos[i * 3]) > 60) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 40) velocities[i].y *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      particles.rotation.y += 0.0008;
      particles2.rotation.y -= 0.0004;

      // Mouse parallax
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 3 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ==================== SCROLL PROGRESS ====================
  function initProgress() {
    const bar = document.getElementById('progressBar');
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        bar.style.width = `${self.progress * 100}%`;
      }
    });
  }

  // ==================== NAV HIDE ON SCROLL ====================
  function initNav() {
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const current = self.scroll();
        if (current > lastScroll && current > 200) {
          nav.classList.add('hidden');
        } else {
          nav.classList.remove('hidden');
        }
        lastScroll = current;
      }
    });
  }

  // ==================== REVEAL ANIMATIONS ====================
  function initReveals() {
    // Generic reveal
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Line reveals (about title)
    gsap.utils.toArray('.reveal-line').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Hero title lines
    gsap.from('.hero-title .line', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.3
    });

    gsap.from('.hero-overline, .hero-sub, .hero-actions', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.8
    });
  }

  // ==================== COUNTER ANIMATION ====================
  function initCounters() {
    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val);
            }
          });
        }
      });
    });
  }

  // ==================== PROJECT FILTER ====================
  function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach((card) => {
          const categories = card.dataset.category || '';
          const match = filter === 'all' || categories.includes(filter);

          if (match) {
            card.classList.remove('hidden');
            gsap.fromTo(card,
              { opacity: 0, y: 30, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
            );
          } else {
            gsap.to(card, {
              opacity: 0,
              y: 20,
              duration: 0.3,
              onComplete: () => card.classList.add('hidden')
            });
          }
        });
      });
    });
  }

  // ==================== VILLAIN MODE ====================
  function initVillainMode() {
    const toggle = document.getElementById('villainMode');

    function setMode(on) {
      isVillainMode = on;
      document.body.classList.toggle('villain-mode', on);
      toggle.classList.toggle('active', on);
    }

    toggle.addEventListener('click', () => setMode(!isVillainMode));

    // Keyboard V
    window.addEventListener('keydown', (e) => {
      if (e.key === 'v' || e.key === 'V') {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        setMode(!isVillainMode);
      }
    });
  }

  // ==================== KEYBOARD NAVIGATION ====================
  function initKeyboardNav() {
    const sections = Array.from(document.querySelectorAll('.scene'));
    let current = 0;

    const hint = document.getElementById('kbdHint');
    setTimeout(() => hint.classList.add('visible'), 4000);
    setTimeout(() => hint.classList.remove('visible'), 9000);

    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowDown' || e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        current = Math.min(current + 1, sections.length - 1);
        lenis.scrollTo(sections[current], { duration: 1.4 });
      }
      if (e.key === 'ArrowUp' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        current = Math.max(current - 1, 0);
        lenis.scrollTo(sections[current], { duration: 1.4 });
      }
    });

    // Update current on scroll
    sections.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => { current = i; },
        onEnterBack: () => { current = i; }
      });
    });
  }

  // ==================== SMOOTH ANCHOR LINKS ====================
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { duration: 1.5 });
        }
      });
    });
  }

  // ==================== INIT APP ====================
  function initApp() {
    initLenis();
    initCursor();
    initHeroCanvas();
    initProgress();
    initNav();
    initReveals();
    initCounters();
    initFilters();
    initVillainMode();
    initKeyboardNav();
    initAnchors();

    // Refresh ScrollTrigger after everything
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }

  // Start
  initPreloader();
})();
