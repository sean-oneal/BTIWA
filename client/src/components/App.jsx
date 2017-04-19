import React from 'react';
import StreamList from './StreamList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetFeed: props.feed || []
    };
  }
  componentWillMount() {

  }
  render() {
    // console.log('test data:', testData);
    return (
      <div>
        <h1>Stream of Tweets</h1>
        <StreamList tweetFeed={this.state.tweetFeed} />
      </div>
    );
  }
}

export default App;