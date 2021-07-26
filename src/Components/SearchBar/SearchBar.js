import React from 'react';
import Spotify from '../../util/Spotify';
import './SearchBar.css'

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  componentDidMount() {
    const oAuthParams = Spotify.getOAuthParams();
    const storedSearchTerm = sessionStorage.getItem('searchTerm');

    if (oAuthParams && storedSearchTerm) {
      this.setState({
        term: storedSearchTerm
      });
    } else {
      sessionStorage.setItem('searchTerm', '');
    }
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e) {
    this.setState({
      term: e.target.value
    });
    sessionStorage.setItem('searchTerm', e.target.value);
  }

  render() {
    return (
      <div className='SearchBar'>
        <input value={this.state.term} placeholder='Enter A Song, Album, or Artist' onChange={this.handleTermChange} />
        <button className='SearchButton' onClick={this.search}>SEARCH</button>
      </div>
    );
  }
}
