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
          id: 1,
        },
        {
          name: 'Track 2',
          artist: 'Artist 2',
          album: 'Album 2',
          id: 2,
        },
        {
          name: 'Track 3',
          artist: 'Artist 3',
          album: 'Album 3',
          id: 3,
        },
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        {
          name: 'Playlist Track 1',
          artist: 'Playlist Artist 1',
          album: 'Playlist Album 1',
          id: 10,
        },
        {
          name: 'Playlist Track 2',
          artist: 'Playlist Artist 2',
          album: 'Playlist Album 2',
          id: 20,
        },
        {
          name: 'Playlist Track 3',
          artist: 'Playlist Artist 3',
          album: 'Playlist Album 3',
          id: 30,
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      return;
    }

    this.setState({
      playlistTracks: this.state.playlistTracks.concat([track]),
    });
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.id);
    console.log(trackURIs);
  }

  search(term) {
    console.log(term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
