import './App.css';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ArtEngine from './art2';

const CardContainer = styled.div`
  /* background-color: #eee; */
  /* border: 1px solid rgb(229, 232, 235); */
  /* border-radius: 8px;
  border-top-right-radius: 0;
  border-top-left-radius: 0; */
  margin-top: 20px;
  overflow: hidden;
  width: 100%;
  h3 {
    margin: 0;
  }
`;

const Card = styled.div`
  /* position: relative; */
  font-size: 0.8em;
  /* height: 100%; */
  width: 100%;
`;

const SvgContainer = styled.div`
  height: 100%;
  width: 100%;
  /* rect {
    /* filter: hue-rotate(346deg);
    /* animation: ${({ anim }) => anim} 15s infinite;
  } */
`;

function Block({ index = 'rando', palette }) {
  const svgRef = useRef();
  // const [artEngine, setArtEngine] = useState();
  useEffect(() => {
    if (palette) {
      const ae = new ArtEngine(index);
      renderArt(ae);
    }
  }, [palette]);

  function renderArt(ae) {
    const dr = ae.drawRandom(palette);

    if (dr) {
      // if (dr.pallet[0] === '?') setAnim(hueAnim);
      svgRef.current.innerHTML = '';
      svgRef.current.append(dr.svg);
      // setArtEngine(ae);
    }
  }

  return (
    <CardContainer>
      <Card onClick={() => renderArt()}>
        <SvgContainer ref={svgRef} id={`svg${index}`}></SvgContainer>
      </Card>
      {/* <InfoContainer>
        {pallet && <h3>0x11ac128f8b54949c12d04102cfc01960fc496813cbc3495bf77aeed738579738</h3>}
      </InfoContainer> */}
    </CardContainer>
  );
}

export default Block;
