/**
 * Date With Me 💖
 * Core Application Logic, Premium Interactions, and Animations
 * Powered by GSAP, Canvas, Tailwind CSS, Canvas Confetti & html2canvas
 */

// Global State
const state = {
  partner: "Anvi",
  plannedBy: "Vansh",
  selectedMovie: "",
  selectedFoods: [],
  selectedDate: null,
  currentStep: 0,
  isMusicPlaying: false,
  isDarkMode: true,
  noHoverCount: 0,
  mouseX: window.innerWidth / 2,
  mouseY: window.innerHeight / 2
};

// DOM Elements
const elements = {
  loadingScreen: document.getElementById('loading-screen'),
  stepIndicator: document.getElementById('step-indicator'),
  themeToggle: document.getElementById('theme-toggle'),
  sunIcon: document.getElementById('sun-icon'),
  moonIcon: document.getElementById('moon-icon'),
  musicToggle: document.getElementById('music-toggle'),
  musicStatusText: document.getElementById('music-status-text'),
  cursorGlow: document.getElementById('cursor-glow'),
  
  // Sections
  landingSection: document.getElementById('section-landing'),
  movieSection: document.getElementById('section-movie'),
  foodSection: document.getElementById('section-food'),
  dateSection: document.getElementById('section-date'),
  receiptSection: document.getElementById('section-receipt'),
  
  // Landing Elements
  btnYes: document.getElementById('btn-yes'),
  btnNo: document.getElementById('btn-no'),
  tauntMessage: document.getElementById('taunt-message'),
  subtitleTypewriter: document.getElementById('subtitle-typewriter'),
  
  // Movie Elements
  movieCards: document.querySelectorAll('.movie-card'),
  movieCustomInput: document.getElementById('movie-custom-input'),
  btnMovieYes: document.getElementById('btn-movie-yes'),
  btnMovieNo: document.getElementById('btn-movie-no'),
  movieFeedback: document.getElementById('movie-feedback'),
  
  // Food Elements
  foodCards: document.querySelectorAll('.food-card'),
  btnFoodNext: document.getElementById('btn-food-next'),
  
  // Date Elements
  prevMonthBtn: document.getElementById('prev-month'),
  nextMonthBtn: document.getElementById('next-month'),
  calendarMonthYear: document.getElementById('calendar-month-year'),
  calendarDaysContainer: document.getElementById('calendar-days-container'),
  dateConfirmation: document.getElementById('date-confirmation'),
  
  // Receipt Elements
  receiptCaptureArea: document.getElementById('receipt-capture-area'),
  receiptMovie: document.getElementById('receipt-movie'),
  receiptFood: document.getElementById('receipt-food'),
  receiptDate: document.getElementById('receipt-date'),
  btnDownloadReceipt: document.getElementById('btn-download-receipt'),
  btnCopyReceipt: document.getElementById('btn-copy-receipt'),
  btnTelegramShare: document.getElementById('btn-telegram-share'),
  toastMessage: document.getElementById('toast-message')
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎵 ROMANTIC WEB AUDIO API SYNTHESIZER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class RomanticAmbiencePlayer {
  constructor() {
    this.audio = new Audio('./music.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.4; // Soft, ambient background volume
    this.isPlaying = false;
    this.ctx = null;
  }

  init() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass && !this.ctx) {
      this.ctx = new AudioContextClass();
    }
  }

  start() {
    if (this.isPlaying) return;
    this.init();
    
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    this.audio.play().then(() => {
      this.isPlaying = true;
      state.isMusicPlaying = true;
      updateSoundWaveVisual(true);
    }).catch(err => {
      console.warn("Audio playback waiting for user interaction:", err);
    });
  }

  stop() {
    this.audio.pause();
    this.isPlaying = false;
    state.isMusicPlaying = false;
    updateSoundWaveVisual(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

const romanticPlayer = new RomanticAmbiencePlayer();

function updateSoundWaveVisual(isPlaying) {
  const bars = document.querySelectorAll('.sound-wave span');
  bars.forEach((bar, idx) => {
    if (isPlaying) {
      bar.classList.add(`eq-bar-${idx + 1}`);
    } else {
      bar.classList.remove(`eq-bar-${idx + 1}`);
    }
  });
  elements.musicStatusText.innerText = isPlaying ? "AMBIENCE: ON" : "AMBIENCE: OFF";
}

// Sparkle sweep chime
function playSparkleSound() {
  if (!romanticPlayer.ctx) romanticPlayer.init();
  const ctx = romanticPlayer.ctx;
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  
  const now = ctx.currentTime;
  const scale = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6 chimes
  
  scale.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.06);
    
    gain.gain.setValueAtTime(0, now + idx * 0.06);
    gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.06 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now + idx * 0.06);
    osc.stop(now + idx * 0.06 + 0.4);
  });
}

