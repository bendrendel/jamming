import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar.js';
import { SearchResults } from '../SearchResults/SearchResults.js';
import { Playlist } from '../Playlist/Playlist.js'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Track 1',
          artist: 'Artist 1',
          album: 'Album 1',
          id: '001',
        },
        {
          name: 'Track 2',
          artist: 'Artist 2',
          album: 'Album 2',
          id: '002',
        },
        {
          name: 'Track 3',
          artist: 'Artist 3',
          album: 'Album 3',
          id: '003',
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist />
          </div>
        </div>
    </div>
    )
  }
}

export default App;
