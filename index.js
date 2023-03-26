import Game from './src/game.js';
import View from './src/view.js';

const root = document.querySelector('#root');
console.log(root);

const game = new Game();
const view = new View(root, 320, 640, 20, 10);

window.game = game;
window.view = view;

view.render(game.getState());

document.addEventListener('keydown', (e) => {
  console.log(e.key);
  switch (e.key) {
    case 's':
      game.movePieceDown();
      view.render(game.getState());
      break;
    case 'a':
      game.movePieceLeft();
      view.render(game.getState());
      break;
    case 'd':
      game.movePieceRight();
      view.render(game.getState());
      break;
    case 'w':
      game.rotatePiece();
      view.render(game.getState());
      break;
  }
});

function pieceDown() {
  game.movePieceDown();
  view.render(game.getState());
}

setInterval(pieceDown, 1000);
