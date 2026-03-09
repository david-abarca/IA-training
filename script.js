// variables para el cronómetro
let startTime = 0;
let elapsed = 0;
let running = false;
let rafId = null;
const laps = [];

const canvas = document.getElementById('timerCanvas');
const ctx = canvas.getContext('2d');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centis = Math.floor((ms % 1000) / 10);
  return (
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(centis).padStart(2, '0')
  );
}

function draw(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '48px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(formatTime(time), canvas.width / 2, canvas.height / 2);
}

function update() {
  const now = Date.now();
  elapsed = now - startTime;
  draw(elapsed);
  rafId = requestAnimationFrame(update);
}

startStopBtn.addEventListener('click', () => {
  if (!running) {
    // iniciar o reanudar
    running = true;
    startTime = Date.now() - elapsed;
    rafId = requestAnimationFrame(update);
    startStopBtn.textContent = 'Detener';
    lapBtn.disabled = false;
    resetBtn.disabled = false;
  } else {
    // pausar
    running = false;
    cancelAnimationFrame(rafId);
    startStopBtn.textContent = 'Reanudar';
  }
});

lapBtn.addEventListener('click', () => {
  if (!running) return;
  const lapTime = elapsed;
  laps.push(lapTime);
  const li = document.createElement('li');
  li.textContent = formatTime(lapTime);
  lapsList.appendChild(li);
});

resetBtn.addEventListener('click', () => {
  running = false;
  cancelAnimationFrame(rafId);
  elapsed = 0;
  startTime = 0;
  draw(0);
  laps.length = 0;
  lapsList.innerHTML = '';
  startStopBtn.textContent = 'Iniciar';
  lapBtn.disabled = true;
  resetBtn.disabled = true;
});

// dibujar 00:00.00 al cargar
draw(0);
