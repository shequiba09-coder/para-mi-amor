const FRASES = [
  "Cuanto más tiempo estoy contigo, más te amo.",
  "Contigo mi corazón va a toda velocidad.",
  "Eres mi pista favorita para toda la vida.",
  "Si el amor fuera un carrito, el nuestro sería de colección.",
  "Contigo no quiero frenar nunca.",
  "Eres mi meta, mi carrera y mi premio.",
  "Eres el motor de mi corazón.",
  "Mi amor por ti no tiene límite de velocidad.",
  "Juntos vamos a toda velocidad hacia el infinito.",
  "Tu amor me acelera el pulso cada día.",
  "Eres la curva más hermosa de mi vida.",
  "No necesito GPS… contigo siempre llego a casa.",
  "Eres mi Hot Wheels favorito: único y especial.",
  "Contigo cada kilómetro vale la pena."
];

const FLORES = [
  { x:32, y:0,  r:0   },
  { x:6,  y:15, r:-16 },
  { x:58, y:15, r:16  },
  { x:-2, y:38, r:-22 },
  { x:32, y:32, r:0   },
  { x:66, y:38, r:22  }
];
const CARROS = [
  { img:"img/carro1.png", top:34,  dir:"izq", delay:0  },
  { img:"img/carro2.png", top:34,  dir:"izq", delay:-4 },
  { img:"img/carro3.png", top:95,  dir:"der", delay:-2 },
  { img:"img/carro1.png", top:95,  dir:"der", delay:-7 }
];
const HOJAS = [
  [38,55,145,1.4,0], [62,55,35,1.4,0],
  [28,65,160,1.7,1], [72,65,20,1.7,1],
  [20,75,185,1.6,0], [80,75,-5,1.6,0],
  [35,72,115,1.4,1], [65,72,65,1.4,1],
  [14,58,195,1.3,1], [86,58,-15,1.3,1],
  [30,48,-105,1.1,0],[70,46,-75,1.1,0],
  [10,70,175,1.4,0], [90,70,5,1.4,0]
];
const PASTO = [
  [3,48,-4],[8,56,3],[14,64,-2],
  [86,64,2],[92,56,-3],[97,48,4]
];

const audio = document.getElementById("audio");
const entrada = document.getElementById("entrada");
audio.volume = 0.7;
audio.play().catch(() => entrada.classList.add("visible"));
entrada.addEventListener("click", () => {
  audio.play().catch(() => {});
  entrada.remove();
});

/* Ramo */
const ramo = document.getElementById("ramo");

let svg = `<svg class="follaje" viewBox="0 0 100 100" aria-hidden="true">
  <defs>
    <path id="hoja" d="M0 0 C8 -12 20 -12 32 0 C20 12 8 12 0 0 Z"/>
  </defs>`;

PASTO.forEach(([x, punta, inc], i) => {
  svg += `<path class="pasto" style="animation-delay:${-i*0.45}s"
    d="M${x} 104 Q ${x-3} ${punta+16} ${x+inc} ${punta} Q ${x+2.5} ${punta+18} ${x+5} 104Z" 
    fill="#1a9c3e"/>`;
});

