import Game from './JAVASCRIPT/game';
import './SCSS/style.scss';

const game = new Game();
game.initBoard();
window.addEventListener('load', () => game.startGame());
document.querySelector('.game-start').addEventListener('click', () => game.startGame());