// Playful bounce sound
function playBounceSound() {
  if (!romanticPlayer.ctx) romanticPlayer.init();
  const ctx = romanticPlayer.ctx;
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(480, now + 0.16);
  
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(now);
  osc.stop(now + 0.2);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎨 PARTICLES & CURSOR HEART TRAILS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const cursorCanvas = document.getElementById('cursor-canvas');
const cursorCtx = cursorCanvas.getContext('2d');
const bgCanvas = document.getElementById('bg-particles');
const bgCtx = bgCanvas.getContext('2d');

let cursorParticles = [];
let bgParticles = [];

function resizeCanvases() {
  cursorCanvas.width = window.innerWidth;
  cursorCanvas.height = window.innerHeight;
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvases);
resizeCanvases();

function drawHeartShape(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y + size / 4);
  ctx.quadraticCurveTo(x, y - size / 3, x - size / 2, y - size / 3);
  ctx.quadraticCurveTo(x - size, y - size / 3, x - size, y + size / 4);
  ctx.quadraticCurveTo(x - size, y + size * 0.75, x, y + size * 1.25);
  ctx.quadraticCurveTo(x + size, y + size * 0.75, x + size, y + size / 4);
  ctx.quadraticCurveTo(x + size, y - size / 3, x + size / 2, y - size / 3);
  ctx.quadraticCurveTo(x, y - size / 3, x, y + size / 4);
  ctx.closePath();
  ctx.fill();
}

class HeartTrailParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 7 + 5;
    this.alpha = 1.0;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2 - 1.2;
    this.color = Math.random() > 0.5 ? '#ff7597' : '#b57cff';
    this.rotation = Math.random() * Math.PI * 2;
    this.decay = Math.random() * 0.012 + 0.008;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
    this.size *= 0.985;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    drawHeartShape(ctx, 0, 0, this.size);
    ctx.restore();
  }
}

