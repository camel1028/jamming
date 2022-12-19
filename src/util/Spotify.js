let token;
const Spotify = {
getAccessToken() {
    if (token) {
        return token;
    }

    const token = window.location.href.match(/token=([^&)]*)/);
}
};