import React from "react";

function Playlist() {
    return (
        <div className="Playlist">
            <input value="New Playlist"/>
            <p> Add a TrackList component </p>
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;