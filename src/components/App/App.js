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
      searchResults: [], 
      playlistName: 'playlistName state',
      playlistTracks: ['playlistTrack state', '2', '3']
    };
    this.addTrack = this.addTrack.bind(this);
    }
   

  addTrack(track) {
    if (this.state.playlistTracks.indexOf(track.id) >= 0){ //if track is in the list
        return;
      } else {
        this.setState( {playlistTracks: this.state.playlistTracks.push(track.id)}) //should alter the state obj to include a list with the new track added.
      }                 //step 41
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
              playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    )};
}

export default App;
