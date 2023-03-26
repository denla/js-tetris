export default class View {
  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.blockWidth = this.width / columns;
    this.blockHeight = this.height / rows;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');

    this.element.appendChild(this.canvas);
  }

  render({ playField }) {
    this.clear();

    for (let y = 0; y < playField.length; y++) {
      const line = playField[y];
      for (let x = 0; x < playField[y].length; x++) {
        const block = line[x];
        switch (block) {
          case 1:
            this.context.fillStyle = 'red';
            break;
          case 2:
            this.context.fillStyle = 'purple';
            break;
          case 3:
            this.context.fillStyle = 'green';
            break;
          case 4:
            this.context.fillStyle = 'orange';
            break;
          case 5:
            this.context.fillStyle = 'cyan';
            break;
        }
        if (block) {
          this.context.strokeStyle = 'black';
          this.context.lineWidth = 4;
          this.context.strokeRect(
            x * this.blockWidth,
            y * this.blockHeight,
            this.blockWidth,
            this.blockHeight,
          );
          this.context.fillRect(
            x * this.blockWidth,
            y * this.blockHeight,
            this.blockWidth,
            this.blockHeight,
          );
        }
      }
    }
  }

  renderPanel() {}

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
