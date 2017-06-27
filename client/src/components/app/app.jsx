import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import Search from '../search/search';
import TweetStream from '../tweet-stream/tweet-stream';
import './styles.scss';

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
  updateHashTag(data) {
    //fire and event to socket
    // let self = this;

    console.log(data, 'incoming from search');
    this.socket.emit('updateTopic', {topic: data});

  }

  componentDidMount() {

    let self = this;

    self.socket = io.connect('/');

    self.socket.on('tweet', data => {

      this.addTweet(data);
    });
    window.addEventListener('scroll', self.checkWindowScroll);
  }
  render() {
    return (
      <div className='flexcontainer'>
        <h1>Tweet Stream</h1>
        <Search update={ data => { this.updateHashTag(data); } } />
        <TweetStream tweetStream={this.state.tweets} />
      </div>
    );
  }
}

export default App;