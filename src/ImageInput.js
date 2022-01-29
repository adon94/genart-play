import './App.css';
import styled from 'styled-components';

const GridContainer = styled.div`
  @media (min-width: 768px) {
    margin: 5% 10%;
  }
`

const TextInput = styled.input`
  padding: 5px 0;
`;

function ImageInput({ onChange, value }) {

  return (
    <GridContainer>
      <TextInput placeholder='Image address' value={value} onChange={(e) => onChange(e)} />
    </GridContainer>
  );
}

export default ImageInput;
