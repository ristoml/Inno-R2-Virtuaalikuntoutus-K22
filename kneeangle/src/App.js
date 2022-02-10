import './App.css';
import React from 'react';
import Canvas from './components/Canvas';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <Button value={"Click me!"} />
      <Canvas />
    </div>
  );
}

export default App;