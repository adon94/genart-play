import './App.css';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ArtEngine from './artEngine';

const Card = styled.div`
  /* position: relative; */
  font-size: 0.8em;
  height: 100%;
  width: 100%;
  border: 1px solid rgb(229, 232, 235);
  border-radius: 8px;
  @media screen and (max-width: 600px) {
    width: 100vmin;
  }
`;

const SvgContainer = styled.div`
  height: 100%;
  width: 100%;
`;

function Block({ index }) {
  const svgRef = useRef();
  useEffect(() => {
    const artEngine = new ArtEngine(index);
    const svgEl = artEngine.drawRandom();
    svgRef.current.append(svgEl);
  }, [index])

  return (
      <Card>
        <SvgContainer ref={svgRef} id={`svg${index}`}></SvgContainer>
      </Card>
  );
}

export default Block;
