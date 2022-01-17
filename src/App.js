import './App.css';
import { useEffect } from 'react';
import { drawRandom } from './artEngine';

function App() {
  useEffect(() => {
    drawRandom();
  }, [])
  return (
    <div className="container">
      <div id="visual" className="card">
        <div onClick={() => drawRandom()} id="svg54583"></div>
      </div>
      {/* <nav id="control" className="nav-bottom">
        <button id="button-instant" className="button" onClick={() => drawRandom()}>GENERATE</button>
      </nav> */}
      {/* <div id="visual" class="card">
        <img alt="svg-img" />
      </div> */}
    </div>
  );
}

export default App;
