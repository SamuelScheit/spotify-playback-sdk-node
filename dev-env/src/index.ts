process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);
setTimeout(() => {}, 1000000);

import fetch from "node-fetch";
import WebSocket from "ws";
import { EventEmitter } from "events";
import { generateRandomDeviceId, calculateFragments } from "./Util";
import { exec } from "child_process";
import fs from "fs";

async function request(url: string, options?: RequestInit) {
	// @ts-ignore
	const response = await fetch(url, options);
	const text = await response.text();
	const OK = response.status >= 200 || response.status < 300;
	try {
		const json = JSON.parse(text);
		if (json.error) throw json.error;
		if (OK) return json;
		throw json;
	} catch (error) {
		if (text) throw text;
		if (OK) return response;

		throw response;
	}
}

enum Events {
	CONNECTED = "connected",
	DISCONNECTED = "disconnected",
	PLAY = "play",
	PAUSE = "pause",
	PAUSED = "paused",
	RESUME = "resume",
	RESUMED = "resumed",
	SEEK = "seek",
}

class Spotify extends EventEmitter {
	private token: string;
	private deviceId: string;
	private connectionId: string;
	private ws: WebSocket;
	private timeouts: NodeJS.Timeout[] = [];
	private pingTimeout: NodeJS.Timeout;
	public paused: boolean;
	public repeatPlaylist: boolean;
	public repeatTrack: boolean;
	public shuffle: boolean;
	public volume: number;
	public states: any[];
	public tracks: any[];
	public stateIndex: number;

	constructor({ token }: { token: string }) {
		super();
		if (!token) throw new Error("Invalid Token Provided");
		this.token = token;
		this.deviceId = generateRandomDeviceId();
	}

	fetch(path: string, opts?: any) {
		if (!opts) opts = {};
		if (!opts.headers) opts.headers = {};
		opts.headers["user-agent"] =
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36";
		opts.headers["authorization"] = `Bearer ${this.token}`;
		if (opts.body) {
			opts.headers["content-type"] = "application/json";
			opts.body = JSON.stringify(opts.body);
		}

		return request(`https://api.spotify.com/v1${path}`, opts);
	}

	async login() {
		await this.fetch("/melody/v1/check_scope?scope=web-playback").catch((e) => {
			throw "Token is not allowed to access scope web-playback";
		});

		this.connect();
		const connectionId: string = await new Promise((res) => this.once(Events.CONNECTED, res));

		await this.fetch(`/me/notifications/user?connection_id=${connectionId}`, {
			method: "PUT",
		});

		await this.fetch(`/track-playback/v1/devices`, {
			method: "POST",
			body: {
				device: {
					device_id: this.deviceId,
					device_type: "computer",
					brand: "public_js-sdk",
					model: "harmony-chrome.87-mac",
					name: "Node",
					metadata: {},
					capabilities: {
						change_volume: true,
						audio_podcasts: true,
						enable_play_token: true,
						play_token_lost_behavior: "pause",
						disable_connect: false,
						manifest_formats: ["file_urls_mp3", "file_urls_external", "file_ids_mp4", "file_ids_mp4_dual"],
					},
				},
				connection_id: connectionId,
				client_version: "harmony:3.19.1-441cc8f",
				previous_session_state: null,
				volume: 65535,
			},
		});

		await this.fetch(`/me/player`, { method: "PUT", body: { play: true, device_ids: [this.deviceId] } });
	}

	setTimeout(callback: (...args: any[]) => void, ms: number): NodeJS.Timeout {
		const timeout = setTimeout(callback, ms);
		this.timeouts.push(timeout);
		return timeout;
	}

	setInterval(callback: (...args: any[]) => void, ms: number): NodeJS.Timeout {
		const timeout = setInterval(callback, ms);
		this.timeouts.push(timeout);
		return timeout;
	}

	connect() {
		this.ws = new WebSocket(`wss://gew-dealer.spotify.com/?access_token=${this.token}`);
		this.ws.on("message", this.onMessage);
		this.ws.on("close", this.destroy);
		this.setInterval(() => this.send({ type: "ping" }), 1000 * 30);
		this.setPingTimeout();
	}

	setPingTimeout() {
		clearTimeout(this.pingTimeout);
		this.pingTimeout = this.setTimeout(() => {
			this.destroy();
		}, 1000 * 30);
	}

	send(data: any) {
		let packet = data;
		if (typeof data === "object") packet = JSON.stringify(data);
		return this.ws.send(packet);
	}

