import Carnivore from './carnivore';
import Herbivore from './herbivore';
import Grass     from './grass';

class FoodChain {
  constructor(numCarnivores, numHerbivores, numGrasses) {
    this.carnivores = [];
    this.herbivores = [];
    this.grasses = [];

    for (let i=0; i < numCarnivores; i++) {
      this.carnivores.push(new Carnivore(10, 20));
    }
    for (let i=0; i < numHerbivores; i++) {
      this.herbivores.push(new Herbivore(20, 25));
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
    let numEaten = Math.min(5, Math.ceil(requiredEnergy / 25), this.herbivores.length);

    this.herbivores = this.herbivores.slice(numEaten);

    let energyPerCarnivore = (numEaten * 25) / this.carnivores.length;
    for (let i=0; i < this.carnivores.length; i++) {
      this.carnivores[i].absorbEnergy(energyPerCarnivore);
    }
  }

  eatGrasses() {
    if (this.herbivores.length === 0) { return; }

    let requiredEnergy = this.herbivores.reduce((sum, herbivore) => {
      return sum + (herbivore.maxEnergy - herbivore.currentEnergy);
    }, 0);
    let numEaten = Math.min(5, Math.ceil(requiredEnergy / 25), this.grasses.length);

    this.grasses = this.grasses.slice(numEaten);

    let energyPerHerbivore = (numEaten * 25) / this.herbivores.length;
    for (let i=0; i < this.herbivores.length; i++) {
      this.herbivores[i].absorbEnergy(energyPerHerbivore);
    }
  }
}

export default FoodChain;
