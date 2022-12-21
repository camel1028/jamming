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

    async search(param) {
        let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${param}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        if (response.ok){
            const jsonReponse = await response.json();
            return jsonReponse.tracks.items.map({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }
                
            );
        } else {
            return [];
        }
    }

};