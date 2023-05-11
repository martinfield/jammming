import React from 'react';
import Tracklist from '../TrackList/Tracklist';
import './searchResults.css';

const SearchResults = (props) => {

    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracks={props.searchResults} 
                audioFeatures={props.audioFeatures}
                onAdd={props.onAdd} 
                thisRemoval={false}
                generatePlaylist={props.generatePlaylist}/>
        </div>
    );
};

export default SearchResults;