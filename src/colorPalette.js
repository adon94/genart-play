import { prominent } from 'color.js'

const getPalette = async (imgUrl) => {
  const myPromise = new Promise((resolve, reject) => {
    const img = new Image();
    
    img.addEventListener('load', function() {
      prominent(img, { amount: 5 }).then(color => {
        console.log(color) // [241, 221, 63]
        resolve(color);
      })
    });
    
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    
    img.crossOrigin = 'Anonymous';
    img.src = googleProxyURL + encodeURIComponent(imgUrl);
  });
  return await myPromise;
};

export default getPalette;