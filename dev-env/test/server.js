const express = require("express");
const config = require("./config.json");
const fetch = require("node-fetch");
const btoa = require("btoa");
const path = require("path");

const { client_secret, client_id, redirect_uri } = config;
const app = express();
const authorization = `Basic ${btoa(client_id + ":" + client_secret)}`;

app.use(express.static(__dirname));

app.get("/", async (req, res) => {
	if (Object.keys(req.query).length > 0) {
		if (req.query.error) return res.send(req.query.error);

		if (req.query.code) {
			let token;

			try {
				const body = new URLSearchParams();
				body.set("grant_type", "authorization_code");
				body.set("code", req.query.code);
				body.set("redirect_uri", redirect_uri);

				const fetchResponse = await fetch(`https://accounts.spotify.com/api/token`, {
					method: "POST",
					headers: {
						authorization,
					},
					body,
				});
				token = await fetchResponse.text();

				token = JSON.parse(token);
				if (token.error) return res.status(500).send(token);

				return res.redirect(`/?token=${token.access_token}`);
			} catch (error) {
				return res.status(500).send(token + error);
			}
		} else if (req.query.token) {
			return res.sendFile(__dirname + "/player.html");
		}
	}

	res.redirect(
		`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${encodeURI(
			"streaming user-read-email user-read-private user-modify-playback-state"
		)}&show_dialog=false`
	);
});

app.listen(3000, () => {
	console.log("started");
});
