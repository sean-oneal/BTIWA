import React from 'react';

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
      <div>
      <input value={this.state.text}
        onChange={(event) => this.onInput(event.target.value)}
      />{this.state.text} <button onClick={event => { this.onSubmit(event); }}>Search</button>
      </div>
    );
  }
}

export default Search;