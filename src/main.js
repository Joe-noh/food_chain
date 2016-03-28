import titleState from './states/title';

let game = new Phaser.Game(400, 490);

game.state.add('title', titleState);
game.state.start('title');
