import './App.css';
import styled from 'styled-components';

const GridContainer = styled.div`
  @media (min-width: 768px) {
    margin: 5% 10%;
  }
`

function ImageInput({ onChange, value }) {

  return (
    <GridContainer>
      <input placeholder='Image address' value={value} onChange={(e) => onChange(e)} />
    </GridContainer>
  );
}

export default ImageInput;
