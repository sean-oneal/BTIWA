import React, {Component} from 'react';
import './styles.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  onInput(data) {
    this.setState({
      text: data
    });
  }

  onSubmit(event) {
    this.props.update(this.state.text);
    this.setState({
      text: ''
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="searchBox">
        <div className="field field-is-search">
          <input
            className="searchBox-query"
            type="text"
            placeholder="Enter #Hashtag"
            value={this.state.text}
            onChange={event => this.onInput(event.target.value)}
          />
          <button className="btn searchBox-btn" onClick={event => { this.onSubmit(event); }}>{'Search'}</button>
        </div>
      </div>
    );
  }
}

export default Search;