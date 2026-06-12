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
  mouseY: window.innerHeight / 2,
  isPoetryMode: false
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
  sectionPoetry: document.getElementById('section-poetry'),
  receiptSection: document.getElementById('section-receipt'),
  
  // Poetry Elements
  poetryLoading: document.getElementById('poetry-loading'),
  poetryDisplay: document.getElementById('poetry-display'),
  poemTitle: document.getElementById('poem-title'),
  poemContent: document.getElementById('poem-content'),
  poemAuthor: document.getElementById('poem-author'),
  btnNextPoem: document.getElementById('btn-next-poem'),
  btnPoetryNext: document.getElementById('btn-poetry-next'),
  
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
    
    this.audio.volume = state.isPoetryMode ? 0.12 : 0.4;
    
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
    this.y = state.isPoetryMode ? -20 : window.innerHeight + 20;
    this.size = Math.random() * 4 + 1.8;
    this.alpha = Math.random() * 0.35 + 0.15;
    this.speed = (Math.random() * 0.6 + 0.25);
    this.wobbleVal = Math.random() * 100;
    this.wobbleSpeed = Math.random() * 0.02 + 0.005;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() * 0.02 - 0.01);
    
    if (state.isPoetryMode) {
      const rand = Math.random();
      if (rand < 0.45) {
        this.type = 'petal';
        this.color = Math.random() > 0.5 ? '#ff4f79' : '#ff7597';
      } else if (rand < 0.75) {
        this.type = 'sparkle';
        this.color = '#fffdeb';
      } else {
        this.type = 'heart';
        this.color = '#ff7597';
      }
    } else {
      this.type = Math.random() > 0.6 ? 'heart' : 'circle';
      this.color = Math.random() > 0.6 ? '#ff7597' : '#b57cff';
    }
  }

  update() {
    let speedMult = state.isMusicPlaying ? 1.8 : 1.0;
    if (state.isPoetryMode) {
      speedMult *= 0.45; // Slower drift for dreamy cinematic effect
    }
    
    this.wobbleVal += this.wobbleSpeed;
    this.rotation += this.rotationSpeed;
    
    if (state.isPoetryMode) {
      // Gentle drift downwards
      this.y += this.speed * speedMult;
      this.x += Math.sin(this.wobbleVal) * 0.4;
      
      if (this.y > window.innerHeight + 20) {
        this.reset();
      }
    } else {
      // Normal drift upwards
      this.y -= this.speed * speedMult;
      this.x += Math.sin(this.wobbleVal) * 0.3;
      
      if (this.y < -20) {
        this.reset();
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    
    if (this.type === 'petal') {
      // Draw organic rose petal shape
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.8, this.size, this.size * 0.5, 0, this.size);
      ctx.bezierCurveTo(-this.size, this.size * 0.5, -this.size * 0.8, -this.size * 0.8, 0, -this.size);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'sparkle') {
      // Draw 4-point star sparkle
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 1.5);
      ctx.quadraticCurveTo(0, 0, this.size * 1.5, 0);
      ctx.quadraticCurveTo(0, 0, 0, this.size * 1.5);
      ctx.quadraticCurveTo(0, 0, -this.size * 1.5, 0);
      ctx.quadraticCurveTo(0, 0, 0, -this.size * 1.5);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'heart') {
      drawHeartShape(ctx, this.x, this.y, this.size * 1.4);
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
}

// Spawn background floaters (Disabled on mobile screens to protect performance)
const isMobileDevice = window.innerWidth < 768;
const bgParticleCount = isMobileDevice ? 0 : 45;
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

  // Shift background mesh orbs in opposite directions (disabled on mobile for performance)
  if (!isMobileDevice) {
    gsap.to('#orb-pink', { x: -normX * 45, y: -normY * 45, duration: 0.8, ease: 'power2.out' });
    gsap.to('#orb-purple', { x: normX * 35, y: normY * 35, duration: 0.8, ease: 'power2.out' });
    gsap.to('#orb-lavender', { x: -normX * 25, y: normY * 25, duration: 0.8, ease: 'power2.out' });
  }
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
    elements.sectionPoetry,
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
              shiftAtmosphere(true);
              loadPoem();
            } else if (stepIndex === 5) {
              shiftAtmosphere(false);
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
// 💌 POETRY LOGIC & ATMOSPHERE CONTROL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const fallbackPoems = [
  {
    title: "Sonnet XVII",
    author: "Pablo Neruda",
    poem: "I do not love you as if you were salt-rose, or topaz,\nor the arrow of carnations the fire shoots off.\nI love you as certain dark things are to be loved,\nin secret, between the shadow and the soul.\n\nI love you as the plant that never blooms\nbut carries in itself the light of hidden flowers;\nthanks to your love a certain solid fragrance,\nrisen from the earth, lives darkly in my body.\n\nI love you without knowing how, or when, or from where.\nI love you straightforwardly, without complexities or pride;\nso I love you because I know no other way than this:\n\nwhere I does not exist, nor you,\nso close that your hand on my chest is my hand,\nso close that your eyes close as I fall asleep."
  },
  {
    title: "i carry your heart with me",
    author: "E. E. Cummings",
    poem: "i carry your heart with me(i carry it in\nmy heart)i am never without it(anywhere\ni go you go,my dear;and whatever is done\nby only me is your doing,my darling)\ni fear\nno fate(for you are my fate,my sweet)i want\nno world(for beautiful you are my world,my true)\nand it’s you are whatever a moon has always meant\nand whatever a sun will always sing is you\n\nhere is the deepest secret nobody knows\n(here is the root of the root and the bud of the bud\nand the sky of the sky of a tree called life;which grows\nhigher than soul can hope or mind can hide)\nand this is the wonder that's keeping the stars apart\n\ni carry your heart(i carry it in my heart)"
  },
  {
    title: "Sonnet 18",
    author: "William Shakespeare",
    poem: "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date;\nSometime too hot the eye of heaven shines,\nAnd often is his gold complexion dimm'd;\nAnd every fair from fair sometimes declines,\nBy chance or nature's changing course untrimm'd;\nBut thy eternal summer shall not fade,\nNor lose possession of that fair thou ow'st;\nNor shall death brag thou wander'st in his shade,\nWhen in eternal lines to time thou grow'st:\nSo long as men can breathe or eyes can see,\nSo long lives this, and this gives life to thee."
  },
  {
    title: "How Do I Love Thee?",
    author: "Elizabeth Barrett Browning",
    poem: "How do I love thee? Let me count the ways.\nI love thee to the depth and breadth and height\nMy soul can reach, when feeling out of sight\nFor the ends of being and ideal grace.\nI love thee to the level of every day's\nMost quiet need, by sun and candle-light.\nI love thee freely, as men strive for right.\nI love thee purely, as they turn from praise.\nI love thee with the passion put to use\nIn my old griefs, and with my childhood's faith.\nI love thee with a love I seemed to lose\nWith my lost saints. I love thee with the breath,\nSmiles, tears, of all my life; and, if God choose,\nI shall but love thee better after death."
  },
  {
    title: "She Walks in Beauty",
    author: "Lord Byron",
    poem: "She walks in beauty, like the night\nOf cloudless climes and starry skies;\nAnd all that’s best of dark and bright\nMeet in her aspect and her eyes;\nThus mellowed to that tender light\nWhich heaven to gaudy day denies.\n\nOne shade the more, one ray the less,\nHad half impaired the nameless grace\nWhich waves in every raven tress,\nOr softly lightens o’er her face;\nWhere thoughts serenely sweet express,\nHow pure, how dear their dwelling-place.\n\nAnd on that cheek, and o'er that brow,\nSo soft, so calm, yet eloquent,\nThe smiles that win, the tints that glow,\nBut tell of days in goodness spent,\nA mind at peace with all below,\nA heart whose love is innocent!"
  },
  {
    title: "Bright Star",
    author: "John Keats",
    poem: "Bright star, would I were stedfast as thou art—\nNot in lone splendour hung aloft the night\nAnd watching, with eternal lids apart,\nLike nature's patient, sleepless Eremite,\nThe moving waters at their priestlike task\nOf pure ablution round earth's human shores,\nOr gazing on the new soft-fallen mask\nOf snow upon the mountains and the moors—\nNo—yet still stedfast, still unchangeable,\nPillow'd upon my fair love's ripening breast,\nTo feel for ever its soft fall and swell,\nAwake for ever in a sweet unrest,\nStill, still to hear her tender-taken breath,\nAnd so live ever—or else swoon to death."
  },
  {
    title: "I Am Not Yours",
    author: "Sara Teasdale",
    poem: "I am not yours, not lost in you, not lost,\nAlthough I long to be lost, utterly lost,\nLost as a candle lit at noon,\nLost as a snowflake in the sea.\n\nYou love me, and I find you still\nA spirit beautiful and bright,\nA light upon my journey, yet\nI am not yours, no, not yours quite.\n\nI want to lose myself, to be\nDeluged in your love, to be\nLike a light, a flower, a wind,\nLike a temple or a tree.\n\nI want to surrender, to be lost,\nTo be consumed by you,\nA spark in the great fire of your soul,\nA drop in the vast ocean of your love."
  },
  {
    title: "Annabel Lee",
    author: "Edgar Allan Poe",
    poem: "It was many and many a year ago,\nIn a kingdom by the sea,\nThat a maiden there lived whom you may know\nBy the name of Annabel Lee;\nAnd this maiden she lived with no other thought\nThan to love and be loved by me.\n\nI was a child and she was a child,\nIn this kingdom by the sea,\nBut we loved with a love that was more than love—\nI and my Annabel Lee—\nWith a love that the wingèd seraphs of Heaven\nCoveted her and me.\n\nAnd this was the reason that, long ago,\nIn this kingdom by the sea,\nA wind blew out of a cloud, chilling\nMy beautiful Annabel Lee;\nSo that her highborn kinsmen came\nAnd bore her away from me,\nTo shut her up in a sepulchre\nIn this kingdom by the sea."
  }
];

