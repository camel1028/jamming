import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { Playlist } from '../Playlist/Playlist'
import { SearchResults } from '../SearchResults/SearchResults';
import { Track } from '../Track/Track';
import { TrackList } from '../TrackList/TrackList';

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = { 
      searchResults: [
        {name: 'the name', artist: 'the artist', album: 'the album', id: 1},
        {name: 'the name2', artist: 'the artist2', album: 'the album2', id: 2} ], 
      playlistName: 'playlistName state',
      playlistTracks: ['playlistTrack state', '2', '3']
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    }
   

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) { //checks if track is in
      return;
    } else {
        this.setState( track ) //should alter the state obj to include a list with the new track added.
      }                 //step 41
    }
  
  removeTrack(track) {
    this.setState( this.state.playlistTracks.filter(!track.id) )
  }

  updatePlaylistName(name) {
    this.setState( {playlistName: name});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    )};
}

export default App;
