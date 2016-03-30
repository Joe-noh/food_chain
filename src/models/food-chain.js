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
    let numCarnivoreBabies = Math.ceil(this.carnivores.length * 0.1);
    let numHerbivoreBabies = Math.ceil(this.herbivores.length * 0.3);
    let numGrassBabies = Math.ceil(this.grasses.length * 0.5);

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
      this.carnivores.push(new Carnivore(10, 5));
    }

    for (let i=0; i < numHerbivoreBabiesAlive; i++) {
      this.herbivores.push(new Herbivore(20, 5));
    }

    for (let i=0; i < numGrassBabiesAlive; i++) {
      this.grasses.push(new Grass(20, 20));
    }

    this.numDeadBody = 0;
  }

  totalLives() {
    return (this.herbivores.length + this.carnivores.length + this.grasses.length);
  }
}

export default FoodChain;
