let accessToken;
const clientId = '99eb369f2ee04c08b85eee35deecef57';
const redirectUri = "http://localhost:3000/";

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        } 

        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1])
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse)
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                artistId: track.artists[0].id,
                album: track.album.name,
                uri: track.uri
            }));
           
        })
    },
    savePlaylist(name, trackUris){
        if(!name || !trackUris.length){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return  fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                });
            })
        })
        
        
    },
    audioFeatures(trackId){
        const accessToken = Spotify.getAccessToken();
        let results = [];
        return fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json()
        }).then(trackFeatures => {
            if(!trackFeatures){
                return [];
            }
            trackFeatures.tempo = Math.floor(trackFeatures.tempo)
            if(trackFeatures.tempo < 100){
                return trackFeatures.tempo * 2;
            }
            switch(trackFeatures.key){
                case 0:
                    trackFeatures.key = 'C'
                    break;
                case 1:
                    trackFeatures.key = 'C# / D♭'
                    break;
                case 2: 
                    trackFeatures.key = 'D'
                    break;
                case 3: 
                    trackFeatures.key = 'D# / E♭'
                    break;
                case 4: 
                    trackFeatures.key = 'E'
                    break;
                case 5: 
                    trackFeatures.key = 'F'
                    break;
                case 6: 
                    trackFeatures.key = 'F# / G♭'
                    break;
                case 7: 
                    trackFeatures.key = 'G'
                    break;
                case 8: 
                    trackFeatures.key = 'G# / A♭'
                    break;
                case 9: 
                    trackFeatures.key = 'A'
                    break;
                case 10: 
                    trackFeatures.key = 'A# / B♭'
                    break;
                case 11: 
                    trackFeatures.key = 'B'
                    break;
                case 12: 
                    trackFeatures.key = 'C'
                    break;
                case -1:
                    trackFeatures.key = 'None'
                    break;
                default: 
                    trackFeatures.key = 'Incorrect Value';
            }
            if(trackFeatures.mode === 0){
                trackFeatures.mode = 'Minor'
            } else {
                trackFeatures.mode = 'Major'
            }
            trackFeatures.keymode = `${trackFeatures.key} ${trackFeatures.mode}`
            
            results = {
                "tempo": trackFeatures.tempo,
                 "keymode": trackFeatures.keymode, 
                 "energy": trackFeatures.energy, 
                 "danceability": trackFeatures.danceability, 
                 "instrumentalness": trackFeatures.instrumentalness
                };

            return results;
        })  
    },
    generatePlaylist(seedTrack, seedGenres, seedTrackFeatures) {
        const accessToken = Spotify.getAccessToken();
      
        return fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${seedTrack}&seed_genres=${seedGenres}&target_tempo=${seedTrackFeatures.tempo}&target_energy=${seedTrackFeatures.energy}&target_danceability=${seedTrackFeatures.danceability}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            if (!jsonResponse.tracks) {
              return [];
            }
            return jsonResponse.tracks.map((track) => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              artistId: track.artists[0].id,
              album: track.album.name,
              uri: track.uri,
            }));
          });
      },
      getArtistGenres(artistId) {
        const accessToken = Spotify.getAccessToken();
    
        return fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: { 
            Authorization: `Bearer ${accessToken}` 
        },
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            if (!jsonResponse.genres) {
              return [];
            }
            return jsonResponse.genres;
          });
      },
      
}
export default Spotify;