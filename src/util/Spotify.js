const clientId = '7a087f4c357e4333942112e6e9533266';
const redirectUri = 'http://localhost:3000/';
let savedAccessToken;

let Spotify = {
    getAccessToken() {
        if (savedAccessToken) {
            return savedAccessToken;
        }

        let possibleAccessToken = window.location.href.match(/access_token=([^&]*)/);
        let possibleExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if (possibleAccessToken && possibleExpiresIn) {
            savedAccessToken = possibleAccessToken[1];
            let expiresIn = Number(possibleExpiresIn[1]);

            setTimeout(() => savedAccessToken = '', expiresIn * 1000);

            window.history.pushState('Access Token', null, '/');

            return savedAccessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessURL;
        }
    },

    search(term) {
        let accessToken = Spotify.getAccessToken();
        let endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        let settings = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }

        return fetch(endpoint, settings).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('HTTP Error')
            }
        }).then(jsonResponse => {
            if (jsonResponse.tracks.total === 0) {
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
            }
        });
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris) {
            return;
        }

        let accessToken = Spotify.getAccessToken();
        let headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userId;
        let playlistId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('HTTP Error');
            }
        }).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
              }
            );
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('HTTP Error');
            }
        }).then(jsonResponse => {
            playlistId = jsonResponse.id;
            return fetch(
                `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                }
            );
        })
    }
};

export default Spotify;