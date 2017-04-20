import React from 'react';
import TweetStream from './TweetStream';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: props.feed || [],
      count: 0,
      page: 0,
      done: false,
      skip: false,
      updated: []
    };
  }
  componentWillMount() {

  }
  render() {
    // console.log('test data:', testData);
    return (
      <div>
        <h1>Stream of Tweets</h1>
        <TweetStream tweetsStream={this.state.tweets} />
      </div>
    );
  }
}

export default App;