class BgParticle {
  constructor() {
    this.reset();
    this.y = Math.random() * window.innerHeight;
  }

  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = window.innerHeight + 20;
    this.size = Math.random() * 4 + 1.5;
    this.alpha = Math.random() * 0.35 + 0.12;
    // Speed increases when music plays
    this.speed = (Math.random() * 0.6 + 0.25);
    this.wobbleVal = Math.random() * 100;
    this.wobbleSpeed = Math.random() * 0.02 + 0.005;
    this.isHeart = Math.random() > 0.6;
    this.color = Math.random() > 0.6 ? '#ff7597' : '#b57cff';
  }

  update() {
    const speedMult = state.isMusicPlaying ? 1.8 : 1.0;
    this.y -= this.speed * speedMult;
    this.wobbleVal += this.wobbleSpeed;
    this.x += Math.sin(this.wobbleVal) * 0.3;
    
    if (this.y < -20) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    if (this.isHeart) {
      drawHeartShape(ctx, this.x, this.y, this.size * 1.4);
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

// Spawn background floaters (Throttled count for mobile screens)
const isMobileDevice = window.innerWidth < 768;
const bgParticleCount = isMobileDevice ? 18 : 45;
for (let i = 0; i < bgParticleCount; i++) {
  bgParticles.push(new BgParticle());
}

// Render Loops
let timer = 0;
function animate() {
  timer += 0.01;
  cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

  // Background particles
  bgParticles.forEach(p => {
    p.update();
    p.draw(bgCtx);
  });

  // Cursor trail
  cursorParticles.forEach((p, idx) => {
    p.update();
    p.draw(cursorCtx);
    if (p.alpha <= 0) {
      cursorParticles.splice(idx, 1);
    }
  });

  // Music reactivity: Pulsate background mesh blur orbs
  if (state.isMusicPlaying) {
    const scalePulse = 1.0 + Math.sin(timer * 5) * 0.04;
    gsap.to('#orb-pink', { scale: scalePulse, duration: 0.1, overwrite: 'auto' });
    gsap.to('#orb-purple', { scale: scalePulse * 0.95, duration: 0.1, overwrite: 'auto' });
  }

  requestAnimationFrame(animate);
}
animate();

// Spawning mouse tracks
let lastX = 0;
let lastY = 0;
window.addEventListener('mousemove', (e) => {
  state.mouseX = e.clientX;
  state.mouseY = e.clientY;
  
  // Custom cursor spotlight update
  if (elements.cursorGlow.style.display !== 'block') {
    elements.cursorGlow.style.display = 'block';
  }
  
  gsap.to(elements.cursorGlow, {
    left: e.clientX,
    top: e.clientY,
    duration: 0.15,
    ease: 'power2.out'
  });

  // Performance Optimization: Throttle heart spawns by movement distance
  const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
  if (dist > 15) {
    cursorParticles.push(new HeartTrailParticle(e.clientX, e.clientY));
    lastX = e.clientX;
    lastY = e.clientY;
    
    const maxTrail = isMobileDevice ? 20 : 35;
    if (cursorParticles.length > maxTrail) cursorParticles.shift();
  }
  
  // Parallax shifts
  handleParallax(e.clientX, e.clientY);
  // Magnetic attractions
  handleMagneticButtons(e.clientX, e.clientY);
});

window.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    const dist = Math.hypot(touch.clientX - lastX, touch.clientY - lastY);
    if (dist > 20) {
      cursorParticles.push(new HeartTrailParticle(touch.clientX, touch.clientY));
      lastX = touch.clientX;
      lastY = touch.clientY;
      
      if (cursorParticles.length > 20) cursorParticles.shift();
    }
    handleParallax(touch.clientX, touch.clientY);
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌌 CINEMATIC BACKGROUND MESH PARALLAX
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function handleParallax(clientX, clientY) {
  // Normalize cursor positions relative to center screen: range (-1 to 1)
  const normX = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
  const normY = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);
  
  // Move active panel card forward and slightly follow mouse rotation
  const activeCard = document.querySelector('.page-section.active > div');
  if (activeCard) {
    gsap.to(activeCard, {
      x: normX * 12,
      y: normY * 12,
      rotationY: normX * 4,
      rotationX: -normY * 4,
      duration: 0.6,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  }

  // Shift background mesh orbs in opposite directions to establish deep 3D separation
  gsap.to('#orb-pink', { x: -normX * 45, y: -normY * 45, duration: 0.8, ease: 'power2.out' });
  gsap.to('#orb-purple', { x: normX * 35, y: normY * 35, duration: 0.8, ease: 'power2.out' });
  gsap.to('#orb-lavender', { x: -normX * 25, y: normY * 25, duration: 0.8, ease: 'power2.out' });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💕 MAGNETIC BUTTON CALCULATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function handleMagneticButtons(clientX, clientY) {
  const magnets = document.querySelectorAll('.magnetic-btn-wrap');
  magnets.forEach(mag => {
    const rect = mag.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Distance formula
    const dist = Math.hypot(clientX - centerX, clientY - centerY);
    
    // Hover grab threshold
    if (dist < 70) {
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      
      // Pull button towards cursor coordinates
      gsap.to(mag, {
        x: dx * 0.4,
        y: dy * 0.4,
        rotationZ: dx * 0.08,
        duration: 0.2,
        ease: 'power2.out'
      });
    } else {
      // Spring return back to zero origin
      gsap.to(mag, {
        x: 0,
        y: 0,
        rotationZ: 0,
        duration: 0.45,
        ease: 'elastic.out(1.1, 0.4)'
      });
    }
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✍️ TYPEWRITER ENGINE FOR SUBTITLE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function typeSubtitle() {
  const text = "I made this little universe just for you ✨";
  let idx = 0;
  elements.subtitleTypewriter.innerText = "";
  
  function typeChar() {
    if (idx < text.length) {
      elements.subtitleTypewriter.innerText += text.charAt(idx);
      idx++;
      setTimeout(typeChar, 50);
    } else {
      // Remove typing cursor indicator
      elements.subtitleTypewriter.classList.remove('typing-cursor');
    }
  }
  typeChar();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧭 PANEL SLIDE TRANSITIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function navigateToStep(stepIndex) {
  const sections = [
    elements.landingSection,
    elements.movieSection,
    elements.foodSection,
    elements.dateSection,
    elements.receiptSection
  ];

  const currentSection = document.querySelector('.page-section.active');
  const targetSection = sections[stepIndex];
  
  if (!currentSection || !targetSection) return;

  state.currentStep = stepIndex;

  // Update Indicator dots
  const dots = document.querySelectorAll('.dot-step');
  dots.forEach((dot, idx) => {
    if (idx <= stepIndex) {
      dot.classList.add('bg-pink-500');
      dot.classList.remove('bg-slate-600');
      if (idx === stepIndex) dot.classList.add('scale-125');
    } else {
      dot.classList.remove('bg-pink-500', 'scale-125');
      dot.classList.add('bg-slate-600');
    }
  });
  
  if (stepIndex > 0) {
    elements.stepIndicator.classList.remove('hidden');
    elements.stepIndicator.classList.add('flex');
  }

  // Luxury cinematic transition: Slide up + Blur crossfade
  gsap.to(currentSection, {
    opacity: 0,
    y: -40,
    filter: 'blur(10px)',
    scale: 0.94,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      currentSection.classList.remove('active');
      
      targetSection.classList.add('active');
      gsap.fromTo(targetSection, 
        { opacity: 0, y: 50, filter: 'blur(10px)', scale: 0.94 },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          scale: 1, 
          duration: 0.75, 
          ease: 'back.out(1.15)',
          onComplete: () => {
            // Trigger step specifics
            if (stepIndex === 3) {
              renderCalendar();
            } else if (stepIndex === 4) {
              buildReceiptData();
              triggerReceiptArrivalAnimation();
            }
          }
        }
      );
    }
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌸 LANDING PAGE INTERACTIVE YES / NO ESCAPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let yesScale = 1.0;

const taunts = [
  "Are you sure? 🥺",
  "Think again 😭",
  "Wrong answer detected 💔",
  "Pleaseeee 💖",
  "Not an option! 😉",
  "Access Denied 🚫",
  "Choose YES! 💕",
  "I'm waiting! 🥺😘",
  "Try again! 😈"
];

function spawnFloatingTaunt(txt, x, y) {
  const el = document.createElement('div');
  el.className = 'floating-taunt font-title';
  el.innerText = txt;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

function escapeNoButton() {
  playBounceSound();
  state.noHoverCount++;

  // Screen shake on main panel card
  const activeCard = document.querySelector('#section-landing > div');
  gsap.fromTo(activeCard, 
    { x: -8 }, 
    { x: 8, duration: 0.05, repeat: 5, yoyo: true, onComplete: () => gsap.set(activeCard, { x: 0 }) }
  );

  // Grow the YES button scale with smooth elastic feedback
  yesScale += 0.25;
  gsap.to(elements.btnYes, {
    scale: yesScale,
    duration: 0.4,
    ease: 'back.out(1.6)'
  });

  // Snapshot position relative to document if not absolute-positioned yet
  if (elements.btnNo.style.position !== 'absolute') {
    const rect = elements.btnNo.getBoundingClientRect();
    const docX = rect.left + window.scrollX;
    const docY = rect.top + window.scrollY;
    
    elements.btnNo.style.left = `${docX}px`;
    elements.btnNo.style.top = `${docY}px`;
    elements.btnNo.style.position = 'absolute';
    elements.btnNo.style.margin = '0';
    
    // Append to body to avoid parent overflow cuts and layout shifts
    document.body.appendChild(elements.btnNo);
  }

  // Reposition NO Button randomly inside viewport, accounting for scroll offsets
  const btnWidth = elements.btnNo.offsetWidth;
  const btnHeight = elements.btnNo.offsetHeight;
  
  const minX = 20;
  const maxX = window.innerWidth - btnWidth - 20;
  
  // Keep layout safe from top navbar overlap
  const minY = window.scrollY + 100;
  const maxY = window.scrollY + window.innerHeight - btnHeight - 80;

  const newX = Math.random() * (maxX - minX) + minX;
  const newY = Math.random() * (maxY - minY) + minY;
  
  // Spring jump ease (absolute positions will scroll naturally with page contents!)
  gsap.to(elements.btnNo, {
    left: newX,
    top: newY,
    duration: 0.35,
    ease: 'power3.out'
  });

  // Spawn visual floating taunt text
  const randText = taunts[Math.floor(Math.random() * taunts.length)];
  spawnFloatingTaunt(randText, newX + btnWidth / 2, newY - 10);
  
  // Sparkle burst around button
  burstHearts(newX + btnWidth / 2, newY + btnHeight / 2, 4);
}

function burstHearts(clientX, clientY, count = 10) {
  const emojis = ['💖', '❤️', '💕', '💘', '✨', '🌸'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'heart-particle';
    p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = `${clientX}px`;
    p.style.top = `${clientY}px`;
    
    const tx = (Math.random() - 0.5) * 160;
    const ty = (Math.random() - 0.5) * 160 - 80;
    const rot = (Math.random() - 0.5) * 180;
    
    p.style.setProperty('--tx', `${tx}px`);
    p.style.setProperty('--ty', `${ty}px`);
    p.style.setProperty('--rot', `${rot}deg`);
    
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1400);
  }
}

// NO Button listeners
elements.btnNo.addEventListener('mouseenter', escapeNoButton);
elements.btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  escapeNoButton();
});
elements.btnNo.addEventListener('click', (e) => {
  e.preventDefault();
  escapeNoButton();
});

// YES Button listener
elements.btnYes.addEventListener('click', () => {
  playSparkleSound();
  
  // Start music automatically on click if blocked by browser rules
  if (!state.isMusicPlaying) {
    const started = romanticPlayer.toggle();
    state.isMusicPlaying = started;
    updateSoundWaveVisual(started);
  }

  // Big Confetti explosion
  confetti({
    particleCount: 160,
    spread: 85,
    origin: { y: 0.65 }
  });

  // Heart bursts
  const rect = elements.btnYes.getBoundingClientRect();
  burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);

  setTimeout(() => {
    navigateToStep(1);
  }, 1000);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎬 MOVIE QUESTION PAGE SELECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
elements.movieCards.forEach(card => {
  card.addEventListener('click', () => {
    elements.movieCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    // Smooth card pop animation
    gsap.fromTo(card, { scale: 0.96 }, { scale: 1.0, duration: 0.3, ease: 'back.out(1.5)' });
    
    state.selectedMovie = card.getAttribute('data-movie');
    elements.movieCustomInput.value = "";
    
    playSparkleSound();
    elements.btnMovieYes.disabled = false;
  });
});

elements.movieCustomInput.addEventListener('input', () => {
  const val = elements.movieCustomInput.value.trim();
  if (val !== "") {
    elements.movieCards.forEach(c => c.classList.remove('selected'));
    state.selectedMovie = val + " 🍿";
    elements.btnMovieYes.disabled = false;
  } else {
    elements.btnMovieYes.disabled = true;
  }
});

// Both buttons on movie page are positive affirmations!
function confirmMovieChoice() {
  if (!state.selectedMovie) {
    state.selectedMovie = "A Romantic Surprise Movie 🍿✨";
  }
  playSparkleSound();
  elements.movieFeedback.innerText = "Best date ever confirmed 😭💖";
  elements.movieFeedback.style.opacity = '1';
  
  confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
  
  setTimeout(() => {
    navigateToStep(2);
  }, 1600);
}

elements.btnMovieYes.addEventListener('click', confirmMovieChoice);
elements.btnMovieNo.addEventListener('click', confirmMovieChoice);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🍔 FOOD SELECTION INTERACTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
elements.foodCards.forEach(card => {
  card.addEventListener('click', () => {
    const foodVal = card.getAttribute('data-food');
    
    if (card.classList.contains('selected')) {
      card.classList.remove('selected');
      state.selectedFoods = state.selectedFoods.filter(item => item !== foodVal);
    } else {
      card.classList.add('selected');
      state.selectedFoods.push(foodVal);
      playSparkleSound();
      
      // Card bounce animation
      gsap.fromTo(card, { scale: 0.95 }, { scale: 1.04, duration: 0.35, ease: 'back.out(1.8)' });
      createCardSparkles(card);
    }
    
    elements.btnFoodNext.disabled = state.selectedFoods.length === 0;
  });
});

function createCardSparkles(card) {
  for (let i = 0; i < 4; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'absolute text-xs pointer-events-none text-pinkTheme';
    sparkle.innerHTML = '✨';
    sparkle.style.left = `${Math.random() * 80 + 10}%`;
    sparkle.style.top = `${Math.random() * 80 + 10}%`;
    card.appendChild(sparkle);
    
    gsap.to(sparkle, {
      y: -25,
      opacity: 0,
      scale: 1.6,
      duration: 0.8 + Math.random() * 0.4,
      onComplete: () => sparkle.remove()
    });
  }
}

elements.btnFoodNext.addEventListener('click', () => {
  if (state.selectedFoods.length === 0) return;
  playSparkleSound();
  navigateToStep(3);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📅 DATE PICKER MINI CALENDAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let calendarYear = 2026;
let calendarMonth = 5; // June (0-indexed = May, 5 = June)

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function renderCalendar() {
  elements.calendarMonthYear.innerText = `${monthNames[calendarMonth]} ${calendarYear}`;
  elements.calendarDaysContainer.innerHTML = "";
  
  // Current metadata baseline June 12, 2026
  const currentYear = 2026;
  const currentMonth = 5;
  const currentDay = 12;
  
  const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
  const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  
  for (let i = 0; i < firstDayIndex; i++) {
    const blank = document.createElement('span');
    elements.calendarDaysContainer.appendChild(blank);
  }
  
  for (let day = 1; day <= totalDays; day++) {
    const dayBtn = document.createElement('button');
    dayBtn.className = "calendar-day active-day font-title font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all w-8 h-8 md:w-9 md:h-9 mx-auto";
    dayBtn.innerText = day;
    
    let isPast = false;
    if (calendarYear < currentYear) {
      isPast = true;
    } else if (calendarYear === currentYear) {
      if (calendarMonth < currentMonth) {
        isPast = true;
      } else if (calendarMonth === currentMonth) {
        if (day < currentDay) {
          isPast = true;
        }
      }
    }
    
    if (isPast) {
      dayBtn.classList.add('disabled-day');
      dayBtn.disabled = true;
    }
    
    if (state.selectedDate && 
        state.selectedDate.year === calendarYear && 
        state.selectedDate.month === calendarMonth && 
        state.selectedDate.day === day) {
      dayBtn.classList.add('selected-day');
    }
    
    dayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const selected = elements.calendarDaysContainer.querySelector('.selected-day');
      if (selected) selected.classList.remove('selected-day');
      
      dayBtn.classList.add('selected-day');
      state.selectedDate = {
        year: calendarYear,
        month: calendarMonth,
        day: day
      };
      
      playSparkleSound();
      
      const formattedDate = `${monthNames[calendarMonth]} ${day}, ${calendarYear}`;
      elements.dateConfirmation.innerText = `I’m already excited for this 😭💖\nConfirmed: ${formattedDate}`;
      
      gsap.fromTo(elements.dateConfirmation, 
        { opacity: 0, scale: 0.8, filter: 'blur(5px)' }, 
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'back.out(1.5)' }
      );
      
      confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.7 }
      });
      
      setTimeout(() => {
        navigateToStep(4);
      }, 1600);
    });
    
    elements.calendarDaysContainer.appendChild(dayBtn);
  }
}

elements.prevMonthBtn.addEventListener('click', () => {
  if (calendarYear === 2026 && calendarMonth === 5) return;
  calendarMonth--;
  if (calendarMonth < 0) {
    calendarMonth = 11;
    calendarYear--;
  }
  renderCalendar();
  playBounceSound();
});

elements.nextMonthBtn.addEventListener('click', () => {
  calendarMonth++;
  if (calendarMonth > 11) {
    calendarMonth = 0;
    calendarYear++;
  }
  renderCalendar();
  playBounceSound();
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧾 LUXURY THERMAL RECEIPT PAGE & SHARES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildReceiptData() {
  elements.receiptMovie.innerText = state.selectedMovie || "Romantic Surprise Movie 🍿✨";
  
  if (state.selectedFoods.length > 0) {
    elements.receiptFood.innerText = state.selectedFoods.join(", ");
  } else {
    elements.receiptFood.innerText = "Yummy treats";
  }
  
  if (state.selectedDate) {
    elements.receiptDate.innerText = `${monthNames[state.selectedDate.month]} ${state.selectedDate.day}, ${state.selectedDate.year}`;
  } else {
    elements.receiptDate.innerText = "Locked Day 💕";
  }
  
  const codeID = Math.floor(Math.random() * 9000) + 1000;
  document.getElementById('receipt-id').innerText = `ID: #LOVE-${codeID}-0612`;
}

// 3D fold reveal entrance
function triggerReceiptArrivalAnimation() {
  const receiptCard = document.querySelector('.receipt-card');
  
  gsap.set(receiptCard, { 
    rotationX: -45, 
    y: 120, 
    opacity: 0,
    transformOrigin: "center top",
    transformPerspective: 1000
  });
  
  // Confetti spray loops
  const duration = 2.5 * 1000;
  const end = Date.now() + duration;
  
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 55,
      spread: 50,
      origin: { x: 0, y: 0.85 }
    });
    confetti({
      particleCount: 2,
      angle: 125,
      spread: 50,
      origin: { x: 1, y: 0.85 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());

  gsap.to(receiptCard, {
    rotationX: 0,
    y: 0,
    opacity: 1,
    duration: 1.35,
    ease: 'power3.out',
    delay: 0.2
  });
}

// Copy URL link
elements.btnCopyReceipt.addEventListener('click', () => {
  const base = window.location.origin + window.location.pathname;
  const foodsParam = encodeURIComponent(state.selectedFoods.join(","));
  const movieParam = encodeURIComponent(state.selectedMovie);
  const dateParam = state.selectedDate ? `${state.selectedDate.day}-${state.selectedDate.month + 1}-${state.selectedDate.year}` : "";
  
  const link = `${base}?movie=${movieParam}&foods=${foodsParam}&date=${dateParam}`;
  
  navigator.clipboard.writeText(link).then(() => {
    elements.toastMessage.style.opacity = '1';
    playSparkleSound();
    
    setTimeout(() => {
      elements.toastMessage.style.opacity = '0';
    }, 2000);
  }).catch(err => {
    console.error("Copy failed:", err);
  });
});

// Download receipt PNG
elements.btnDownloadReceipt.addEventListener('click', () => {
  playSparkleSound();
  const captureArea = elements.receiptCaptureArea;
  
  html2canvas(captureArea, {
    scale: 2, // retina crisp scaling
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'date_proposal_receipt_anvi_vansh.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});

// Telegram share redirect to @Vk21_08
elements.btnTelegramShare.addEventListener('click', () => {
  playSparkleSound();
  
  const movieText = state.selectedMovie || "Romantic Surprise Movie 🍿✨";
  const foodsText = state.selectedFoods.join(", ") || "Yummy food";
  let dateText = "Locked Day 💕";
  if (state.selectedDate) {
    dateText = `${monthNames[state.selectedDate.month]} ${state.selectedDate.day}, ${state.selectedDate.year}`;
  }
  
  const textMsg = `Hey Vansh! I confirmed our date receipt! 💖😘\n\n` +
                  `🎬 MOVIE: ${movieText}\n` +
                  `🍟 FOOD: ${foodsText}\n` +
                  `📅 DATE: ${dateText}\n\n` +
                  `♾️ Love levels: Infinite! See you soon! ❤️`;
                  
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent("https://anvi-vansh-date.net")}&text=${encodeURIComponent(textMsg)}`;
  window.open(shareUrl, '_blank');
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⚙️ GLOBAL DASHBOARD CONTROLS (THEME & MUSIC)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
elements.themeToggle.addEventListener('click', () => {
  playBounceSound();
  const html = document.documentElement;
  
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    elements.sunIcon.classList.remove('hidden');
    elements.moonIcon.classList.add('hidden');
    state.isDarkMode = false;
    document.body.className = "bg-romantic-light text-slate-800 flex flex-col min-h-screen relative";
  } else {
    html.classList.add('dark');
    elements.sunIcon.classList.add('hidden');
    elements.moonIcon.classList.remove('hidden');
    state.isDarkMode = true;
    document.body.className = "bg-romantic-dark text-slate-100 flex flex-col min-h-screen relative";
  }
  
  // Refresh calendar text color based on light/dark switch
  if (state.currentStep === 3) {
    renderCalendar();
  }
});

elements.musicToggle.addEventListener('click', () => {
  const started = romanticPlayer.toggle();
  state.isMusicPlaying = started;
  updateSoundWaveVisual(started);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚀 APPLICATION BOOTSTRAP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window.addEventListener('DOMContentLoaded', () => {
  // Fadeout loader screen
  setTimeout(() => {
    gsap.to(elements.loadingScreen, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        elements.loadingScreen.style.display = 'none';
        
        // Start typewriter subtitle
        typeSubtitle();
        
        // Staggered landing panel entrance animation
        gsap.from('#section-landing > div > *', {
          opacity: 0,
          y: 30,
          scale: 0.96,
          duration: 0.85,
          stagger: 0.15,
          ease: 'back.out(1.4)'
        });
      }
    });
  }, 1600);
});
