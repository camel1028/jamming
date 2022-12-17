import React from "react";
import "./Track.css";

export class Track extends React.Component{
  constructor(props){
    super(props);
    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval === true) {    //this function is changing it in the results, but not on the playlist.
      return <button onClick={this.removeTrack}>-</button>
    } else {
      return <button onClick={this.addTrack}>+</button>
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track); //we are using the on add method here defined in app.js. 
                                        //since it takes in an argument, we are creating another method to pass in a value.
  }

  removeTrack() {
    this.props.onRemove(this.props.track); //look back at the method in app.js, it uses the track id we provide here 
  }   //important principle to define an event handler that passes in an argument to your method. 


  render(){
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} - {this.props.track.album}</p>
        </div>
          <button className="Track-action"> {this.renderAction()}  </button>
      </div>
    )}
}

export default Track;