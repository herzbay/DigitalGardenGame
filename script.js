// script.js
class DigitalGarden {
  constructor() {
    this.gameState = {
      day: 1,
      time: 8,
      coins: 100,
      inventory: {
        seeds: 5,
        water: 3,
        fertilizer: 2
      },
      garden: Array(25).fill().map(() => ({
        plant: null,
        growthStage: 0,
        waterLevel: 0,
        fertilizerLevel: 0
      })),
      isPaused: false,
      soundOn: true
    };

    this.plants = {
      carrot: { growthTime: 5, value: 10 },
      tomato: { growthTime: 8, value: 20 },
      sunflower: { growthTime: 10, value: 30 }
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderGarden();
    this.startGameClock();
    this.loadProgress();
  }

  startGameClock() {
    setInterval(() => {
      if (!this.gameState.isPaused) {
        this.gameState.time++;
        if (this.gameState.time >= 24) {
          this.gameState.time = 0;
          this.gameState.day++;
          this.updatePlants();
        }
        this.updateTimeDisplay();
      }
    }, 30000); // 30 detik nyata = 1 jam game
  }

  updatePlants() {
    this.gameState.garden.forEach(tile => {
      if (tile.plant && tile.growthStage < this.plants[tile.plant].growthTime) {
        tile.growthStage++;
        if (tile.waterLevel > 0) tile.waterLevel--;
      }
    });
    this.renderGarden();
  }

  plantSeed(index) {
    if (this.gameState.inventory.seeds > 0) {
      this.gameState.garden[index].plant = 'carrot';
      this.gameState.garden[index].growthStage = 0;
      this.gameState.inventory.seeds--;
      this.renderGarden();
    }
  }

  waterPlant(index) {
    if (this.gameState.inventory.water > 0) {
      this.gameState.garden[index].waterLevel += 2;
      this.gameState.inventory.water--;
      this.renderGarden();
    }
  }

  harvestPlant(index) {
    const plant = this.gameState.garden[index];
    if (plant.growthStage >= this.plants[plant.plant].growthTime) {
      this.gameState.coins += this.plants[plant.plant].value;
      this.gameState.garden[index] = { plant: null, growthStage: 0 };
      this.renderGarden();
      this.showDialog('Harvested!', `You earned ${this.plants[plant.plant].value} coins!`);
    }
  }

  showDialog(title, message) {
    // Implement dialog display
  }

  saveProgress() {
    localStorage.setItem('digitalGardenSave', JSON.stringify(this.gameState));
  }

  loadProgress() {
    const save = localStorage.getItem('digitalGardenSave');
    if (save) this.gameState = JSON.parse(save);
  }

  setupEventListeners() {
    document.querySelectorAll('.garden-tile').forEach((tile, index) => {
      tile.addEventListener('click', () => this.handleTileClick(index));
    });
    
    document.getElementById('pause-btn').addEventListener('click', () => {
      this.gameState.isPaused = !this.gameState.isPaused;
    });
  }

  handleTileClick(index) {
    if (!this.gameState.garden[index].plant) {
      this.plantSeed(index);
    } else if (this.gameState.garden[index].growthStage < 
               this.plants[this.gameState.garden[index].plant].growthTime) {
      this.waterPlant(index);
    } else {
      this.harvestPlant(index);
    }
  }

  renderGarden() {
    document.querySelectorAll('.garden-tile').forEach((tile, index) => {
      const plant = this.gameState.garden[index];
      tile.innerHTML = '';
      if (plant.plant) {
        const growthPercentage = (plant.growthStage / this.plants[plant.plant].growthTime) * 100;
        const plantEl = document.createElement('div');
        plantEl.className = 'plant';
        plantEl.innerHTML = `
          <img src="assets/${plant.plant}-${Math.min(Math.floor(growthPercentage/25), 3)}.png">
          <div class="progress-bar">
            <div class="progress" style="width: ${growthPercentage}%"></div>
          </div>
        `;
        tile.appendChild(plantEl);
      }
    });
  }
}

// Start the game
const game = new DigitalGarden();
