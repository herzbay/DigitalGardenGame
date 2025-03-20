// Initialization Variables
let day = 1;
let time = "10:00";
let coin = 10;
let isPaused = false;
let waterQuantity = 0;
let seedQuantity = 0;
let fertilizerQuantity = 0;
const gardenStates = Array(9).fill("empty"); // Garden states

// DOM Elements
const dayCounter = document.getElementById('day-counter');
const timeDisplay = document.getElementById('time');
const coinDisplay = document.getElementById('coin');
const waterQuantityDisplay = document.getElementById('water-quantity');
const seedQuantityDisplay = document.getElementById('seed-quantity');
const fertilizerQuantityDisplay = document.getElementById('fertilizer-quantity');
const pauseResumeBtn = document.getElementById('pause-resume-btn');
const pauseResumeIcon = document.getElementById('pause-resume-icon');
const gardenArea = document.querySelector('.garden-area');

// Create Garden Base
for (let i = 0; i < 9; i++) {
  const soil = document.createElement('div');
  soil.classList.add('soil');
  soil.setAttribute('data-state', gardenStates[i]);
  gardenArea.appendChild(soil);
}

// Timer for Day and Time
function startGameTimers() {
  setInterval(() => {
    if (!isPaused) {
      // Update time every 2 seconds
      const [hours, minutes] = time.split(':');
      let newHours = (parseInt(hours) + 1) % 24;
      time = `${newHours.toString().padStart(2, '0')}:${minutes}`;
      timeDisplay.textContent = time;

      // Update day every 48 seconds
      if (newHours === 0) {
        day++;
        dayCounter.textContent = `DAY - ${day}`;
      }
    }
  }, 2000);
}

// Pause/Resume Functionality
pauseResumeBtn.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseResumeIcon.src = isPaused ? 'resume-icon.png' : 'pause-icon.png';
});

// Buying Item
document.getElementById('buy-water').addEventListener('click', () => {
  if (coin >= 1) {
    coin -= 1;
    waterQuantity += 1;
    updateDisplay();
  } else {
    alert("Not enough coins!");
  }
});

// Functions for managing gameplay follow similar logic with appropriate callbacks

function updateDisplay() {
  coinDisplay.textContent = coin;
  waterQuantityDisplay.textContent = waterQuantity;
  seedQuantityDisplay.textContent = seedQuantity;
  fertilizerQuantityDisplay.textContent = fertilizerQuantity;
}

// Initialize Game
startGameTimers();
updateDisplay();
