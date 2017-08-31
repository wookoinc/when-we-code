import React, { Component } from 'react';
import RatingBar from './rating_bar';

class App extends Component {
  render() {
    return (
      <RatingBar
        rating = {{
          score: 3,
          by: {
            name: "Lu"
          }
        }} />
    );
  }
}

export default App;
