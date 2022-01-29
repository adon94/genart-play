import ColorThief from 'colorthief';

const isSame = (x, y) => {
  const isClose = (v) => (x[v] + 7 > y[v] && x[v] - 7 < y[v])

  const r = isClose(0);
  const g = isClose(1);
  const b = isClose(2);

  return (r && g && b);
}

const getPalette = async (imgUrl) => {
  const myPromise = new Promise((resolve, reject) => {
    const colorThief = new ColorThief();
    const img = new Image();
    
    img.addEventListener('load', function() {
      const dom = colorThief.getColor(img, 1);
      const palette = colorThief.getPalette(img, 8, 1)
      console.log({palette});
      palette.forEach((element, index) => {
        console.log(dom);
        console.log(element);
        if (isSame(dom, element)) palette.splice(index, 1);
      });
      console.log({palette});
      resolve([dom].concat(palette));
    });
    
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    
    img.crossOrigin = 'Anonymous';
    img.src = googleProxyURL + encodeURIComponent(imgUrl);
  });
  return await myPromise;
};

export default getPalette;