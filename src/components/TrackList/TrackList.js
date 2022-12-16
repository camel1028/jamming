import React from "react";
import "./TrackList.css";

export class TrackList extends React.Component {
    
    render() {

        let trackArr = this.props.tracks.map(track => {
            return `${this.props.track.name} ${this.props.track.artist} ${this.props.track.album}`;
         })
         
        return (
            <div className="TrackList">
                 {trackArr}
            </div>
    )}
}