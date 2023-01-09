import React from 'react';
import Tracklist from '../TrackList/Tracklist';
import './searchResults.css';



class SearchResults extends React.Component {
    /*constructor(props){
        super(props);
    }*/
 
    render(){
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <Tracklist tracks={this.props.searchResults} 
                audioFeatures={this.props.audioFeatures}
                onAdd={this.props.onAdd} thisRemoval={false}/>
            </div>
        );
    }
}

export default SearchResults;