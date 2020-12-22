// @ts-nocheck
import "puppeteer-stream";
import puppeteer, { Browser, Page } from "puppeteer";
import { EventEmitter } from "events";
import fs from "fs";
import { execSync } from "child_process";
import path from "path";
import { ERANGE } from "constants";

export function getChromePath() {
	function check(path: string) {
		try {
			if (fs.existsSync(path)) return path;
		} catch (error) {}
	}
	try {
		var linux = execSync("which google-chrome-stable", { encoding: "utf8" });
	} catch (error) {}

	return (
		check("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe") ||
		check("C:\\Program Files (x86)\\Google\\Application\\chrome.exe") ||
		check("%AppData%\\Local\\Google\\Chrome\\Application\\chome.exe") ||
		check("C:\\Users\\UserName\\AppDataLocal\\Google\\Chrome") ||
		check("C:\\Documents and Settings\\UserName\\Local Settings\\Application Data\\Google\\Chrome") ||
		check("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome") ||
		check(linux)
	);
}

export type initOptions = { executablePath?: string };
export type PlayerOptions = {
	name: string;
	volume?: number;
	getOAuthToken: () => string | Promise<string>;
};
const player = `file://${path.join(__dirname, "..", "player.html")}`;

export class SpotifyPlaybackSDK {
	public browser: Browser;

	constructor() {}

	async init(opts?: initOptions) {
		let { executablePath } = opts || {};
		if (!executablePath) executablePath = getChromePath();
		if (!executablePath)
			throw "Please install chrome to use the SpotifyPlayback SDK: https://www.google.com/chrome/";

		this.browser = await puppeteer.launch({ executablePath });
		return this;
	}

	async createPlayer(opts: PlayerOptions) {
		const page = await this.browser.newPage();
		await page.goto(player);

		return new SpotifyPlayer(page, opts);
	}

	async destroy() {
		return this.browser.close();
	}
}

export type WebPlaybackPlayer = { device_id: string };

export type WebPlaybackTrack = {
	uri: string; // Spotify URI
	id: string; // Spotify ID from URI (can be null)
	type: "track" | "episode" | "ad"; // Content type: can be "track", "episode" or "ad"
	media_type: "audio" | "video"; // Type of file: can be "audio" or "video"
	name: string; // Name of content
	is_playable: boolean; // Flag indicating whether it can be played
	album: {
		uri: string; // Spotify Album URI
		name: string;
		images: { url: string }[];
	};
	artists: { uri: string; name: string }[];
};

export type WebPlaybackState = {
	context: {
		uri: string; // The URI of the context (can be null)
		metadata: any; // Additional metadata for the context (can be null)
	};
	disallows: {
		// A simplified set of restriction controls for
		pausing: boolean; // The current track. By default, these fields
		peeking_next: boolean; // will either be set to boolean or undefined, which
		peeking_prev: boolean; // indicates that the particular operation is
		resuming: boolean; // allowed. When the field is set to `true`, this
		seeking: boolean; // means that the operation is not permitted. For
		skipping_next: boolean; // example, `skipping_next`, `skipping_prev` and
		skipping_prev: boolean; // `seeking` will be set to `true` when playing an
		// ad track.
	};
	paused: boolean; // Whether the current track is paused.
	position: number; // The position_ms of the current track.
	repeat_mode: number; // The repeat mode. No repeat mode is 0,
	// once-repeat is 1 and full repeat is 2.
	shuffle: boolean; // True if shuffled, false otherwise.
	track_window: {
		current_track: WebPlaybackTrack; // The track currently on local playback
		previous_tracks: WebPlaybackTrack[]; // Previously played tracks. Number can vary.
		next_tracks: WebPlaybackTrack[]; // Tracks queued next. Number can vary.
	};
};

export type WebPlaybackError = { message: string };

declare interface SpotifyPlayer {
	on(event: "ready", listener: (opts: { device_id: string }) => any): this;
	on(event: "not_ready", listener: (opts: { device_id: string }) => any): this;
	on(event: "player_state_changed", listener: (opts: WebPlaybackState) => any): this;
	on(event: "initialization_error", listener: (opts: WebPlaybackError) => any): this;
	on(event: "authentication_error", listener: (opts: WebPlaybackError) => any): this;
	on(event: "account_error", listener: (opts: WebPlaybackError) => any): this;
	on(event: "playback_error", listener: (opts: WebPlaybackError) => any): this;
	on(event: string, listener: Function): this;
}

class SpotifyPlayer extends EventEmitter {
	constructor(public page: Page, public opts: PlayerOptions) {
		super();
		if (!opts) throw new Error("opts are required");
		if (typeof opts.name !== "string") throw new Error("opts.name is required as string");
		if (typeof opts.getOAuthToken !== "function") throw new Error("opts.getOAuthToken is required as a function");
	}

	async getAudio() {
		return this.page.getStream({ audio: true, video: false, frameSize: 20, mimeType: "audio/webm" });
	}

	async connect(): Promise<boolean> {
		const self = this;
		await this.page.waitForSelector(".ready");

		await this.page.evaluate(() => {
			window.getOAuthToken = (cb) => {
				window.getOAuthTokenHandler().then(cb);
			};
		});
		await this.page.exposeFunction("getOAuthTokenHandler", async () => {
			return this.opts.getOAuthToken();
		});
		await this.page.exposeFunction("EMIT", (event: string, data: any) => {
			self.emit(event, data);
		});

		return this.page.evaluate((opts) => {
			window.player = new Spotify.Player({
				...opts,

				getOAuthToken: window.getOAuthToken,
			});

			const events = [
				"ready",
				"not_ready",
				"player_state_changed",
				"initialization_error",
				"authentication_error",
				"account_error",
				"playback_error",
			];

			for (const event of events) {
				window.player.addListener(event, (data) => {
					if (window.EMIT) window.EMIT(event, data);
				});
			}

			return window.player.connect();
		}, this.opts);
	}

	async disconnect() {
		await this.page.evaluate(() => {
			return window.player.disconnect();
		});
	}

	getCurrentState(): Promise<WebPlaybackState> {
		return this.page.evaluate(() => {
			return window.player.getCurrentState();
		});
	}

	setName(name: string) {
		return this.page.evaluate((n) => {
			return window.player.setName(n);
		}, name);
	}

	getVolume(): Promise<number> {
		return this.page.evaluate(() => {
			return window.player.getVolume();
		});
	}

	setVolume(volume: string) {
		return this.page.evaluate((v) => {
			return window.player.setVolume(v);
		}, volume);
	}

	pause() {
		return this.page.evaluate(() => {
			return window.player.pause();
		});
	}

	resume() {
		return this.page.evaluate(() => {
			return window.player.resume();
		});
	}

	togglePlay() {
		return this.page.evaluate(() => {
			return window.player.togglePlay();
		});
	}

	seek(position_ms: number) {
		return this.page.evaluate((pos) => {
			return window.player.seek(pos);
		}, position_ms);
	}

	previousTrack() {
		return this.page.evaluate(() => {
			return window.player.previousTrack();
		});
	}

	nextTrack() {
		return this.page.evaluate(() => {
			return window.player.nextTrack();
		});
	}
}
