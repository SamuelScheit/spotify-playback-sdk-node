// npm i discord.js @discordjs/opus
// start this script
require("puppeteer-stream");
const { token, access } = require("./config.json");
const { Client } = require("discord.js");
const { SpotifyPlaybackSDK } = require("../dist/spotify");

const client = new Client();

const spotify = new SpotifyPlaybackSDK();
const init = spotify.init();

console.log("starting ...");
client.on("ready", () => console.log("bot started: enter !play in a server channel"));

client.on("message", async (message) => {
	if (message.content !== "!play") return;
	if (!message.member) return message.reply("This command can only be executed on a server");
	if (!message.member.voice || !message.member.voice.channel) return message.reply("Join a Voice Channel first");
	await init;

	const player = await spotify.createPlayer({
		name: "Meltic",
		getOAuthToken() {
			// get your Access token here: https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
			return access;
		},
	});
	player.on("player_state_changed", console.log);

	const stream = await player.getAudio();
	const connected = await player.connect();
	if (!connected) throw "couldn't connect";
	console.log("connected", stream);

	const connection = await message.member.voice.channel.join();

	const dispatcher = await connection.play(stream);
});

client.login(token);
