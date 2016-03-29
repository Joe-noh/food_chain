class Animal {
  constructor(lifeSpan) {
    this.lifeSpan = lifeSpan;
    this.age = 0;
  }

  becomeOld() {
    this.age++;
  }

  isDead() {
    return (this.age >= this.lifeSpan);
  }
}
