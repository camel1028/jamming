import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { Playlist } from '../Playlist/Playlist'
import { SearchResults } from '../SearchResults/SearchResults';

function App() {
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>track name will go here</h3> 
        <p>track artist will go here - track album will go here</p>
      </div>
      <button className="Track-action"> + or - will go here</button>
    </div>
  );
}

export default App;
