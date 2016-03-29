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
      this.grasses.push(new Grass());
    }
  }

  iterate() {
    this.carnivores = this.makeThemOld(this.carnivores);
    this.feedThemHerbivores();
    this.herbivores = this.makeThemOld(this.herbivores);
    this.feedThemGrasses(this.herbivores);
  }

  getNums() {
    return {
      carnivores: this.carnivores.length,
      herbivores: this.herbivores.length,
      grasses: this.grasses.length
    };
  }

  makeThemOld(targets) {
    return targets.filter((target) => {
      target.becomeOld();
      return !target.isDead();
    });
  }

  feedThemHerbivores() {
    for (let i=0; i < this.carnivores.length; i++) {
      if (this.herbivores.length === 0) { return; }

      if (this.carnivores[i].isHungry()) {
        this.carnivores[i].eat(this.herbivores.shift());
      }
    }
  }

  feedThemGrasses() {
    for (let i=0; i < this.herbivores.length; i++) {
      if (this.grasses.length === 0) { return; }

      if (this.herbivores[i].isHungry()) {
        this.herbivores[i].eat(this.grasses.shift());
      }
    }
  }
}

export default FoodChain;
