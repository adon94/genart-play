function rando(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rect = () => document.createElementNS('http://www.w3.org/2000/svg', 'rect');

const path = () => document.createElementNS('http://www.w3.org/2000/svg', 'path');

const getRgb = (arr) => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;

export default class ArtEngine {
  constructor(id) {
    this.svgId = id;
    this.height = 500;
    this.width = 1500;

    this.svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg1.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    this.svg1.setAttribute("version", "1.1");
    this.svg1.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this.svg1.setAttribute('fill', 'none');
  }

  brush(j) {
    const brushStroke = path();
    const thickness = this.type === 0 ? rando(50, 70) : rando(10, 30);
    const x1 = rando(60, this.width-60);
    const y1 = rando(20, this.height-20);
    const x2 = rando(60, this.width-60);
    const y2 = rando(20, this.height-20);

    const xCurve = rando(x1, x2);
    const yCurve = rando(y1, y2);
    let d = `M ${x1},${y1}
    Q ${xCurve},${yCurve} ${x2},${y2}`;


    for (let i = thickness / -2; i < thickness / 2; i++) {
      d = `${d}
      M ${x1 + i+1 + rando(-3,3)},${y1 + i+1 + rando(-3,3)}
      Q ${xCurve + i+1},${yCurve + i+1} ${x2 + i+1 + rando(-3,3)},${y2 + i+1 + rando(-3,3)}`
      
      d = `${d}
      M ${x1 + i+1 + rando(-10,10)},${y1 + i+1 + rando(-10,10)}
      Q ${xCurve + i+1},${yCurve + i+1} ${x2 + i+1 + rando(-10,10)},${y2 + i+1 + rando(-10,10)}`
    }

    brushStroke.setAttribute('d', d);
    const strokeColor = getRgb(this.palette[j + 2] || this.palette[rando(1, this.palette.length - 1)]);//rando(1, this.palette.length - 1)])
    brushStroke.setAttribute('stroke', strokeColor);
    brushStroke.setAttribute('stroke-width', 1);
    this.svg1.appendChild(brushStroke);
  }

  setBg() {
    const bg = rect();
    bg.setAttribute('width', this.width);
    bg.setAttribute('height', this.height);
    bg.setAttribute('fill', getRgb(this.palette[0]));
    this.svg1.appendChild(bg);
  }

  drawRandom(palette) {
    if (palette) {
      this.palette = palette;
      this.bg = palette[0];
    }

    this.svg1.innerHTML = '';

    this.setBg();

    this.type = rando(0, 1);

    this.numElements = this.type === 0 ? rando(1, 5) : rando(5, 15);

    for (let i = 0; i < this.numElements; i++) {
      this.brush(i);
    }

    return {
      svg: this.svg1,
      pallet: this.pallet,
    };
  }
}
