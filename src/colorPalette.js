import { prominent } from 'color.js'

const isSame = (x, y) => {
  const isClose = (v) => (x[v] + 7 > y[v] && x[v] - 7 < y[v])

  const r = isClose(0);
  const g = isClose(1);
  const b = isClose(2);

  return (r && g && b);
}

const getPalette = async (imgUrl, amount = 5) => {
  const myPromise = new Promise((resolve, reject) => {
    const img = new Image();
    
    img.addEventListener('load', function() {
      prominent(img, { amount }).then(palette => {
        console.log(palette.length)
        palette.forEach((element, index) => {
          if (index !== 0 && isSame(palette[0], element)) palette.splice(index, 1);
        });
        resolve(palette);
      })
    });
    
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    
    img.crossOrigin = 'Anonymous';
    img.src = googleProxyURL + encodeURIComponent(imgUrl);
  });
  return await myPromise;
};

export default getPalette;