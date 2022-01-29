import './App.css';
import Block from './Block';
import styled from 'styled-components';
import ImageInput from './ImageInput';
import { useState } from 'react';
import getPalette from './colorPalette';

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
  width: 65%;
  margin: auto;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 20px;
  border: 1px solid black;
  background-color: white;
  text-transform: uppercase;
  padding: 5px 10px;
  cursor: pointer;
`;

const gba = 'https://lh3.googleusercontent.com/9SY74GONw-wqgABAm9m3WULDrTFAtVA_eNdxeqtCDEmdzncmaJFU99OrG9OfBbYSCCbXUyml_F15YzSwMcOtG8JuBMHAJ3gJYqq9IC0=w600'

function App() {
  const [url, setUrl] = useState(gba);
  const [palette, setPalette] = useState();
  
  const extract = async () => {
    if (url !== '') {
      const newPal = await getPalette(url);
      setPalette(newPal);
    }
  }

  return (
    <Container>
      {/* <TitleContainer>
        <h1>Keycard</h1>
      </TitleContainer> */}
      {/* <nav id="control" className="nav-bottom">
        <button id="button-instant" className="button" onClick={() => drawRandom()}>GENERATE</button>
      </nav> */}
      {/* <div id="visual" class="card">
        <img alt="svg-img" />
      </div> */}
      <BlockContainer>
        <ImageInput onChange={({ target: { value }}) => setUrl(value)} value={url}  />
        {url && <img height={300} width="auto" src={url} alt="NFT" />}
        {url && <Button onClick={extract}>Extract</Button>}
        <Block palette={palette} />
      </BlockContainer>
      {/* <BlockGallery /> */}
    </Container>
  );
}

export default App;
