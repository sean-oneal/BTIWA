import React from 'react';
import './styles.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  onInput(data) {
    this.setState({
      text: data
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.update(this.state.text);
  }

  render() {

    return (
      <div className="search-container">
      <input value={this.state.text}
        onChange={event => this.onInput(event.target.value)}
      />{this.state.text} <button className="search-btn" onClick={event => { this.onSubmit(event); }}>Search</button>
      <p>"searching" {this.state.text}</p>
      </div>
    );
  }
}

export default Search;