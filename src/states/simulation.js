import FoodChain from '../models/food-chain';

let simulationState = {
  init(params) {
      console.log(params);
  },

  preload() {
  },

  create() {
    console.log("simulationState created");

    this.foodChain = new FoodChain(20, 40, 40);
    this.timer = this.game.time.events.loop(1000, this.iterate, this);
  },

  update() {
  },

  iterate() {
    this.foodChain.iterate();
    console.log(this.foodChain.getNums());
  }
};

export default simulationState;
