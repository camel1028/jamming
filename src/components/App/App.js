import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { Playlist } from '../Playlist/Playlist'
import { SearchResults } from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = { 
      searchResults: [], 
      playlistName: 'My Playlist',
      playlistTracks: [] 
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    }
   

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) { //checks if track is in
      return;
    } 
    tracks.push(track);
    this.setState( {playlistTracks: tracks} ); //should alter the state obj to include a list with the new track added.
                  //step 41
    }
  
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState( {playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState( {playlistName: name});
  }

  savePlaylist() {
    let trackUris = this.state.playlistTracks.map(track => track.uri); //will create a new array, that has the uri of each track added.
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState( { playlistName: 'New Playlist', playlistTracks: []}) //empty array bc when saving new playlist init state should be a generic new playlist
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
              />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              />
          </div>
        </div>
      </div>
    )};
}

export default App;
