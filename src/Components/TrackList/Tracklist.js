import React from 'react';
import './TrackList.css';
import Track from '../Tracks/tracks';

const Tracklist = (props) => {
    return (
        <div className="Tracklist">
            {
                props.tracks.map(track => {
                    return <Track track={track} 
                        key={track.id} 
                        onAdd={props.onAdd} 
                        onRemove={props.onRemove}
                        isRemoval={props.isRemoval} 
                        audioFeatures={props.audioFeatures}
                        generatePlaylist={props.generatePlaylist}
                    />
                })
            }
        </div>
    );
};

export default Tracklist;
