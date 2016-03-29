let configurationState = {
  preload() {
  },

  create() {
    console.log("configurationState created");

    let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.startSimulation, this);
  },

  update() {
  },

  startSimulation() {
    this.game.state.start('simulation', true, false, {hoge: 'fuga'});
  }
};

export default configurationState;
