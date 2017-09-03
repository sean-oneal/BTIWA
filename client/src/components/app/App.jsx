import React, { Component } from 'react';
import request from 'superagent';
import io from 'socket.io-client';
import Loader from '../loader/Loader';
import NotificationBar from '../notificationBar/NotificationBar';
import Search from '../search/Search';
import TweetStream from '../tweetStream/TweetStream';
import './styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackingKW: '' || 'San Francisco',
      tweets: [],
      page: 0,
      count: 0,
      skip: 0,
      paging: false,
      done: false
    };
    this.checkWindowScroll = this.checkWindowScroll.bind(this);
    this.loadPagedTweets = this.loadPagedTweets.bind(this);
    this.showNewTweets = this.showNewTweets.bind(this);
    this.getPage = this.getPage.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.updateHashTag = this.updateHashTag.bind(this);
  }

  addTweet(data) {
    let updated = this.state.tweets;
    let newCount = this.state.count + 1;
    let newSkip = this.state.skip + 1;
    updated.unshift(data);

    this.setState({
      tweets: updated,
      count: newCount,
      skip: newSkip
    });
  }

  getPage(page) {
    // Setup our superagent request to get pages
    request.get('/api/page/' + page + '/' + this.state.skip).end((err, res) => {
      if (!err && res.status >= 200 && res.status < 400) {
        this.loadPagedTweets(res.body);
      } else {
        this.setState({
          paging: false,
          done: true
        });
        console.log(err, 'ERRRRRR');
      }
    });
  }

  showNewTweets() {
    let updated = this.state.tweets;

    updated.forEach(tweet => {
      tweet.active = true;
    });

    this.setState({
      tweets: updated,
      count: 0
    });
  }

  loadPagedTweets(tweets) {
    if (tweets.length > 0) {
      let updated = this.state.tweets;
      tweets.forEach(tweet => {
        updated.push(tweet);
      });
      setTimeout(() => {
        this.setState({
          tweets: updated,
          paging: false
        });
      }, 1000);
    } else {
      // Set application state (Not paging, paging complete)
      this.setState({
        paging: false,
        done: true
      });
    }
  }

  checkWindowScroll() {
    let h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    let s = document.body.scrollTop || document.documentElement.scrollTop || 0;
    let scrolled = h + s > document.body.offsetHeight;

    if (scrolled && !this.state.paging && !this.state.done) {
      this.setState({ paging: true, page: this.state.page + 1 });
      this.getPage(this.state.page);
    }
  }

  updateHashTag(data) {
    this.setState({
      tweets: [],
      trackingKW: data,
      page: 0,
      count: 0,
      skip: 0
    });
    this.socket.emit('updateTopic', { topic: data });
  }

  componentWillMount() {
    request.get('/api/tweets').end((err, res) => {
      if (!err) {
        this.setState({
          tweets: res.body,
        });
      } else {
        console.log(err, 'error occured');
      }
    });
    window.addEventListener('scroll', this.checkWindowScroll);
  }

  componentDidMount() {
    this.socket = io.connect('/').emit('connection');
    this.socket.on('tweet', data => {
      this.addTweet(data);
    });
    window.addEventListener('scroll', this.checkWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkWindowScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.tweets.length ||
      this.state.tweets.length !== nextProps.tweets.length
    ) {
      this.setState({
        trackingKW: nextProps.trackingKW,
        skip: nextProps.skip,
      });
    }
  }

  render() {
    return (
      <div className="flex-container">
        <h2 className="title">Tweet Stream</h2>
        <NotificationBar
          count={this.state.count}
          onShowNewTweets={this.showNewTweets}
        />
        <Search
          trackingKW={this.state.trackingKW}
          update={data => {
            this.updateHashTag(data);
          }}
        />
        <TweetStream tweets={this.state.tweets} />
        <Loader paging={this.state.paging} />
      </div>
    );
  }
}

export default App;

// <h3 className="tracking">
//   {' '}{`Tracking: ${this.state.trackingKW}`}
// </h3>
