function rando(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rect = () => document.createElementNS('http://www.w3.org/2000/svg', 'rect');
const getRgb = (arr) => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;

// function distanceTo({ x: a, y: b },{ x: c, y: d }) {
//   const distance = Math.sqrt((Math.pow(c-a,2))+(Math.pow(d-b,2)))
//   console.log(distance);
//   return distance;
// }

const pallets = [
  ['?', 81, 69, 'Pastel'],
  ['?', 100, 50, 'Pure'],
  [235, 0, '?', 'Light/Dark'],
  ['X', '?', '?', 'Saturation/Light'],
];

const eyeColors = [
  { lid: '#a76d2c', side: '#d39c5f'},
  { lid: '#ae2b7b', side: '#c0408f'},
  { lid: '#76bdbd', side: '#9be0e0', name: 'alien'},
];

export default class ArtEngine {

  constructor(id) {
    this.svgId = id;
    this.blockSize = 1;
    this.frame = 2;
    this.bgColors = ['#fff', '#000'];

    this.svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg1.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    this.svg1.setAttribute("version", "1.1");
    this.svg1.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    this.svg1.setAttribute('fill', '#fff');
    
    this.count = 0
  }

  // function toImage() {
  //   const xml = new XMLSerializer().serializeToString(svg1);
  //   const svg64 = btoa(xml);
  //   const b64Start = 'data:image/svg+xml;base64,';

  //   // prepend a "header"
  //   const image64 = b64Start + svg64;
  //   const img = document.querySelector('img');
  //   img.src = image64;
  // }

  // function animate() {
  //     setInterval(() => {
  //       blocks.forEach((block, i) => {
  //         const blockEl = document.getElementById(`block-${i}`);
  //         const { hue } = blocks[i];
  //         const newHue = hue < 340 ? hue + 20 : (360 - hue);
  //         if (i === 0) console.log(newHue) 

  //         blockEl.setAttribute('fill', `hsl(${newHue}, ${sl[0]}%, ${sl[1]}%)`)
  //         blocks[i].hue = newHue;
  //     })
  //     }, 1000)
  //     // anime({
  //     //   targets: `.block-${i}`,
  //     //   // strokeDashoffset: [anime.setDashoffset, 1500],
  //     //   fill: `hsl(${360 - block.hue}, 100%, 100%)`,
  //     //   easing: 'linear',
  //     //   duration: 3000, // was 600000
  //     //   // delay: function(el, i) { return i * 250 },
  //     //   direction: 'alternate',
  //     //   loop: true,
  //     // });
  // }

  randoEyes = () => {
    return eyeColors[rando(0, eyeColors.length - 2)];
  };

  setEyelid(block, right, isAlien) {
    const eyelid = rect();
    eyelid.setAttribute('x', block.x);
    eyelid.setAttribute('y', block.y - this.blockSize);
    eyelid.setAttribute('width', this.blockSize * (isAlien ? 1 : 2));
    eyelid.setAttribute('height', this.blockSize);
    eyelid.setAttribute('fill', (isAlien && right) ? 'black' : this.eyeColor.lid);
    this.svg1.appendChild(eyelid);
    if (isAlien) {
      const eyelid = rect();
      eyelid.setAttribute('x', block.x + 1);
      eyelid.setAttribute('y', block.y - this.blockSize);
      eyelid.setAttribute('width', this.blockSize);
      eyelid.setAttribute('height', this.blockSize);
      eyelid.setAttribute('fill', right ? this.eyeColor.lid : 'black');
      this.svg1.appendChild(eyelid);
    }
  }

  setSide(block, right) {
    const side = rect();
    side.setAttribute('x', block.x + this.blockSize);
    side.setAttribute('y', block.y);
    side.setAttribute('width', this.blockSize);
    side.setAttribute('height', this.blockSize);
    side.setAttribute('fill', right ? 'black' : this.eyeColor.side);
    this.svg1.appendChild(side);
  }

  drawSvg() {
    this.eyeColor = this.randoEyes();
    const bg = rect();
    bg.setAttribute('width', this.width);
    bg.setAttribute('height', this.height);
    bg.setAttribute('fill', getRgb(this.bg));
    this.svg1.appendChild(bg);
    
    this.blocks.forEach((block, i) => {
      const blck = rect()
      blck.setAttribute('x', block.x);
      blck.setAttribute('y', block.y);
      blck.setAttribute('width', this.blockSize);
      blck.setAttribute('height', this.blockSize);
      blck.setAttribute('id', `block-${i}`);
      blck.setAttribute('fill', getRgb(this.palette[rando(1, this.palette.length - 1)]))//`hsl(${block.hue}, ${block.sat}%, ${block.light}%)`);
      // if (block.eye && block.x) {
      //   blck.setAttribute('fill', right ? eyeColor.side : 'black');
      //   setEyelid(block, right, isAlien);
      //   setSide(block, right);
      // }
      this.svg1.appendChild(blck);
    });
    const svgElement = document.getElementById(this.svgId);
    if (svgElement) {
      document.getElementById(this.svgId).appendChild(this.svg1);
    } else {
      console.log('svg id', this.svgId)
    }
    // toImage();
    // animate();
  }

  getBlockData() {
    let x, y, hue, sat, light;
    const vHue = this.pallet[0] === '?';
    const vSat = this.pallet[1] === '?';
    const vLight = this.pallet[2] === '?';
    if (this.blocks.length === 0) {
      x = rando(this.frame, this.width - this.frame);
      y = rando(this.frame, this.height - this.frame);

      hue = vHue ? rando(1, 360) : this.pallet[0];
      sat = vSat ? 1 : this.pallet[1];
      light = vLight ? 1 : this.pallet[2];

      return { x, y, hue, sat, light };
    }

    const lastBlock = this.blocks[this.blocks.length - 1];
    const xOptions = [lastBlock.x + this.blockSize, lastBlock.x - this.blockSize, lastBlock.x];
    const yOptions = [lastBlock.y + this.blockSize, lastBlock.y - this.blockSize, lastBlock.y];
    x = xOptions[rando(0, 1)]; // rando(0, 1) ? lastBlock.x + blockSize : lastBlock.x - blockSize;
    y = yOptions[rando(0, 1)]; // rando(0, 1) ? lastBlock.y + blockSize : lastBlock.y - blockSize;
    hue = !vHue ? this.pallet[0] : lastBlock.hue + (360 / this.numberOfBlocks);
    sat = !vSat ? this.pallet[1] : lastBlock.sat + (100 / this.numberOfBlocks);
    light = !vLight ? this.pallet[2] : lastBlock.light + (100 / this.numberOfBlocks);
    
    return { x, y, hue, sat, light }
  }

  drawBlock() {
    const block = this.getBlockData();
    
    // const toCheck = bounds.concat(blocks);
    // let oldBlock;
    let tryAgain = false;
    for (let i = 0; i < this.blocks.length - 1; i++) {
      const oldBlock = this.blocks[i];
      if (block.x === oldBlock.x && block.y === oldBlock.y) {
        tryAgain = true;
        break;
      }
    }
    if (block.x <= this.frame || block.x >= this.width - this.frame || block.y <= this.frame || block.y >= this.height - this.frame) {
      tryAgain = true;
    }
    if (tryAgain && this.count < 200) {
      this.count++;
      this.drawBlock();
    } else if (!tryAgain) {
      this.count = 0;
      this.blocks.push(block)
    }
  }

  drawRandom(palette) {
    if (palette) {
      this.palette = palette;
      this.bg = palette[0];
    }

    this.svg1.innerHTML = '';
    this.blocks = [];
    this.size = rando(10, 24);
    this.height = this.size;
    this.width = this.size * 3;
    this.blockSize = 1;
    this.maxBlocks = (this.width * this.height) / 2;
    this.numberOfBlocks = rando(3, this.maxBlocks);
    this.blocks = []
    this.pallet = pallets[rando(0, pallets.length - 1)];
    if (this.pallet[0] === 'X') this.pallet[0] = rando(1, 360);
    this.eyeColor = this.randoEyes();
    this.frame = Math.floor(this.size / 10);
    // this.bg = this.bgColors[0]; //rando(0,1)];

    this.svg1.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);

    for (let i = 0; i < this.numberOfBlocks; i++) {
      this.drawBlock()
    }
    this.drawSvg();

    return {
      svg: this.svg1,
      pallet: this.pallet,
    };
  }
}

// export {
//   drawRandom,
//   drawSvg,
// }

// make other hsl animations
// try removing the background rect
// so anim can target rect