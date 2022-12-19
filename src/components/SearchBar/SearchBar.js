import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {term: ''};
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    
  }
  search(){
    this.props.onSearch(this.state.term); //passes the current state here to the function
  }

  handleTermChange(e){
    this.setState( {term: e.target.value}); //the state is altered by the value in the input tag. must pass onChange
  }

  render() {
    return (
      <div className="SearchBar">
          <input onChange={this.handleTermChange} /> 
          <button className="SearchButton">SEARCH</button>
      </div>
    )
  }
}