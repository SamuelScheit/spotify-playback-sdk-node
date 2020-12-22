const { SpotifyPlaybackSDK } = require("spotify-playback-sdk-node");

async function test() {
	const spotify = new SpotifyPlaybackSDK();
	await spotify.init();
	const player = await spotify.createPlayer({
		name: "Web",
		getOAuthToken() {
			// get your Access token here: https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
			return "";
		},
	});
	const stream = await player.getAudio();
	const connected = await player.connect();
	if (!connected) throw "couldn't connect";
	console.log("connected", stream);
	player.on("player_state_changed", console.log);
}

test();
