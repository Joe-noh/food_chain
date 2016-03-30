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
      this.carnivores.push(new Carnivore(10, 5));
    }
    for (let i=0; i < numHerbivores; i++) {
      this.herbivores.push(new Herbivore(20, 5));
    }
    for (let i=0; i < numGrasses; i++) {
      this.grasses.push(new Grass(20, 10));
    }
  }

  iterate() {
    this.carnivores = this.makeOld(this.carnivores);
    this.herbivores = this.makeOld(this.herbivores);

    this.eatFood(this.carnivores, this.herbivores);
    this.eatFood(this.herbivores, this.grasses);

    this.releaseEnergy();
    this.bearChilds();
  }

  getNums() {
    return {
      carnivores: this.carnivores.length,
      herbivores: this.herbivores.length,
      grasses: this.grasses.length
    };
  }

  makeOld(animals) {
    let energyForGrasses = 0;

    for (let animal of animals) {
      animal.becomeOld();
      if (animal.isDead()) { this.numDeadBody++; }
    }

    return animals.filter(animal => !animal.isDead());
  }

  releaseEnergy() {
    if (this.grasses.length == 0) { return; }

    let energyPerGrass = this.numDeadBody / this.grasses.length;

    for (let grass of this.grasses) {
      grass.absorbEnergy(energyPerGrass);
    }
  }

  eatFood(animals, foods) {
    if (animals.length === 0) { return; }

    let requiredEnergy = animals.reduce(((sum, animal) => sum + animal.hunger()), 0);
    let numEaten = Math.floor(Math.min(
      animals.length,
      requiredEnergy / 2,
      foods.length / 2
    ));

    foods.splice(0, numEaten);

    for (let animal of animals) {
      animal.absorbEnergy(numEaten*0.5 / animals.length);
    }
  }

  bearChilds() {
    let room = 100 - this.totalLives();

    let numCarnivoreBabies = Math.ceil(this.carnivores.length * 0.1);
    let numHerbivoreBabies = Math.ceil(this.herbivores.length * 0.2);
    let numGrassBabies = Math.ceil(this.grasses.length * 0.3 * (this.numDeadBody));

    let max = Math.max(numCarnivoreBabies, numHerbivoreBabies, numGrassBabies);
    let normalized = [numCarnivoreBabies, numHerbivoreBabies, numGrassBabies].map((babies) => {
      return Math.floor((room / 3) * babies / max);
    });

    for (let i=0; i < normalized[0]; i++) {
      this.carnivores.push(new Carnivore(10, 5));
    }

    for (let i=0; i < normalized[1]; i++) {
      this.herbivores.push(new Herbivore(20, 5));
    }

    for (let i=0; i < normalized[2]; i++) {
      this.grasses.push(new Grass(20, 20));
    }

    this.numDeadBody = 0;
  }

  totalLives() {
    return (this.herbivores.length + this.carnivores.length + this.grasses.length);
  }
}

export default FoodChain;
