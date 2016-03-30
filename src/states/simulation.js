import FoodChain from '../models/food-chain';

let simulationState = {
  init(params) {
      console.log(params);
  },

  preload() {
  },

  create() {
    console.log("simulationState created");

    this.foodChain = new FoodChain(10, 30, 60);
    this.timer = this.game.time.events.loop(100, this.iterate, this);
  },

  update() {
  },

  iterate() {
    this.foodChain.iterate();
    console.log(this.foodChain.getNums());
  }
};

export default simulationState;
