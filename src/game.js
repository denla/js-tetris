export default class Game {
  score = 0;
  lines = 0;
  level = 0;
  playField = this.createPlayField();
  activePiece = this.createPiece();
  nextPiece = this.createPiece();

  points = {
    1: 40,
    2: 100,
    3: 300,
    4: 1200,
  };

  movePieceLeft() {
    this.activePiece.x -= 1;
    if (this.hasCollision()) {
      this.activePiece.x += 1;
    }
  }
  movePieceRight() {
    this.activePiece.x += 1;
    if (this.hasCollision()) {
      this.activePiece.x -= 1;
    }
  }
  movePieceTop() {
    this.activePiece.y -= 1;
    if (this.hasCollision()) {
      this.activePiece.y += 1;
    }
  }
  movePieceDown() {
    this.activePiece.y += 1;
    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      this.updatePieces();
      this.removeFullLine();
    }
  }

  getState() {
    //копируем из текущего игрового поля в playfield
    const playField = this.createPlayField();
    for (let y = 0; y < this.playField.length; y++) {
      for (let x = 0; x < this.playField[y].length; x++) {
        playField[y][x] = this.playField[y][x];
      }
    }

    //копируем значение из активной фигуры в playfield
    const { x: pieceX, y: pieceY, block } = this.activePiece;

    for (let y = 0; y < block.length; y++) {
      for (let x = 0; x < block[y].length; x++) {
        if (block[y][x]) {
          playField[pieceY + y][pieceX + x] = block[y][x];
        }
      }
    }

    return { playField };
  }

  createPlayField() {
    //создаем пустое playfield
    const playField = [];
    for (let y = 0; y < 20; y++) {
      playField[y] = [];

      for (let x = 0; x < 10; x++) {
        playField[y][x] = 0;
      }
    }
    return playField;
  }

  createPiece() {
    const blocks = [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
      ],
      [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
      ],
    ];
    const blockType = Math.round((Math.random() * 10) % (blocks.length - 1));
    // console.log(blockType);
    // console.log(blocks[blockType]);
    // console.log(this.changeColor(blocks[blockType]));
    return {
      x: 4,
      y: 0,
      block: this.changeColor(blocks[blockType]),
      //block: blocks[blockType],
      // nextPiece: this.createPiece();
    };
  }

  changeColor(block) {
    const colorType = Math.round(1 + ((Math.random() * 10) % 6));
    for (let y = 0; y < block.length; y++) {
      for (let x = 0; x < block[y].length; x++) {
        if (block[y][x]) {
          block[y][x] = colorType;
        }
      }
    }
    return block;
  }

  rotatePiece() {
    const { block } = this.activePiece;

    const rotatedPiece = [];
    for (let y = 0; y < block.length; y++) {
      rotatedPiece[y] = [];
      for (let x = 0; x < block[y].length; x++) {
        rotatedPiece[y][x] = block[block[y].length - 1 - x][y];
      }
    }

    //перезаписываем activeBlock
    for (let y = 0; y < block.length; y++) {
      for (let x = 0; x < block[y].length; x++) {
        this.activePiece.block[y][x] = rotatedPiece[y][x];
      }
    }
  }

  hasCollision() {
    const { x: pieceX, y: pieceY, block } = this.activePiece;

    for (let y = 0; y < block.length; y++) {
      for (let x = 0; x < block[y].length; x++) {
        if (
          //если вышло за границы и не ноль
          block[y][x] !== 0 &&
          (this.playField[pieceY + y] === undefined ||
            this.playField[pieceY + y][pieceX + x] === undefined ||
            this.playField[pieceY + y][pieceX + x])
        ) {
          return true;
        }
      }
    }
    return false;
  }

  lockPiece() {
    const { x: pieceX, y: pieceY, block } = this.activePiece;

    for (let y = 0; y < block.length; y++) {
      for (let x = 0; x < block[y].length; x++) {
        if (block[y][x] !== 0) {
          this.playField[pieceY + y][pieceX + x] = this.activePiece.block[y][x];
        }
      }
    }
    this.createPiece();
  }

  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }

  removeFullLine() {
    const rows = 20;
    const columns = 10;
    let lines = [];

    for (let y = rows - 1; y >= 0; y--) {
      let numberofblocks = 0;

      for (let x = 0; x < columns; x++) {
        if (this.playField[y][x]) {
          numberofblocks += 1;
        }
      }

      if (numberofblocks == 0) {
        break;
      } else if (numberofblocks < columns) {
        continue;
      } else if (numberofblocks == columns) {
        lines.unshift(y);
      }
    }

    for (let index in lines) {
      console.log(index);
      console.log(this.playField);
      //console.log(new Array(columns).fill(0));
      this.playField.splice(lines[index], 1);
      console.log(this.playField);
      this.playField.unshift(new Array(columns).fill(0));
      console.log(this.playField);
    }

    this.updateScore(lines.length);
    console.log(lines);
  }

  updateScore(clearedLines) {
    if (clearedLines > 0) {
      this.lines += clearedLines;
      this.score += this.points[clearedLines];
    }
  }
}
