class Life {
  constructor(lifeSpan, stomachCapacity) {
    this.lifeSpan = lifeSpan;
    this.stomachCapacity = stomachCapacity;
    this.stomachContent = Math.ceil(stomachCapacity / 2);
    this.age = 0;
    this.dead = false;
  }

  becomeOld() {
    this.age++;
    this.stomachContent = Math.max(this.stomachContent-1, 0);
  }

  eat(meal) {
    this.stomachContent = this.stomachCapacity;
  }

  isHungry() {
    return (this.stomachCapacity / 3) > this.stomachContent;
  }

  isDead() {
    return (this.dead) || (this.age >= this.lifeSpan) || (this.stomachContent === 0);
  }

  die() {
    this.dead = true;
  }
}

export default Life;
