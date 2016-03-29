import Carnivore from './carnivore';
import Herbivore from './herbivore';
import Grass     from './grass';

class FoodChain {
  constructor(numCarnivores, numHerbivores, numGrasses) {
    this.carnivores = [];
    this.herbivores = [];
    this.grasses = [];
    this.numDeadBody = 0;

    for (let i=0; i < numCarnivores; i++) {
      this.carnivores.push(new Carnivore(7, 20));
    }
    for (let i=0; i < numHerbivores; i++) {
      this.herbivores.push(new Herbivore(20, 20));
    }
    for (let i=0; i < numGrasses; i++) {
      this.grasses.push(new Grass(30, 20));
    }
  }

  iterate() {
    this.makeCarnivoresOld();
    this.eatHerbivores();
    this.makeHerbivoreOld();
    this.eatGrasses();
    this.bearChilds();
  }

  getNums() {
    return {
      carnivores: this.carnivores.length,
      herbivores: this.herbivores.length,
      grasses: this.grasses.length
    };
  }

  makeCarnivoresOld() {
    let energyForGrasses = 0;

    for (let i=0; i < this.carnivores.length; i++) {
      this.carnivores[i].becomeOld();
      if (this.carnivores[i].isDead() && this.grasses.length > 0) {
        energyForGrasses += 10;
        this.numDeadBody++;
      }
    }

    let energyPerGrass = energyForGrasses / this.grasses.length;

    this.grasses = this.grasses.map(grass => {
      grass.absorbEnergy(energyPerGrass);
      return grass;
    });
    this.carnivores = this.carnivores.filter(carnivore => !carnivore.isDead());
  }

  makeHerbivoreOld() {
    let energyForGrasses = 0;

    for (let i=0; i < this.herbivores.length; i++) {
      this.herbivores[i].becomeOld();
      if (this.herbivores[i].isDead() && this.grasses.length > 0) {
        energyForGrasses += 10;
        this.numDeadBody++;
      }
    }

    let energyPerGrass = energyForGrasses / this.grasses.length;

    this.grasses = this.grasses.map(grass => {
      grass.absorbEnergy(energyPerGrass);
      return grass;
    });
    this.herbivores = this.herbivores.filter(herbivore => !herbivore.isDead());
  }

  makeThemOld(targets) {
    return targets.filter((target) => {
      target.becomeOld();
      return !target.isDead();
    });
  }

  eatHerbivores() {
    if (this.carnivores.length === 0) { return; }

    let requiredEnergy = this.carnivores.reduce((sum, carnivore) => {
      return sum + (carnivore.maxEnergy - carnivore.currentEnergy);
    }, 0);
    let numEaten = Math.min(Math.min(this.carnivores.length/3), Math.ceil(requiredEnergy / 20), this.herbivores.length);

    this.herbivores = this.herbivores.slice(numEaten);

    let energyPerCarnivore = (numEaten * 10) / this.carnivores.length;
    for (let i=0; i < this.carnivores.length; i++) {
      this.carnivores[i].absorbEnergy(energyPerCarnivore);
    }
  }

  eatGrasses() {
    if (this.herbivores.length === 0) { return; }

    let requiredEnergy = this.herbivores.reduce((sum, herbivore) => {
      return sum + (herbivore.maxEnergy - herbivore.currentEnergy);
    }, 0);
    let numEaten = Math.min(Math.min(this.herbivores.length/2), Math.ceil(requiredEnergy / 20), this.grasses.length);

    this.grasses = this.grasses.slice(numEaten);

    let energyPerHerbivore = (numEaten * 10) / this.herbivores.length;
    for (let i=0; i < this.herbivores.length; i++) {
      this.herbivores[i].absorbEnergy(energyPerHerbivore);
    }
  }

  bearChilds() {
    let numCarnivoreBabies = Math.ceil(this.herbivores.length * this.carnivores.length * 0.3 / (1 + this.herbivores.length));
    let numHerbivoreBabies = Math.ceil(this.grasses.length * this.herbivores.length * 0.3 / (1 + this.grasses.length));
    let numGrassBabies = Math.ceil(this.grasses.length * 0.3) * (this.numDeadBody + 1);

    let room = 100 - this.totalLives();

    let numCarnivoreBabiesAlive = 0;
    let numHerbivoreBabiesAlive = 0;
    let numGrassBabiesAlive = 0;

    while (true) {
      if (numGrassBabies > 0 && room > 0) {
        room--;
        numGrassBabies--;
        numGrassBabiesAlive++;
      }
      if (numHerbivoreBabies > 0 && room > 0) {
        room--;
        numHerbivoreBabies--;
        numHerbivoreBabiesAlive++;
      }
      if (numCarnivoreBabies > 0 && room > 0) {
        room--;
        numCarnivoreBabies--;
        numCarnivoreBabiesAlive++;
      }

      let total = numCarnivoreBabies + numHerbivoreBabies + numGrassBabies;
      if (room == 0 || total == 0) { break; }
    }

    for (let i=0; i < numCarnivoreBabiesAlive; i++) {
      this.carnivores.push(new Carnivore(7, 20));
    }

    for (let i=0; i < numHerbivoreBabiesAlive; i++) {
      this.herbivores.push(new Herbivore(20, 20));
    }

    for (let i=0; i < numGrassBabiesAlive; i++) {
      this.grasses.push(new Grass(30, 20));
    }

    this.numDeadBody = 0;
  }

  totalLives() {
    return (this.herbivores.length + this.carnivores.length + this.grasses.length);
  }
}

export default FoodChain;
