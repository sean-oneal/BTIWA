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
      <div className="field">
        <div className="search">
          <input type="text" placeholder="Search keyword" value={this.state.text}
            onChange={event => this.onInput(event.target.value)}
            />
          <button className="search-btn" onClick={event => { this.onSubmit(event); }}>{'Search'}</button>
        </div>
      </div>
    );
  }
}

export default Search;