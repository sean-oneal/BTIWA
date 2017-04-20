import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import TweetStream from './tweet-stream';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false,
    };
  }
  addTweet(data) {
    const updated = this.state.tweets;
    const newCount = this.state.count + 1;
    const newSkip = this.state.skip + 1;
    updated.unshift(data);

    this.setState({
      tweets: updated,
      count: newCount,
      skip: newSkip,
    });
  }

  checkWindowScroll() {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let s = document.body.scrollTop;
    let scrolled = (h + s) > document.body.offsetHeight;

    if (scrolled && !this.state.paging && !this.state.done) {
      this.setState({ paging: true, page: this.state.page + 1 });
      this.getPage(this.state.page);
    }
  }

  componentDidMount() {

    let self = this;
    const socket = io.connect();

    socket.on('tweet', data => {
      self.addTweet(data);
    });
    window.addEventListener('scroll', this.checkWindowScroll);
  }
  render() {
    return (
      <div>
        <h1>Real-time Stream of Tweets</h1>
        <TweetStream tweetStream={this.state.tweets} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));



