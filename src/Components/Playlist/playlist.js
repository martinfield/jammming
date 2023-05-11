import React from 'react';
import './playlist.css';
import Tracklist from '../TrackList/Tracklist';

const Playlist = (props) => {
    const handleNameChange = (event) => {
        props.onNameChange(event.target.value);
    }
    const generatePlaylist = async () => {
        const seedTrack = props.playlistTracks[0].id;
        const seedTrackFeatures = await props.audioFeatures(seedTrack);
        const newPlaylist = await props.generatePlaylist(seedTrackFeatures);
        console.log(newPlaylist);
      };
    
    return (
        <div className="Playlist">
            <input defaultValue={'New Playlist'} 
                onChange={handleNameChange}/>
            <Tracklist tracks={props.playlistTracks} 
                onRemove={props.onRemove} 
                isRemoval={true}
                audioFeatures={props.audioFeatures}
                generatePlaylist={props.generatePlaylist}/> 
            <button className="Playlist-save" onClick={generatePlaylist}>
                GENERATE PLAYLIST
            </button>
            <button className="Playlist-save" onClick={props.onSave}>
                SAVE TO SPOTIFY
            </button>
            
        </div>
    );
};

export default Playlist;
