/* ============================================================
   DIVYA'S ROYAL APOLOGY — main.js
   ============================================================ */

/* ===== LOADER ===== */
const loaderMessages = [
  "Initialising Sincerity Module…",
  "Loading Excuses… ERROR: Folder Empty",
  "Searching For Valid Reasons… 0 Found",
  "Loading Honesty Instead… 47%",
  "Calibrating Puppy Eyes… 98%",
  "Deploying Emergency Charm… ✓",
  "Ready. Please Don't Be Angry. 🥺"
];
const loaderBar  = document.querySelector('.loader-bar');
const loaderText = document.querySelector('.loader-text');
const loader     = document.getElementById('loader');

let lIdx = 0, lPct = 0;
const lInterval = setInterval(() => {
  lPct = Math.min(lPct + Math.random() * 18 + 5, 100);
  loaderBar.style.width = lPct + '%';
  if (lIdx < loaderMessages.length) {
    loaderText.textContent = loaderMessages[lIdx++];
  }
  if (lPct >= 100) {
    clearInterval(lInterval);
    loaderText.textContent = loaderMessages[loaderMessages.length - 1];
    setTimeout(() => {
      loader.classList.add('hide');
      document.body.style.overflow = '';
    }, 700);
  }
}, 320);
document.body.style.overflow = 'hidden';

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
});
setInterval(() => {
  rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
}, 16);

document.querySelectorAll('button, a, .crime-card, .polaroid, .letter, .promise-card, .quiz-opt, .t-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); ring.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); ring.classList.remove('hovered'); });
});

/* ===== CANVAS BG — gradient orbs ===== */
const bgC   = document.getElementById('bg-canvas');
const bgCtx = bgC.getContext('2d');
function resizeBg() { bgC.width = innerWidth; bgC.height = innerHeight; }
resizeBg(); addEventListener('resize', resizeBg);

const orbs = [
  { x:0.15, y:0.25, r:0.42, hue:330, sp:0.00025 },
  { x:0.82, y:0.65, r:0.38, hue:280, sp:0.00033 },
  { x:0.48, y:0.08, r:0.32, hue:350, sp:0.0004  },
  { x:0.05, y:0.75, r:0.26, hue:260, sp:0.0005  },
  { x:0.70, y:0.10, r:0.22, hue:40,  sp:0.0003  },
];
let t = 0;
(function drawBg() {
  bgCtx.clearRect(0, 0, bgC.width, bgC.height);
  t += 0.016;
  orbs.forEach(o => {
    const ox = (o.x + Math.sin(t * o.sp * 1000) * 0.07) * bgC.width;
    const oy = (o.y + Math.cos(t * o.sp * 800)  * 0.07) * bgC.height;
    const r  = o.r * Math.max(bgC.width, bgC.height);
    const g  = bgCtx.createRadialGradient(ox, oy, 0, ox, oy, r);
    g.addColorStop(0, `hsla(${o.hue},80%,35%,0.05)`);
    g.addColorStop(1, 'transparent');
    bgCtx.fillStyle = g;
    bgCtx.fillRect(0, 0, bgC.width, bgC.height);
  });
  requestAnimationFrame(drawBg);
})();

/* ===== FLOATING ELEMENTS ===== */
const floatLayer = document.getElementById('float-layer');
const floatItems = ['💕','💖','🌸','✨','💫','🌺','💝','🎀','🌷','🥀','⭐','🔮'];
function spawnFloat() {
  const el = document.createElement('div');
  el.className = 'floater';
  el.textContent = floatItems[Math.floor(Math.random() * floatItems.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (Math.random() * 1.1 + 0.6) + 'rem';
  el.style.opacity = (Math.random() * 0.4 + 0.3).toString();
  const dur = Math.random() * 10 + 9;
  el.style.animation = `floatUp ${dur}s linear forwards`;
  floatLayer.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}
setInterval(spawnFloat, 1200);

/* ===== SCROLL REVEAL ===== */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revObs.observe(el));

/* ===== 3D TILT ===== */
document.querySelectorAll('.crime-card, .quiz-box, .weather-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width  / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    card.style.transform = `perspective(700px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ===== ANGER METER ===== */
const angerFill   = document.getElementById('angerFill');
const angerNeedle = document.getElementById('angerNeedle');
const angerStage  = document.getElementById('angerStage');
const angerMsg    = document.getElementById('anger-msg');

let angerPct = 80;
const stages = [
  { max:20,  label:"Slightly Irritated 😤",  color:"#4ade80" },
  { max:40,  label:"Noticeably Annoyed 😠",   color:"#facc15" },
  { max:60,  label:"Dangerously Salty 🌶️",    color:"#fb923c" },
  { max:80,  label:"FURIOUS MODE 🔥",          color:"#f87171" },
  { max:100, label:"ABSOLUTE VOLCANO 🌋",      color:"#ef4444" },
];
function updateAnger() {
  if (angerFill) angerFill.style.width = angerPct + '%';
  // Needle: -90deg = 0%, +90deg = 100%
  const deg = -90 + (angerPct / 100) * 180;
  if (angerNeedle) angerNeedle.style.transform = `rotate(${deg}deg)`;
  const stage = stages.find(s => angerPct <= s.max) || stages[stages.length - 1];
  if (angerStage) angerStage.textContent = stage.label;
}

// Animate anger bar on scroll into view
const angerObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    let pct = 0;
    const iv = setInterval(() => {
      pct = Math.min(pct + 2, angerPct);
      if (angerFill) angerFill.style.width = pct + '%';
      const deg = -90 + (pct / 100) * 180;
      if (angerNeedle) angerNeedle.style.transform = `rotate(${deg}deg)`;
      if (pct >= angerPct) clearInterval(iv);
    }, 18);
    angerObs.disconnect();
  }
}, { threshold: 0.4 });
const angerSection = document.querySelector('.anger-section');
if (angerSection) angerObs.observe(angerSection);

