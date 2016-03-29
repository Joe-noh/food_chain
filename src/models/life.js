class Life {
  constructor(lifeSpan, maxEnergy) {
    this.lifeSpan = lifeSpan;
    this.maxEnergy = maxEnergy;
    this.currentEnergy = Math.ceil(maxEnergy / 2);
    this.age = 0;
    this.dead = false;
  }

  becomeOld() {
    this.age++;
    this.currentEnergy = Math.max(this.currentEnergy-1, 0);
  }

  absorbEnergy(energy) {
    this.currentEnergy = Math.min(this.currentEnergy + energy, this.maxEnergy);
  }

  isHungry() {
    return (this.maxEnergy / 3) > this.currentEnergy;
  }

  isDead() {
    return (this.dead) || (this.age >= this.lifeSpan) || (this.currentEnergy === 0);
  }

  die() {
    this.dead = true;
  }
}

export default Life;
