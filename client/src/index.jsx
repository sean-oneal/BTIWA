import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const testData = {
  tweets:
  [
    {
      username: '@user1234',
      message: 'hello',
      time: Date.now(),
      id: 1
    },
    {
      username: '@user1234',
      message: 'world',
      time: Date.now(),
      id: 2
    }
  ]
};

ReactDOM.render(<App feed={testData} />, document.getElementById('app'));