const angryLines = [
  "Completely fair. Your anger is valid. I'll wait. 🥺",
  "That's okay. I have patience. And snacks. 🍿",
  "Still not forgiven? The meter is now sentient and nodding in agreement.",
  "Even your rage is cute. Don't tell anyone I said that. 😅",
  "MAXIMUM ANGER REACHED. Server overheating. Please forgive to cool down.",
  "I'm printing this anger level as evidence of how much you care. 💖",
  "The anger meter has filed for worker's comp. Please show mercy.",
];
let angryIdx = 0;
window.clickAngry = function() {
  angerPct = Math.min(100, angerPct + 9);
  updateAnger();
  if (angerMsg) angerMsg.textContent = angryLines[angryIdx++ % angryLines.length];
};

window.runAway = function(btn) {
  const maxX = Math.max(100, window.innerWidth  - 240);
  const maxY = Math.max(60,  window.innerHeight - 100);
  btn.style.cssText = `position:fixed;z-index:9999;transition:left .2s,top .2s;
    left:${Math.random() * maxX}px;top:${Math.random() * maxY}px;`;
};

window.partialForgive = function() {
  angerPct = Math.max(0, angerPct - 25);
  updateAnger();
  if (angerMsg) angerMsg.textContent = "Caught the button?! You're clearly too smart to stay angry. 💕";
};

/* ===== QUIZ ===== */
const quizzes = [
  {
    q: "What is the most accurate description of me right now?",
    opts: ["A) A thoughtful partner who made one tiny mistake",
           "B) A complete clown in a loving disguise 🤡",
           "C) Someone who is currently sweating profusely",
           "D) All of the above, unfortunately"],
    ans: 3,
    res: "🎯 Correct! D is always the answer. I am all of these things simultaneously. The clown costume is not a disguise."
  },
  {
    q: "What should I do right now?",
    opts: ["A) Explain myself with a 40-minute PowerPoint",
           "B) Say sorry, mean it, and stop talking 🤐",
           "C) Send more memes",
           "D) Make eye contact and do the sad face"],
    ans: 1,
    res: "✅ B. Exactly. No PowerPoints. No memes. Just genuine sorry, genuine love, and a strategic silence. You are very wise."
  },
  {
    q: "How cute is Divya when she's angry?",
    opts: ["A) Not cute. Terrifying. A force of nature.",
           "B) Objectively adorable but I won't say it out loud",
           "C) 10/10, honestly unfair to everyone",
           "D) Like a thunderstorm that smells like flowers 🌸"],
    ans: 3,
    res: "❤️ D is the correct poetic answer. A furious Divya is a powerful weather event that is somehow also enchanting. Science cannot explain this."
  },
  {
    q: "What does Divya deserve right now?",
    opts: ["A) A heartfelt apology (minimum)",
           "B) Her favourite food, immediately",
           "C) All the peace, love, and zero stress",
           "D) Everything above, plus a nap, plus me being better"],
    ans: 3,
    res: "🏆 D. She gets everything. The apology, the food, the peace, the improved version of me. Starting now. Not starting tomorrow. NOW."
  },
  {
    q: "What is the correct response when Divya is right?",
    opts: ["A) 'Well technically—'",
           "B) 'But what I meant was—'",
           "C) 'You are right. I am wrong. End of discussion.' 🏳️",
           "D) Change the subject to something unrelated"],
    ans: 2,
    res: "✨ C. White flag. Full surrender. No buts, no technicallys. She was right. I was wrong. This is always the answer. Tattooing this on my hand."
  },
];

