import React from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';
import Sample from './Person/Sample';

function App() {
  return (
    <div className="App">
      <h1>I'm daichi Hello React</h1>
      <p>This is really working!</p>
      <Person />
      <Person />
      <Person />
    </div>
  );
  //return React.createElement('div', null, '','')
}

export default App;
