import React from 'react';
import './App.css';
import Weather from './Weather';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <main>
        <Weather />
      </main>
    );
  }
}

export default App;
