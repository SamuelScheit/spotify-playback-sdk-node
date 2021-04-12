// @ts-nocheck

export function calculateFragments(t) {
	var e = t.offset;
	this._initFragment = {
		init: !0,
		cacheBuffer: true,
		bufferURL: null,
		buffer: null,
		byteStart: 0,
		byteEnd: e - 1,
		codec: this._codec,
	};
	for (var i = t.segments, n = t.timescale, r = 0, s = i.length, o = new Array(s), a = 0, _ = 0, c = s; _ < c; _++) {
		var u = i[_],
			h = u[0],
			d = u[1],
			l = d / n;
		(o[_] = {
			cacheBuffer: false,
			bufferURL: null,
			buffer: null,
			byteStart: e,
			byteEnd: e + (h - 1),
			timeStart: r,
			timeEnd: r + l,
			codec: this._codec,
		}),
			(e += h),
			(a += d),
			(r += l);
	}
	var p = o[o.length - 1].byteEnd;
	(o[o.length - 1].isLastFragment = !0),
		(this._fragments = o),
		(this._duration = a / n),
		(this._frontPaddingDuration = 1024 / 44100),
		(this._endPaddingDuration = (1024 - (p % 1024) + 2048) / n);
	return [this._initFragment, ...o];
}

export function generateRandomDeviceId() {
	for (var e = new Array(27), t = e.length; t--; ) e[t] = Math.floor(8 * Math.random());
	return toHex(e.join(""), 40);
}

function r(e, t, n) {
	for (var r = 0, s = 0; s < e.length; ++s) {
		var o = e[s] * t + r;
		(e[s] = o % n), (r = ~~(o / n));
	}
	for (; r; ) e.push(r % n), (r = ~~(r / n));
}
function s(e, t, n, r) {
	var s,
		o,
		i = 0;
	for (o = 0; o < t.length; ++o) (s = ~~e[o] + t[o] * n + i), (e[o] = s % r), (i = ~~(s / r));
	for (; i; ) (s = ~~e[o] + i), (e[o] = s % r), (i = ~~(s / r)), ++o;
}
function o(e, t, n) {
	for (var o = [0], i = [1], a = 0; a < e.length; ++a) s(o, i, e[a], n), r(i, t, n);
	return o;
}
function i(e, t) {
	for (var n = [], r = 0; r < e.length; ++r) n.push(t[e[r]]);
	return n.reverse();
}
function a(e, t) {
	for (; e.length < t; ) e.push(0);
	return e;
}
var u = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
	c = {},
	_ = {};

var e, t;
for (e = 0, t = u.length; e < t; ++e) _[u[e]] = e;
for (e = 0; e < 16; ++e) c["0123456789abcdef"[e]] = e;
for (e = 0; e < 16; ++e) c["0123456789ABCDEF"[e]] = e;

function fromBytes(e, t) {
	return i(a(o(e.slice(0).reverse(), 256, 62), t), u).join("");
}
function toBytes(e, t) {
	return a(o(i(e, _), 62, 256), t).reverse();
}
function toHex(e, t) {
	return i(a(o(i(e, _), 62, 16), t), u).join("");
}
function fromHex(e, t) {
	return i(a(o(i(e, c), 16, 62), t), u).join("");
}