	get song() {
		const state = this.states[this.stateIndex];
		const track = this.tracks[state?.track];
		const { file_id } = track?.manifest?.file_ids_mp4?.[0];

		return {
			file: <string>file_id,
			nextIndex: <number>state.transitions.advance?.state_index,
			name: <string>track.metadata.name,
			author: <string>track.metadata.authors.map((x: any) => x.name).join(),
		};
	}

	async getAudioUrl(id: string) {
		const { cdnurl } = await this.fetch(
			`/storage-resolve/files/audio/interactive/${id}?version=10000000&product=9&platform=39&alt=json`
		);
		return <string>cdnurl[0];
	}

	async getFragments(id: string) {
		return calculateFragments(await request(`https://seektables.scdn.co/seektable/${id}.json`));
	}

	replaceState(data: any) {
		if (!data.state_ref) return this.emit(Events.PAUSE);
		const { state_index } = data.state_ref;
		const { states, tracks } = data.state_machine;
		this.states = states;
		this.tracks = tracks;
		this.stateIndex = state_index;

		this.emit(Events.PLAY, this.song);

		if (data.seek_to) {
			this.emit(Events.SEEK, data.seek_to);
		}

		if (data.prev_state_ref?.paused !== data.state_ref?.paused && typeof data.state_ref?.paused === "boolean") {
			if (data.state_ref.paused) {
				this.emit(Events.PAUSE);
			} else {
				this.emit(Events.RESUME);
			}
		}
	}

	handleCommand(data: any) {
		switch (data.type) {
			case "set_volume":
				this.volume = data.volume / 65535; // spotify max volume => convert to range 0 - 1
				break;
			case "log_out":
				this.destroy();
				break;
			case "replace_state":
				this.replaceState(data);
				break;
			default:
				return;
		}
	}

	getAudioStream() {}

	onMessage = (msg: any) => {
		try {
			var data = JSON.parse(msg);
			if (!data) return;
			console.log(data);

			switch (data.type) {
				case "pong":
					this.setPingTimeout();
					return;
				case "message":
					const event = data.uri.replace("hm://", "");

					switch (event) {
						case "track-playback/v1/command":
							this.handleCommand(data.payloads[0]);
							return;
						default:
							if (event.includes("pusher/v1/connections")) {
								const connectionId = data.headers["Spotify-Connection-Id"];
								this.connectionId = connectionId;
								this.emit(Events.CONNECTED, connectionId);
								this.send({ type: "ping" });
							}
							return;
					}

				default:
					throw new Error("Invalid Type");
			}
		} catch (error) {
			console.error("Error while processing WebSocket packet", error);
		}
	};

	destroy() {
		for (const timeout of this.timeouts) {
			clearTimeout(timeout);
		}
		if (!this.ws.CLOSED && !this.ws.CLOSING) this.ws.close();
		this.emit(Events.DISCONNECTED);
	}
}

async function main() {
	const spotify = new Spotify({
		token:
			"BQAcB8axENuoFvv4Jb2Fc4sGa7sV_nudbEW--phqhOHyqQy4UgWkVOTi1hjhYl2uPp-SluaHCCeOLNsEzAmZPDmyHAVJseLHw11Eb_1XW9WxpRpPDd0oijKrCsuqjlmruT19WR7q7IdBZSyj8NRbdxMB4M1gRHICBvY",
	});
	// await spotify.login();

	// const ffmpeg = exec(`ffmpeg -i pipe:0 pipe:1 | ffplay -i pipe:0`, { maxBuffer: 1024 * 1024 * 1024 }, () => {});
	// ffmpeg.stderr.on("data", console.log);

	const id = "0b5cdba9d3856a290fe304bf15b2f4fbaef9bc38";
	const url = await spotify.getAudioUrl(id);
	const fragments = await spotify.getFragments(id);
	var i = 0;
	let buffer = Buffer.from([]);
	for (const f of fragments) {
		const req = await fetch(url, {
			headers: {
				Range: `bytes=${f.byteStart}-${f.byteEnd}`,
			},
		});
		const data = await req.buffer();
		buffer = Buffer.concat([buffer, data]);
		// const result = ffmpeg.stdin.write(data);
		// console.log(f, result);
		console.log(i);
		i++;
	}
	fs.writeFileSync(`${__dirname}/../temp/test.mp3`, buffer, { encoding: "binary" });
	console.log("written");
}

main().catch((e) => {
	console.error(e);
});
// 0221663628c1deec71f07c73c3b67962
