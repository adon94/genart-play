function rando(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rect = () => document.createElementNS('http://www.w3.org/2000/svg', 'rect');

const path = () => document.createElementNS('http://www.w3.org/2000/svg', 'path');

const getRgb = (arr) => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;

// function distanceTo({ x: a, y: b },{ x: c, y: d }) {
//   const distance = Math.sqrt((Math.pow(c-a,2))+(Math.pow(d-b,2)))
//   return distance;
// }

function genTokenData(projectNum) {
  let data = {};
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = hash;
  data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
  return data;
}

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

  getD(x1, y1, x2, y2, xCurve, yCurve, i) {
    const v = 3;
    const start = `M ${x1 + i + rando(-v,v)},${y1 + i+1 + rando(-v,v)}`;
    const curve = this.straightLines ? 'L' : `Q ${xCurve + i},${yCurve + i}`
    const end = `${curve} ${x2 + i + rando(-3,3)},${y2 + i + rando(-3,3)}`;

    return `${start}
    ${end}`
  }

  brush(j) {
    const brushStroke = path();

    const line = this.lines[j];
    const { x1, y1, x2, y2, xCurve, yCurve, thickness } = line;
    let d = '';

    if (!this.isSingleLines) {
      for (let i = line.thickness / -2; i < line.thickness / 2; i++) {
        d = `${d}
        ${this.getD(x1, y1, x2, y2, xCurve, yCurve, i)}
        ${this.getD(x1, y1, x2, y2, xCurve, yCurve, i)}`
      }
      brushStroke.setAttribute('stroke-width', 1);
    } else {
      d = this.getD(x1, y1, x2, y2, xCurve, yCurve, 0)
      brushStroke.setAttribute('stroke-width', thickness);
    }


    brushStroke.setAttribute('d', d);
    const strokeColor = getRgb(this.palette[j + 2] || this.palette[rando(1, this.palette.length - 1)]);//rando(1, this.palette.length - 1)])
    brushStroke.setAttribute('stroke', strokeColor);
    this.svg1.appendChild(brushStroke);
  }

  setBg() {
    const bg = rect();
    bg.setAttribute('width', this.width);
    bg.setAttribute('height', this.height);
    bg.setAttribute('fill', getRgb(this.palette[0]));
    this.svg1.appendChild(bg);
  }

  setTraits() {
    // Fidenza has 10 traits
    this.marginHorizontal = (this.width / 100) * 10;
    this.marginVertical = (this.height / 100) * 10;
    this.type = rando(0, 1); // thick vs thin lines
    this.numElements = this.type === 0 ? rando(1, 5) : rando(5, 15); // num of lines
    this.straightLines = rando(0, 1) === 0;
    this.isSingleLines = rando(0, 3) === 0;
    this.isParallel = rando(0, 1) === 0;
    // has margin
    // has outlines
  }

  isInBounds({ x1, y1, x2, y2 }) {
    const xBound1 = this.marginHorizontal;
    const xBound2 = this.width - this.marginHorizontal;
    const yBound1 = this.marginVertical;
    const yBound2 = this.height - this.marginVertical;
    return (x1 > xBound1 && x1 < xBound2
      && y1 > yBound1 && y1 < yBound2
      && x2 > xBound1 && x2 < xBound2
      && y2 > yBound1 && y2 < yBound2);
  }

  getRandomLine() {
    const x1 = rando(this.marginHorizontal, this.width - this.marginHorizontal);
    const y1 = rando(this.marginVertical, this.height - this.marginVertical);
    const x2 = rando(this.marginHorizontal, this.width - this.marginHorizontal);
    const y2 = rando(this.marginVertical, this.height - this.marginVertical);

    const xCurve = rando(x1, x2);
    const yCurve = rando(y1, y2);
    return { x1, y1, x2, y2, xCurve, yCurve }
  }

  setLineArray() {
    this.lines = [];

    for (let i = 0; i < this.numElements; i++) {
      const thickness = this.type === 0 ? rando(50, 70) : rando(10, 30);
      if (!this.isParallel || i === 0) {
        const line = this.getRandomLine();
        this.lines.push({ ...line, thickness });
      } else {
        const separation = thickness + (thickness / 10);
        const x1 = this.lines[i - 1].x1 + separation;
        const y1 = this.lines[i - 1].y1 + separation;
        const x2 = this.lines[i - 1].x2 + separation;
        const y2 = this.lines[i - 1].y2 + separation;
        const xCurve = this.lines[i - 1].xCurve + separation;
        const yCurve = this.lines[i - 1].yCurve + separation;
        const line = { x1, y1, x2, y2, xCurve, yCurve, thickness }
        if (this.isInBounds(line)) {
          this.lines.push(line);
        } else {
          const replacementLine = this.getRandomLine();
          this.lines.push({ ...replacementLine, thickness });
        }
      }
    }
  }

  drawRandom(palette) {
    if (palette) {
      this.palette = palette;
      this.bg = palette[0];
    }

    const tokenData = genTokenData(123);
    console.log(tokenData.hash);

    this.svg1.innerHTML = '';

    this.setBg();

    this.setTraits();
    this.setLineArray();

    for (let i = 0; i < this.lines.length; i++) {
      this.brush(i);
    }

    return {
      svg: this.svg1,
      pallet: this.pallet,
    };
  }
}