FLORES.forEach(f => {
  const cx = f.x + 17;
  const cy = f.y + 17;
  const qx = cx + (50 - cx) * 0.2;
  const qy = cy + (86 - cy) * 0.55;
  svg += `<path d="M${cx} ${cy} Q ${qx} ${qy} 50 86" 
    stroke="#1fae48" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
});

HOJAS.forEach(([x, y, r, s, t], i) => {
  svg += `<g class="hoja-g" style="animation-delay:${-i*0.28}s">
    <use href="#hoja" 
         fill="${t ? '#0e6e2f' : '#24b04a'}" 
         transform="translate(${x} ${y}) rotate(${r}) scale(${s})"/>
  </g>`;
});

svg += `</svg>`;
ramo.insertAdjacentHTML("beforeend", svg);

FLORES.forEach((f, i) => {
  const flor = document.createElement("div");
  flor.className = "flor";
  flor.style.left = f.x + "%";
  flor.style.top = f.y + "%";
  flor.style.transform = `rotate(${f.r}deg) translateZ(${i % 2 ? 14 : 30}px)`;
  for (let p = 0; p < 14; p++) {
    const pet = document.createElement("div");
    pet.className = "petalo";
    pet.style.transform = `translate(-50%,0) rotate(${p * 25.7}deg)`;
    flor.appendChild(pet);
  }
  flor.insertAdjacentHTML("beforeend", '<div class="centro"></div>');
  ramo.appendChild(flor);
});

ramo.insertAdjacentHTML("beforeend", `
  <div class="lazo">
    <b></b><i></i>
    <div class="carrito-lazo">🏎️</div>
  </div>
`);

/* Carritos */
const pista = document.getElementById("pista");
CARROS.forEach(c => {
  const auto = document.createElement("div");
  auto.className = "auto " + c.dir;
  auto.style.top = c.top + "px";
  auto.style.animationDelay = c.delay + "s";
  const cuerpo = document.createElement("div");
  cuerpo.className = "cuerpo";
  const img = new Image();
  img.src = c.img;
  img.alt = "Carrito Hot Wheels";
  img.onerror = () => { cuerpo.innerHTML = '<div class="respaldo">🏎️</div>'; };
  cuerpo.appendChild(img);
  auto.appendChild(cuerpo);
  pista.appendChild(auto);
});

/* Estrellas fugaces */
const fondo = document.getElementById("fondo");
for (let i = 0; i < 4; i++) {
  const f = document.createElement("div");
  f.className = "fugaz";
  f.style.cssText = `left:${50 + Math.random()*45}vw; top:${Math.random()*35}vh; animation-delay:${i*2.1}s;`;
  fondo.appendChild(f);
}

/* Inclinación 3D */
function inclinar(nx, ny) {
  ramo.style.transform = `rotateY(${nx * 22}deg) rotateX(${-ny * 16}deg)`;
}
addEventListener("pointermove", e => inclinar(e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1));
addEventListener("deviceorientation", e => {
  if (e.gamma == null) return;
  inclinar(Math.max(-1, Math.min(1, e.gamma / 35)), Math.max(-1, Math.min(1, (e.beta - 45) / 35)));
});

/* Corazón → Tarjeta */
const corazonSJ = document.getElementById("corazonSJ");
const tarjeta = document.getElementById("tarjeta");
const pistaTexto = document.getElementById("pistaTexto");
const frase = document.getElementById("frase");
let n = 0;
frase.textContent = FRASES[0];

corazonSJ.addEventListener("click", () => {
  corazonSJ.classList.add("oculto");
  setTimeout(() => {
    tarjeta.classList.add("visible");
    pistaTexto.classList.add("visible");
  }, 400);
});

function siguiente() {
  tarjeta.classList.add("gira");
  setTimeout(() => { n = (n + 1) % FRASES.length; frase.textContent = FRASES[n]; }, 250);
  setTimeout(() => tarjeta.classList.remove("gira"), 520);
}
tarjeta.addEventListener("click", siguiente);
tarjeta.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") siguiente(); });

/* Mini-juego */
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const juegoArea = document.getElementById("juegoArea");
const scoreEl = document.getElementById("score");
const msgFinal = document.getElementById("msgFinal");
const controles = document.getElementById("controles");
let score = 0, running = false;
let player = { x: 0, y: 0, w: 50, h: 28 };
let hearts = [];
let keys = { left: false, right: false };

function resizeCanvas() {
  canvas.width = juegoArea.clientWidth;
  canvas.height = juegoArea.clientHeight;
  player.y = canvas.height - 45;
  player.x = canvas.width / 2 - player.w / 2;
}

function dibujarCarro(x, y) {
  ctx.fillStyle = "#00c8ff";
  ctx.shadowColor = "#00c8ff";
  ctx.shadowBlur = 12;
  ctx.fillRect(x, y + 8, 50, 16);
  ctx.fillStyle = "#9ff4ff";
  ctx.fillRect(x + 8, y, 34, 12);
  ctx.fillStyle = "#000";
  ctx.beginPath(); ctx.arc(x + 12, y + 24, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 38, y + 24, 7, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;
}

function dibujarCorazon(x, y, s) {
  ctx.fillStyle = "#ff4d6d";
  ctx.shadowColor = "#ff4d6d";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(x, y + s / 4);
  ctx.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + s / 4);
  ctx.bezierCurveTo(x - s / 2, y + s / 2, x, y + s * 0.75, x, y + s);
  ctx.bezierCurveTo(x, y + s * 0.75, x + s / 2, y + s / 2, x + s / 2, y + s / 4);
  ctx.bezierCurveTo(x + s / 2, y, x, y, x, y + s / 4);
  ctx.fill();
  ctx.shadowBlur = 0;
}

function loop() {
  if (!running) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (keys.left) player.x -= 5;
  if (keys.right) player.x += 5;
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));

  if (Math.random() < 0.03) {
    hearts.push({ x: Math.random() * (canvas.width - 30) + 15, y: -20, s: 22, vy: 2 + Math.random() * 2 });
  }
  for (let i = hearts.length - 1; i >= 0; i--) {
    const h = hearts[i];
    h.y += h.vy;
    dibujarCorazon(h.x, h.y, h.s);
    if (h.x > player.x && h.x < player.x + player.w &&
        h.y + h.s > player.y && h.y < player.y + player.h) {
      hearts.splice(i, 1);
      score++;
      scoreEl.textContent = score;
      if (score >= 10) {
        running = false;
        msgFinal.classList.add("visible");
        return;
      }
    } else if (h.y > canvas.height + 30) {
      hearts.splice(i, 1);
    }
  }
  dibujarCarro(player.x, player.y);
  requestAnimationFrame(loop);
}

function iniciarJuego() {
  score = 0;
  scoreEl.textContent = "0";
  hearts = [];
  msgFinal.classList.remove("visible");
  juegoArea.classList.add("activo");
  controles.style.display = "flex";
  resizeCanvas();
  running = true;
  loop();
}

function reiniciarJuego() { iniciarJuego(); }

document.getElementById("btnJuego").addEventListener("click", iniciarJuego);

addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowRight") keys.right = true;
});
addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
});

document.getElementById("btnIzq").addEventListener("touchstart", e => { e.preventDefault(); keys.left = true; });
document.getElementById("btnIzq").addEventListener("touchend", () => keys.left = false);
document.getElementById("btnDer").addEventListener("touchstart", e => { e.preventDefault(); keys.right = true; });
document.getElementById("btnDer").addEventListener("touchend", () => keys.right = false);
document.getElementById("btnIzq").addEventListener("mousedown", () => keys.left = true);
document.getElementById("btnIzq").addEventListener("mouseup", () => keys.left = false);
document.getElementById("btnDer").addEventListener("mousedown", () => keys.right = true);
document.getElementById("btnDer").addEventListener("mouseup", () => keys.right = false);

window.addEventListener("resize", () => { if (running) resizeCanvas(); });