import React from 'react';
import './App.css';
import Routes from './route';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div className="App">
      <Routes />
    </div>
    );
  }
}

export default App;
