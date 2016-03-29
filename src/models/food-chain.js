import Carnivore from './carnivore';
import Harbivore from './harbivore';
import Grass     from './grass';

class FoodChain {
  constructor(numCarnivores, numHarbivores, numGrasses) {
    this.carnivores = [];
    this.harbivores = [];
    this.grasses = [];

    for (let i=0; i < numCarnivores; i++) {
      this.carnivores.push(new Carnivore(5));
    }
    for (let i=0; i < numHarbivores; i++) {
      this.harbivores.push(new Harbivore(8));
    }
    for (let i=0; i < numGrasses; i++) {
      this.grasses.push(new Grass());
    }
  }

  iterate() {
    this.carnivores = this.makeThemOld(this.carnivores);
    this.harbivores = this.makeThemOld(this.harbivores);
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
}

export default FoodChain;
