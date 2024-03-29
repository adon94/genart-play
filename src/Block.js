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

function Block({ palette, sendImage }) {
  const svgRef = useRef();
  useEffect(() => {
    if (palette) {
      const ae = new ArtEngine('-container');
      const dr = ae.drawRandom(palette);
  
      if (dr) {
        svgRef.current.innerHTML = '';
        svgRef.current.append(dr.svg);
        // toPng(dr.svg)
      }
      // renderArt(ae);
    }
  }, [palette]);

  // function toPng(svg) {
  //   console.log(svg)
  //   const svgString = new XMLSerializer().serializeToString(svg); 
  //   const canvas = document.createElement('canvas')
  //   const ctx = canvas.getContext("2d");
  //   var img = new Image();
  //   var svgBlob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
  //   var url = URL.createObjectURL(svgBlob);
  //   img.onload = function() {
  //     ctx.drawImage(img, 0, 0);
  //     var png = canvas.toDataURL("image/png");
  //     // document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
  //     URL.revokeObjectURL(png);
  //     sendImage(png);
  //   };
  //   img.src = url;
  // }

  // function renderArt() {
  //   const dr = artEngine.drawRandom(palette);

  //   if (dr) {
  //     svgRef.current.innerHTML = '';
  //     svgRef.current.append(dr.svg);
  //   }
  // }

  return (
    <CardContainer>
      <Card>
        <SvgContainer ref={svgRef} id="svg-container"></SvgContainer>
      </Card>
      {/* <InfoContainer>
        {pallet && <h3>0x11ac128f8b54949c12d04102cfc01960fc496813cbc3495bf77aeed738579738</h3>}
      </InfoContainer> */}
    </CardContainer>
  );
}

export default Block;
