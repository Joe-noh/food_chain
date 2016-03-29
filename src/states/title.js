let titleState = {
  preload() {
  },

  create() {
    console.log("titleState created");

    let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.startConfiguration, this);
  },

  update() {
  },

  startConfiguration() {
    this.game.state.start('configuration');
  }
};

export default titleState;
