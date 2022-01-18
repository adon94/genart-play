import './App.css';
import { useEffect, useState } from 'react';
import Block from './Block';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 4rem;
  @media (min-width: 768px) {
    margin: 5% 10%;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 7rem;
  }
`

function BlockGallery() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    let bs = [];
    for (let i = 0; i < 102; i++) {
      bs.push(<Block index={i} key={i.toString()} />);
    }
    setBlocks(bs);
  }, []);

  return (
    <GridContainer>
      {blocks.length > 0 && blocks.map((block) => block)}
      {/* <Block index={1} />
      <Block index={2} /> */}
    </GridContainer>
  );
}

export default BlockGallery;
