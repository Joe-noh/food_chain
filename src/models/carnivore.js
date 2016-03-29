import Animal from './animal';

class Carnivore extends Animal {
  constructor(lifeSpan, stomachCapacity) {
    super(lifeSpan, stomachCapacity);
  }
}

export default Carnivore;
