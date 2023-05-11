import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/searchbar';
import SearchResults from '../SearchResults/searchResults';
import Playlist from '../Playlist/playlist';
import Spotify from '../../util/spotify';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('pendulum greatist hits');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [trackAnalysis, setTrackAnalysis] = useState({});


  const addTrack = (track) => {
    let tracks = [...playlistTracks];
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    setPlaylistTracks(tracks);
  }

  const removeTrack = (track) => {
    let tracks = [...playlistTracks];
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    setPlaylistTracks(tracks);
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  }

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    })
  }

  const search = (term) => {
    Spotify.search(term).then(searchResults => {
      setSearchResults(searchResults);
    })
  }

  const trackFeatures = async (trackId) => {
    const result = await Spotify.audioFeatures(trackId)
    return result;
  }

  const generatePlaylist = (seedTrackFeatures) => {
    const seedTrack = playlistTracks[0].id
    const artistId = playlistTracks[0].artistId
    const seedGenres = Spotify.getArtistGenres(artistId);
    Spotify.generatePlaylist(seedTrack, seedGenres, seedTrackFeatures).then((generatedTracks) => {
      setPlaylistTracks(generatedTracks);
    });
    

  };
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults 
          searchResults={searchResults} 
          audioFeatures={trackFeatures} 
          onAdd={addTrack}
          generatePlaylist={generatePlaylist}
          />
          <Playlist playlistName={playlistName} 
          playlistTracks={playlistTracks} 
          audioFeatures={trackFeatures}
          onRemove={removeTrack} 
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
          generatePlaylist={generatePlaylist}/>
          
        </div>
      </div>
    </div>
  );
 }

 // testing commit push

export default App;
