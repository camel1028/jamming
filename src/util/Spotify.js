let accessToken;
const Spotify = {
getAccessToken() {
    if (accessToken) {
        return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&)]*)/); //1:38 //regex selects all tokens
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); //window selects the url in tab, so localhost.

    if (accessTokenMatch && expiresInMatch) { //if both exist in url. they wouldve been set above, checks for truthy val.
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000); //sets access token to empty string once it expires, essentially clears it
        window.history.pushState('Access Token', null, '/'); //clears token
        return accessToken;
        }

    //if token does not appear redirects user
    if (!accessTokenMatch && !expiresInMatch) {
        const clientId = '9b53d3b5009946568467544d0cf2ce41';
        const redirectUri = 'http://localhost:3000/';
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}
        `;
        }
    },

    search(param) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${param}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map( track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length){
            return;
        }
        let accessToken = Spotify.getAccessToken();
        let headers = { Authorization: `Bearer ${accessToken}` };
        let userID;
        return fetch('https://api.spotify.com/v1/me', { headers: headers}) //sending a request to user acc
            .then(response => response.json()) //converting response to json
            .then(jsonReponse => {
                userID = jsonReponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, { //sending another request with resolved userID
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify( {name: name}) //body in the post request, passing a name for playlist here
                })
                .then(response => response.json())
                .then(jsonReponse => {
                    const playlistID = jsonReponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify( {uris: trackURIs} )
                    })
                })
            })
    }

};