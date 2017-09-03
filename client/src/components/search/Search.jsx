import React, {Component} from 'react';
import './styles.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newHashtag: '',
    };
  }

  onInput(data) {
    this.setState({
      newHashtag: data
    });
  }

  onSubmit(event) {
    this.props.update(this.state.newHashtag);
    this.setState({
      newHashtag: ''
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="searchBox">
        <h3 className="tracking">
          { `Monitoring   #${this.props.trackingKW} `}</h3>
        <div className="field field-is-search">
          <input
            className="searchBox-query"
            type="text"
            placeholder="Enter #Hashtag To Monitor"
            value={this.state.newHashtag}
            onChange={event => this.onInput(event.target.value)}
          />
          <button className="btn searchBox-btn" onClick={event => { this.onSubmit(event); }}>{'Search'}</button>
        </div>
      </div>
    );
  }
}

export default Search;