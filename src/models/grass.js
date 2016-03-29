class Grass {
  constructor() {
    this.dead = false;
  }

  isDead() {
    return this.dead;
  }

  die() {
    this.dead = true;
  }
}

export default Grass;
