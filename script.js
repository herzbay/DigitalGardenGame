const gardenArea = document.querySelector('.garden-area');
const scoreDisplay = document.getElementById('score');
let score = 0;

// Fungsi untuk menanam bibit
document.getElementById('plant-seed').addEventListener('click', () => {
  const plant = document.createElement('div');
  plant.classList.add('plant');
  plant.innerHTML = '<img src="seed.png" alt="Seed">';
  gardenArea.appendChild(plant);
});

// Fungsi untuk menyiram tanaman
document.getElementById('water-plant').addEventListener('click', () => {
  const plants = document.querySelectorAll('.plant');
  plants.forEach(plant => {
    plant.innerHTML = '<img src="watered-plant.png" alt="Watered Plant">';
  });
});

// Fungsi untuk memupuk tanaman
document.getElementById('add-fertilizer').addEventListener('click', () => {
  const plants = document.querySelectorAll('.plant');
  plants.forEach(plant => {
    plant.innerHTML = '<img src="fertilized-plant.png" alt="Fertilized Plant">';
    score += 10;
    scoreDisplay.textContent = score;
  });
});

// Musik latar
const backgroundMusic = document.getElementById('background-music');
backgroundMusic.play();

let waterTimer;

function startWaterTimer(plant) {
  waterTimer = setTimeout(() => {
    plant.innerHTML = '<img src="withered-plant.png" alt="Withered Plant">';
  }, 30000); // 30 detik untuk contoh
}

document.getElementById('water-plant').addEventListener('click', () => {
  const plants = document.querySelectorAll('.plant');
  plants.forEach(plant => {
    plant.innerHTML = '<img src="watered-plant.png" alt="Watered Plant">';
    clearTimeout(waterTimer); // Reset timer
    startWaterTimer(plant); // Mulai timer lagi
  });
});

let day = 1;
let dayTimer;

function startDayTimer() {
  dayTimer = setInterval(() => {
    day++;
    document.getElementById('day-counter').textContent = `Day: ${day}`;
    changeWeather(); // Panggil fungsi untuk mengubah cuaca
  }, 600000); // 10 menit = 600.000 milidetik
}

// Tampilkan hari di HTML
document.body.innerHTML += `<div id="day-counter">Day: ${day}</div>`;
startDayTimer();

document.getElementById('buy-seed').addEventListener('click', () => {
  if (score >= 10) {
    score -= 10;
    scoreDisplay.textContent = score;
    // Tambahkan bibit ke inventory atau langsung tanam
  } else {
    alert("Not enough points!");
  }
});

document.getElementById('buy-fertilizer').addEventListener('click', () => {
  if (score >= 20) {
    score -= 20;
    scoreDisplay.textContent = score;
    // Tambahkan pupuk ke inventory
  } else {
    alert("Not enough points!");
  }
});

const weatherConditions = ['sunny', 'cloudy', 'rainy'];
let currentWeather;

function changeWeather() {
  currentWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  document.getElementById('weather').textContent = `Weather: ${currentWeather}`;
  applyWeatherEffects(); // Terapkan efek cuaca pada tanaman
}

function applyWeatherEffects() {
  const plants = document.querySelectorAll('.plant');
  plants.forEach(plant => {
    if (currentWeather === 'rainy') {
      // Tanaman otomatis disiram saat hujan
      plant.innerHTML = '<img src="watered-plant.png" alt="Watered Plant">';
    } else if (currentWeather === 'sunny') {
      // Tanaman lebih cepat layu saat panas
      clearTimeout(waterTimer);
      startWaterTimer(plant, 15000); // 15 detik untuk contoh
    }
  });
}

// Tampilkan cuaca di HTML
document.body.innerHTML += `<div id="weather">Weather: ${currentWeather}</div>`;
changeWeather(); // Set cuaca awal
