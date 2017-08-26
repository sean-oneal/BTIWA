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
      trackingKW: '' || 'Tesla',
      tweets: [],
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false
    };
    this.checkWindowScroll = this.checkWindowScroll.bind(this);
    this.loadPagedTweets = this.loadPagedTweets.bind(this);
    this.showNewTweets = this.showNewTweets.bind(this);
  }

  addTweet(data) {
    let updated = this.state.tweets;
    let newCount = this.state.count + 1;
    let newSkip = this.state.skip + 1;
    updated.unshift(data);

    this.setState({
      tweets: updated,
      count: newCount,
      skip: newSkip,
      paging: false
    });
  }

  getPage(page) {
    // Setup our superagent request to get pages
    request.get('/api/page/' + page + '/' + this.state.skip).end((err, res) => {
      if (!err) {
        if (request.status >= 200 && request.status < 400) {
          // Load our next page
          this.loadPagedTweets(res.body);
        } else {
          // Set application state (Not paging, paging complete)
          this.setState({
            paging: false,
            done: true
          });
        }
      } else {
        this.setState({
          done: false,
          paging: true
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
        done: true,
        paging: false
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
      paging: true,
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
          paging: false,
          skip: res.body.length
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
      this.state.tweets.length !== nextProps.length
    ) {
      this.setState({
        trackingKW: nextProps.trackingKW,
        paging: true,
        count: 0
      });
    }
  }
  render() {
    return (
      <div className="flex-container">
        <NotificationBar
          count={this.state.count}
          showNewTweets={this.showNewTweets}
        />
        <h2 className="title"> Tweet Stream</h2>
        <Search
          topic={this.state.trackingKW}
          update={data => {
            this.updateHashTag(data);
          }}
        />
        <h3 className="tracking">
          {' '}{`Tracking: ${this.state.trackingKW}`}
        </h3>
        <Loader paging={this.state.paging} />
        <TweetStream tweetStream={this.state.tweets} />
      </div>
    );
  }
}

export default App;
