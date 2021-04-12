# spotify-playback-sdk-node

This is an inofficial NodeJS Wrapper for the Spotify Web Playback SDK

## Installation

```
npm i spotify-playback-sdk-node
# or "yarn add spotify-playback-sdk-node"
```

## Usage

ES5 import

```js
require("spotify-playback-sdk-node");
```

or ES6 import

```js
import "spotify-playback-sdk-node";
```

## Example

```js
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
	player.on("player_state_changed", console.log);

	const stream = await player.getAudio();
	const connected = await player.connect();
	if (!connected) throw "couldn't connect";

	console.log("connected", stream);
}

test();
```

## Reference
### [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/reference/)

```ts
class SpotifyPlaybackSDK {
	browser: Browser;
	constructor();
	init(opts?: { executablePath?: string }): Promise<this>;
	createPlayer(opts: PlayerOptions)       : Promise<SpotifyPlayer>;
	destroy()                               : Promise<void>;
}

type PlayerOptions = {
	name: string;
	volume?: number;
	getOAuthToken: () => string | Promise<string>;
};

class SpotifyPlayer extends EventEmitter {
	page: Page;
	opts: PlayerOptions;

	constructor      // use the SpotifyPlaybackSDK.createPlayer() function
	getAudio()       : Promise<import("puppeteer-stream").Stream>;
	connect()        : Promise<boolean>;
	disconnect()     : Promise<void>;
	getCurrentState(): Promise<WebPlaybackState>;
	getVolume()      : Promise<number>;
	pause()          : Promise<void>;
	resume()         : Promise<void>;
	togglePlay()     : Promise<void>;
	previousTrack()  : Promise<void>;
	nextTrack()      : Promise<void>;

	setName(name: string)    : Promise<void>;
	setVolume(volume: string): Promise<void>;
	seek(position_ms: number): Promise<void>;

	on(event: "ready",                listener: (opts: WebPlaybackPlayer) => any): this;
	on(event: "not_ready",            listener: (opts: WebPlaybackPlayer) => any): this;
	on(event: "player_state_changed", listener: (opts: WebPlaybackState) => any) : this;
	on(event: "initialization_error", listener: (opts: WebPlaybackError) => any) : this;
	on(event: "authentication_error", listener: (opts: WebPlaybackError) => any) : this;
	on(event: "account_error",        listener: (opts: WebPlaybackError) => any) : this;
	on(event: "playback_error",       listener: (opts: WebPlaybackError) => any) : this;
	on(event: string,                 listener: Function)                        : this;
}
```

## Structures
```ts
type WebPlaybackPlayer = {
    device_id: string;
};

type WebPlaybackTrack = {
    uri: string;
    id: string;
    type: "track" | "episode" | "ad";
    media_type: "audio" | "video";
    name: string;
    is_playable: boolean;
    album: {
        uri: string;
        name: string;
        images: {
            url: string;
        }[];
    };
    artists: {
        uri: string;
        name: string;
    }[];
};

type WebPlaybackState = {
    context: {
        uri: string;
        metadata: any;
    };
    disallows: {
        pausing: boolean;
        peeking_next: boolean;
        peeking_prev: boolean;
        resuming: boolean;
        seeking: boolean;
        skipping_next: boolean;
        skipping_prev: boolean;
    };
    paused: boolean;
    position: number;
    repeat_mode: number;
    shuffle: boolean;
    track_window: {
        current_track: WebPlaybackTrack;
        previous_tracks: WebPlaybackTrack[];
        next_tracks: WebPlaybackTrack[];
    };
};

type WebPlaybackError = {
    message: string;
};
```