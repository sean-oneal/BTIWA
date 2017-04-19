import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }
  componentWillMount() {

  }
  render() {
    return (
      <div>
        <h1>App Is Live</h1>
      </div>
    );
  }
}

export default App;