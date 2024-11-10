import React from 'react';
import logo from './logo.svg';
import './global.scss'; 
import Button from './components/Button/Button';
import WorkoutIcon from './assets/Workout-icon.svg';
import PlayIcon  from './assets/Play-icon.svg';

function App() {
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
      <Button label="Start recording" onClick={handleButtonClick} variant="blue" icon={WorkoutIcon}/>
      
      <Button label="Stop recording" onClick={() => console.log("Stop clicked!")}   variant="orange"  icon={PlayIcon} />
    </div>
      </header>
    </div>
  );
};

export default App;
