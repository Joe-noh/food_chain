import Carnivore from './carnivore';
import Harbivore from './harbivore';
import Grass     from './grass';

class FoodChain {
  constructor(numCarnivores, numHarbivores, numGrasses) {
    this.carnivores = [];
    this.harbivores = [];
    this.grasses = [];

    for (let i=0; i < numCarnivores; i++) {
      this.carnivores.push(new Carnivore(10, 20));
    }
    for (let i=0; i < numHarbivores; i++) {
      this.harbivores.push(new Harbivore(20, 25));
    }
    for (let i=0; i < numGrasses; i++) {
      this.grasses.push(new Grass());
    }
  }

  iterate() {
    this.carnivores = this.makeThemOld(this.carnivores);
    this.feedThemHarbivores();
    this.harbivores = this.makeThemOld(this.harbivores);
    this.feedThemGrasses(this.harbivores);
  }

  getNums() {
    return {
      carnivores: this.carnivores.length,
      harbivores: this.harbivores.length,
      grasses: this.grasses.length
    };
  }

  makeThemOld(targets) {
    return targets.filter((target) => {
      target.becomeOld();
      return !target.isDead();
    });
  }

  feedThemHarbivores() {
    for (let i=0; i < this.carnivores.length; i++) {
      if (this.harbivores.length === 0) { return; }

      if (this.carnivores[i].isHungry()) {
        this.carnivores[i].eat(this.harbivores.shift());
      }
    }
  }

  feedThemGrasses() {
    for (let i=0; i < this.harbivores.length; i++) {
      if (this.grasses.length === 0) { return; }

      if (this.harbivores[i].isHungry()) {
        this.harbivores[i].eat(this.grasses.shift());
      }
    }
  }
}

export default FoodChain;
