// Inisialisasi Variabel
let day = 1;
let time = "10:00";
let coin = 10;
let isPaused = false;
let waterQuantity = 0;
let seedQuantity = 0;
let fertilizerQuantity = 0;

// Elemen DOM
const dayCounter = document.getElementById('day-counter');
const timeDisplay = document.getElementById('time');
const coinDisplay = document.getElementById('coin');
const waterQuantityDisplay = document.getElementById('water-quantity');
const seedQuantityDisplay = document.getElementById('seed-quantity');
const fertilizerQuantityDisplay = document.getElementById('fertilizer-quantity');
const pauseResumeBtn = document.getElementById('pause-resume-btn');
const pauseResumeIcon = document.getElementById('pause-resume-icon');

// Timer untuk hari dan waktu
function startGameTimers() {
  setInterval(() => {
    if (!isPaused) {
      // Update waktu setiap 2 detik (24 jam/hari)
      const [hours, minutes] = time.split(':');
      let newHours = parseInt(hours) + 1;
      if (newHours >= 24) newHours = 0;
      time = `${newHours.toString().padStart(2, '0')}:${minutes}`;
      timeDisplay.textContent = time;

      // Update hari setiap 48 detik
      if (newHours === 0) {
        day++;
        dayCounter.textContent = `DAY - ${day}`;
      }
    }
  }, 2000); // 2 detik untuk waktu
}

// Fungsi untuk pause/resume game
pauseResumeBtn.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseResumeIcon.src = isPaused ? 'resume-icon.png' : 'pause-icon.png';
});

// Fungsi untuk membeli item
document.getElementById('buy-water').addEventListener('click', () => {
  if (coin >= 1) {
    coin -= 1;
    waterQuantity += 1;
    updateDisplay();
  } else {
    alert("Not enough coins!");
  }
});

document.getElementById('buy-seed').addEventListener('click', () => {
  if (coin >= 2) {
    coin -= 2;
    seedQuantity += 1;
    updateDisplay();
  } else {
    alert("Not enough coins!");
  }
});

document.getElementById('buy-fertilizer').addEventListener('click', () => {
  if (coin >= 1) {
    coin -= 1;
    fertilizerQuantity += 1;
    updateDisplay();
  } else {
    alert("Not enough coins!");
  }
});

// Fungsi untuk update tampilan
function updateDisplay() {
  coinDisplay.textContent = coin;
  waterQuantityDisplay.textContent = waterQuantity;
  seedQuantityDisplay.textContent = seedQuantity;
  fertilizerQuantityDisplay.textContent = fertilizerQuantity;
}

// Inisialisasi Awal
startGameTimers();
updateDisplay();
