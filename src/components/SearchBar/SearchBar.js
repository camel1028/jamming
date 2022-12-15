import React from "react"

export class SearchBar extends React.Component {
  render() {
    return (
      <div className="SearchBar">
          <input placeholder="Enter A Song, Album, or Artist" />
          <button classNamw="SearchButton">SEARCH</button>
      </div>
    )
  }
}