import './App.css';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ArtEngine from './artEngine';

const hueAnim = keyframes`
  0% {
    filter: hue-rotate(1deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`

const Card = styled.div`
  /* position: relative; */
  font-size: 0.8em;
  height: 100%;
  width: 100%;
  border: 1px solid rgb(229, 232, 235);
  border-radius: 8px;
`;

const SvgContainer = styled.div`
  height: 100%;
  width: 100%;
  /* rect {
    /* filter: hue-rotate(346deg);
    /* animation: ${({ anim }) => anim} 15s infinite;
  } */
`;

function Block({ index }) {
  const svgRef = useRef();
  // const [artEngine, setArtEngine] = useState();
  const [pallet, setPallet] = useState(null);
  const [anim, setAnim] = useState(null);
  useEffect(() => {
    const ae = new ArtEngine(index);
    renderArt(ae);
  }, []);

  function renderArt(ae) {
    const dr = ae.drawRandom();

    if (dr) {
      console.log(ae)
      if (dr.pallet[0] === '?') setAnim(hueAnim);
      svgRef.current.append(dr.svg);
      // setArtEngine(ae);
      setPallet(dr.pallet);
    }
  }

  return (
    <div>
      {pallet && <h1>{pallet[3]}</h1>}
      <Card onClick={() => renderArt()}>
        <SvgContainer ref={svgRef} id={`svg${index}`} anim={anim}></SvgContainer>
      </Card>
    </div>
  );
}

export default Block;