let qIdx = 0, answered = false;

function loadQ() {
  const q = quizzes[qIdx];
  const qText    = document.getElementById('qText');
  const qOptions = document.getElementById('qOptions');
  const qResult  = document.getElementById('qResult');
  const qNext    = document.getElementById('qNext');
  const qProg    = document.getElementById('qProg');
  const qFill    = document.getElementById('qFill');

  if (qText)    qText.textContent = q.q;
  if (qProg)    qProg.textContent = `Question ${qIdx + 1} of ${quizzes.length}`;
  if (qFill)    qFill.style.width = ((qIdx + 1) / quizzes.length * 100) + '%';
  if (qResult)  { qResult.style.display = 'none'; }
  if (qNext)    { qNext.style.display = 'none'; }
  answered = false;

  if (!qOptions) return;
  qOptions.innerHTML = '';
  const letters = ['A','B','C','D'];
  q.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.innerHTML = `<span class="quiz-opt-letter">${letters[i]}</span>${o.replace(/^[A-D]\) /, '')}`;
    btn.onclick = () => selectQ(i, q.ans, q.res);
    qOptions.appendChild(btn);
  });
}

function selectQ(i, ans, res) {
  if (answered) return;
  answered = true;
  const btns = document.querySelectorAll('.quiz-opt');
  btns[i].classList.add(i === ans ? 'correct' : 'wrong');
  if (i !== ans) btns[ans].classList.add('correct');
  const r = document.getElementById('qResult');
  const n = document.getElementById('qNext');
  if (r) { r.textContent = res; r.style.display = 'block'; }
  if (n) {
    n.style.display = qIdx < quizzes.length - 1 ? 'block' : 'none';
    if (qIdx === quizzes.length - 1 && r) {
      r.textContent += ' 🎉 Quiz complete! You passed the "Understanding Why He\'s Sorry" exam!';
    }
  }
}

window.nextQ = function() { qIdx++; loadQ(); };
loadQ();

/* ===== CONFETTI ===== */
const confC   = document.getElementById('confetti-canvas');
const confCtx = confC.getContext('2d');
let pieces = [], confActive = false;

function launchConfetti() {
  confC.style.display = 'block';
  confC.width = innerWidth; confC.height = innerHeight;
  const colors = ['#C9748A','#D4AF37','#E8A4B8','#fff','#FFE4EE','#8B5CF6','#F0D060'];
  pieces = Array.from({ length: 320 }, () => ({
    x: Math.random() * confC.width,
    y: Math.random() * -confC.height,
    w: Math.random() * 14 + 5, h: Math.random() * 6 + 3,
    r: Math.random() * Math.PI * 2, dr: (Math.random() - 0.5) * 0.18,
    vy: Math.random() * 4 + 2, vx: (Math.random() - 0.5) * 2.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() > 0.4 ? 'rect' : 'circle'
  }));
  confActive = true;
  animConf();
  setTimeout(() => { confActive = false; confC.style.display = 'none'; }, 6000);
}

function animConf() {
  confCtx.clearRect(0, 0, confC.width, confC.height);
  pieces.forEach(p => {
    p.y += p.vy; p.x += p.vx; p.r += p.dr;
    confCtx.save();
    confCtx.translate(p.x, p.y);
    confCtx.rotate(p.r);
    confCtx.fillStyle = p.color;
    if (p.shape === 'circle') {
      confCtx.beginPath();
      confCtx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
      confCtx.fill();
    } else {
      confCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    }
    confCtx.restore();
  });
  if (confActive) requestAnimationFrame(animConf);
}

/* ===== TOAST ===== */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 5500);
}

/* ===== FORGIVENESS ===== */
window.triggerForgiveness = function() {
  launchConfetti();
  showToast('👑 DIVYA FORGAVE ME! I can breathe! The internet is saved! 🎊');
  const btn = document.getElementById('mainForgiveBtn');
  if (btn) {
    btn.textContent = '💕 Thank You, My Queen! I Love You Forever! 💕';
    btn.style.animation = 'none';
    btn.style.background = 'linear-gradient(135deg,#4ade80,#C9748A)';
  }
  angerPct = 0;
  updateAnger();
  if (angerMsg) angerMsg.textContent = '💖 SHE FORGAVE ME!! Someone call the newspapers!! 🎉';
  for (let i = 0; i < 40; i++) setTimeout(spawnFloat, i * 60);
};
