import './App.css';
import BlockGallery from './BlockGallery';
import Block from './Block';
import styled from 'styled-components';

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
  max-height: 80vh;
  width: 35%;
  margin: auto;
`;

const TitleContainer = styled.div`
  margin: 5% 10%;
`

function App() {
  return (
    <Container>
      <TitleContainer>
        <h1>???</h1>
      </TitleContainer>
      {/* <nav id="control" className="nav-bottom">
        <button id="button-instant" className="button" onClick={() => drawRandom()}>GENERATE</button>
      </nav> */}
      {/* <div id="visual" class="card">
        <img alt="svg-img" />
      </div> */}
      <BlockContainer>
        <Block />
      </BlockContainer>
      <BlockGallery />
    </Container>
  );
}

export default App;
