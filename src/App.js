import './App.css';
import Block from './Block';
import styled from 'styled-components';
import ImageInput from './ImageInput';
import { useState } from 'react';
import getPalette from './colorPalette';
// import MakeMinty from './api/minty';

const Container = styled.div`
  /* align-content: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative; */
  width: 100%;
  @media screen and (max-width: 600px) {
    align-content: space-between;
  }
`;

const BlockContainer = styled.div`
  /* max-height: 80vh; */
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    width: 65%;
    margin: auto;
  }
`;

const TitleContainer = styled.div`
  margin: 5% 10%;
`

const Button = styled.button`
  margin-top: 20px;
  border: 1px solid black;
  background-color: #111;
  color: #fff;
  border-radius: 2px;
  text-transform: uppercase;
  padding: 15px 20px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
`

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`

const PaletteItem = styled.div`
  display: flex;
  flex: 1;
  width: 100px;
  height: auto;
  background-color: ${({ color }) => `rgb(${color[0]},${color[1]},${color[2]})`};
`

const ape = 'https://lh3.googleusercontent.com/SHOiycapLcGObHoex33iI2d40p4V7xsBNqv_db3wjta7zimyQDwjzn2YxUBGcvc8OBd2b3mWTKQDEnrzoCD4iL58OOdDFW6u9rHT=w335'

function App() {
  const [url, setUrl] = useState(ape);
  const [palette, setPalette] = useState();
  const [numColors, setNumColors] = useState(3);
  
  const extract = async () => {
    if (url !== '') {
      const newPal = await getPalette(url, numColors);
      setPalette(newPal);
    }
  }

  const onNumColors = async ({ target: { value }}) => {
    const newPal = await getPalette(url, value);
    setPalette(newPal);
    setNumColors(value);
  }

  const storeImage = async (img) => {
    console.log(img);
    // const minty = await MakeMinty()
    // const nft = await minty.createNFTFromAssetFile(img, { name: '#whatev', description: 'nope' })
  }

  return (
    <Container>
      <TitleContainer>
        <h1>Sutorōku</h1>
      </TitleContainer>
      {/* <nav id="control" className="nav-bottom">
        <button id="button-instant" className="button" onClick={() => drawRandom()}>GENERATE</button>
      </nav> */}
      {/* <div id="visual" class="card">
        <img alt="svg-img" />
      </div> */}
      <BlockContainer>
        <ImageInput onChange={({ target: { value }}) => setUrl(value)} value={url} />
        <p>{numColors}</p>
        <input type="range" min={2} max={10} value={numColors} onChange={onNumColors} id="myRange"></input>
        <ImageContainer>
          {url && <img height={300} width="auto" src={url} alt="NFT" />}
          <PaletteContainer>
            {palette?.length > 0 && palette.map((color) => <PaletteItem color={color} key={color.toString()} />)}
          </PaletteContainer>
        </ImageContainer>
        {url && <Button onClick={extract}>Generate</Button>}
        <Block palette={palette} sendImage={storeImage} />
      </BlockContainer>
      {/* <BlockGallery /> */}
    </Container>
  );
}

export default App;
