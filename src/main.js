import titleState         from './states/title';
import simulationState    from './states/simulation';
import configurationState from './states/configuration';

let game = new Phaser.Game(400, 490);

game.state.add('title',         titleState);
game.state.add('simulation',    simulationState);
game.state.add('configuration', configurationState);

game.state.start('title');