function shiftAtmosphere(isPoetry) {
  state.isPoetryMode = isPoetry;
  
  // Fade background music volume
  if (romanticPlayer && romanticPlayer.audio) {
    const targetVolume = isPoetry ? 0.12 : 0.4;
    gsap.to(romanticPlayer.audio, {
      volume: targetVolume,
      duration: 1.8,
      ease: 'power1.inOut'
    });
  }
  
  // Cinematic background transitions (slower, blurred, deeper)
  const orbs = document.querySelectorAll('.blur-orb');
  if (isPoetry) {
    gsap.to(orbs, {
      filter: 'blur(160px)',
      opacity: 0.6,
      duration: 2.5,
      ease: 'power2.out'
    });
    // Convert current background particles to poetry theme (roses/sparkles/hearts)
    bgParticles.forEach(p => {
      p.reset();
    });
  } else {
    gsap.to(orbs, {
      filter: 'blur(130px)',
      opacity: 0.4,
      duration: 2.0,
      ease: 'power2.out'
    });
  }
}

async function loadPoem() {
  // Show shimmer skeleton loader, hide display
  elements.poetryDisplay.classList.add('hidden');
  elements.poetryLoading.classList.remove('hidden');
  
  // Set shimmer elements height/width randomly for natural look
  const shimmers = elements.poetryLoading.querySelectorAll('.shimmer-line');
  shimmers.forEach((sh, idx) => {
    if (idx > 0) {
      sh.style.width = `${60 + Math.random() * 35}%`;
    }
  });

  const apiURL = 'https://api.apileague.com/retrieve-random-poem?api-key=9b45bf843bf84bdfa9133fda7469ec05&min-lines=10&max-lines=20';
  
  let poemData = null;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout abort

  try {
    const response = await fetch(apiURL, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    
    // Check if the response contains valid poem content fields
    const content = data.poem || data.text || data.content;
    if (content && typeof content === 'string') {
      poemData = {
        title: data.title || "A Secret Love Note",
        author: data.author || "Your Secret Admirer",
        poem: content
      };
    } else {
      throw new Error("Invalid poem content structure");
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn("API League poem fetch failed or timed out. Gracefully falling back to premium offline registry.", err);
    // Grab a random index from our fallback registry
    const idx = Math.floor(Math.random() * fallbackPoems.length);
    poemData = fallbackPoems[idx];
  }

  // Format and render poem
  elements.poemTitle.innerText = poemData.title;
  elements.poemAuthor.innerText = `— ${poemData.author}`;
  
  // Empty and split by lines
  elements.poemContent.innerHTML = "";
  const lines = poemData.poem.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  lines.forEach(lineText => {
    const p = document.createElement('p');
    p.className = 'poem-line opacity-0 filter blur-sm translate-y-3';
    p.innerText = lineText;
    elements.poemContent.appendChild(p);
  });

  // Small delay to let rendering complete
  setTimeout(() => {
    // Hide loading shimmer, show poem container
    elements.poetryLoading.classList.add('hidden');
    elements.poetryDisplay.classList.remove('hidden');
    elements.poetryDisplay.style.opacity = 0;

    // Cinematic stagger reveal
    const revealTimeline = gsap.timeline();
    
    revealTimeline.to(elements.poetryDisplay, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    });

    revealTimeline.fromTo(elements.poemTitle,
      { opacity: 0, scale: 0.9, filter: 'blur(4px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.65, ease: 'back.out(1.2)' },
      "-=0.2"
    );

    const lineElements = elements.poemContent.querySelectorAll('.poem-line');
    revealTimeline.fromTo(lineElements,
      { opacity: 0, y: 15, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.22,
        duration: 0.8,
        ease: 'power2.out'
      },
      "-=0.3"
    );

    revealTimeline.fromTo(elements.poemAuthor,
      { opacity: 0, x: 25, filter: 'blur(3px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
      "-=0.25"
    );
  }, 100);
}

// Button ripple helper functions
function createButtonRipple(e) {
  const btn = e.currentTarget;
  
  // Create ripple circle element
  const circle = document.createElement('span');
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;
  
  const rect = btn.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  
  // Calculate relative click coordinate inside button
  const x = e.clientX - rect.left - radius;
  const y = e.clientY - rect.top - radius;
  
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.classList.add('btn-ripple');
  
  // Remove existing ripples to prevent clogging
  const oldRipple = btn.querySelector('.btn-ripple');
  if (oldRipple) {
    oldRipple.remove();
  }
  
  btn.appendChild(circle);
  
  setTimeout(() => circle.remove(), 600);
}

function initButtonRipples() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    const style = window.getComputedStyle(btn);
    if (style.position === 'static') {
      btn.style.position = 'relative';
    }
    if (style.overflow !== 'hidden') {
      btn.style.overflow = 'hidden';
    }
    btn.addEventListener('click', createButtonRipple);
  });
}

// Poetry Section Event Listeners
elements.btnNextPoem.addEventListener('click', (e) => {
  e.preventDefault();
  playSparkleSound();
  
  // Transition out current poem content
  gsap.to(elements.poetryDisplay, {
    opacity: 0,
    y: -15,
    filter: 'blur(6px)',
    duration: 0.45,
    ease: 'power2.inOut',
    onComplete: () => {
      loadPoem();
    }
  });
});

elements.btnPoetryNext.addEventListener('click', (e) => {
  e.preventDefault();
  playSparkleSound();
  navigateToStep(5);
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
  initButtonRipples();
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
