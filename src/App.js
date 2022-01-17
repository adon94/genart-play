import './App.css';
import { useEffect } from 'react';
import { drawRandom } from './artEngine';

function App() {
  useEffect(() => {
    drawRandom();
  }, [])
  return (
    <div class="container">
      <div id="visual" class="card">
        <h3>SVG</h3>
        <div onClick={() => drawRandom()} id="svg54583"></div>
      </div>
      <nav id="control" class="nav-bottom">
        <button id="button-instant" class="active" onClick={() => drawRandom()}>GENERATE</button>
      </nav>
      <div id="visual" class="card">
        <img alt="svg-img" />
      </div>
    </div>
  );
}

export default App;
