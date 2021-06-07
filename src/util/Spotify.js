const CLIENT_ID = '7a087f4c357e4333942112e6e9533266';
const REDIRECT_URI = 'http://localhost:3000/';
let accessToken;

let Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        let possibleAccessToken = window.location.href.match(/access_token=([^&]*)/);
        let possibleExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if (possibleAccessToken && possibleExpiresIn) {
            accessToken = possibleAccessToken[1];
            let expiresIn = possibleExpiresIn[1];

            setTimeout(() => accessToken = '', expiresIn * 1000);

            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        }
    },
    search(term) {
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
    }
};

export default Spotify;