const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// const size = 2700; // document.body.clientWidth;
const height = 24;
const width = 24;
// const center = size/2;
let blockSize = 1;
let maxBlocksLine = 8;
let numberOfBlocks = 70;
let maxBlocks = 40;
let sl = [81, 69];
const slOpts = [[81, 69], [100, 50]]; // saturation & lightness
svg1.setAttribute('viewBox', `0 0 ${width} ${height}`);
svg1.setAttribute("version", "1.1");
svg1.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
svg1.setAttribute('fill', '#fff');

let blocks = []
let pathDistance = 0

function rando(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function distanceTo(a,b,c,d) {
  const distance = Math.sqrt((Math.pow(c-a,2))+(Math.pow(d-b,2)))
  return distance;
}

function toImage() {
  const xml = new XMLSerializer().serializeToString(svg1);
  const svg64 = btoa(xml);
  const b64Start = 'data:image/svg+xml;base64,';

  // prepend a "header"
  const image64 = b64Start + svg64;
  const img = document.querySelector('img');
  img.src = image64;
}

function animate() {
    setInterval(() => {
      blocks.forEach((block, i) => {
        const blockEl = document.getElementById(`block-${i}`);
        const { hue } = blocks[i];
        const newHue = hue < 340 ? hue + 20 : (360 - hue);
        if (i === 0) console.log(newHue) 

        blockEl.setAttribute('fill', `hsl(${newHue}, ${sl[0]}%, ${sl[1]}%)`)
        blocks[i].hue = newHue;
    })
    }, 1000)
    // anime({
    //   targets: `.block-${i}`,
    //   // strokeDashoffset: [anime.setDashoffset, 1500],
    //   fill: `hsl(${360 - block.hue}, 100%, 100%)`,
    //   easing: 'linear',
    //   duration: 3000, // was 600000
    //   // delay: function(el, i) { return i * 250 },
    //   direction: 'alternate',
    //   loop: true,
    // });
}

const rect = () => document.createElementNS('http://www.w3.org/2000/svg', 'rect');

const eyeColors = [
  { lid: '#a76d2c', side: '#d39c5f'},
  { lid: '#ae2b7b', side: '#c0408f'},
];

const randoEyes = () => {
  return eyeColors[rando(0, eyeColors.length - 1)];
};

let eyeColor = randoEyes();

function setEyelid(block) {
  const eyelid = rect();
  eyelid.setAttribute('x', block.x);
  eyelid.setAttribute('y', block.y - blockSize);
  eyelid.setAttribute('width', blockSize * 2);
  eyelid.setAttribute('height', blockSize);
  eyelid.setAttribute('fill', eyeColor.lid);
  svg1.appendChild(eyelid);
}

function setSide(block, right) {
  const side = rect();
  side.setAttribute('x', block.x + blockSize);
  side.setAttribute('y', block.y);
  side.setAttribute('width', blockSize);
  side.setAttribute('height', blockSize);
  side.setAttribute('fill', right ? 'black' : eyeColor.side);
  svg1.appendChild(side);
}

function drawSvg() {
  eyeColor = randoEyes();
  const bg = rect();
  bg.setAttribute('width', width);
  bg.setAttribute('height', height);
  bg.setAttribute('fill', '#fff');
  svg1.appendChild(bg);
  const index1 = rando(0, blocks.length - 1);
  const setIndex2 = () => {
    const i2 = rando(0, blocks.length - 1);
    if (i2 === index1) return setTimeout(setIndex2, 0);
    return i2;
  };
  const index2 = setIndex2();
  const eye = true;
  const eye1 = blocks.splice(index1, 1);
  const eye2 = blocks.splice(index2, 1);
  blocks = blocks.concat([{ ...eye1[0], eye }]).concat([{ ...eye2[0], eye }]);
  console.log(blocks[blocks.length - 1]);
  console.log(blocks[blocks.length - 2]);
  const right = rando(0, 1);
  
  blocks.forEach((block, i) => {
  const blck = rect()
    blck.setAttribute('x', block.x);
    blck.setAttribute('y', block.y);
    blck.setAttribute('width', blockSize);
    blck.setAttribute('height', blockSize);
    blck.setAttribute('id', `block-${i}`);
    blck.setAttribute('fill', `hsl(${block.hue}, ${sl[0]}%, ${sl[1]}%)`)
    if (block.eye && block.x) {
      blck.setAttribute('fill', right ? eyeColor.side : 'black');
      setEyelid(block);
      setSide(block, right);
    }
    svg1.appendChild(blck);
  });
  document.getElementById("svg54583").appendChild(svg1);
  toImage();
  // animate();
}

let count = 0

function getBlockData() {
  let x, y, hue;
  if (blocks.length === 0) {
    x = rando(5, width - 6);
    y = rando(5, height - 6);
    hue = rando(0, 359);
    return { x, y, hue };
  }

  const lastBlock = blocks[blocks.length - 1];
  const xOptions = [lastBlock.x + blockSize, lastBlock.x - blockSize, lastBlock.x];
  const yOptions = [lastBlock.y + blockSize, lastBlock.y - blockSize, lastBlock.y];
  x = xOptions[rando(0, 1)]; // rando(0, 1) ? lastBlock.x + blockSize : lastBlock.x - blockSize;
  y = yOptions[rando(0, 1)]; // rando(0, 1) ? lastBlock.y + blockSize : lastBlock.y - blockSize;
  hue = lastBlock.hue + 20;
  
  return { x, y, hue }
}

function drawBlock() {
  const block = getBlockData();
  
  // const toCheck = bounds.concat(blocks);
  // let oldBlock;
  let tryAgain = false;
  for (let i = 0; i < blocks.length - 1; i++) {
    const oldBlock = blocks[i];
    if (block.x == oldBlock.x && block.y == oldBlock.y) {
      tryAgain = true;
      break;
    }
  }
  if (block.x == 5 || block.x == width - 5 || block.y == 5 || block.y == height - 5) {
    tryAgain = true;
  }
  if (tryAgain && count < 200) {
    count++;
    drawBlock();
  } else {
    count = 0;
    blocks.push(block)
  }
}

function drawRandom() {
  svg1.innerHTML = '';
  // svg1.appendChild(background);
  pathDistance = 0;
  blocks = [];
  // const length = rando(5, 1000);
  const visual = document.getElementById('visual');

  const rarityScore = rando(0, 99);
  let a = 0;
  let b = 3;
  if (rarityScore > 69 && rarityScore < 94) {
    a = 4;
    b = 5;
  } else if (rarityScore > 94) {
    a = 6;
    b = 6;
  }
  console.log(a, b)
  numberOfBlocks = rando(3, maxBlocks);
  sl = slOpts[rando(0, slOpts.length - 1)];
  // blockSize = rando(1,10) * 10;
  // maxBlocksLine = rando(2,15)
  // numberOfLines = rando(5,5000)
  for (let i = 0; i < numberOfBlocks; i++) {
    drawBlock()
  }
  drawSvg();
}

export {
  drawRandom,
  drawSvg,
}

// document.getElementById("button-instant").onclick = function() {
//   drawRandom();
//   drawSvg();
// };

// document.getElementById("visual").onclick = function() {
//   drawRandom();
//   drawSvg();
// };

// function frontPage() {
//   drawRandom();
//   drawSvg();
// }

// document.addEventListener("DOMContentLoaded", function(event) {
//   frontPage();
// });