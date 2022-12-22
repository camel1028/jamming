import React from "react";
import "./TrackList.css";
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                 {this.props.tracks.map(track => {
                    return <Track track={track} 
                    key={track.id} 
                    onAdd={this.props.onAdd} 
                    onRemove={this.props.onRemove} 
                    isRemoval={this.props.isRemoval} />
                 })}    {/*key is an attribute youi can include in jsx so you can specify element
                            by including track.id, that we included in the state in app.js we are assiging the track the unique id we had creating. */}
            </div>    
    )}
}