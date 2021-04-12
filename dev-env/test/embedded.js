/* Spotify JS-SDK - v1.7.1-d2b664d */
!(function (t) {
	function e(n) {
		if (i[n]) return i[n].exports;
		var r = (i[n] = { i: n, l: !1, exports: {} });
		return t[n].call(r.exports, r, r.exports, e), (r.l = !0), r.exports;
	}
	var i = {};
	(e.m = t),
		(e.c = i),
		(e.d = function (t, i, n) {
			e.o(t, i) || Object.defineProperty(t, i, { configurable: !1, enumerable: !0, get: n });
		}),
		(e.n = function (t) {
			var i =
				t && t.__esModule
					? function () {
							return t.default;
					  }
					: function () {
							return t;
					  };
			return e.d(i, "a", i), i;
		}),
		(e.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		}),
		(e.p = ""),
		e((e.s = 40));
})([
	function (t, e, i) {
		"use strict";
		(function (e) {
			var i = e.Promise;
			if (!i) throw new Error("Fatal: no Promise implementation available.");
			var n;
			(n = Object.defineProperty
				? function (t, e, i) {
						return t[e]
							? t
							: (Object.defineProperty(t, e, { value: i, configurable: !0, writable: !0 }), t);
				  }
				: function (t, e, i) {
						return t[e] ? t : ((t[e] = i), t);
				  }),
				n(i, "defer", function () {
					var t = {};
					return (
						(t.promise = new i(function (e, i) {
							(t.resolve = e), (t.reject = i);
						})),
						t
					);
				}),
				n(i.prototype, "spread", function (t, e) {
					return this.then(function (t) {
						return i.all(t);
					}).then(function (e) {
						return 1 === e.length ? t(e[0]) : t.apply(this, e);
					}, e);
				}),
				(t.exports = i);
		}.call(e, i(1)));
	},
	function (t, e) {
		var i;
		i = (function () {
			return this;
		})();
		try {
			i = i || Function("return this")() || (0, eval)("this");
		} catch (t) {
			"object" == typeof window && (i = window);
		}
		t.exports = i;
	},
	function (t, e, i) {
		"use strict";
		var n = function (t, e) {
			function i() {}
			var n = e.prototype;
			(i.prototype = t._super = n), (t.prototype = new i()), (t.prototype.constructor = t);
		};
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		function n(t, e, i) {
			for (var n = t.length; n--; ) {
				var r = t[n];
				if (r.listener === e && !!r.options.once == !!i.once) return n;
			}
			return -1;
		}
		function r() {
			this._listenerMap = {};
		}
		var s = i(53),
			o = i(56),
			a = { ADD: "add:", REMOVE: "remove:" };
		(r.createEvent = function (t, e) {
			if (!t) throw new TypeError("Cannot create event with empty type.");
			return new o(t, e);
		}),
			(r.prototype.on = function (t, e, i) {
				if (!t) throw new TypeError("Cannot add event listener with empty type.");
				if (!e) return this;
				var r = i || { once: !1 },
					s = this._listenerMap || (this._listenerMap = {}),
					o = s[t] || (s[t] = []);
				if (-1 !== n(o, e, r)) return this;
				var _ = a.ADD + t;
				if (s[_] && s[_].length) {
					if (this.emitSync(_, { listener: e, options: r }).defaultPrevented) return this;
				}
				return o.push({ listener: e, options: r }), this;
			}),
			(r.prototype.once = function (t, e) {
				if (!t) throw new TypeError("Cannot add once listener with empty type.");
				return (e.$added_once = !0), this.on(t, e, { once: !0 }), e;
			}),
			(r.prototype.addListeners = function (t, e) {
				for (var i in t) t.hasOwnProperty(i) && this.on(i, t[i], e);
				return this;
			}),
			(r.prototype.removeListener = function (t, e, i) {
				if (!t) throw new TypeError("Cannot remove event listener with empty type.");
				if (!e) return this;
				var r = this._listenerMap,
					s = r && r[t];
				if (!s) return this;
				var o = i || { once: e.$added_once || !1 },
					_ = n(s, e, o);
				if (-1 === _) return this;
				var c = a.REMOVE + t;
				if (r[c] && r[c].length) {
					if (this.emitSync(c, { listener: e, options: o, remainingLength: s.length - 1 }).defaultPrevented)
						return this;
				}
				return s.splice(_, 1), s.length || (r[t] = null), this;
			}),
			(r.prototype.removeAllListeners = function (t) {
				var e = this._listenerMap;
				return e ? (void 0 === t ? ((this._listenerMap = {}), this) : ((e[t] = null), this)) : this;
			}),
			(r.prototype.removeListeners = function (t, e) {
				for (var i in t) t.hasOwnProperty(i) && this.removeListener(i, t[i], e);
				return this;
			}),
			(r.prototype.addListener = function (t, e, i) {
				return this.on(t, e, i);
			}),
			(r.prototype.addOnceListener = function (t, e) {
				return this.on(t, e, { once: !0 });
			}),
			(r.prototype.emit = function (t, e) {
				if (!t) throw new TypeError("Cannot emit empty type event.");
				var i = new o(t, e);
				return (
					s(
						function () {
							this.emitEventSync(i);
						}.bind(this)
					),
					i
				);
			}),
			(r.prototype.emitAndWait = function (t, e, i) {
				if (!t) throw new TypeError("Cannot emit empty type event.");
				var n = new o(t, e);
				return (
					s(
						function () {
							this.emitEventSync(n), "function" == typeof i && i(n);
						}.bind(this)
					),
					n
				);
			}),
			(r.prototype.emitEvent = function (t) {
				return (
					s(
						function () {
							this.emitEventSync(t);
						}.bind(this)
					),
					t
				);
			}),
			(r.prototype.emitEventAndWait = function (t, e) {
				return (
					s(
						function () {
							this.emitEventSync(t), "function" == typeof e && e(t);
						}.bind(this)
					),
					t
				);
			}),
			(r.prototype.emitSync = function (t, e) {
				var i = new o(t, e);
				return this.emitEventSync(i), i;
			}),
			(r.prototype.emitEventSync = function (t) {
				var e = t.type,
					i = this._listenerMap,
					n = i && i[e];
				if (!n || !n.length) return t;
				n = n.slice(0);
				for (var r = 0, s = n.length; r < s; r++) {
					var a = n[r];
					if (
						(a.options.once && this.removeListener(e, a.listener, a.options),
						a.listener.call(this, t),
						o.wasImmediatePropagationStopped(t))
					)
						break;
				}
				return t;
			}),
			(r.prototype.proxyEmit = function (t, e, i) {
				if (!t || "function" != typeof t.on) throw new TypeError("Source must be an EventEmitter");
				if (t === this) throw new ReferenceError("Cannot create a recursive proxy.");
				if (!e || !i) throw new TypeError("Parameters sourceType and proxyType are required.");
				var n = this.emit.bind(this, i);
				return t.on(e, n), n;
			}),
			(r.prototype.proxyEmitSync = function (t, e, i) {
				if (!t || "function" != typeof t.on) throw new TypeError("Source must be an EventEmitter");
				if (t === this) throw new ReferenceError("Cannot create a recursive proxy.");
				if (!e || !i) throw new TypeError("Parameters sourceType and proxyType are required.");
				var n = this.emitSync.bind(this, i);
				return t.on(e, n), n;
			}),
			(r.prototype.onAddListener = function (t, e) {
				return this.on(a.ADD + t, e), this;
			}),
			(r.prototype.onRemoveListener = function (t, e) {
				return this.on(a.REMOVE + t, e), this;
			}),
			(t.exports = r);
	},
	function (t, e, i) {
		"use strict";
		var n = i(6),
			r = {
				CAPPING_USER_IS_CAPPED: "CAPPING_USER_IS_CAPPED",
				EME_API_NOT_SUPPORTED: "EME_API_NOT_SUPPORTED",
				EME_MEDIA_KEYS_NOT_SUPPORTED: "EME_MEDIA_KEYS_NOT_SUPPORTED",
				EME_MEDIA_KEY_SESSION_NOT_SUPPORTED: "EME_MEDIA_KEY_SESSION_NOT_SUPPORTED",
				EME_NO_SUPPORTED_KEYSYSTEM: "EME_NO_SUPPORTED_KEYSYSTEM",
				EME_PLAYER_MEDIA_KEYS_SETTING_FAILED: "EME_PLAYER_MEDIA_KEYS_SETTING_FAILED",
				EME_ERROR_UNKNOWN: "EME_ERROR_UNKNOWN",
				EME_LICENSE_REQUEST_EMPTY_RESPONSE: "EME_LICENSE_REQUEST_EMPTY_RESPONSE",
				EME_LICENSE_REQUEST_FAILED_WITH_STATUS: "EME_LICENSE_REQUEST_FAILED_WITH_STATUS",
				EME_LICENSE_REQUEST_WIDEVINE_ERROR: "EME_LICENSE_REQUEST_WIDEVINE_ERROR",
				EME_LICENSE_UPDATE_FAILED: "EME_LICENSE_UPDATE_FAILED",
				EME_HEADER_KEY_VALUE_MISMATCH: "EME_HEADER_KEY_VALUE_MISMATCH",
				EME_HEADER_MISSING_CHALLENGE: "EME_HEADER_MISSING_CHALLENGE",
				EME_CANNOT_SET_CERTIFICATE_FOR_PLATFORM: "EME_CANNOT_SET_CERTIFICATE_FOR_PLATFORM",
				EME_MEDIA_KEY_SESSION_V0_1B_ERROR: "EME_MEDIA_KEY_SESSION_V0_1B_ERROR",
				EME_NO_SUPPORTED_CONFIGURATION: "EME_NO_SUPPORTED_CONFIGURATION",
				EME_NOT_SUPPORTED_ERROR: "EME_NOT_SUPPORTED_ERROR",
				EME_INVALID_STATE_ERROR: "EME_INVALID_STATE_ERROR",
				EME_UNKNOWN_ERROR: "EME_UNKNOWN_ERROR",
				DISALLOW_PROTECTED_TRACK_ERROR: "DISALLOW_PROTECTED_TRACK_ERROR",
				FILE_FORMAT_NOT_SUPPORTED: "FILE_FORMAT_NOT_SUPPORTED",
				FILE_MALFORMED_SEEKTABLE: "FILE_MALFORMED_SEEKTABLE",
				FILE_MALFORMED_PSSH: "FILE_MALFORMED_PSSH",
				FILE_NOT_RESOLVED: "FILE_NOT_RESOLVED",
				FRAGMENT_ONLINE_REQUEST_FAILED_WITH_ZERO: "FRAGMENT_ONLINE_REQUEST_FAILED_WITH_ZERO",
				FRAGMENT_OFFLINE_REQUEST_FAILED_WITH_ZERO: "FRAGMENT_OFFLINE_REQUEST_FAILED_WITH_ZERO",
				FRAGMENT_REQUEST_FAILED_WITH_ZERO: "FRAGMENT_REQUEST_FAILED_WITH_ZERO",
				FRAGMENT_REQUEST_FAILED_WITH_STATUS: "FRAGMENT_REQUEST_FAILED_WITH_STATUS",
				FRAGMENT_REQUEST_EMPTY_RESPONSE: "FRAGMENT_REQUEST_EMPTY_RESPONSE",
				FRAGMENT_REQUEST_UNEXPECTED_LENGTH: "FRAGMENT_REQUEST_UNEXPECTED_LENGTH",
				PLAYER_ATTEMPTED_VOLUME_OUT_OF_RANGE: "PLAYER_ATTEMPTED_VOLUME_OUT_OF_RANGE",
				PLAYER_BUFFER_QUOTA_EXCEEDED: "PLAYER_BUFFER_QUOTA_EXCEEDED",
				PLAYER_CANNOT_FIND_PLAYABLE_URI: "PLAYER_CANNOT_FIND_PLAYABLE_URI",
				PLAYER_MEDIA_ERROR: "PLAYER_MEDIA_ERROR",
				PLAYER_PLAYBACK_ERROR: "PLAYER_PLAYBACK_ERROR",
				MEDIA_ABORTED: "MEDIA_ABORTED",
				MEDIA_DECODING_ERROR: "MEDIA_DECODING_ERROR",
				MEDIA_NETWORK_ERROR: "MEDIA_NETWORK_ERROR",
				MEDIA_NOT_SUPPORTED: "MEDIA_NOT_SUPPORTED",
				LICENSE_RESOLVER_CANT_RESOLVE_URL: "LICENSE_RESOLVER_CANT_RESOLVE_URL",
				LICENSE_RESOLVER_DEPRECATED_VERSION: "LICENSE_RESOLVER_DEPRECATED_VERSION",
				LIST_PLAYER_NO_TRACK_PLAYER: "LIST_PLAYER_NO_TRACK_PLAYER",
				LIST_PLAYER_NO_LIST: "LIST_PLAYER_NO_LIST",
				LIST_PLAYER_INVALID_ARGUMENT: "LIST_PLAYER_INVALID_ARGUMENT",
				LIST_PLAYER_FORBIDDEN: "LIST_PLAYER_FORBIDDEN",
				STORAGE_ERROR: "STORAGE_ERROR",
				STORAGE_FAILED_WITH_STATUS: "STORAGE_FAILED_WITH_STATUS",
				STORAGE_RETURNED_NO_TRACKS: "STORAGE_RETURNED_NO_TRACKS",
				STORAGE_TRACK_MANIFEST_FAILED: "STORAGE_TRACK_MANIFEST_FAILED",
				STORAGE_TRACK_MANIFEST_EMPTY: "STORAGE_TRACK_MANIFEST_EMPTY",
				STORAGE_VIDEO_MANIFEST_FAILED: "STORAGE_VIDEO_MANIFEST_FAILED",
				TRACK_DATA_ALREADY_FINALIZED: "TRACK_DATA_ALREADY_FINALIZED",
				TSV_SENDING_FAILED: "TSV_SENDING_FAILED",
				PLAYBACK_STATS_SENDING_FAILED: "PLAYBACK_STATS_SENDING_FAILED",
				UNKNOWN: "UNKNOWN",
			};
		t.exports = n(r);
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t) {
				return !(!s.loggingPredicate || !s.loggingPredicate(t));
			}
			var r = i(60),
				s = e.__dbgLoggerRegistry;
			s ||
				((s = { map: {}, list: [], loggingPredicate: null }),
				Object.defineProperty
					? Object.defineProperty(e, "__dbgLoggerRegistry", { value: s })
					: (e.__dbgLoggerRegistry = s));
			var o = s.map,
				a = s.list,
				_ = "log";
			t.exports = {
				intercept: function (t) {
					if ("function" != typeof t) throw new TypeError("Logging.intercept requires a function predicate.");
					s.loggingPredicate = t;
				},
				unintercept: function () {
					s.loggingPredicate = null;
				},
				list: function (t) {
					var e = Object.keys(o);
					e.sort();
					var i, n, r;
					if (t) {
						var s = [];
						for (i = 0, n = e.length; i < n; i++)
							(r = e[i]), o[r] && s.push({ tag: r, description: o[r].description || "No description." });
						return s;
					}
					var a = {};
					for (i = 0, n = e.length; i < n; i++)
						(r = e[i]), o[r] && (a[r] = o[r].description || "No description");
					return a;
				},
				enable: function (t) {
					for (var e = Array.isArray(t) ? t : [t], i = e.length; i--; )
						for (var n = e[i].toLowerCase(), r = a.length; r--; ) {
							var s = a[r];
							s.matchesTag(n) && s.enable();
						}
				},
				disable: function (t) {
					for (var e = Array.isArray(t) ? t : [t], i = e.length; i--; )
						for (var n = e[i].toLowerCase(), r = a.length; r--; ) {
							var s = a[r];
							s.matchesTag(n) && s.disable();
						}
				},
				setLevel: function (t) {
					_ = t;
					for (var e = a.length; e--; ) {
						var i = a[e];
						i && i.setLevel(t);
					}
				},
				enableAll: function () {
					for (var t = a.length; t--; ) a[t] && a[t].enable();
				},
				disableAll: function () {
					for (var t = a.length; t--; ) a[t] && a[t].disable();
				},
				forTag: function (t, e) {
					var i, s;
					if (
						("string" == typeof t ? ((i = t.toLowerCase()), (s = e)) : ((i = t.tag), (s = t.description)),
						o.hasOwnProperty(i) && o[i])
					)
						return o[i];
					var c = new r(i, s, n);
					return c.setLevel(_), (o[i] = c), a.push(c), c;
				},
				remove: function (t) {
					var e = t.toLowerCase();
					if (o.hasOwnProperty(e) && o[e]) {
						var i = o[e];
						o[e] = null;
						var n = a.indexOf(i);
						-1 !== n && a.splice(n, 1);
					}
				},
			};
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		(function (e, i) {
			var n,
				r = function () {};
			(n =
				"true" === e.env.DEBUG
					? function (t) {
							return i.Proxy && "function" != typeof i.Proxy.create && "function" == typeof i.Proxy
								? new i.Proxy(t, {
										get: function (t, e) {
											if (!t.hasOwnProperty(e))
												throw new ReferenceError("Unknown enum value " + e);
											return t[e];
										},
										set: r,
										delete: r,
								  })
								: t;
					  }
					: function (t) {
							return t;
					  }),
				(t.exports = n);
		}.call(e, i(12), i(1)));
	},
	function (t, e, i) {
		"use strict";
		var n = i(6),
			r = {
				KEY_SESSION_MESSAGE: "message",
				KEY_SESSION_STATUSES_CHANGE: "keystatuseschange",
				MEDIA_SOURCE_OPEN: "sourceopen",
				MEDIA_SOURCE_CLOSE: "sourceclose",
				SOURCE_BUFFER_UPDATE_END: "updateend",
				MS_KEY_ADDED: "mskeyadded",
				MS_KEY_ERROR: "mskeyerror",
				MS_KEY_MESSAGE: "mskeymessage",
				MS_NEEDKEY: "msneedkey",
				V0_1B_KEY_ADDED: "keyadded",
				V0_1B_KEY_ERROR: "keyerror",
				V0_1B_KEY_MESSAGE: "keymessage",
				V0_1B_NEEDKEY: "needkey",
				MEDIA_CANPLAY: "canplay",
				MEDIA_CANPLAYTHROUGH: "canplaythrough",
				MEDIA_DURATIONCHANGE: "durationchange",
				MEDIA_ENCRYPTED: "encrypted",
				MEDIA_ENDED: "ended",
				MEDIA_ERROR: "error",
				MEDIA_LOADEDMETADATA: "loadedmetadata",
				MEDIA_PAUSE: "pause",
				MEDIA_PLAYING: "playing",
				MEDIA_SEEKING: "seeking",
				MEDIA_TIMEUPDATE: "timeupdate",
				MEDIA_WAITING: "waiting",
				INTERNAL_PLAYER_CANPLAY: "__canplay",
				INTERNAL_PLAYER_CANPLAYTHROUGH: "__canplaythrough",
				INTERNAL_MEDIA_REQUIRES_DURATION: "__requiresduration",
				INTERNAL_PLAYER_LOADED_METADATA: "__loadedmetadata",
				BUFFER_APPEND_ERROR: "append_error",
				BUFFER_QUOTA_EXCEEDED: "quota_exceeded",
				BUFFER_STALLED: "stalled",
				BUFFER_SOURCE_OPEN: "source_open",
				BUFFER_SOURCE_CLOSE: "source_close",
				BUFFERING_START: "buffering_start",
				BUFFERING_END: "buffering_end",
				EME_LICENSE_REQUEST_ERROR: "license_request_error",
				EME_LICENSE_REQUEST_CAPPED: "license_request_capped",
				LIST_PLAYER_AUTOPLAY_FAILED: "player_autoplay_failed",
				LIST_PLAYER_BEFORE_LIST_CHANGE: "before_list_change",
				LIST_PLAYER_BEFORE_NEXT: "before_next",
				LIST_PLAYER_BEFORE_PLAYER_LOAD: "before_player_load",
				LIST_PLAYER_BEFORE_PREVIOUS: "before_previous",
				LIST_PLAYER_BEFORE_TRACK_LOAD: "before_track_load",
				LIST_PLAYER_BUFFER_STALLED: "stalled",
				LIST_PLAYER_BUFFERING_START: "buffering_start",
				LIST_PLAYER_BUFFERING_END: "buffering_end",
				LIST_PLAYER_CAPPED: "capped",
				LIST_PLAYER_CLEARED: "cleared",
				LIST_PLAYER_DURATION_CHANGED: "duration_changed",
				LIST_PLAYER_ERROR: "error",
				LIST_PLAYER_ERROR_SYNC: "error_sync",
				LIST_PLAYER_LIST_CHANGED: "list_change",
				LIST_PLAYER_LIST_ENDED: "list_ended",
				LIST_PLAYER_LOAD_VIDEO: "load_video",
				LIST_PLAYER_MAX_LIST_ERRORS_REACHED: "max_list_errors_reached",
				LIST_PLAYER_PAUSED: "paused",
				LIST_PLAYER_PLAYED_THRESHOLD_REACHED: "played_threshold_reached",
				LIST_PLAYER_PLAYER_LOAD: "player_load",
				LIST_PLAYER_PLAYING: "playing",
				LIST_PLAYER_POSITION_CHANGED: "position_changed",
				LIST_PLAYER_PROGRESS: "progress",
				LIST_PLAYER_REPEAT_MODE_CHANGED: "repeat_mode_changed",
				LIST_PLAYER_SHUFFLE_CHANGED: "shuffle_changed",
				LIST_PLAYER_STOPPED: "stopped",
				LIST_PLAYER_STOPPED_VIDEO: "stopped_video",
				LIST_PLAYER_TRACKING_DATA_CREATED: "tracking_data_created",
				LIST_PLAYER_TRACKING_DATA_FINALIZED: "tracking_data_finalized",
				LIST_PLAYER_TRACK_ENDED: "track_ended",
				LIST_PLAYER_TRACK_LOADED: "track_loaded",
				LIST_PLAYER_TRACK_TIMEOUT: "track_timeout",
				LIST_PLAYER_TRACK_UNPLAYABLE: "track_unplayable",
				LIST_PLAYER_DATA_CREATED: "tracking_data_created",
				LIST_PLAYER_DATA_FINALIZED: "tracking_data_finalized",
				LIST_PLAYER_VOLUME_CHANGED: "volume_changed",
				LIST_PLAYER_VIDEO_ELEMENT_APPENDED: "video_element_appended",
				LIST_PLAYER_VIDEO_ELEMENT_REMOVED: "video_element_removed",
				LOGGER_ERROR: "error",
				PLAYER_AUTOPLAY_FAILED: "player_autoplay_failed",
				PLAYER_BEFORE_LOAD: "before_load",
				PLAYER_BEFORE_STOP: "before_stop",
				PLAYER_BUFFER_STALLED: "stalled",
				PLAYER_BUFFERING_START: "buffering_start",
				PLAYER_BUFFERING_END: "buffering_end",
				PLAYER_CAN_PRELOAD: "can_preload",
				PLAYER_CAPPED: "capped",
				PLAYER_DURATION_CHANGED: "duration_changed",
				PLAYER_ENDED: "ended",
				PLAYER_ENDED_VIDEO: "ended_video",
				PLAYER_ERROR: "error",
				PLAYER_WARNING: "warning",
				PLAYER_FIRST_BYTES: "first_bytes",
				PLAYER_KEY_RECEIVED: "key",
				PLAYER_LOAD: "load",
				PLAYER_LOAD_VIDEO: "load_video",
				PLAYER_LOADING_FAILED: "loading_failed",
				PLAYER_PAUSED: "paused",
				PLAYER_PLAYING: "playing",
				PLAYER_POSITION_CHANGED: "position_changed",
				PLAYER_PRELOADING_ERROR: "preloading_error",
				PLAYER_PROGRESS: "progress",
				PLAYER_STALLED: "stalled",
				PLAYER_STOPPED: "stopped",
				PLAYER_STOPPED_VIDEO: "stopped_video",
				PLAYER_PLAYED_THRESHOLD_REACHED: "played_threshold_reached",
				PLAYER_TIMEOUT: "timeout",
				PLAYER_TRACKING_DATA_CREATED: "tracking_data_created",
				PLAYER_TRACKING_DATA_FINALIZED: "tracking_data_finalized",
				PLAYER_VIDEO_ELEMENT_APPENDED: "video_element_appended",
				PLAYER_VIDEO_ELEMENT_REMOVED: "video_element_removed",
				PLAYER_MANAGER_READY: "ready",
				TRACKER_PLAYED_THRESHOLD_REACHED: "played_threshold_reached",
				TRACKER_TRACKING_DATA_CREATED: "tracking_data_created",
				TRACKER_TRACKING_DATA_FINALIZED: "tracking_data_finalized",
				ABR_MANAGER_BITRATE_CHANGE: "bitrate_change",
			};
		t.exports = n(r);
	},
	function (t, e, i) {
		"use strict";
		var n = i(6),
			r = {
				UNKNOWN: 0,
				OK: 200,
				CREATED: 201,
				ACCEPTED: 202,
				NO_CONTENT: 204,
				PARTIAL_CONTENT: 206,
				BAD_REQUEST: 400,
				UNAUTHORIZED: 401,
				PAYMENT_REQUIRED: 402,
				FORBIDDEN: 403,
				NOT_FOUND: 404,
				METHOD_NOT_ALLOWED: 405,
				NOT_ACCEPTABLE: 406,
				PROXY_AUTHENTICATION_REQUIRED: 407,
				TIMED_OUT: 408,
				REQUEST_TIMEOUT: 408,
				CONFLICT: 409,
				GONE: 410,
				LENGTH_REQUIRED: 411,
				PRECONDITION_FAILED: 412,
				REQUEST_ENTITY_TOO_LARGE: 413,
				REQUEST_URI_TOO_LONG: 414,
				UNSUPPORTED_MEDIA_TYPE: 415,
				REQUESTED_RANGE_NOT_SATISFIABLE: 416,
				EXPECTATION_FAILED: 417,
				INTERNAL_SERVER_ERROR: 500,
				NOT_IMPLEMENTED: 501,
				BAD_GATEWAY: 502,
				SERVICE_UNAVAILABLE: 503,
				GATEWAY_TIMEOUT: 504,
				HTTP_VERSION_NOT_SUPPORTED: 505,
			};
		t.exports = n(r);
	},
	function (t, e, i) {
		"use strict";
		var n = i(6),
			r = {
				DEALER_CONNECTION_ERROR: "DEALER_CONNECTION_ERROR",
				DEALER_AUTHENTICATION_FAILED: "DEALER_AUTHENTICATION_FAILED",
				DEALER_ERROR: "DEALER_ERROR",
				HTTP_REQUEST_FAILED: "HTTP_REQUEST_FAILED",
				LOGGING_REQUEST_FAILED: "LOGGING_REQUEST_FAILED",
				TRANSPORT_LIFECYCLE_DISABLED: "TRANSPORT_LIFECYCLE_DISABLED",
			};
		t.exports = n(r);
	},
	function (t, e, i) {
		"use strict";
		var n = i(6),
			r = {
				CONNECTION_ONLINE: "online",
				CONNECTION_OFFLINE: "offline",
				DEALER_AUTHENTICATED: "authenticated",
				DEALER_AUTHENTICATION_FAILED: "authentication_failed",
				DEALER_CONNECTED: "connected",
				DEALER_CONNECTION_ID: "connection_id",
				DEALER_ERROR: "error",
				DEALER_DISCONNECTED: "disconnected",
				DEALER_MESSAGE: "message",
				DEALER_REQUEST: "request",
				INTERNAL_DEALER_MESSAGE: "__dealer_message",
				INTERNAL_DEALER_REQUEST: "__dealer_request",
				PRODUCT_STATE_CHANGED: "product_state_changed",
				TRANSPORT_ACCESS_TOKEN: "access_token",
				TRANSPORT_AUTHENTICATED: "authenticated",
				TRANSPORT_AUTHENTICATION_FAILED: "authentication_failed",
				TRANSPORT_BEFORE_OFFLINE_DISCONNECT: "before_offline_disconnect",
				TRANSPORT_BEFORE_ONLINE_DISCONNECT: "before_online_disconnect",
				TRANSPORT_CONNECTED: "connected",
				TRANSPORT_CONNECTION_ERROR: "connection_error",
				TRANSPORT_CONNECTION_FAILED: "connection_failed",
				TRANSPORT_CONNECTION_ID: "connection_id",
				TRANSPORT_CONNECTION_OFFLINE: "connection_offline",
				TRANSPORT_CONNECTION_ONLINE: "connection_online",
				TRANSPORT_DEALER_MESSAGE: "dealer_message",
				TRANSPORT_DISCONNECTED: "disconnected",
				TRANSPORT_ENDPOINTS_RESOLVED: "endpoints_resolved",
				TRANSPORT_LOGGED_OUT: "logged_out",
				TRANSPORT_SHORT_SESSION_DISCONNECTED: "short_session_disconnected",
				TRANSPORT_RECONNECTED: "reconnected",
				TRANSPORT_RECONNECTING: "reconnecting",
				WINDOW_BEFORE_UNLOAD: "beforeunload",
			};
		t.exports = n(r);
	},
	function (t, e, i) {
		"use strict";
		var n = i(6),
			r = {
				WINDOW_BEFORE_UNLOAD: "beforeunload",
				CLIENT_AUTHENTICATED: "authenticated",
				CLIENT_AUTHENTICATION_ERROR: "authentication_error",
				CLIENT_BEFORE_DISCONNECT: "before_disconnect",
				CLIENT_BEFORE_OFFLINE_DISCONNECT: "before_offline_disconnect",
				CLIENT_CONNECTED: "connected",
				CLIENT_CONNECTION_ERROR: "connection_error",
				CLIENT_DEVICE_DESCRIPTOR_CHANGED: "descriptor_changed",
				CLIENT_ERROR: "error",
				CLIENT_LOGGED_OUT: "logged_out",
				CLIENT_PRODUCT_STATE_CHANGED: "product_state_changed",
				CLIENT_RECONNECTED: "reconnected",
				CLIENT_RECONNECTING: "reconnecting",
				CLIENT_UNRECOVERABLE_FAILURE: "unrecoverable_failure",
				CONNECT_API_DEREGISTERED: "deregistered",
				CONNECT_API_DEVICE_STATE_CHANGED: "device_state_changed",
				CONNECT_API_DEVICES_CHANGED: "devices_changed",
				CONNECT_API_MAX_SUBSCRIPTIONS_REACHED: "max_subscriptions_reached",
				CONNECT_API_PLAYER_STATE_CHANGED: "player_state_changed",
				CONNECT_API_REGISTERED: "registered",
				CONTROLLER_DEREGISTERED: "deregistered",
				CONTROLLER_DEVICES_CHANGED: "devices_changed",
				CONTROLLER_DEVICE_INFO_CHANGED: "device_info_changed",
				CONTROLLER_MAX_SUBSCRIPTIONS_REACHED: "max_subscriptions_reached",
				CONTROLLER_PROGRESS: "progress",
				CONTROLLER_REGISTERED: "registered",
				CONTROLLER_STATE_CHANGED: "state_changed",
				DEVICE_DESCRIPTOR_CHANGED: "descriptor_changed",
				STREAMER_AUTOPLAY_FAILED: "autoplay_failed",
				STREAMER_BUFFERING_END: "buffering_end",
				STREAMER_BUFFERING_START: "buffering_start",
				STREAMER_CONTEXT_ENDED: "context_ended",
				STREAMER_DEREGISTERED: "deregistered",
				STREAMER_DEVICE_INFO_CHANGED: "device_info_changed",
				STREAMER_DURATION_CHANGED: "duration_changed",
				STREAMER_ERROR: "error",
				STREAMER_LOAD_VIDEO: "load_video",
				STREAMER_LOGGED_OUT: "logged_out",
				STREAMER_MAX_LIST_ERRORS_REACHED: "max_list_errors_reached",
				STREAMER_MAX_SUBSCRIPTIONS_REACHED: "max_subscriptions_reached",
				STREAMER_PLAYBACK_CAPPED: "playback_capped",
				STREAMER_PLAYER_INITIALIZATION_DONE: "player_initialization_done",
				STREAMER_PLAYER_INITIALIZATION_FAILED: "player_initialization_failed",
				STREAMER_POSITION_CHANGED: "position_changed",
				STREAMER_PROGRESS: "progress",
				STREAMER_REGISTERED: "registered",
				STREAMER_REGISTRATION_ABORTED: "registration_aborted",
				STREAMER_REGISTRATION_ERROR: "registration_error",
				STREAMER_REGISTRATION_UPDATED: "registration_updated",
				STREAMER_STATE_CHANGED: "state_changed",
				STREAMER_STOPPED_VIDEO: "stopped_video",
				STREAMER_TRACK_LOADED: "track_loaded",
				STREAMER_TRACK_ENDED: "track_ended",
				STREAMER_VIDEO_ELEMENT_APPENDED: "video_element_appended",
				STREAMER_VIDEO_ELEMENT_REMOVED: "video_element_removed",
				PLAYBACK_STATE_OBSERVER_STATE_CHANGED: "state_changed",
				PRODUCT_STATE_OBSERVER_PRODUCT_STATE_CHANGED: "product_state_changed",
				TP_API_DEVICE_UPDATED: "device_updated",
				TP_API_DEREGISTERED: "deregistered",
				TP_API_ERROR: "error",
				TP_API_LOGOUT: "logout",
				TP_API_MAX_SUBSCRIPTIONS_REACHED: "max_subscriptions_reached",
				TP_API_READY: "ready",
				TP_API_REGISTERED: "registered",
				TP_API_REGISTRATION_ABORTED: "registration_aborted",
				TP_API_REGISTRATION_UPDATED: "registration_updated",
				TP_API_STATE_CHANGED: "state_changed",
				TP_API_STATE_CLEARED: "state_cleared",
			};
		t.exports = n(r);
	},
	function (t, e) {
		function i() {
			throw new Error("setTimeout has not been defined");
		}
		function n() {
			throw new Error("clearTimeout has not been defined");
		}
		function r(t) {
			if (u === setTimeout) return setTimeout(t, 0);
			if ((u === i || !u) && setTimeout) return (u = setTimeout), setTimeout(t, 0);
			try {
				return u(t, 0);
			} catch (e) {
				try {
					return u.call(null, t, 0);
				} catch (e) {
					return u.call(this, t, 0);
				}
			}
		}
		function s(t) {
			if (h === clearTimeout) return clearTimeout(t);
			if ((h === n || !h) && clearTimeout) return (h = clearTimeout), clearTimeout(t);
			try {
				return h(t);
			} catch (e) {
				try {
					return h.call(null, t);
				} catch (e) {
					return h.call(this, t);
				}
			}
		}
		function o() {
			E && l && ((E = !1), l.length ? (p = l.concat(p)) : (f = -1), p.length && a());
		}
		function a() {
			if (!E) {
				var t = r(o);
				E = !0;
				for (var e = p.length; e; ) {
					for (l = p, p = []; ++f < e; ) l && l[f].run();
					(f = -1), (e = p.length);
				}
				(l = null), (E = !1), s(t);
			}
		}
		function _(t, e) {
			(this.fun = t), (this.array = e);
		}
		function c() {}
		var u,
			h,
			d = (t.exports = {});
		!(function () {
			try {
				u = "function" == typeof setTimeout ? setTimeout : i;
			} catch (t) {
				u = i;
			}
			try {
				h = "function" == typeof clearTimeout ? clearTimeout : n;
			} catch (t) {
				h = n;
			}
		})();
		var l,
			p = [],
			E = !1,
			f = -1;
		(d.nextTick = function (t) {
			var e = new Array(arguments.length - 1);
			if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
			p.push(new _(t, e)), 1 !== p.length || E || r(a);
		}),
			(_.prototype.run = function () {
				this.fun.apply(null, this.array);
			}),
			(d.title = "browser"),
			(d.browser = !0),
			(d.env = {}),
			(d.argv = []),
			(d.version = ""),
			(d.versions = {}),
			(d.on = c),
			(d.addListener = c),
			(d.once = c),
			(d.off = c),
			(d.removeListener = c),
			(d.removeAllListeners = c),
			(d.emit = c),
			(d.prependListener = c),
			(d.prependOnceListener = c),
			(d.listeners = function (t) {
				return [];
			}),
			(d.binding = function (t) {
				throw new Error("process.binding is not supported");
			}),
			(d.cwd = function () {
				return "/";
			}),
			(d.chdir = function (t) {
				throw new Error("process.chdir is not supported");
			}),
			(d.umask = function () {
				return 0;
			});
	},
	function (t, e, i) {
		"use strict";
		var n = i(9),
			r = i(4),
			s = i(6),
			o = (function (t) {
				for (var e, i = 1; i < arguments.length; i++)
					if ((e = arguments[i])) for (var n in e) n in e && (t[n] = e[n]);
				return t;
			})({}, n, r, {
				USER_INFO_REQUEST_EMPTY_RESPONSE: "USER_INFO_REQUEST_EMPTY_RESPONSE",
				USER_INFO_REQUEST_FAILED_WITH_STATUS: "USER_INFO_REQUEST_FAILED_WITH_STATUS",
				HARMONY_LIFECYCLE_ERROR: "HARMONY_LIFECYCLE_ERROR",
				HARMONY_NO_TRACKS_LOADED: "HARMONY_NO_TRACKS_LOADED",
				HARMONY_OPERATION_FORBIDDEN: "HARMONY_OPERATION_FORBIDDEN",
				HARMONY_LOCAL_PLAYER_DISABLED: "HARMONY_LOCAL_PLAYER_DISABLED",
				CONNECTAPI_CLIENT_INVALID_ARGUMENTS: "CONNECTAPI_CLIENT_INVALID_ARGUMENTS",
				CONNECTAPI_CLIENT_NO_CONNECTION_ID: "CONNECT_API_CLIENT_NO_CONNECTION_ID",
				CONNECTAPI_CLIENT_NO_ACTIVE_DEVICE: "CONNECT_API_CLIENT_NO_ACTIVE_DEVICE",
				CONNECTAPI_CLIENT_NO_DEVICE: "CONNECTAPI_CLIENT_NO_DEVICE",
				CONNECTAPI_CLIENT_NO_SESSION_ID: "CONNECTAPI_CLIENT_NO_SESSION_ID",
				CONNECTAPI_CLIENT_NO_STATE: "CONNECTAPI_CLIENT_NO_STATE",
				CONNECTAPI_CLIENT_INVALID_POSITION: "CONNECT_API_CLIENT_INVALID_POSITION",
				CONNECTAPI_CLIENT_INVALID_VOLUME: "CONNECT_API_CLIENT_INVALID_VOLUME",
				CONNECTAPI_MAX_SUBSCRIPTIONS_REACHED: "CONNECTAPI_MAX_SUBSCRIPTIONS_REACHED",
				CONNECTAPI_REGISTRATION_FAILED_WITH_STATUS: "CONNECTAPI_REGISTRATION_FAILED_WITH_STATUS",
				TP_NO_RESPONSE_BODY: "TP_NO_RESPONSE_BODY",
				TP_REGISTRATION_FAILED_NON_PREMIUM: "TP_REGISTRATION_FAILED_NON_PREMIUM",
				TP_REGISTRATION_FAILED_WITH_STATUS: "TP_REGISTRATION_FAILED_WITH_STATUS",
				TP_MAX_SUBSCRIPTIONS_REACHED: "TP_MAX_SUBSCRIPTIONS_REACHED",
				TP_UPDATE_REQUEST_EMPTY_RESPONSE: "TP_UPDATE_REQUEST_EMPTY_RESPONSE",
				TP_PARSE_STATE_UPDATE_FAILED_WITH_STATUS: "TP_PARSE_STATE_UPDATE_FAILED_WITH_STATUS",
				TP_UNKNOWN_COMMAND: "TP_UNKNOWN_COMMAND",
				TP_CANNOT_CREATE_STATE_REF: "TP_CANNOT_CREATE_STATE_REF",
				TP_MISSING_INITIAL_STATE: "TP_MISSING_INITIAL_STATE",
				TP_INVALID_STATE_REFERENCE: "TP_INVALID_STATE_REFERENCE",
				TP_CONFLICT_REQUEST_FAILED_WITH_STATUS: "TP_CONFLICT_REQUEST_FAILED_WITH_STATUS",
				TP_STREAM_TIME_VALUE_OUT_OF_RANGE: "TP_STREAM_TIME_VALUE_OUT_OF_RANGE",
			});
		t.exports = s(o);
	},
	function (t, e, i) {
		"use strict";
		var n = {
			WIDEVINE: "com.widevine.alpha",
			PLAYREADY: "com.microsoft.playready",
			PLAYREADY_HARDWARE: "com.microsoft.playready.hardware",
			INVALID_SPOTIFY_KEY: "com.spotify.invalid",
		};
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			(this.url = t || ""),
				(this.status = e || 0),
				(this.headers = null),
				(this.body = null),
				(this.offline = !1),
				(this.timing = null),
				(this.ok = this.status >= 200 && this.status <= 299),
				(this.metadata = null);
		}
		(n.prototype.getStatusFamily = function () {
			return 0 | (this.status / 100);
		}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		var n = {
			FILE_URLS_MP3: "file_urls_mp3",
			FILE_URLS_EXTERNAL: "file_urls_external",
			FILE_IDS_MP4: "file_ids_mp4",
			FILE_IDS_MP4_DUAL: "file_ids_mp4_dual",
			MANIFEST_IDS_VIDEO: "manifest_ids_video",
		};
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		var n = {
			SUCCESS: "RESULT_SUCCESS",
			INVALID: "RESULT_INVALID",
			FORBIDDEN: "RESULT_FORBIDDEN",
			OUT_OF_BOUNDS: "RESULT_OUT_OF_BOUNDS",
			NO_LIST: "RESULT_NO_LIST",
			NO_TRACK: "RESULT_NO_TRACK",
			LIST_END: "RESULT_LIST_END",
			INVALID_TRACK: "RESULT_INVALID_TRACK",
			CANCELLED: "CANCELLED",
			NO_TRACK_PLAYER: "NO_TRACK_PLAYER",
		};
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			Error.call(this, e),
				(this.code = t || r.STORAGE_ERROR),
				(this.message = e || "Storage Error"),
				(this.status = -1),
				(this.fileId = ""),
				(this.debug = {}),
				(this.canPlayNext = !0);
		}
		var r = i(4);
		(n.prototype = new Error()),
			(n.prototype.constructor = n),
			(n.prototype.name = "StorageError"),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		var n = {
			"com.widevine.alpha": {
				commonName: "widevine",
				licenseServer: "https://@webgate/widevine-license",
				withCertificate: !0,
				pssh_field: { audio: "pssh_widevine", video: "encryption_data" },
			},
			"com.microsoft.playready": {
				commonName: "playready",
				licenseServer: "https://@webgate/playready-license",
				withCertificate: !1,
				pssh_field: { audio: "pssh_playready", video: "encryption_data" },
			},
			"com.microsoft.playready.hardware": {
				commonName: "playready",
				licenseServer: "https://@webgate/playready-license",
				withCertificate: !1,
				pssh_field: { audio: "pssh_playready", video: "encryption_data" },
			},
		};
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			Error.call(this, e),
				(this.code = t || r.EME_ERROR_UNKNOWN),
				(this.message = e),
				(this.status = -1),
				(this.licenseServer = ""),
				(this.shouldRefreshEndpoint = !1),
				(this.unrecoverable = !1),
				(this.debug = {});
		}
		var r = i(4);
		(n.prototype = new Error()),
			(n.prototype.constructor = n),
			(n.prototype.name = "EMEError"),
			(n.prototype.fatal = function () {
				return (this.unrecoverable = !0), this;
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		var n = {
			SPOTIFY_MESSAGE: "SP_MESSAGE",
			ACCOUNT_ERROR: "ACCOUNT_ERROR",
			AUTH_ERROR: "AUTH_ERROR",
			CONNECT: "CONNECT",
			CONNECTED: "CONNECTED",
			CURRENT_STATE: "CURRENT_STATE",
			DISCONNECT: "DISCONNECT",
			EVENT: "EVENT",
			GET_CURRENT_STATE: "GET_CURRENT_STATE",
			GET_TOKEN: "GET_TOKEN",
			GET_VOLUME: "GET_VOLUME",
			INIT: "INIT",
			LOADED: "LOADED",
			NEXT_TRACK: "NEXT_TRACK",
			PAUSE: "PAUSE",
			PLAYBACK_ERROR: "PLAYBACK_ERROR",
			PLAYER_INIT_ERROR: "PLAYER_INIT_ERROR",
			PLAYER_READY: "PLAYER_READY",
			PLAYER_NOT_READY: "PLAYER_NOT_READY",
			PLAYER_STATE_CHANGED: "PLAYER_STATE_CHANGED",
			PREV_TRACK: "PREV_TRACK",
			RESUME: "RESUME",
			SEEK: "SEEK",
			SET_NAME: "SET_NAME",
			SET_VOLUME: "SET_VOLUME",
			TOGGLE_PLAY: "TOGGLE_PLAY",
			TOKEN: "TOKEN",
			VOLUME: "VOLUME",
			accountError: function (t) {
				return this._createEventMessage(n.ACCOUNT_ERROR, { message: t });
			},
			authError: function (t) {
				return this._createEventMessage(n.AUTH_ERROR, t);
			},
			playbackError: function (t) {
				return this._createEventMessage(n.PLAYBACK_ERROR, t);
			},
			playerReady: function (t) {
				return this._createEventMessage(n.PLAYER_READY, t);
			},
			playerNotReady: function (t) {
				return this._createEventMessage(n.PLAYER_NOT_READY, t);
			},
			connect: function () {
				return this._createMessage(n.CONNECT);
			},
			connected: function (t, e) {
				return this._createMessage(n.CONNECTED, { connected: t, ref: e });
			},
			disconnect: function () {
				return this._createMessage(n.DISCONNECT);
			},
			init: function (t) {
				return this._createMessage(n.INIT, t);
			},
			playerInitError: function (t) {
				return this._createEventMessage(n.PLAYER_INIT_ERROR, t);
			},
			getToken: function () {
				return this._createMessage(n.GET_TOKEN);
			},
			token: function (t, e) {
				return this._createMessage(n.TOKEN, { token: t, ref: e });
			},
			pause: function () {
				return this._createMessage(n.PAUSE);
			},
			resume: function () {
				return this._createMessage(n.RESUME);
			},
			togglePlay: function () {
				return this._createMessage(n.TOGGLE_PLAY);
			},
			seek: function (t) {
				return this._createMessage(n.SEEK, t);
			},
			nextTrack: function (t) {
				return this._createMessage(n.NEXT_TRACK, t);
			},
			previousTrack: function (t) {
				return this._createMessage(n.PREV_TRACK, t);
			},
			getCurrentState: function () {
				return this._createMessage(n.GET_CURRENT_STATE);
			},
			currentState: function (t, e) {
				return this._createMessage(n.CURRENT_STATE, { state: t, ref: e });
			},
			playerStateChanged: function (t) {
				return this._createEventMessage(n.PLAYER_STATE_CHANGED, t);
			},
			getVolume: function () {
				return this._createMessage(n.GET_VOLUME);
			},
			volume: function (t, e) {
				return this._createMessage(n.VOLUME, { volume: t, ref: e });
			},
			setVolume: function (t) {
				return this._createMessage(n.SET_VOLUME, t);
			},
			setName: function (t) {
				return this._createMessage(n.SET_NAME, t);
			},
			embeddedLoaded: function () {
				return this._createMessage(n.LOADED);
			},
			_createEventMessage: function (t, e) {
				return this._createMessage(n.EVENT, { name: t, eventData: e });
			},
			_createMessage: function (t, e) {
				return { type: n.SPOTIFY_MESSAGE, body: { topic: t, data: e ? JSON.parse(JSON.stringify(e)) : null } };
			},
		};
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			var i = e || {};
			(this._url = t),
				(this._method = (i.method || "GET").toUpperCase()),
				(this._payload = i.payload || ""),
				(this._headers = i.headers || null),
				(this._responseType = i.responseType || ""),
				(this._canceller = i.canceller || r.defer().promise),
				(this._ignoreResponseBody = i.ignoreResponseBody),
				(this._parseResponseHeaders = i.parseResponseHeaders),
				(this._withCredentials = "include" === i.credentials),
				(this._forcePolyfill = i.forcePolyfill),
				(this._timing = i.timing ? { completed: 0 } : null),
				(this._requestStartTime = 0),
				(this._xhr = new XMLHttpRequest()),
				(this._abort = this._abort.bind(this));
		}
		var r = i(0),
			s = i(15),
			o = i(46),
			a = i(47),
			_ = i(8),
			c = i(9),
			u = function () {},
			h = { POST: !0, PUT: !0, DELETE: !0 },
			d = { json: !0, text: !0, document: !0 },
			l = {},
			p = r.resolve(l);
		(n.request = function (t, e) {
			return new n(t, e).send();
		}),
			(n.prototype._abort = function () {
				this._xhr &&
					(this._xhr.abort(),
					(this._xhr.onprogress = u),
					(this._xhr.onerror = u),
					(this._xhr.onreadystatechange = u),
					(this._xhr = null));
			}),
			(n.prototype._handleStateChanged = function (t, e, i) {
				this._xhr &&
					4 === this._xhr.readyState &&
					(this._timing && (this._timing.completed = Date.now() - this._requestStartTime),
					(this._xhr.onprogress = null),
					(this._xhr.onerror = null),
					(this._xhr.onreadystatechange = null),
					r
						.race([this._canceller, p])
						.then(
							function (n) {
								if (n === l && this._xhr) {
									var r = this._xhr;
									if (r) {
										var a = r.status,
											c = new s(r.responseURL || t, a);
										if (
											((c.body = null),
											i && i.isOnline && (c.offline = !i.isOnline()),
											(this._parseResponseHeaders || a > 299) &&
												(c.headers = new o(r.getAllResponseHeaders())),
											!this._ignoreResponseBody &&
												a !== _.NO_CONTENT &&
												2 === c.getStatusFamily())
										) {
											var u = this._responseType;
											if (!this._forcePolyfill && "response" in r && u === r.responseType)
												c.body = r.response;
											else if ("document" === u) c.body = r.responseXML;
											else if ("json" === u)
												try {
													c.body = JSON.parse(r.responseText);
												} catch (t) {
													c.body = null;
												}
											else ("text" !== u && "" !== u) || (c.body = r.responseText);
										}
										(c.timing = this._timing), e.resolve(c), (this._xhr = null);
									}
								}
							}.bind(this)
						)
						.catch(function () {}));
			}),
			(n.prototype.send = function () {
				return r.race([this._canceller, p]).then(
					function (t) {
						var e = r.defer();
						if (t !== l) return e.promise;
						var i = this._url;
						if (!i) return e.reject(new TypeError("Request URL cannot be blank.")), e.promise;
						var n = null,
							s = this._payload,
							o = this._method;
						o in h && s ? (n = s) : s && (i += "?" + s);
						var _ = this._xhr;
						if (!_) return e.reject(new Error("Request has been closed.")), e.promise;
						_.open(o, i, !0),
							(_.onprogress = u),
							(_.onerror = function () {
								e.reject(new a(c.HTTP_REQUEST_FAILED, "Request cannot be completed.", this.status)),
									(this.onerror = u);
							}),
							(_.onreadystatechange = this._handleStateChanged.bind(this, i, e));
						var p = this._responseType;
						if (p)
							if (this._forcePolyfill) {
								if (!(p in d))
									return (
										e.reject(new TypeError('Cannot polyfill responseType "' + p + '"')), e.promise
									);
							} else {
								if (!("responseType" in _ || p in d))
									return (
										e.reject(new TypeError("Cannot set responseType: not supported in browser.")),
										e.promise
									);
								if (((_.responseType = p), p !== this._xhr.responseType && !(p in d)))
									return e.reject(new TypeError('Unknown responseType "' + p + '".')), e.promise;
							}
						var E = this._headers;
						if (E)
							for (var f in E)
								if (E.hasOwnProperty(f))
									try {
										_.setRequestHeader(f, E[f]);
									} catch (t) {
										return e.reject(t), e.promise;
									}
						try {
							(this._requestStartTime = Date.now()), _.send(n);
						} catch (t) {
							e.reject(t);
						}
						return this._canceller.then(this._abort, this._abort), e.promise;
					}.bind(this)
				);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		(e.counterDefaults = { algo: "lin", baseTime: 200, ceiling: 0, curve: "linear" }),
			(e.backoffDefaults = {
				algo: "lin",
				backoffInitial: !1,
				baseTime: 200,
				ceiling: 0,
				curve: "linear",
				maxDuration: 1 / 0,
				maxRetries: 1 / 0,
				maxTime: 1 / 0,
				retryPredicate: function () {
					return !0;
				},
			});
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			var e = t / 5;
			return 0 | (t - e / 2 + Math.random() * e);
		}
		function r(t) {
			var e = t || {};
			(this._curve = e.curve || e.algo || s.curve),
				(this._baseTime = e.baseTime || s.baseTime),
				(this._ceiling = e.ceiling || s.ceiling),
				(this._jitter = !(!1 === e.jitter));
		}
		var s = i(23).counterDefaults;
		(r.prototype.getTime = function (t) {
			var e;
			switch (this._curve) {
				case "static":
					e = 1;
					break;
				case "logarithmic":
				case "log":
					e = Math.log(t);
					break;
				case "exponential":
				case "exp":
					e = Math.pow(Math.E, t);
					break;
				case "linear":
				case "lin":
				default:
					e = t + 1;
			}
			var i = (e * this._baseTime) | 0;
			return this._ceiling && (i = Math.min(i, this._ceiling)), this._jitter ? n(i) : i;
		}),
			(t.exports = r);
	},
	function (t, e, i) {
		"use strict";
		var n = i(6),
			r = {
				BROWSER_ERROR: 0,
				CONNECTION_ERROR: 0,
				INFORMATIONAL: 1,
				SUCCESS: 2,
				REDIRECTION: 3,
				CLIENT_ERROR: 4,
				SERVER_ERROR: 5,
			};
		t.exports = n(r);
	},
	function (t, e, i) {
		"use strict";
		t.exports = { CLOSE: 4e3, TIMEOUT: 4001 };
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t) {
				s.call(this);
				var i = t || {};
				(this._navigator = e.navigator),
					"function" == typeof e.addEventListener &&
						(e.addEventListener("online", this.emitSync.bind(this, o.CONNECTION_ONLINE, {})),
						e.addEventListener("offline", this.emitSync.bind(this, o.CONNECTION_OFFLINE, {})),
						i.notifyBeforeUnload &&
							e.addEventListener(
								o.WINDOW_BEFORE_UNLOAD,
								this.emitSync.bind(this, o.WINDOW_BEFORE_UNLOAD, {})
							));
			}
			var r = i(2),
				s = i(3),
				o = i(10);
			r(n, s),
				(n.create = function (t) {
					return new n(t);
				}),
				(n.prototype.isOnline = function () {
					var t = this._navigator;
					return !(t && "onLine" in t) || t.onLine;
				}),
				(t.exports = n);
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		var n = i(6),
			r = {
				CONNECT_API: "connect-api",
				HARMONY: "harmony",
				PLAYBACK: "playback",
				TRACK_PLAYBACK: "track-playback",
				TRANSPORT: "transport",
			};
		t.exports = n(r);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e, i) {
			for (var n = 0, r = 0; r < t.length; ++r) {
				var s = t[r] * e + n;
				(t[r] = s % i), (n = ~~(s / i));
			}
			for (; n; ) t.push(n % i), (n = ~~(n / i));
		}
		function r(t, e, i, n) {
			var r,
				s,
				o = 0;
			for (s = 0; s < e.length; ++s) (r = ~~t[s] + e[s] * i + o), (t[s] = r % n), (o = ~~(r / n));
			for (; o; ) (r = ~~t[s] + o), (t[s] = r % n), (o = ~~(r / n)), ++s;
		}
		function s(t, e, i) {
			for (var s = [0], o = [1], a = 0; a < t.length; ++a) r(s, o, t[a], i), n(o, e, i);
			return s;
		}
		function o(t, e) {
			for (var i = [], n = 0; n < t.length; ++n) i.push(e[t[n]]);
			return i.reverse();
		}
		function a(t, e) {
			for (; t.length < e; ) t.push(0);
			return t;
		}
		var _ = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
			c = {},
			u = {};
		!(function () {
			var t, e;
			for (t = 0, e = _.length; t < e; ++t) u[_[t]] = t;
			for (t = 0; t < 16; ++t) c["0123456789abcdef"[t]] = t;
			for (t = 0; t < 16; ++t) c["0123456789ABCDEF"[t]] = t;
		})(),
			(t.exports = {
				fromBytes: function (t, e) {
					return o(a(s(t.slice(0).reverse(), 256, 62), e), _).join("");
				},
				toBytes: function (t, e) {
					return a(s(o(t, u), 62, 256), e).reverse();
				},
				toHex: function (t, e) {
					return o(a(s(o(t, u), 62, 16), e), _).join("");
				},
				fromHex: function (t, e) {
					return o(a(s(o(t, c), 16, 62), e), _).join("");
				},
			});
	},
	function (t, e) {
		t.exports = { tagged: "3.19.1-441cc8f", version: "3.19.1", revision: "441cc8f" };
	},
	function (t, e, i) {
		"use strict";
		function n() {
			(this._id = {}), (this.length = 0), (this.first = null), (this.last = null);
		}
		(n.prototype.append = function (t) {
			if (!t) throw new Error("Node is null!");
			if (t.listID) throw new Error("Node already exists in another list!");
			return (
				(t.listID = this._id),
				this.first
					? ((t.prev = this.last), (t.next = null), (this.last.next = t), (this.last = t))
					: ((this.first = t), (this.last = t)),
				++this.length
			);
		}),
			(n.prototype.insertAfter = function (t, e) {
				if (!t || !e) throw new Error("Node is null!");
				if (e.listID) throw new Error("Node already exists in another list!");
				(e.listID = this._id),
					(e.prev = t),
					(e.next = t.next),
					(t.next.prev = e),
					(t.next = e),
					e.prev === this.last && (this.last = e),
					this.length++;
			}),
			(n.prototype.remove = function (t) {
				if (!t) throw new Error("Node is null!");
				return (
					!(!this.length || t.listID !== this._id) &&
					(this.length > 1
						? (t.prev && (t.prev.next = t.next),
						  t.next && (t.next.prev = t.prev),
						  t === this.first ? (this.first = t.next) : t === this.last && (this.last = t.prev))
						: ((this.first = null), (this.last = null)),
					(t.listID = null),
					(t.prev = null),
					(t.next = null),
					this.length--,
					!0)
				);
			}),
			(n.Node = function (t) {
				(this.listID = null),
					(this.key = null),
					(this.prev = null),
					(this.next = null),
					(this.value = t || null);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		var n = function () {
			var t,
				e = [];
			for (t = 0; t < 256; ++t) e[t] = 255;
			for (t = 0; t < this.BASE64_DIGITS.length; ++t) e[this.BASE64_DIGITS.charCodeAt(t)] = t;
			this._inverseData = String.fromCharCode.apply(String, e);
		};
		(n.prototype.BASE64_DIGITS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
			(n.prototype.STRING_CHUNK_SIZE = 4096),
			(n.prototype._stringFromCharCode = function (t) {
				if (t.length < this.STRING_CHUNK_SIZE) return String.fromCharCode.apply(String, t);
				var e = 0,
					i = [];
				do {
					i.push(String.fromCharCode.apply(String, t.slice(e, e + this.STRING_CHUNK_SIZE))),
						(e += this.STRING_CHUNK_SIZE);
				} while (e < t.length);
				return i.join("");
			}),
			(n.prototype.encode = function (t) {
				if ("string" != typeof t) return "";
				if ("undefined" != typeof window && void 0 !== window.btoa) return window.btoa(t);
				var e, i, n, r, s, o;
				for (n = t.length, i = 0, e = ""; i < n; ) {
					if (((r = 255 & t.charCodeAt(i++)), i === n)) {
						(e += this.BASE64_DIGITS.charAt(r >> 2)),
							(e += this.BASE64_DIGITS.charAt((3 & r) << 4)),
							(e += "==");
						break;
					}
					if (((s = t.charCodeAt(i++)), i === n)) {
						(e += this.BASE64_DIGITS.charAt(r >> 2)),
							(e += this.BASE64_DIGITS.charAt(((3 & r) << 4) | ((240 & s) >> 4))),
							(e += this.BASE64_DIGITS.charAt((15 & s) << 2)),
							(e += "=");
						break;
					}
					(o = t.charCodeAt(i++)),
						(e += this.BASE64_DIGITS.charAt(r >> 2)),
						(e += this.BASE64_DIGITS.charAt(((3 & r) << 4) | ((240 & s) >> 4))),
						(e += this.BASE64_DIGITS.charAt(((15 & s) << 2) | ((192 & o) >> 6))),
						(e += this.BASE64_DIGITS.charAt(63 & o));
				}
				return e;
			}),
			(n.prototype.decode = function (t) {
				if ("undefined" != typeof window && void 0 !== window.atob) return window.atob(t);
				for (var e, i, n = [], r = t.length, s = 0; ; ) {
					do {
						e = this._inverseData.charCodeAt(255 & t.charCodeAt(s++));
					} while (255 === e && s < r);
					do {
						i = this._inverseData.charCodeAt(255 & t.charCodeAt(s++));
					} while (255 === i && s < r);
					if (255 === i) break;
					n.push(255 & ((e << 2) | (i >> 4)));
					do {
						e = this._inverseData.charCodeAt(255 & t.charCodeAt(s++));
					} while (255 === e && s < r);
					if (255 === e) break;
					n.push(255 & ((i << 4) | (e >> 2)));
					do {
						i = this._inverseData.charCodeAt(255 & t.charCodeAt(s++));
					} while (255 === i && s < r);
					if (255 === i) break;
					n.push(255 & ((e << 6) | i));
				}
				return this._stringFromCharCode(n);
			});
		var r = new n();
		t.exports = { encode: r.encode.bind(r), decode: r.decode.bind(r) };
	},
	function (t, e, i) {
		"use strict";
		function n(t, e, i, n) {
			Error.call(this, e),
				(this.code = t),
				(this.message = e),
				(this.status = void 0 !== i ? i : -1),
				(this.debug = n || {}),
				(this.target = null);
		}
		(n.prototype = new Error()),
			(n.prototype.constructor = n),
			(n.prototype.name = "FragmentError"),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			Error.call(this, e),
				(this.code = t),
				(this.canPlayNext = !0),
				(this.message = e || "File Error"),
				(this.debug = {});
		}
		(n.prototype = new Error()), (n.prototype.constructor = n), (n.prototype.name = "FileError"), (t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		t.exports = function () {
			var t = document.createEvent("Event");
			t.initEvent("encrypted", !1, !1), this.dispatchEvent(t);
		};
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			Error.call(this, e),
				(this.code = t),
				(this.message = e),
				(this.unrecoverable = !1),
				(this.listPlayerIgnore = !1),
				(this.debug = {});
		}
		(n.prototype = new Error()),
			(n.prototype.constructor = n),
			(n.prototype.name = "PlaybackError"),
			(n.prototype.fatal = function () {
				return (this.unrecoverable = !0), this;
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		var n = { EMPTY: "", UNKNOWN: "unknown" };
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			(this.code = t),
				(this.message = e),
				(this.status = -1),
				(this.maxedSubscriptions = !1),
				(this.unrecoverable = !1),
				(this.debug = {});
		}
		(n.prototype = new Error()),
			(n.prototype.constructor = new n()),
			(n.prototype.name = "TrackPlayerAPIClientError"),
			(n.prototype.fatal = function () {
				return (this.unrecoverable = !0), this;
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			this.type = t;
			for (var i in e) "function" != typeof e[i] && (this[i] = e[i]);
		}
		var r = i(29),
			s = new TypeError("Invalid Spotify URI!"),
			o = (new TypeError("Not implemented!"), { URI: 0, URL: 1 }),
			a = function (t) {
				var e,
					i,
					n,
					r,
					a = t.split("?");
				if (a.length > 1) {
					(t = a.shift()), (n = a.pop());
					var _ = n.split("#");
					_.length > 1 && ((n = _.shift()), (r = _.pop())), (n = d(n));
				}
				var c = t.split("#");
				if ((c.length > 1 && ((t = c.shift()), (r = c.pop())), 0 === t.indexOf("spotify:")))
					(e = t.slice("spotify:".length).split(":")), (i = o.URI);
				else {
					if (((t = t.split("?")[0]), 0 === t.indexOf("http://play.spotify.com/")))
						e = t.slice("http://play.spotify.com/".length).split("/");
					else if (0 === t.indexOf("https://play.spotify.com/"))
						e = t.slice("https://play.spotify.com/".length).split("/");
					else if (0 === t.indexOf("http://open.spotify.com/"))
						e = t.slice("http://open.spotify.com/".length).split("/");
					else {
						if (0 !== t.indexOf("https://open.spotify.com/")) throw s;
						e = t.slice("https://open.spotify.com/".length).split("/");
					}
					i = o.URL;
				}
				return r && e.push(r), { format: i, components: e, query: n };
			},
			_ = function (t, e) {
				return (
					(t = encodeURIComponent(t)),
					e === o.URI && (t = t.replace(/%20/g, "+")),
					(t = t.replace(/[!'()]/g, escape)),
					(t = t.replace(/\*/g, "%2A"))
				);
			},
			c = function (t, e) {
				var i = e == o.URI ? t.replace(/\+/g, "%20") : t;
				return decodeURIComponent(i);
			},
			u = function (t, e) {
				var i;
				t.id && (i = t._base62Id);
				var r, o, a;
				switch (t.type) {
					case n.Type.ALBUM:
						return (r = [n.Type.ALBUM, i]), t.disc && r.push(t.disc), r;
					case n.Type.AD:
						return [n.Type.AD, t._base62Id];
					case n.Type.ARTIST:
						return [n.Type.ARTIST, i];
					case n.Type.ARTIST_TOPLIST:
						return [n.Type.ARTIST, i, n.Type.TOP, t.toplist];
					case n.Type.SEARCH:
						return [n.Type.SEARCH, _(t.query, e)];
					case n.Type.TRACK:
						return (
							(t.context || t.play) && (i += h({ context: t.context, play: t.play })),
							t.anchor && (i += "#" + t.anchor),
							[n.Type.TRACK, i]
						);
					case n.Type.TRACKSET:
						var c = [];
						for (o = 0, a = t.tracks.length; o < a; o++) c.push(t.tracks[o]._base62Id);
						return (
							(c = [c.join(",")]),
							null !== t.index && c.push("#", t.index),
							[n.Type.TRACKSET, _(t.name)].concat(c)
						);
					case n.Type.FACEBOOK:
						return [n.Type.USER, n.Type.FACEBOOK, t.uid];
					case n.Type.AUDIO_FILE:
						return [n.Type.AUDIO_FILE, t.extension, t._base62Id];
					case n.Type.FOLDER:
						return [n.Type.USER, _(t.username, e), n.Type.FOLDER, t._base62Id];
					case n.Type.FOLLOWERS:
						return [n.Type.USER, _(t.username, e), n.Type.FOLLOWERS];
					case n.Type.FOLLOWING:
						return [n.Type.USER, _(t.username, e), n.Type.FOLLOWING];
					case n.Type.PLAYLIST:
						return [n.Type.USER, _(t.username, e), n.Type.PLAYLIST, i];
					case n.Type.STARRED:
						return [n.Type.USER, _(t.username, e), n.Type.STARRED];
					case n.Type.TEMP_PLAYLIST:
						return [n.Type.TEMP_PLAYLIST, t.origin, t.data];
					case n.Type.CONTEXT_GROUP:
						return [n.Type.CONTEXT_GROUP, t.origin, t.name];
					case n.Type.USER_TOPLIST:
						return [n.Type.USER, _(t.username, e), n.Type.TOP, t.toplist];
					case n.Type.USER_TOP_TRACKS:
						return [n.Type.USER, _(t.username, e), n.Type.TOPLIST];
					case n.Type.TOPLIST:
						return [n.Type.TOP, t.toplist].concat(t.global ? [n.Type.GLOBAL] : ["country", t.country]);
					case n.Type.INBOX:
						return [n.Type.USER, _(t.username, e), n.Type.INBOX];
					case n.Type.ROOTLIST:
						return [n.Type.USER, _(t.username, e), n.Type.ROOTLIST];
					case n.Type.PUBLISHED_ROOTLIST:
						return [n.Type.USER, _(t.username, e), n.Type.PUBLISHED_ROOTLIST];
					case n.Type.COLLECTION_TRACK_LIST:
						return [n.Type.USER, _(t.username, e), n.Type.COLLECTION_TRACK_LIST, i];
					case n.Type.PROFILE:
						return t.args && t.args.length > 0
							? [n.Type.USER, _(t.username, e)].concat(t.args)
							: [n.Type.USER, _(t.username, e)];
					case n.Type.LOCAL_ARTIST:
						return [n.Type.LOCAL, _(t.artist, e)];
					case n.Type.LOCAL_ALBUM:
						return [n.Type.LOCAL, _(t.artist, e), _(t.album, e)];
					case n.Type.LOCAL:
						return [n.Type.LOCAL, _(t.artist, e), _(t.album, e), _(t.track, e), t.duration];
					case n.Type.LIBRARY:
						return [n.Type.USER, _(t.username, e), n.Type.LIBRARY].concat(t.category ? [t.category] : []);
					case n.Type.IMAGE:
						return [n.Type.IMAGE, t._base62Id];
					case n.Type.MOSAIC:
						return (r = t.ids.slice(0)), r.unshift(n.Type.MOSAIC), r;
					case n.Type.RADIO:
						return [n.Type.RADIO, t.args];
					case n.Type.SPECIAL:
						r = [n.Type.SPECIAL];
						var u = t.args || [];
						for (o = 0, a = u.length; o < a; ++o) r.push(_(u[o], e));
						return r;
					case n.Type.STATION:
						r = [n.Type.STATION];
						var u = t.args || [];
						for (o = 0, a = u.length; o < a; o++) r.push(_(u[o], e));
						return r;
					case n.Type.APPLICATION:
						r = [n.Type.APP, t._base62Id];
						var u = t.args || [];
						for (o = 0, a = u.length; o < a; ++o) r.push(_(u[o], e));
						return r;
					case n.Type.COLLECTION_ALBUM:
						return [n.Type.USER, _(t.username, e), n.Type.COLLECTION, n.Type.ALBUM, i];
					case n.Type.COLLECTION_MISSING_ALBUM:
						return [n.Type.USER, _(t.username, e), n.Type.COLLECTION, n.Type.ALBUM, i, "missing"];
					case n.Type.COLLECTION_ARTIST:
						return [n.Type.USER, _(t.username, e), n.Type.COLLECTION, n.Type.ARTIST, i];
					case n.Type.COLLECTION:
						return [n.Type.USER, _(t.username, e), n.Type.COLLECTION].concat(
							t.category ? [t.category] : []
						);
					case n.Type.EPISODE:
						return (
							(t.context || t.play) && (i += h({ context: t.context, play: t.play })), [n.Type.EPISODE, i]
						);
					case n.Type.SHOW:
						return [n.Type.SHOW, i];
					case n.Type.CONCERT:
						return [n.Type.CONCERT, i];
					default:
						throw s;
				}
			},
			h = function (t) {
				var e = "?";
				for (var i in t)
					t.hasOwnProperty(i) &&
						void 0 !== t[i] &&
						(e.length > 1 && (e += "&"), (e += i + "=" + encodeURIComponent(t[i])));
				return e;
			},
			d = function (t) {
				return t.split("&").reduce(function (t, e) {
					return (e = e.split("=")), (t[e[0]] = decodeURIComponent(e[1])), t;
				}, {});
			},
			l = function (t, e, i) {
				var r = 0;
				i = i || {};
				var a,
					u,
					h,
					d = function () {
						return t[r++];
					},
					l = function () {
						var t = d();
						if (t.length > 22) throw new Error("Invalid ID");
						return t;
					},
					p = function () {
						return t.slice(r);
					},
					E = function () {
						var i = e == o.URI ? ":" : "/";
						return t.slice(r).join(i);
					},
					f = d();
				switch (f) {
					case n.Type.ALBUM:
						return n.albumURI(l(), parseInt(d(), 10));
					case n.Type.AD:
						return n.adURI(d());
					case n.Type.ARTIST:
						return (a = l()), d() == n.Type.TOP ? n.artistToplistURI(a, d()) : n.artistURI(a);
					case n.Type.AUDIO_FILE:
						return n.audioFileURI(d(), d());
					case n.Type.TEMP_PLAYLIST:
						return n.temporaryPlaylistURI(d(), E());
					case n.Type.SEARCH:
						return n.searchURI(c(E(), e));
					case n.Type.TRACK:
						return n.trackURI(l(), d(), i.context, i.play);
					case n.Type.TRACKSET:
						var T = c(d()),
							y = d(),
							m = d(),
							R = parseInt(d(), 10);
						("%23" !== m || isNaN(R)) && (R = null);
						var S = [];
						if (y)
							for (y = c(y).split(","), u = 0, h = y.length; u < h; u++) {
								var g = y[u];
								S.push(n.trackURI(g));
							}
						return n.tracksetURI(S, T, R);
					case n.Type.CONTEXT_GROUP:
						return n.contextGroupURI(d(), d());
					case n.Type.TOP:
						var A = d();
						return d() == n.Type.GLOBAL ? n.toplistURI(A, null, !0) : n.toplistURI(A, d(), !1);
					case n.Type.USER:
						var v = c(d(), e),
							I = d();
						if (v == n.Type.FACEBOOK && null != I) return n.facebookURI(parseInt(I, 10));
						if (null != I)
							switch (I) {
								case n.Type.PLAYLIST:
									return n.playlistURI(v, l());
								case n.Type.FOLDER:
									return n.folderURI(v, l());
								case n.Type.COLLECTION_TRACK_LIST:
									return n.collectionTrackList(v, l());
								case n.Type.COLLECTION:
									var L = d();
									switch (L) {
										case n.Type.ALBUM:
											return (
												(a = l()),
												"missing" === d()
													? n.collectionMissingAlbumURI(v, a)
													: n.collectionAlbumURI(v, a)
											);
										case n.Type.ARTIST:
											return n.collectionArtistURI(v, l());
										default:
											return n.collectionURI(v, L);
									}
								case n.Type.STARRED:
									return n.starredURI(v);
								case n.Type.FOLLOWERS:
									return n.followersURI(v);
								case n.Type.FOLLOWING:
									return n.followingURI(v);
								case n.Type.TOP:
									return n.userToplistURI(v, d());
								case n.Type.INBOX:
									return n.inboxURI(v);
								case n.Type.ROOTLIST:
									return n.rootlistURI(v);
								case n.Type.PUBLISHED_ROOTLIST:
									return n.publishedRootlistURI(v);
								case n.Type.TOPLIST:
									return n.userTopTracksURI(v);
								case n.Type.LIBRARY:
									return n.libraryURI(v, d());
							}
						var O = p();
						return null != I && O.length > 0
							? n.profileURI(v, [I].concat(O))
							: null != I
							? n.profileURI(v, [I])
							: n.profileURI(v);
					case n.Type.LOCAL:
						var N = d(),
							C = N && c(N, e),
							P = d(),
							D = P && c(P, e),
							b = d(),
							k = b && c(b, e),
							w = d(),
							U = parseInt(w, 10);
						return void 0 !== b
							? n.localURI(C, D, k, U)
							: void 0 !== P
							? n.localAlbumURI(C, D)
							: n.localArtistURI(C);
					case n.Type.IMAGE:
						return n.imageURI(l());
					case n.Type.MOSAIC:
						return n.mosaicURI(t.slice(r));
					case n.Type.RADIO:
						return n.radioURI(E());
					case n.Type.SPECIAL:
						var M = p();
						for (u = 0, h = M.length; u < h; ++u) M[u] = c(M[u], e);
						return n.specialURI(M);
					case n.Type.STATION:
						return n.stationURI(p());
					case n.Type.EPISODE:
						return n.episodeURI(l(), i.context, i.play);
					case n.Type.SHOW:
						return n.showURI(l());
					case n.Type.CONCERT:
						return n.concertURI(l());
					case "":
						break;
					default:
						a = f === n.Type.APP ? d() : f;
						var F = c(a, e);
						if (_(F, e) !== a) break;
						var M = p();
						for (u = 0, h = M.length; u < h; ++u) M[u] = c(M[u], e);
						return n.applicationURI(F, M);
				}
				throw s;
			};
		Object.defineProperty(n.prototype, "id", {
			get: function () {
				return this._hexId || (this._hexId = this._base62Id ? n.idToHex(this._base62Id) : void 0), this._hexId;
			},
			set: function (t) {
				(this._base62Id = t ? n.hexToId(t) : void 0), (this._hexId = void 0);
			},
			enumerable: !0,
			configurable: !0,
		}),
			(n.prototype.toAppType = function () {
				if (this.type == n.Type.APPLICATION) return n.applicationURI(this.id, this.args);
				var t = u(this, o.URL),
					e = t.shift(),
					i = t.length;
				if (i) for (; i--; ) t[i] = c(t[i], o.URL);
				return this.type == n.Type.RADIO && (t = t.shift().split(":")), n.applicationURI(e, t);
			}),
			(n.prototype.toRealType = function () {
				return this.type == n.Type.APPLICATION ? l([this.id].concat(this.args), o.URI) : new n(null, this);
			}),
			(n.prototype.toURI = function () {
				return "spotify:" + u(this, o.URI).join(":");
			}),
			(n.prototype.toString = function () {
				return this.toURI();
			}),
			(n.prototype.toURLPath = function (t) {
				var e = u(this, o.URL);
				e[0] === n.Type.APP && e.shift();
				var i = e[0] === n.Type.TRACKSET,
					r = e[0] === n.Type.LOCAL;
				if (!i && !r) {
					for (var s = [], a = 0, _ = e.length; a < _; a++) {
						var c = e[a];
						c && s.push(c);
					}
					e = s;
				}
				var h = e.join("/");
				return t ? "/" + h : h;
			}),
			(n.prototype.toPlayURL = function () {
				return "https://play.spotify.com/" + this.toURLPath();
			}),
			(n.prototype.toURL = function () {
				return this.toPlayURL();
			}),
			(n.prototype.toOpenURL = function () {
				return "https://open.spotify.com/" + this.toURLPath();
			}),
			(n.prototype.toSecurePlayURL = function () {
				return this.toPlayURL();
			}),
			(n.prototype.toSecureURL = function () {
				return this.toPlayURL();
			}),
			(n.prototype.toSecureOpenURL = function () {
				return this.toOpenURL();
			}),
			(n.prototype.idToByteString = function () {
				var t = r.toBytes(this._base62Id);
				for (
					t = t
						.map(function (t) {
							return String.fromCharCode(t);
						})
						.join("");
					t.length < 16;

				)
					t = String.fromCharCode(0) + t;
				return t;
			}),
			(n.prototype.getPath = function () {
				return this.toString().replace(/[#?].*/, "");
			}),
			(n.prototype.getBase62Id = function () {
				return this._base62Id;
			}),
			(n.Type = {
				EMPTY: "empty",
				ALBUM: "album",
				AD: "ad",
				APP: "app",
				APPLICATION: "application",
				ARTIST: "artist",
				ARTIST_TOPLIST: "artist-toplist",
				AUDIO_FILE: "audiofile",
				COLLECTION: "collection",
				COLLECTION_ALBUM: "collection-album",
				COLLECTION_MISSING_ALBUM: "collection-missing-album",
				COLLECTION_ARTIST: "collection-artist",
				CONTEXT_GROUP: "context-group",
				EPISODE: "episode",
				FACEBOOK: "facebook",
				FOLDER: "folder",
				FOLLOWERS: "followers",
				FOLLOWING: "following",
				GLOBAL: "global",
				IMAGE: "image",
				INBOX: "inbox",
				LOCAL_ARTIST: "local-artist",
				LOCAL_ALBUM: "local-album",
				LOCAL: "local",
				LIBRARY: "library",
				MOSAIC: "mosaic",
				PLAYLIST: "playlist",
				PROFILE: "profile",
				PUBLISHED_ROOTLIST: "published-rootlist",
				RADIO: "radio",
				ROOTLIST: "rootlist",
				COLLECTION_TRACK_LIST: "collectiontracklist",
				SEARCH: "search",
				SHOW: "show",
				CONCERT: "concert",
				SPECIAL: "special",
				STARRED: "starred",
				STATION: "station",
				TEMP_PLAYLIST: "temp-playlist",
				TOP: "top",
				TOPLIST: "toplist",
				TRACK: "track",
				TRACKSET: "trackset",
				USER: "user",
				USER_TOPLIST: "user-toplist",
				USER_TOP_TRACKS: "user-top-tracks",
				USET_TOP_TRACKS: "user-top-tracks",
			}),
			(n.fromString = function (t) {
				var e = a(t);
				return l(e.components, e.format, e.query);
			}),
			(n.from = function (t) {
				try {
					return t instanceof n
						? t
						: "object" == typeof t && t.type
						? new n(null, t)
						: n.fromString(t.toString());
				} catch (t) {
					return null;
				}
			}),
			(n.fromByteString = function (t, e, i) {
				for (var s = [], o = 0; o < e.length; o++) s.push(e.charCodeAt(o));
				var a = r.fromBytes(s, 22),
					_ = i || {};
				return (_.id = a), new n(t, _);
			}),
			(n.clone = function (t) {
				return t instanceof n ? new n(null, t) : null;
			}),
			(n.getCanonical = function (t) {
				return this.getCanonical(t);
			}),
			(n.getCanonicalUsername = function (t) {
				return _(t, o.URI);
			}),
			(n.getDisplayUsername = function (t) {
				return c(t, o.URI);
			}),
			(n.idToHex = function (t) {
				return 22 == t.length ? r.toHex(t, 32) : t;
			}),
			(n.hexToId = function (t) {
				return 32 == t.length ? r.fromHex(t, 22) : t;
			}),
			(n.emptyURI = function () {
				return new n(n.Type.EMPTY, {});
			}),
			(n.albumURI = function (t, e) {
				return new n(n.Type.ALBUM, { id: t, disc: e });
			}),
			(n.adURI = function (t) {
				return new n(n.Type.AD, { id: t });
			}),
			(n.audioFileURI = function (t, e) {
				return new n(n.Type.AUDIO_FILE, { id: e, extension: t });
			}),
			(n.artistURI = function (t) {
				return new n(n.Type.ARTIST, { id: t });
			}),
			(n.artistToplistURI = function (t, e) {
				return new n(n.Type.ARTIST_TOPLIST, { id: t, toplist: e });
			}),
			(n.searchURI = function (t) {
				return new n(n.Type.SEARCH, { query: t });
			}),
			(n.trackURI = function (t, e, i, r) {
				return new n(n.Type.TRACK, { id: t, anchor: e, context: i ? n.fromString(i) : i, play: r });
			}),
			(n.tracksetURI = function (t, e, i) {
				return new n(n.Type.TRACKSET, { tracks: t, name: e || "", index: isNaN(i) ? null : i });
			}),
			(n.facebookURI = function (t) {
				return new n(n.Type.FACEBOOK, { uid: t });
			}),
			(n.followersURI = function (t) {
				return new n(n.Type.FOLLOWERS, { username: t });
			}),
			(n.followingURI = function (t) {
				return new n(n.Type.FOLLOWING, { username: t });
			}),
			(n.playlistURI = function (t, e) {
				return new n(n.Type.PLAYLIST, { username: t, id: e });
			}),
			(n.folderURI = function (t, e) {
				return new n(n.Type.FOLDER, { username: t, id: e });
			}),
			(n.collectionTrackList = function (t, e) {
				return new n(n.Type.COLLECTION_TRACK_LIST, { username: t, id: e });
			}),
			(n.starredURI = function (t) {
				return new n(n.Type.STARRED, { username: t });
			}),
			(n.userToplistURI = function (t, e) {
				return new n(n.Type.USER_TOPLIST, { username: t, toplist: e });
			}),
			(n.userTopTracksURI = function (t) {
				return new n(n.Type.USER_TOP_TRACKS, { username: t });
			}),
			(n.toplistURI = function (t, e, i) {
				return new n(n.Type.TOPLIST, { toplist: t, country: e, global: !!i });
			}),
			(n.inboxURI = function (t) {
				return new n(n.Type.INBOX, { username: t });
			}),
			(n.rootlistURI = function (t) {
				return new n(n.Type.ROOTLIST, { username: t });
			}),
			(n.publishedRootlistURI = function (t) {
				return new n(n.Type.PUBLISHED_ROOTLIST, { username: t });
			}),
			(n.localArtistURI = function (t) {
				return new n(n.Type.LOCAL_ARTIST, { artist: t });
			}),
			(n.localAlbumURI = function (t, e) {
				return new n(n.Type.LOCAL_ALBUM, { artist: t, album: e });
			}),
			(n.localURI = function (t, e, i, r) {
				return new n(n.Type.LOCAL, { artist: t, album: e, track: i, duration: r });
			}),
			(n.libraryURI = function (t, e) {
				return new n(n.Type.LIBRARY, { username: t, category: e });
			}),
			(n.collectionURI = function (t, e) {
				return new n(n.Type.COLLECTION, { username: t, category: e });
			}),
			(n.temporaryPlaylistURI = function (t, e) {
				return new n(n.Type.TEMP_PLAYLIST, { origin: t, data: e });
			}),
			(n.contextGroupURI = function (t, e) {
				return new n(n.Type.CONTEXT_GROUP, { origin: t, name: e });
			}),
			(n.profileURI = function (t, e) {
				return new n(n.Type.PROFILE, { username: t, args: e });
			}),
			(n.imageURI = function (t) {
				return new n(n.Type.IMAGE, { id: t });
			}),
			(n.mosaicURI = function (t) {
				return new n(n.Type.MOSAIC, { ids: t });
			}),
			(n.radioURI = function (t) {
				return (t = void 0 === t ? "" : t), new n(n.Type.RADIO, { args: t });
			}),
			(n.specialURI = function (t) {
				return (t = void 0 === t ? [] : t), new n(n.Type.SPECIAL, { args: t });
			}),
			(n.stationURI = function (t) {
				return (t = void 0 === t ? [] : t), new n(n.Type.STATION, { args: t });
			}),
			(n.applicationURI = function (t, e) {
				return (e = void 0 === e ? [] : e), new n(n.Type.APPLICATION, { id: t, args: e });
			}),
			(n.collectionAlbumURI = function (t, e) {
				return new n(n.Type.COLLECTION_ALBUM, { username: t, id: e });
			}),
			(n.collectionMissingAlbumURI = function (t, e) {
				return new n(n.Type.COLLECTION_MISSING_ALBUM, { username: t, id: e });
			}),
			(n.collectionArtistURI = function (t, e) {
				return new n(n.Type.COLLECTION_ARTIST, { username: t, id: e });
			}),
			(n.episodeURI = function (t, e, i) {
				return new n(n.Type.EPISODE, { id: t, context: e ? n.fromString(e) : e, play: i });
			}),
			(n.showURI = function (t) {
				return new n(n.Type.SHOW, { id: t });
			}),
			(n.concertURI = function (t) {
				return new n(n.Type.CONCERT, { id: t });
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		i(41).polyfill();
		var n = i(42);
		window.addEventListener("load", function () {
			if (window.parent === window) throw new Error("Embedded player needs to be in an iframe");
			new n(window, window.parent).listen();
		});
	},
	function (t, e, i) {
		(function (e, i) {
			/*!
			 * @overview es6-promise - a tiny implementation of Promises/A+.
			 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
			 * @license   Licensed under MIT license
			 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
			 * @version   v4.2.6+9869a4bc
			 */
			!(function (e, i) {
				t.exports = i();
			})(0, function () {
				"use strict";
				function t(t) {
					var e = typeof t;
					return null !== t && ("object" === e || "function" === e);
				}
				function n(t) {
					return "function" == typeof t;
				}
				function r(t) {
					K = t;
				}
				function s(t) {
					G = t;
				}
				function o() {
					return void 0 !== B
						? function () {
								B(_);
						  }
						: a();
				}
				function a() {
					var t = setTimeout;
					return function () {
						return t(_, 1);
					};
				}
				function _() {
					for (var t = 0; t < Y; t += 2) {
						(0, Q[t])(Q[t + 1]), (Q[t] = void 0), (Q[t + 1] = void 0);
					}
					Y = 0;
				}
				function c(t, e) {
					var i = this,
						n = new this.constructor(h);
					void 0 === n[z] && C(n);
					var r = i._state;
					if (r) {
						var s = arguments[r - 1];
						G(function () {
							return L(r, n, s, i._result);
						});
					} else A(i, n, t, e);
					return n;
				}
				function u(t) {
					var e = this;
					if (t && "object" == typeof t && t.constructor === e) return t;
					var i = new e(h);
					return m(i, t), i;
				}
				function h() {}
				function d() {
					return new TypeError("You cannot resolve a promise with itself");
				}
				function l() {
					return new TypeError("A promises callback cannot return that same promise.");
				}
				function p(t) {
					try {
						return t.then;
					} catch (t) {
						return (tt.error = t), tt;
					}
				}
				function E(t, e, i, n) {
					try {
						t.call(e, i, n);
					} catch (t) {
						return t;
					}
				}
				function f(t, e, i) {
					G(function (t) {
						var n = !1,
							r = E(
								i,
								e,
								function (i) {
									n || ((n = !0), e !== i ? m(t, i) : S(t, i));
								},
								function (e) {
									n || ((n = !0), g(t, e));
								},
								"Settle: " + (t._label || " unknown promise")
							);
						!n && r && ((n = !0), g(t, r));
					}, t);
				}
				function T(t, e) {
					e._state === Z
						? S(t, e._result)
						: e._state === $
						? g(t, e._result)
						: A(
								e,
								void 0,
								function (e) {
									return m(t, e);
								},
								function (e) {
									return g(t, e);
								}
						  );
				}
				function y(t, e, i) {
					e.constructor === t.constructor && i === c && e.constructor.resolve === u
						? T(t, e)
						: i === tt
						? (g(t, tt.error), (tt.error = null))
						: void 0 === i
						? S(t, e)
						: n(i)
						? f(t, e, i)
						: S(t, e);
				}
				function m(e, i) {
					e === i ? g(e, d()) : t(i) ? y(e, i, p(i)) : S(e, i);
				}
				function R(t) {
					t._onerror && t._onerror(t._result), v(t);
				}
				function S(t, e) {
					t._state === X && ((t._result = e), (t._state = Z), 0 !== t._subscribers.length && G(v, t));
				}
				function g(t, e) {
					t._state === X && ((t._state = $), (t._result = e), G(R, t));
				}
				function A(t, e, i, n) {
					var r = t._subscribers,
						s = r.length;
					(t._onerror = null), (r[s] = e), (r[s + Z] = i), (r[s + $] = n), 0 === s && t._state && G(v, t);
				}
				function v(t) {
					var e = t._subscribers,
						i = t._state;
					if (0 !== e.length) {
						for (var n = void 0, r = void 0, s = t._result, o = 0; o < e.length; o += 3)
							(n = e[o]), (r = e[o + i]), n ? L(i, n, r, s) : r(s);
						t._subscribers.length = 0;
					}
				}
				function I(t, e) {
					try {
						return t(e);
					} catch (t) {
						return (tt.error = t), tt;
					}
				}
				function L(t, e, i, r) {
					var s = n(i),
						o = void 0,
						a = void 0,
						_ = void 0,
						c = void 0;
					if (s) {
						if (((o = I(i, r)), o === tt ? ((c = !0), (a = o.error), (o.error = null)) : (_ = !0), e === o))
							return void g(e, l());
					} else (o = r), (_ = !0);
					e._state !== X || (s && _ ? m(e, o) : c ? g(e, a) : t === Z ? S(e, o) : t === $ && g(e, o));
				}
				function O(t, e) {
					try {
						e(
							function (e) {
								m(t, e);
							},
							function (e) {
								g(t, e);
							}
						);
					} catch (e) {
						g(t, e);
					}
				}
				function N() {
					return et++;
				}
				function C(t) {
					(t[z] = et++), (t._state = void 0), (t._result = void 0), (t._subscribers = []);
				}
				function P() {
					return new Error("Array Methods must be provided an Array");
				}
				function D(t) {
					return new it(this, t).promise;
				}
				function b(t) {
					var e = this;
					return new e(
						x(t)
							? function (i, n) {
									for (var r = t.length, s = 0; s < r; s++) e.resolve(t[s]).then(i, n);
							  }
							: function (t, e) {
									return e(new TypeError("You must pass an array to race."));
							  }
					);
				}
				function k(t) {
					var e = this,
						i = new e(h);
					return g(i, t), i;
				}
				function w() {
					throw new TypeError(
						"You must pass a resolver function as the first argument to the promise constructor"
					);
				}
				function U() {
					throw new TypeError(
						"Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
					);
				}
				function M() {
					var t = void 0;
					if (void 0 !== i) t = i;
					else if ("undefined" != typeof self) t = self;
					else
						try {
							t = Function("return this")();
						} catch (t) {
							throw new Error("polyfill failed because global object is unavailable in this environment");
						}
					var e = t.Promise;
					if (e) {
						var n = null;
						try {
							n = Object.prototype.toString.call(e.resolve());
						} catch (t) {}
						if ("[object Promise]" === n && !e.cast) return;
					}
					t.Promise = nt;
				}
				var F = void 0;
				F = Array.isArray
					? Array.isArray
					: function (t) {
							return "[object Array]" === Object.prototype.toString.call(t);
					  };
				var x = F,
					Y = 0,
					B = void 0,
					K = void 0,
					G = function (t, e) {
						(Q[Y] = t), (Q[Y + 1] = e), 2 === (Y += 2) && (K ? K(_) : J());
					},
					V = "undefined" != typeof window ? window : void 0,
					H = V || {},
					q = H.MutationObserver || H.WebKitMutationObserver,
					j = "undefined" == typeof self && void 0 !== e && "[object process]" === {}.toString.call(e),
					W =
						"undefined" != typeof Uint8ClampedArray &&
						"undefined" != typeof importScripts &&
						"undefined" != typeof MessageChannel,
					Q = new Array(1e3),
					J = void 0;
				J = j
					? (function () {
							return function () {
								return e.nextTick(_);
							};
					  })()
					: q
					? (function () {
							var t = 0,
								e = new q(_),
								i = document.createTextNode("");
							return (
								e.observe(i, { characterData: !0 }),
								function () {
									i.data = t = ++t % 2;
								}
							);
					  })()
					: W
					? (function () {
							var t = new MessageChannel();
							return (
								(t.port1.onmessage = _),
								function () {
									return t.port2.postMessage(0);
								}
							);
					  })()
					: void 0 === V
					? (function () {
							try {
								var t = Function("return this")().require("vertx");
								return (B = t.runOnLoop || t.runOnContext), o();
							} catch (t) {
								return a();
							}
					  })()
					: a();
				var z = Math.random().toString(36).substring(2),
					X = void 0,
					Z = 1,
					$ = 2,
					tt = { error: null },
					et = 0,
					it = (function () {
						function t(t, e) {
							(this._instanceConstructor = t),
								(this.promise = new t(h)),
								this.promise[z] || C(this.promise),
								x(e)
									? ((this.length = e.length),
									  (this._remaining = e.length),
									  (this._result = new Array(this.length)),
									  0 === this.length
											? S(this.promise, this._result)
											: ((this.length = this.length || 0),
											  this._enumerate(e),
											  0 === this._remaining && S(this.promise, this._result)))
									: g(this.promise, P());
						}
						return (
							(t.prototype._enumerate = function (t) {
								for (var e = 0; this._state === X && e < t.length; e++) this._eachEntry(t[e], e);
							}),
							(t.prototype._eachEntry = function (t, e) {
								var i = this._instanceConstructor,
									n = i.resolve;
								if (n === u) {
									var r = p(t);
									if (r === c && t._state !== X) this._settledAt(t._state, e, t._result);
									else if ("function" != typeof r) this._remaining--, (this._result[e] = t);
									else if (i === nt) {
										var s = new i(h);
										y(s, t, r), this._willSettleAt(s, e);
									} else
										this._willSettleAt(
											new i(function (e) {
												return e(t);
											}),
											e
										);
								} else this._willSettleAt(n(t), e);
							}),
							(t.prototype._settledAt = function (t, e, i) {
								var n = this.promise;
								n._state === X && (this._remaining--, t === $ ? g(n, i) : (this._result[e] = i)),
									0 === this._remaining && S(n, this._result);
							}),
							(t.prototype._willSettleAt = function (t, e) {
								var i = this;
								A(
									t,
									void 0,
									function (t) {
										return i._settledAt(Z, e, t);
									},
									function (t) {
										return i._settledAt($, e, t);
									}
								);
							}),
							t
						);
					})(),
					nt = (function () {
						function t(e) {
							(this[z] = N()),
								(this._result = this._state = void 0),
								(this._subscribers = []),
								h !== e && ("function" != typeof e && w(), this instanceof t ? O(this, e) : U());
						}
						return (
							(t.prototype.catch = function (t) {
								return this.then(null, t);
							}),
							(t.prototype.finally = function (t) {
								var e = this,
									i = e.constructor;
								return n(t)
									? e.then(
											function (e) {
												return i.resolve(t()).then(function () {
													return e;
												});
											},
											function (e) {
												return i.resolve(t()).then(function () {
													throw e;
												});
											}
									  )
									: e.then(t, t);
							}),
							t
						);
					})();
				return (
					(nt.prototype.then = c),
					(nt.all = D),
					(nt.race = b),
					(nt.resolve = u),
					(nt.reject = k),
					(nt._setScheduler = r),
					(nt._setAsap = s),
					(nt._asap = G),
					(nt.polyfill = M),
					(nt.Promise = nt),
					nt
				);
			});
		}.call(e, i(12), i(1)));
	},
	function (t, e, i) {
		"use strict";
		var n = i(43),
			r = i(21),
			s = i(44),
			o = i(79),
			a = i(27),
			_ = i(11),
			c = i(13),
			u = i(0),
			h = function (t, e) {
				(this._currentWindow = t),
					(this._loaderWindow = e),
					(this._client = null),
					(this._streamer = null),
					(this._getTokenRequests = {}),
					(this._msgDispatcher = new n()),
					(this._messageHandlers = {}),
					(this._lastState = null),
					this._setupMessageHandlers();
			};
		(h.prototype.listen = function () {
			this._msgDispatcher.listen(this._currentWindow, this._handleMessages.bind(this)),
				this._currentWindow.addEventListener(
					"beforeunload",
					function () {
						this._client && this._client.disconnect();
					}.bind(this)
				),
				this._sendMessage(r.embeddedLoaded());
		}),
			(h.prototype._setupMessageHandlers = function () {
				(this._messageHandlers[r.INIT] = this._onInit.bind(this)),
					(this._messageHandlers[r.CONNECT] = this._onConnect.bind(this)),
					(this._messageHandlers[r.DISCONNECT] = this._onDisconnect.bind(this)),
					(this._messageHandlers[r.TOKEN] = this._onToken.bind(this)),
					(this._messageHandlers[r.GET_CURRENT_STATE] = this._onGetCurrentState.bind(this)),
					(this._messageHandlers[r.GET_VOLUME] = this._onGetVolume.bind(this)),
					(this._messageHandlers[r.SET_VOLUME] = this._onSetVolume.bind(this)),
					(this._messageHandlers[r.SET_NAME] = this._onSetName.bind(this)),
					(this._messageHandlers[r.PAUSE] = this._onPause.bind(this)),
					(this._messageHandlers[r.RESUME] = this._onResume.bind(this)),
					(this._messageHandlers[r.TOGGLE_PLAY] = this._onTogglePlay.bind(this)),
					(this._messageHandlers[r.SEEK] = this._onSeek.bind(this)),
					(this._messageHandlers[r.PREV_TRACK] = this._onPrevTrack.bind(this)),
					(this._messageHandlers[r.NEXT_TRACK] = this._onNextTrack.bind(this));
			}),
			(h.prototype._onConnect = function (t, e) {
				this._client.connect().then(
					function (t) {
						this._sendMessage(r.connected(t, e));
					}.bind(this)
				);
			}),
			(h.prototype._onInit = function (t) {
				(this._client = s.create({
					getToken: this._getToken.bind(this),
					endpoints: { webgate: "https://api.spotify.com/v1" },
					descriptor: { id: t.id, name: t.name, brand: "public_js-sdk" },
				})),
					(this._streamer = o.forClient(this._client)),
					"volume" in t &&
						this._streamer.once(
							"registered",
							function () {
								this._streamer.setVolume(t.volume);
							}.bind(this)
						),
					this._streamer.addListeners({
						registered: this._onLocalPlayerEnabled.bind(this),
						state_changed: this._onStateChanged.bind(this),
						player_initialization_failed: this._onPlayerInitError.bind(this),
					}),
					this._streamer.on(_.STREAMER_REGISTRATION_ERROR, this._onRegistrationError.bind(this)),
					this._client.addListeners({
						authentication_error: this._onAuthError.bind(this),
						error: this._onClientError.bind(this),
						product_state_changed: this._onProductStateChanged.bind(this),
					});
				var e = new a();
				e.on("online", this._onLocalPlayerEnabled.bind(this)),
					e.on("offline", this._onLocalPlayerDisabled.bind(this));
			}),
			(h.prototype._onToken = function (t) {
				this._getTokenRequests[t.ref].resolve(t.token);
			}),
			(h.prototype._onGetCurrentState = function (t, e) {
				this._streamer.getCurrentState().then(
					function (t) {
						this._sendMessage(r.currentState(t, e));
					}.bind(this)
				);
			}),
			(h.prototype._onProductStateChanged = function () {
				this._client.getProductState().then(
					function (t) {
						"1" === t.ads &&
							(this._sendMessage(
								r.accountError("This functionality is restricted to premium users only")
							),
							this._client.disconnect());
					}.bind(this)
				);
			}),
			(h.prototype._onGetVolume = function (t, e) {
				this._streamer.getVolume().then(
					function (t) {
						this._sendMessage(r.volume(t, e));
					}.bind(this)
				);
			}),
			(h.prototype._onSetName = function (t) {
				this._client.setName(t);
			}),
			(h.prototype._onSetVolume = function (t) {
				this._streamer.setVolume(t);
			}),
			(h.prototype._onDisconnect = function () {
				this._client.disconnect();
			}),
			(h.prototype._onLocalPlayerEnabled = function () {
				this._client.getClientDescriptor().then(
					function (t) {
						this._sendMessage(r.playerReady({ device_id: t.id }));
					}.bind(this)
				);
			}),
			(h.prototype._onLocalPlayerDisabled = function () {
				this._client.getClientDescriptor().then(
					function (t) {
						this._sendMessage(r.playerNotReady({ device_id: t.id }));
					}.bind(this)
				);
			}),
			(h.prototype._onStateChanged = function (t) {
				this._checkStateChange(t && t.state) &&
					(this._sendMessage(r.playerStateChanged(t.state)), (this._lastState = t.state));
			}),
			(h.prototype._checkStateChange = (function () {
				var t = function (e, i) {
					if (e !== i && e && i && "object" == typeof e && "object" == typeof i) {
						var n = Object.keys(e),
							r = Object.keys(i);
						return (
							n.length === r.length &&
							n.every(function (n) {
								return "timestamp" === n || t(e[n], i[n]);
							})
						);
					}
					return e === i;
				};
				return function (e) {
					return !t(this._lastState, e);
				};
			})()),
			(h.prototype._getToken = function (t) {
				var e = this._sendMessage(r.getToken());
				(this._getTokenRequests[e] = u.defer()),
					this._getTokenRequests[e].promise.then(this._verifyToken.bind(this)).then(t);
			}),
			(h.prototype._verifyToken = function (t) {
				return this._client
					? this._client
							.request("@webgate/melody/v1/check_scope?scope=web-playback", {
								authorize: !1,
								headers: { Authorization: "Bearer " + t },
							})
							.then(
								function (e) {
									return (
										403 === e.status &&
											this._sendMessage(r.authError({ message: "Invalid token scopes." })),
										t
									);
								}.bind(this)
							)
							.catch(function () {
								return t;
							})
					: u.resolve(t);
			}),
			(h.prototype._handleMessages = function (t, e, i) {
				t in this._messageHandlers && this._messageHandlers[t](e, i);
			}),
			(h.prototype._onAuthError = function () {
				this._sendMessage(r.authError({ message: "Authentication failed" }));
			}),
			(h.prototype._playbackControl = function (t, e) {
				this._streamer[t](e).catch(
					function (t) {
						this._sendMessage(r.playbackError({ message: t.message }));
					}.bind(this)
				);
			}),
			(h.prototype._onPause = function () {
				return this._playbackControl("pause");
			}),
			(h.prototype._onResume = function () {
				return this._playbackControl("resume");
			}),
			(h.prototype._onTogglePlay = function () {
				return this._playbackControl("togglePlay");
			}),
			(h.prototype._onSeek = function (t) {
				return this._playbackControl("seek", t);
			}),
			(h.prototype._onPrevTrack = function (t) {
				return this._playbackControl("previousTrack", t);
			}),
			(h.prototype._onNextTrack = function (t) {
				return this._playbackControl("nextTrack", t);
			}),
			(h.prototype._onPlayerInitError = function () {
				this._sendMessage(r.playerInitError({ message: "Failed to initialize player" }));
			}),
			(h.prototype._onRegistrationError = function (t) {
				var e = t.error;
				e &&
					e.code === c.TP_REGISTRATION_FAILED_NON_PREMIUM &&
					this._sendMessage(r.accountError("This functionality is restricted to premium users only"));
			}),
			(h.prototype._onClientError = function (t) {
				("listplayer" !== t.source && "playback" !== t.source) ||
					this._sendMessage(r.playbackError({ message: "Playback error" }));
			}),
			(h.prototype._sendMessage = function (t) {
				return this._msgDispatcher.send(this._loaderWindow, t);
			}),
			(t.exports = h);
	},
	function (t, e, i) {
		"use strict";
		var n = i(21),
			r = function () {
				(this._onMessageCallback = function () {}),
					(this._receiveMessage = this._receiveMessage.bind(this)),
					(this._messageId = 0);
			};
		(r.prototype.listen = function (t, e) {
			(this._onMessageCallback = e), t.addEventListener("message", this._receiveMessage);
		}),
			(r.prototype.stopListening = function (t) {
				t.removeEventListener("message", this._receiveMessage);
			}),
			(r.prototype.send = function (t, e, i) {
				return t.postMessage(this._addMessageId(e), i || "*"), e.seq;
			}),
			(r.prototype._addMessageId = function (t) {
				return (t.seq = this._messageId++), t;
			}),
			(r.prototype._receiveMessage = function (t) {
				var e = t.data;
				e.type === n.SPOTIFY_MESSAGE &&
					e.body &&
					e.body.topic &&
					this._onMessageCallback(e.body.topic, e.body.data, e.seq);
			}),
			(t.exports = r);
	},
	function (t, e, i) {
		"use strict";
		var n = i(0),
			r = i(45),
			s = i(48),
			o = i(63),
			a = /^[a-zA-Z0-9_%:-]{1,40}$/;
		t.exports = {
			create: function (t) {
				if (!t) throw new TypeError("Argument `options` is not defined.");
				if (t.descriptor && t.descriptor.id && !a.test(t.descriptor.id))
					throw new TypeError("Invalid device id.");
				var e,
					i,
					_ = {};
				if (t.transport) (e = t.transport), (i = !!t.allowLifecycleManagement);
				else {
					if ("function" != typeof t.getToken)
						throw new TypeError("Argument options.getToken must be a function");
					var c = r(t.xresolve);
					(e = s({
						ownerRef: _,
						providers: {
							endpoints: function (e) {
								return c(e).then(function (e) {
									var i = t.endpoints;
									if (i) for (var n in i) i.hasOwnProperty(n) && i[n] && (e[n] = i[n]);
									return e;
								});
							},
							token: function () {
								return new n(function (e) {
									t.getToken(function (t, i) {
										if (void 0 !== i) return void e([t, i]);
										e(t);
									});
								});
							},
						},
						requestMode: t.requestMode || "fetch",
						reconnectionRetries: t.reconnectionRetries,
						forcePolyfillTypes: t.forcePolyfillTypes,
					})),
						(i = !0);
				}
				return o.create({
					transport: e,
					ownerRef: _,
					allowLifecycleManagement: i,
					descriptor: t.descriptor,
					playTokenLostBehavior: t.playTokenLostBehavior,
					hidden: t.hidden,
				});
			},
		};
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			var e = t || {},
				i = { dealer: a.DEALER, webgate: a.WEBGATE };
			e.dealer && (i.dealer = e.dealer), e.webgate && (i.webgate = e.webgate);
			var n = ["?", "type=", i.dealer, "&", "type=", i.webgate].join("");
			return function (t) {
				return (t || s)
					.request(o + n, {
						forcePolyfill: !0,
						responseType: "json",
						retry: {
							maxRetries: 5,
							condition: function (t, e) {
								return t.getStatusFamily() !== e.SUCCESS;
							},
						},
					})
					.then(function (t) {
						if (200 !== t.status) return r.reject(new Error("X-Resolve responded with status" + t.status));
						var e = t.body;
						if (!e) return r.reject(new Error("X-Resolve responded with empty/invalid body."));
						var n = {
							dealer: e[i.dealer] && e[i.dealer][0],
							webgate: e[i.webgate] && e[i.webgate][0],
							webapi: _,
						};
						return n.dealer && n.webgate
							? n
							: r.reject(new Error("X-Resolve responded with incomplete results."));
					})
					.then(function (t) {
						return (
							(t.dealer = "wss://" + t.dealer.replace(/:443$/, "")),
							(t.webgate = "https://" + t.webgate.replace(/:443$/, "")),
							t
						);
					});
			};
		}
		var r = i(0),
			s = i(22),
			o = "https://apresolve.spotify.com/",
			a = { DEALER: "dealer", WEBGATE: "spclient" },
			_ = "https://api.spotify.com/";
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			(this._headers = {}), this._init(t);
		}
		(n.prototype._init = function (t) {
			if (t)
				for (var e = t.split("\r\n"), i = 0; i < e.length; i++) {
					var n = e[i],
						r = n.indexOf(": ");
					if (r > 0) {
						var s = n.substring(0, r).toLowerCase(),
							o = n.substring(r + 2);
						this._headers[s] = o;
					}
				}
		}),
			(n.prototype.get = function (t) {
				return this._headers[t.toLowerCase()] || null;
			}),
			(n.prototype.has = function (t) {
				return this._headers.hasOwnProperty(t.toLowerCase());
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e, i) {
			Error.call(this), (this.message = e), (this.code = t), (this.status = i || 0);
		}
		(n.prototype = new Error()),
			(n.prototype.constructor = n),
			(n.prototype.name = "RequestError"),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			if (!t) throw new TypeError("Argument `options` is required.");
			if (!t.providers) throw new TypeError("Argument `options` is required.");
			return r({
				ownerRef: t.ownerRef,
				providers: t.providers,
				requestMode: t.requestMode,
				reconnectionRetries: t.reconnectionRetries,
				forcePolyfillTypes: t.forcePolyfillTypes,
			});
		}
		var r = i(49);
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		var n = i(50),
			r = i(22),
			s = i(61);
		t.exports = function (t) {
			return (t.HTTP = r), (t.Fetch = s), n.create(t);
		};
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t) {
				if (!t) throw new TypeError("Argument `config` for Transport cannot be null.");
				if (!t.providers) throw new TypeError("Argument `config.providers` for Transport cannot be null.");
				_.call(this),
					(this._ownerRef = "ownerRef" in t ? Object(t.ownerRef) : {}),
					(this._tokenProvider = t.providers.token),
					(this._endpointsProvider = t.providers.endpoints),
					(this._HTTP = t.HTTP),
					(this._Fetch = t.Fetch),
					(this._reconnectionRetries = t.reconnectionRetries >= 0 ? t.reconnectionRetries : 3),
					(this._requestMode = t.requestMode in A ? t.requestMode : "xhr"),
					(this._forcePolyfillTypes = t.forcePolyfillTypes || {}),
					(this._disableAutoLogout = "disableAutoLogout" in t && t.disableAutoLogout),
					(this._activated = !1),
					(this._dealer = null),
					(this._connectionObserver = null),
					(this._endpoints = null),
					(this._lastToken = null),
					(this._lastTokenExpiry = 0),
					(this._refreshTokenPromise = null),
					(this._authenticationPromise = !1),
					(this._reconnectTimeout = null),
					(this._isReconnecting = !1),
					(this._initTime = 0),
					(this._lastDisconnect = 0),
					(this._stateMask = 0),
					(this._quickDisconnectCount = 0),
					(this._disconnectBeforeUnload = t.disconnectBeforeUnload || !1),
					(this._counter = new a(t.backoffStrategy || { algo: "exp", baseTime: 5e3 })),
					(this._stateAwareListeners = { connected: [], authenticated: [], connection_id: [] }),
					(this._stateAwareRunners = { connected: null, authenticated: null, connection_id: null }),
					(this._onAuthenticated = this._onAuthenticated.bind(this)),
					(this._onAuthenticationFailed = this._onAuthenticationFailed.bind(this)),
					(this._parseProvidedToken = this._parseProvidedToken.bind(this)),
					this._init();
			}
			var r = i(2),
				s = i(51),
				o = i(52),
				a = i(24),
				_ = i(3),
				c = i(0),
				u = i(57),
				h = i(58),
				d = i(27),
				l = i(15),
				p = i(8),
				E = i(25),
				f = i(10),
				T = i(26),
				y = i(5).forTag("transport.transport"),
				m = /^(?:https?:\/\/)?@([^\/]+)\//,
				R = /^(ws|http)s?:\/\/.*[^\/]$/,
				S = /^([a-zA-Z]{3},\ \d{1,2}\ [a-zA-Z]{3}\ (\d{1,2}.){3})/,
				g = { CONNECTED: 1, AUTHENTICATED: 4 },
				A = { fetch: !0, xhr: !0 };
			r(n, _),
				(n.create = function (t) {
					return new n(t);
				}),
				(n.prototype._init = function () {
					this.onAddListener(f.TRANSPORT_CONNECTED, this._onAddListener.bind(this, "connected")),
						this.onAddListener(f.TRANSPORT_AUTHENTICATED, this._onAddListener.bind(this, "authenticated")),
						this.onAddListener(f.TRANSPORT_CONNECTION_ID, this._onAddListener.bind(this, "connection_id")),
						this.onRemoveListener(f.TRANSPORT_CONNECTED, this._onRemoveListener.bind(this, "connected")),
						this.onRemoveListener(
							f.TRANSPORT_AUTHENTICATED,
							this._onRemoveListener.bind(this, "authenticated")
						),
						this.onRemoveListener(
							f.TRANSPORT_CONNECTION_ID,
							this._onRemoveListener.bind(this, "connection_id")
						),
						"fetch" !== this._requestMode ||
							this._Fetch.isSupported() ||
							(y.warn('Default "fetch" request mode unavailable; Fallback to "xhr"'),
							(this._requestMode = "xhr"));
					var t = new h();
					(this._dealer = t),
						t.on(f.DEALER_DISCONNECTED, this._onDealerDisconnected.bind(this)),
						this._disableAutoLogout || this.matchMessages("client:logout", this._onLogout.bind(this)),
						this.proxyEmit(t, f.DEALER_CONNECTION_ID, f.TRANSPORT_CONNECTION_ID),
						this.proxyEmitSync(t, f.DEALER_MESSAGE, f.INTERNAL_DEALER_MESSAGE),
						this.proxyEmitSync(t, f.DEALER_REQUEST, f.INTERNAL_DEALER_REQUEST),
						(this._connectionObserver = new d({ notifyBeforeUnload: this._disconnectBeforeUnload })),
						this._connectionObserver.on(f.CONNECTION_ONLINE, this._onOnline.bind(this)),
						this._connectionObserver.on(f.CONNECTION_OFFLINE, this._onOffline.bind(this)),
						this._connectionObserver.on(f.WINDOW_BEFORE_UNLOAD, this.disconnect.bind(this));
				}),
				(n.prototype._onAddListener = function (t, e) {
					if (!e.options.ignoreCurrentState) {
						var i = null;
						switch (t) {
							case "connected":
								if (!this.isConnected()) return;
								i = c.resolve(_.createEvent(f.TRANSPORT_CONNECTED));
								break;
							case "authenticated":
								if (!this.isAuthenticated()) return;
								i = c.resolve(_.createEvent(f.TRANSPORT_AUTHENTICATED));
								break;
							case "connection_id":
								if (!this._dealer.hasConnectionId()) return;
								i = this._dealer.getConnectionInfo().then(function (t) {
									return _.createEvent(f.TRANSPORT_CONNECTION_ID, t);
								});
								break;
							default:
								return;
						}
						var n = e.listener;
						this._stateAwareListeners[t].push(n);
						var r = this._stateAwareRunners;
						r[t] ||
							((r[t] = i.then(this._runStateAwareQueues.bind(this, t))),
							e.options.once && e.preventDefault());
					}
				}),
				(n.prototype._onRemoveListener = function (t, e) {
					if (!e.options.ignoreCurrentState) {
						var i = e.listener,
							n = this._stateAwareListeners[t].indexOf(i);
						-1 !== n && this._stateAwareListeners[t].splice(n, 1);
					}
				}),
				(n.prototype._runStateAwareQueues = function (t, e) {
					for (var i = this._stateAwareListeners[t].splice(0), n = 0, r = i.length; n < r; n++)
						i[n].call(this, e);
					this._stateAwareRunners[t] = null;
				}),
				(n.prototype._onDealerDisconnected = function (t) {
					var e = Date.now(),
						i = e - this._lastDisconnect;
					if ((this._disconnect(!0), t.wsCode === T.CLOSE)) return void (this._quickDisconnectCount = 0);
					this._connectionObserver.isOnline() &&
						(i < 5e3
							? (this._reconnectTimeout &&
									(clearTimeout(this._reconnectTimeout),
									this._quickDisconnectCount++,
									this.emit(f.TRANSPORT_SHORT_SESSION_DISCONNECTED, {
										disconnectCount: this._quickDisconnectCount,
										sessionLength: i,
									})),
							  (this._reconnectTimeout = setTimeout(
									this._tryToReconnect.bind(this),
									this._counter.getTime(this._quickDisconnectCount)
							  )))
							: ((this._quickDisconnectCount = 0), (this._lastDisconnect = e), this._tryToReconnect()));
				}),
				(n.prototype._onLogout = function () {
					var t = function () {
						(this._lastToken = null), (this._lastTokenExpiry = 0), this.emit(f.TRANSPORT_LOGGED_OUT);
					}.bind(this);
					this.disconnect().then(t, t);
				}),
				(n.prototype._onAuthenticated = function () {
					return (
						clearTimeout(this._reconnectTimeout),
						(this._authenticationPromise = null),
						(this._stateMask |= g.AUTHENTICATED),
						(this._initTime = Date.now()),
						this.emit(f.TRANSPORT_AUTHENTICATED),
						c.resolve(!0)
					);
				}),
				(n.prototype._onAuthenticationFailed = function (t) {
					var e = t && t.error ? t.error : t;
					return (
						(this._authenticationPromise = null),
						(this._stateMask &= ~g.AUTHENTICATED),
						this.emit(f.TRANSPORT_AUTHENTICATION_FAILED, { error: e }),
						c.reject(e)
					);
				}),
				(n.prototype._onOffline = function () {
					this.emit(f.TRANSPORT_CONNECTION_OFFLINE), this._disconnect(!0);
				}),
				(n.prototype._onOnline = function () {
					this.emit(f.TRANSPORT_CONNECTION_ONLINE), this._activated && this._tryToReconnect();
				}),
				(n.prototype._tryToReconnect = function () {
					if (!this._isReconnecting) {
						this._stateMask = 0;
						var t = function () {
							return (
								(this._isReconnecting = !0),
								this.emit(f.TRANSPORT_RECONNECTING),
								this._disconnect(!0),
								this._connect()
									.then(
										function () {
											return this.authenticate();
										}.bind(this)
									)
									.then(
										function () {
											return (this._isReconnecting = !1), this.emit(f.TRANSPORT_RECONNECTED), !0;
										}.bind(this)
									)
							);
						}.bind(this);
						o.init(t, { baseTime: 1e3, maxTime: 15e3, maxRetries: this._reconnectionRetries }).catch(
							function () {
								(this._stateMask = 0), (this._isReconnecting = !1), this.emit(f.TRANSPORT_DISCONNECTED);
							}.bind(this)
						);
					}
				}),
				(n.prototype._connect = function () {
					return this._stateMask & g.CONNECTED
						? c.resolve(!1)
						: this._connectionObserver.isOnline()
						? this._performConnect()
						: new c(
								function (t, e) {
									this._connectionObserver.once(
										f.CONNECTION_ONLINE,
										function () {
											this._performConnect().then(t, e);
										}.bind(this)
									);
								}.bind(this)
						  );
				}),
				(n.prototype._performConnect = function () {
					return this._endpointsProvider(this.toPublic())
						.then(this._connectToEndpoints.bind(this))
						.catch(
							function (t) {
								var e = t && t.error ? t.error : t;
								return this.emit(f.TRANSPORT_CONNECTION_FAILED, { error: e }), c.reject(e);
							}.bind(this)
						);
				}),
				(n.prototype._connectToEndpoints = function (t) {
					var e = {};
					for (var i in t)
						if (t.hasOwnProperty(i) && t[i]) {
							var n = t[i];
							R.test(n) && (n += "/"), (e[i] = n);
						}
					(this._endpoints = e),
						this.emit(f.TRANSPORT_ENDPOINTS_RESOLVED, { endpoints: s({}, this._endpoints) });
					var r = function () {
						return (this._stateMask |= g.CONNECTED), this.emit(f.TRANSPORT_CONNECTED), c.resolve(!0);
					}.bind(this);
					return t.dealer ? this._dealer.connect(e.dealer).then(r) : r();
				}),
				(n.prototype._disconnect = function (t) {
					return (
						(this._stateMask = 0), this._dealer.disconnect(), t || this.emit(f.TRANSPORT_DISCONNECTED), !0
					);
				}),
				(n.prototype._refreshToken = function (t) {
					if (!this._refreshTokenPromise) {
						if (!t && Date.now() < this._lastTokenExpiry) return c.resolve(this._lastToken);
						var e = function () {
							this._refreshTokenPromise = null;
						}.bind(this);
						(this._refreshTokenPromise = this._tokenProvider().then(this._parseProvidedToken)),
							this._refreshTokenPromise.then(e, e);
					}
					return this._refreshTokenPromise;
				}),
				(n.prototype._parseProvidedToken = function (t) {
					var e, i;
					if ((Array.isArray(t) ? ((e = t[0]), (i = parseInt(t[1] || 3540, 10))) : ((e = t), (i = 3540)), !e))
						throw (
							((this._lastToken = null),
							(this._lastTokenExpiry = 0),
							new TypeError("Token provider returned an invalid token: " + e))
						);
					return (
						(this._lastToken = e),
						(this._lastTokenExpiry = Date.now() + 1e3 * i),
						this.emit(f.TRANSPORT_ACCESS_TOKEN, { token: e }),
						e
					);
				}),
				(n.prototype._authenticateWithToken = function (t) {
					return this._endpoints.dealer ? this._dealer.authenticate(t) : c.resolve(!0);
				}),
				(n.prototype._tryExpandSpecialURL = function (t) {
					var e = this._endpoints;
					return t.replace(m, function (t, i) {
						if (!e.hasOwnProperty(i))
							throw new TypeError("Cannot replace endpoint @" + i + "; Endpoint undefined.");
						return e[i];
					});
				}),
				(n.prototype._processRequestArgs = function (t, e) {
					return new c(
						function (i) {
							var n = t,
								r = e || {},
								o = { algo: "exp", maxRetries: 2 };
							m.test(n) && ((n = this._tryExpandSpecialURL(n)), "authorize" in r || (r.authorize = !0)),
								(r.forcePolyfill = r.responseType in this._forcePolyfillTypes),
								r.requestMode || (r.requestMode = this._requestMode),
								"retry" in r && s(o, r.retry),
								(r.connectionObserver = this._connectionObserver),
								"metadata" in r || (r.metadata = null),
								i({ url: n, args: r, backoffStrategy: o });
						}.bind(this)
					);
				}),
				(n.prototype._setAuthHeader = function (t, e) {
					if (!t.authorize) return c.resolve(t);
					var i = function () {
						return this._refreshToken(e).then(function (e) {
							return t.headers || (t.headers = {}), (t.headers.Authorization = "Bearer " + e), t;
						});
					}.bind(this);
					return this._stateMask & g.AUTHENTICATED
						? i()
						: new c(
								function (t, e) {
									this.once("authenticated", function () {
										i().then(t, e);
									});
								}.bind(this)
						  );
				}),
				(n.prototype._sendRetriedRequest = function (t) {
					var e = t.backoffStrategy,
						i = !1,
						n = function () {
							return this._setAuthHeader(t.args, i);
						}.bind(this),
						r = this._connectionObserver,
						s = function () {
							var s = null;
							return (
								(s = r.isOnline()
									? n()
									: new c(function (e, i) {
											if (t.args.allowOffline) return void n().then(e, i);
											r.once(f.CONNECTION_ONLINE, function () {
												n().then(e, i);
											});
									  })),
								s
									.then(
										function () {
											return "fetch" === t.args.requestMode && this._Fetch.isSupported()
												? this._Fetch.request(t.url, t.args)
												: this._HTTP.request(t.url, t.args);
										}.bind(this)
									)
									.then(function (n) {
										var r;
										if (
											(n.headers && (r = n.headers.get("Retry-After")),
											n.status === p.UNAUTHORIZED && !t.args.ignoreUnauthorized)
										)
											return (i = !0), c.reject(n);
										if ("function" == typeof e.condition && (e.condition(n, E) || r)) {
											var s = parseInt(r, 10);
											return (
												S.test(r)
													? (n.retryAfter = new Date(r).getTime() - Date.now())
													: s > 0 && (n.retryAfter = 1e3 * s),
												c.reject(n)
											);
										}
										return n;
									})
							);
						}.bind(this);
					return o
						.init(s, e)
						.catch(this._handleRetriedRequestError)
						.then(function (e) {
							return (e.metadata = t.args.metadata), t.args.rejectNotOk && !e.ok ? c.reject(e) : e;
						});
				}),
				(n.prototype._handleRetriedRequestError = function (t) {
					return t instanceof l ? c.resolve(t) : c.reject(t);
				}),
				(n.prototype._sendFireAndForgetRequest = function (t) {
					return (
						"function" == typeof e.fetch
							? e.fetch(t, { mode: "no-cors" }).catch(function () {})
							: e.Image
							? (new e.Image().src = t)
							: this.request(t, {
									requestMode: "xhr",
									method: "GET",
									authorize: !1,
									ignoreResponseBody: !0,
							  }),
						c.resolve(new l(t, 0))
					);
				}),
				(n.prototype._sendRequest = function (t, e) {
					return this._processRequestArgs(t, e).then(
						function (t) {
							return t.args.forget ? this._sendFireAndForgetRequest(t.url) : this._sendRetriedRequest(t);
						}.bind(this)
					);
				}),
				(n.prototype.getEndpoints = function () {
					return s({}, this._endpoints);
				}),
				(n.prototype.getInitTime = function () {
					return this._initTime;
				}),
				(n.prototype.getLastToken = function () {
					return this._lastToken;
				}),
				(n.prototype.getConnectionId = function () {
					return this._dealer.getConnectionId();
				}),
				(n.prototype.isConnected = function () {
					return !!(this._stateMask & g.CONNECTED);
				}),
				(n.prototype.isAuthenticated = function () {
					return !!(this._stateMask & g.AUTHENTICATED);
				}),
				(n.prototype.isOnline = function () {
					return this._connectionObserver.isOnline();
				}),
				(n.prototype.forceTokenRefresh = function () {
					return this._refreshToken(!0).then(function () {
						return !0;
					});
				}),
				(n.prototype.connect = function () {
					return (this._activated = !0), this._connect();
				}),
				(n.prototype.disconnect = function () {
					if (!this._activated) return c.resolve(!1);
					this._activated = !1;
					var t = this.isConnected()
							? f.TRANSPORT_BEFORE_ONLINE_DISCONNECT
							: f.TRANSPORT_BEFORE_OFFLINE_DISCONNECT,
						e = [],
						i = function (t) {
							e.push(t);
						};
					return this.emitSync(t, { awaitPromise: i }), c.all(e).then(this._disconnect.bind(this, !1));
				}),
				(n.prototype.forceDisconnect = function () {
					return this._activated
						? ((this._activated = !1), this._disconnect(), c.resolve(!0))
						: c.resolve(!1);
				}),
				(n.prototype.authenticate = function () {
					return (
						this._authenticationPromise ||
							(this._authenticationPromise = o
								.init(
									function () {
										return this._refreshToken().then(this._authenticateWithToken.bind(this));
									}.bind(this),
									{ algo: "exp", maxRetries: 2, baseTime: 500 }
								)
								.then(this._onAuthenticated)
								.catch(this._onAuthenticationFailed)),
						this._authenticationPromise
					);
				}),
				(n.prototype.request = function (t, e) {
					var i = this._sendRequest.bind(this, t, e);
					return this._connectionObserver.isOnline() && (!m.test(t) || this._stateMask & g.CONNECTED)
						? i()
						: new c(
								function (t, e) {
									this.once("connected", function () {
										i().then(t, e);
									});
								}.bind(this)
						  );
				}),
				(n.prototype.matchMessages = function (t, e) {
					if (!t) throw new TypeError('Dealer message "matcher" cannot be null.');
					if ("function" != typeof e) throw new TypeError("Dealer message callback cannot be null.");
					var i = function (i) {
						var n = i.data;
						n.uri && n.uri.match(t) && e(n);
					};
					(i.__matchMessagesExp = t), (e.__matchMessagesWrapper = i), this.on(f.INTERNAL_DEALER_MESSAGE, i);
				}),
				(n.prototype.unmatchMessages = function (t, e) {
					if ("function" != typeof e) throw new TypeError("Dealer message callback cannot be null.");
					var i = e.__matchMessagesWrapper;
					return i.__matchMessagesExp === t && (this.removeListener(f.INTERNAL_DEALER_MESSAGE, i), !0);
				}),
				(n.prototype.handlePushRequests = function (t, e) {
					if (!t) throw new TypeError('Dealer push request "matcher" cannot be null.');
					if ("function" != typeof e) throw new TypeError("Dealer push request callback cannot be null.");
					var i = function (i) {
						var n = i.data;
						n.message_ident && n.message_ident.match(t) && c.resolve(e(n)).then(i.reply);
					};
					(i.__matchRequestExp = t), (e.__matchRequestWrapper = i), this.on(f.INTERNAL_DEALER_REQUEST, i);
				}),
				(n.prototype.unhandlePushRequests = function (t, e) {
					if ("function" != typeof e) throw new TypeError("Dealer push request callback cannot be null.");
					var i = e.__matchRequestWrapper;
					return i.__matchRequestWrapper === t && (this.removeListener(f.INTERNAL_DEALER_REQUEST, i), !0);
				}),
				(n.prototype.toPublic = function () {
					return new u(this);
				}),
				(n.prototype.hasOwnerRef = function (t) {
					return this._ownerRef === t;
				}),
				(t.exports = n);
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		var n = function (t, e) {
			for (var i, n = 1; n < arguments.length; n++)
				if ((i = arguments[n])) for (var r in i) i.hasOwnProperty(r) && (t[r] = i[r]);
			return t;
		};
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			var i = e || {};
			(this._fn = t),
				(this._resolver = s.defer()),
				(this._maxDuration = i.maxDuration || r.maxDuration),
				(this._maxRetries = "maxRetries" in i ? i.maxRetries : r.maxRetries),
				(this._maxTime = i.maxTime || r.maxTime),
				(this._retryPredicate = i.retryPredicate || r.retryPredicate),
				(this._ts = 0),
				(this._callCount = 0),
				(this._backoffInitial = i.backoffInitial),
				(this._tickInterval = null),
				(this._isRunning = !1),
				(this._counter = new o({ curve: i.curve || i.algo, baseTime: i.baseTime, ceiling: i.ceiling })),
				this._backoffInitial && (this._maxRetries += 1),
				(this._tick = this._tick.bind(this));
		}
		var r = i(23).backoffDefaults,
			s = i(0),
			o = i(24),
			a = Array.prototype.slice;
		(n.init = function (t, e) {
			return new n(t, e).start();
		}),
			(n.prototype.getResolver = function () {
				return this._resolver.promise;
			}),
			(n.prototype.start = function (t) {
				return (
					!this._fn && t && (this._fn = t),
					this._isRunning ||
						((this._ts = Date.now()),
						(this._isRunning = !0),
						this._backoffInitial
							? ((this._callCount = 1),
							  (this._tickInterval = setTimeout(this._tick, this._counter.getTime(0))))
							: this._tick()),
					this._resolver.promise
				);
			}),
			(n.prototype.stop = function () {
				clearTimeout(this._tickInterval), (this._isRunning = !1), this._destroy();
			}),
			(n.prototype._destroy = function () {
				(this._fn = null), (this._resolver = null);
			}),
			(n.prototype._failure = function (t) {
				if (t && "retryAfter" in t) this._retryAfter(t);
				else {
					var e = this._counter.getTime(this._callCount);
					this._shouldRetry(e, t)
						? (this._callCount++, (this._tickInterval = setTimeout(this._tick, e)))
						: (this._resolver.reject(t), this._destroy());
				}
			}),
			(n.prototype._retryAfter = function (t) {
				this._callCount++, (this._tickInterval = setTimeout(this._tick, t.retryAfter));
			}),
			(n.prototype._success = function () {
				this._resolver.resolve.apply(null, a.call(arguments)), this._destroy();
			}),
			(n.prototype._shouldRetry = function (t, e) {
				var i = Date.now() - this._ts + t;
				return (
					this._callCount < this._maxRetries &&
					t < this._maxTime &&
					i < this._maxDuration &&
					this._retryPredicate(e)
				);
			}),
			(n.prototype._tick = function () {
				this._fn().then(this._success.bind(this)).catch(this._failure.bind(this));
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		(function (e) {
			!(function () {
				"use strict";
				function i() {
					if (
						((u = window.location.origin || window.location.protocol + "//" + window.location.hostname),
						(c = window.postMessage.bind(window, "@execute_deferreds", u)),
						!window.__hasDeferredHandler)
					) {
						_
							? Object.defineProperty(window, "__hasDeferredHandler", { value: 1 })
							: (window.__hasDeferredHandler = 1);
						var t = function (t) {
							(t.origin != u && "@execute_deferreds" != t.data) || o();
						};
						window.addEventListener
							? window.addEventListener("message", t)
							: window.attachEvent("onmessage", t);
					}
				}
				function n() {
					c = e.bind(null, o);
				}
				function r() {
					c = setTimeout.bind(null, o, 10);
				}
				function s() {
					a && window.postMessage ? i() : void 0 !== e ? n() : r();
				}
				function o() {
					var t = h.splice(0);
					if (t.length)
						for (var e = 0, i = t.length; e < i; e++)
							try {
								t[e]();
							} finally {
							}
				}
				var a = "undefined" != typeof window,
					_ = "function" == typeof Object.defineProperty;
				if (a && window.__modDefFn) return void (t.exports = window.__modDefFn);
				var c,
					u,
					h = [];
				s();
				var d = function (t) {
					var e = !h.length;
					h.push(t), e && c();
				};
				a &&
					!window.__modDefFn &&
					(_ ? Object.defineProperty(window, "__modDefFn", { value: d }) : (window.__modDefFn = d)),
					(d.use = { auto: s, dom: i, immediate: n, timeout: r }),
					(t.exports = d);
			})();
		}.call(e, i(54).setImmediate));
	},
	function (t, e, i) {
		(function (t) {
			function n(t, e) {
				(this._id = t), (this._clearFn = e);
			}
			var r = (void 0 !== t && t) || ("undefined" != typeof self && self) || window,
				s = Function.prototype.apply;
			(e.setTimeout = function () {
				return new n(s.call(setTimeout, r, arguments), clearTimeout);
			}),
				(e.setInterval = function () {
					return new n(s.call(setInterval, r, arguments), clearInterval);
				}),
				(e.clearTimeout = e.clearInterval = function (t) {
					t && t.close();
				}),
				(n.prototype.unref = n.prototype.ref = function () {}),
				(n.prototype.close = function () {
					this._clearFn.call(r, this._id);
				}),
				(e.enroll = function (t, e) {
					clearTimeout(t._idleTimeoutId), (t._idleTimeout = e);
				}),
				(e.unenroll = function (t) {
					clearTimeout(t._idleTimeoutId), (t._idleTimeout = -1);
				}),
				(e._unrefActive = e.active = function (t) {
					clearTimeout(t._idleTimeoutId);
					var e = t._idleTimeout;
					e >= 0 &&
						(t._idleTimeoutId = setTimeout(function () {
							t._onTimeout && t._onTimeout();
						}, e));
				}),
				i(55),
				(e.setImmediate =
					("undefined" != typeof self && self.setImmediate) ||
					(void 0 !== t && t.setImmediate) ||
					(this && this.setImmediate)),
				(e.clearImmediate =
					("undefined" != typeof self && self.clearImmediate) ||
					(void 0 !== t && t.clearImmediate) ||
					(this && this.clearImmediate));
		}.call(e, i(1)));
	},
	function (t, e, i) {
		(function (t, e) {
			!(function (t, i) {
				"use strict";
				function n(t) {
					"function" != typeof t && (t = new Function("" + t));
					for (var e = new Array(arguments.length - 1), i = 0; i < e.length; i++) e[i] = arguments[i + 1];
					var n = { callback: t, args: e };
					return (c[_] = n), a(_), _++;
				}
				function r(t) {
					delete c[t];
				}
				function s(t) {
					var e = t.callback,
						n = t.args;
					switch (n.length) {
						case 0:
							e();
							break;
						case 1:
							e(n[0]);
							break;
						case 2:
							e(n[0], n[1]);
							break;
						case 3:
							e(n[0], n[1], n[2]);
							break;
						default:
							e.apply(i, n);
					}
				}
				function o(t) {
					if (u) setTimeout(o, 0, t);
					else {
						var e = c[t];
						if (e) {
							u = !0;
							try {
								s(e);
							} finally {
								r(t), (u = !1);
							}
						}
					}
				}
				if (!t.setImmediate) {
					var a,
						_ = 1,
						c = {},
						u = !1,
						h = t.document,
						d = Object.getPrototypeOf && Object.getPrototypeOf(t);
					(d = d && d.setTimeout ? d : t),
						"[object process]" === {}.toString.call(t.process)
							? (function () {
									a = function (t) {
										e.nextTick(function () {
											o(t);
										});
									};
							  })()
							: (function () {
									if (t.postMessage && !t.importScripts) {
										var e = !0,
											i = t.onmessage;
										return (
											(t.onmessage = function () {
												e = !1;
											}),
											t.postMessage("", "*"),
											(t.onmessage = i),
											e
										);
									}
							  })()
							? (function () {
									var e = "setImmediate$" + Math.random() + "$",
										i = function (i) {
											i.source === t &&
												"string" == typeof i.data &&
												0 === i.data.indexOf(e) &&
												o(+i.data.slice(e.length));
										};
									t.addEventListener
										? t.addEventListener("message", i, !1)
										: t.attachEvent("onmessage", i),
										(a = function (i) {
											t.postMessage(e + i, "*");
										});
							  })()
							: t.MessageChannel
							? (function () {
									var t = new MessageChannel();
									(t.port1.onmessage = function (t) {
										o(t.data);
									}),
										(a = function (e) {
											t.port2.postMessage(e);
										});
							  })()
							: h && "onreadystatechange" in h.createElement("script")
							? (function () {
									var t = h.documentElement;
									a = function (e) {
										var i = h.createElement("script");
										(i.onreadystatechange = function () {
											o(e), (i.onreadystatechange = null), t.removeChild(i), (i = null);
										}),
											t.appendChild(i);
									};
							  })()
							: (function () {
									a = function (t) {
										setTimeout(o, 0, t);
									};
							  })(),
						(d.setImmediate = n),
						(d.clearImmediate = r);
				}
			})("undefined" == typeof self ? (void 0 === t ? this : t) : self);
		}.call(e, i(1), i(12)));
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			if (((this.type = t), e)) for (var i in e) e.hasOwnProperty(i) && "type" !== i && (this[i] = e[i]);
			r
				? (Object.defineProperty(this, "_prevented", s),
				  Object.defineProperty(this, "_stopped", s),
				  Object.defineProperty(this, "_immediateStopped", s),
				  Object.defineProperty(this, "defaultPrevented", {
						get: function () {
							return this._prevented;
						}.bind(this),
						set: function (t) {
							return t;
						},
				  }))
				: ((this.defaultPrevented = !1),
				  (this._prevented = !1),
				  (this._stopped = !1),
				  (this._immediateStopped = !1));
		}
		var r = "function" == typeof Object.defineProperty,
			s = { value: !1, writable: !0 };
		(n.wasPropagationStopped = function (t) {
			return !!t._stopped;
		}),
			(n.wasImmediatePropagationStopped = function (t) {
				return !!t._immediateStopped;
			}),
			(n.prototype.preventDefault = function () {
				(this._prevented = !0), r || (this.defaultPrevented = !0);
			}),
			(n.prototype.stopPropagation = function () {
				this._stopped = !0;
			}),
			(n.prototype.stopImmediatePropagation = function () {
				this._immediateStopped = !0;
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			s.call(this),
				(this.request = t.request.bind(t)),
				(this.getConnectionId = t.getConnectionId.bind(t)),
				(this.getEndpoints = t.getEndpoints.bind(t)),
				(this.getInitTime = t.getInitTime.bind(t)),
				(this.getLastToken = t.getLastToken.bind(t)),
				(this.matchMessages = t.matchMessages.bind(t)),
				(this.handlePushRequests = t.handlePushRequests.bind(t)),
				this.proxyEmit(t, o.TRANSPORT_ACCESS_TOKEN, this.EVENT_ACCESS_TOKEN),
				this.proxyEmit(t, o.TRANSPORT_CONNECTION_OFFLINE, this.EVENT_CONNECTION_OFFLINE),
				this.proxyEmit(t, o.TRANSPORT_CONNECTION_ONLINE, this.EVENT_CONNECTION_ONLINE),
				this.proxyEmit(t, o.TRANSPORT_ENDPOINTS_RESOLVED, this.EVENT_ENDPOINTS_RESOLVED),
				this.onAddListener(
					this.EVENT_CONNECTION_ID,
					this._onAddConnectionIdListener.bind(this, this.on.bind(t))
				),
				this.onRemoveListener(
					this.EVENT_CONNECTION_ID,
					this._onRemoveConnectionIdListener.bind(this, this.removeListener.bind(t))
				);
		}
		var r = i(2),
			s = i(3),
			o = i(10),
			a = i(8),
			_ = i(25);
		r(n, s),
			(n.prototype.EVENT_ACCESS_TOKEN = "access_token"),
			(n.prototype.EVENT_CONNECTION_ID = "connection_id"),
			(n.prototype.EVENT_CONNECTION_OFFLINE = "connection_offline"),
			(n.prototype.EVENT_CONNECTION_ONLINE = "connection_online"),
			(n.prototype.EVENT_ENDPOINTS_RESOLVED = "endpoints_resolved"),
			(n.prototype.StatusCode = a),
			(n.prototype.StatusFamily = _),
			(n.prototype._onAddConnectionIdListener = function (t, e) {
				e.preventDefault();
				var i = this.EVENT_CONNECTION_ID,
					n = e.listener,
					r = function (t) {
						n.call(this, s.createEvent(i, t));
					}.bind(this);
				(n.$proxy_wrapper = r), t(o.TRANSPORT_CONNECTION_ID, r, e.options);
			}),
			(n.prototype._onRemoveConnectionIdListener = function (t, e) {
				e.preventDefault(),
					e.listener.$proxy_wrapper && t(o.TRANSPORT_CONNECTION_ID, e.listener.$proxy_wrapper, e.options);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t) {
				s.call(this);
				var e = t || {};
				(this._socket = null),
					(this._lastPingDeferred = null),
					(this._waitingForConnectionId = !0),
					(this._connectionId = null),
					(this._connectionURI = null),
					(this._heartbeatTimeout = e.heartbeatTimeout || d),
					(this._heartbeatToken = null),
					(this._heartbeatTimeoutToken = null),
					(this._onHeartbeatSuccess = this._onHeartbeatSuccess.bind(this)),
					(this._onHeartbeatError = this._onHeartbeatError.bind(this));
			}
			var r = i(2),
				s = i(3),
				o = i(0),
				a = i(10),
				_ = i(9),
				c = i(59),
				u = i(26),
				h = /hm:\/\/pusher\/(?:[^]+)?\/connections\/([^]+)/,
				d = 1e4;
			r(n, s),
				(n.create = function (t) {
					return new n(t);
				}),
				(n.prototype._onHeartbeatError = function () {
					this._stopHeartbeat(), this._socket && this._socket.close(u.TIMEOUT, "internal-timeout");
				}),
				(n.prototype._onHeartbeatSuccess = function () {
					this._stopHeartbeat(), this._startHeartbeat();
				}),
				(n.prototype._startHeartbeat = function (t) {
					var e = function () {
						this.ping().then(this._onHeartbeatSuccess, this._onHeartbeatError),
							(this._heartbeatTimeoutToken = setTimeout(this._onHeartbeatError, this._heartbeatTimeout));
					}.bind(this);
					t ? e() : (this._heartbeatToken = setTimeout(e, 3e4));
				}),
				(n.prototype._stopHeartbeat = function () {
					clearTimeout(this._heartbeatToken), clearTimeout(this._heartbeatTimeoutToken);
				}),
				(n.prototype._prepareConnectionId = function (t) {
					if (!t.uri) return !1;
					var e = t.uri.match(h);
					if (!e) return !1;
					var i;
					return (
						(i =
							t.header && t.headers["Spotify-Connection-Id"]
								? t.headers["Spotify-Connection-Id"]
								: decodeURIComponent(e[1])),
						(this._connectionId = i),
						(this._connectionURI = t.uri),
						this.emit(a.DEALER_CONNECTION_ID, { id: i, uri: t.uri }),
						!0
					);
				}),
				(n.prototype._reply = function (t, e) {
					if (!t) throw new TypeError("Invalid key.");
					var i = this._socket;
					if (i && 1 === i.readyState) {
						var n = { type: "reply", key: t, payload: e };
						i.send(JSON.stringify(n));
					}
				}),
				(n.prototype._parseMessage = function (t) {
					var e;
					try {
						e = JSON.parse(t);
					} catch (t) {
						return;
					}
					if (this._waitingForConnectionId && this._prepareConnectionId(e))
						(this._waitingForConnectionId = !1), this._startHeartbeat(!0);
					else if ("pong" === e.type && this._lastPingDeferred)
						this._lastPingDeferred.resolve(!0), (this._lastPingDeferred = null);
					else if ("message" === e.type) this.emit(a.DEALER_MESSAGE, { data: e });
					else if ("request" === e.type) {
						var i = e.key;
						i && this.emit(a.DEALER_REQUEST, { data: e, reply: this._reply.bind(this, i) });
					}
				}),
				(n.prototype._handleOpen = function (t) {
					t.resolve(!0), (this._connected = !0), this.emit(a.DEALER_AUTHENTICATED);
				}),
				(n.prototype._handleMessage = function (t) {
					var i = this,
						n = t.data;
					if (e.Blob && n instanceof e.Blob) {
						var r = new e.FileReader();
						(r.onloadend = function () {
							i._parseMessage(this.result);
						}),
							r.readAsText(n);
					} else
						e.Buffer && e.ArrayBuffer && n instanceof e.ArrayBuffer
							? this._parseMessage(new e.Buffer(n).toString("ascii"))
							: this._parseMessage(n);
				}),
				(n.prototype._handleClose = function (t) {
					var e = this._connected;
					if (((this._connected = !1), !e)) {
						var i = new c(_.DEALER_AUTHENTICATION_FAILED, "Dealer connection error", t);
						return void this.emit(a.DEALER_AUTHENTICATION_FAILED, { error: i });
					}
					this.emitSync(a.DEALER_DISCONNECTED, { wsCode: t.code, reason: t.reason });
				}),
				(n.prototype._handleError = function (t) {
					var e = new c(_.DEALER_CONNECTION_ERROR, "Cannot connect to dealer");
					t.reject(e), (this._connected = !1), this.emit(a.DEALER_ERROR, { error: e });
				}),
				(n.prototype.connect = function (t) {
					return (
						(this._endpoint = t),
						(this._waitingForConnectionId = !0),
						this.emit(a.DEALER_CONNECTED),
						o.resolve(!0)
					);
				}),
				(n.prototype.authenticate = function (t) {
					var e = o.defer(),
						i = this._endpoint + "?access_token=" + t,
						n = (this._socket = new WebSocket(i));
					return (
						(n.onopen = this._handleOpen.bind(this, e)),
						(n.onclose = this._handleClose.bind(this)),
						(n.onerror = this._handleError.bind(this, e)),
						(n.onmessage = this._handleMessage.bind(this)),
						e.promise
					);
				}),
				(n.prototype.disconnect = function () {
					this._socket &&
						(this._stopHeartbeat(),
						(this._waitingForConnectionId = !0),
						(this._connected = !1),
						this._socket.close(u.CLOSE, "internal-close"),
						(this._socket.onopen = null),
						(this._socket.onerror = null),
						(this._socket.onmessage = null),
						(this._socket.onclose = null),
						(this._socket = null),
						this.emitSync("disconnected", { wsCode: u.CLOSE, reason: "internal-close" }));
				}),
				(n.prototype.ping = function () {
					return this._socket && 1 === this._socket.readyState
						? ((this._lastPingDeferred = o.defer()),
						  this._socket.send('{"type":"ping"}'),
						  this._lastPingDeferred.promise)
						: o.reject(new c(_.DEALER_CONNECTION_ERROR, "Dealer connection error"));
				}),
				(n.prototype.getConnectionId = function () {
					return this._waitingForConnectionId
						? new o(
								function (t) {
									this.once("connection_id", function (e) {
										t(e.id);
									});
								}.bind(this)
						  )
						: o.resolve(this._connectionId);
				}),
				(n.prototype.getConnectionInfo = function () {
					return this._waitingForConnectionId
						? new o(
								function (t) {
									this.once("connection_id", function (e) {
										t({ id: e.id, uri: e.uri });
									});
								}.bind(this)
						  )
						: o.resolve({ id: this._connectionId, uri: this._connectionURI });
				}),
				(n.prototype.hasConnectionId = function () {
					return !this._waitingForConnectionId && !!this._connectionId;
				}),
				(t.exports = n);
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		function n(t, e, i) {
			Error.call(this, t);
			var n = i || {};
			(this.code = t || r.DEALER_ERROR),
				(this.raw = n),
				(this.wsReason = n.reason || null),
				(this.wsCode = n.code || null);
		}
		var r = i(9);
		(n.prototype = new Error()), (n.prototype.constructor = n), (n.prototype.name = "DealerError"), (t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function i(t, i, n) {
				(this.tag = t),
					(this.description = i),
					(this._predicate = n),
					(this._tagParts = t.split(".")),
					(this._tagText = "[" + t + "]"),
					"true" === e.env.DEBUG ? (this._enabled = !0) : (this._enabled = !1),
					(this._level = 0),
					(this.log = this.log.bind(this)),
					(this.debug = this.debug.bind(this)),
					(this.warn = this.warn.bind(this)),
					(this.error = this.error.bind(this));
			}
			var n = { LOG: 1, DEBUG: 2, INFO: 4, WARN: 8, ERROR: 16 },
				r = Array.prototype.slice;
			(i.prototype.matchesTag = function (t) {
				var e = Array.isArray(t) ? t : t.split("."),
					i = this._tagParts;
				if (e.length > i.length) return !1;
				for (var n = 0, r = e.length; n < r; n++) if (("*" !== e[n] || !i[n]) && e[n] !== i[n]) return !1;
				return !0;
			}),
				(i.prototype.setLevel = function (t) {
					var e = 0;
					switch (t) {
						case "error":
							e = n.ERROR;
							break;
						case "warn":
							e = n.WARN | n.ERROR;
							break;
						case "info":
							e = n.INFO | n.WARN | n.ERROR;
							break;
						case "debug":
							e = n.DEBUG | n.INFO | n.WARN | n.ERROR;
							break;
						case "log":
						default:
							e = n.LOG | n.DEBUG | n.INFO | n.WARN | n.ERROR;
					}
					this._level = e;
				}),
				(i.prototype.enable = function () {
					"true" === e.env.DEBUG && (this._enabled = !0);
				}),
				(i.prototype.disable = function () {
					"true" === e.env.DEBUG && (this._enabled = !1);
				}),
				(i.prototype.log = function () {
					if ("true" === e.env.DEBUG) {
						if (!(this._enabled || this._level & n.LOG)) return;
						var t = r.call(arguments),
							i = ([this._tagText].concat(t), { type: "log", tag: this.tag, args: t });
						if (this._predicate(i)) return;
					}
				}),
				(i.prototype.debug = function () {
					if ("true" === e.env.DEBUG) {
						if (!(this._enabled || this._level & n.DEBUG)) return;
						var t = r.call(arguments),
							i = ([this._tagText].concat(t), { type: "debug", tag: this.tag, args: t });
						if (this._predicate(i)) return;
					}
				}),
				(i.prototype.info = function () {
					if ("true" === e.env.DEBUG) {
						if (!(this._enabled || this._level & n.INFO)) return;
						var t = r.call(arguments),
							i = ([this._tagText].concat(t), { type: "info", tag: this.tag, args: t });
						if (this._predicate(i)) return;
					}
				}),
				(i.prototype.warn = function () {
					if ("true" === e.env.DEBUG) {
						if (!(this._enabled || this._level & n.WARN)) return;
						var t = r.call(arguments),
							i = ([this._tagText].concat(t), { type: "warn", tag: this.tag, args: t });
						if (this._predicate(i)) return;
					}
				}),
				(i.prototype.error = function () {
					if ("true" === e.env.DEBUG) {
						if (!(this._enabled || this._level & n.ERROR)) return;
						var t = r.call(arguments),
							i = ([this._tagText].concat(t), { type: "error", tag: this.tag, args: t });
						if (this._predicate(i)) return;
					}
				}),
				(t.exports = i);
		}.call(e, i(12)));
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n() {
				return "function" == typeof e.fetch;
			}
			function r(t, i) {
				if (!n()) return s.reject(new TypeError("Fetch is not supported"));
				var r = i || {};
				if (!t) return s.reject(new TypeError("Request URL cannot be blank."));
				var h = t,
					d = null,
					l = r.payload,
					p = (r.method || "GET").toUpperCase();
				p in c && l ? (d = l) : l && (h += "?" + l);
				var E = r.responseType || "text";
				if (E && !(E in u))
					return s.reject(new TypeError("Cannot set responseType: not supported in browser."));
				var f = r.ignoreResponseBody,
					T = {
						mode: r.mode || "cors",
						credentials: r.credentials || "same-origin",
						redirect: r.redirect || "follow",
						method: p,
					};
				r.headers && (T.headers = r.headers), d && (T.body = d);
				var y = Date.now();
				return e
					.fetch(h, T)
					.then(function (t) {
						var e;
						e =
							f || t.status === _.NO_CONTENT
								? null
								: "json" === E
								? t.json().catch(function () {
										return null;
								  })
								: "arraybuffer" === E
								? t.arrayBuffer()
								: "blob" === E
								? t.blob()
								: t.text();
						var i = r.parseResponseHeaders || t.status > 299 ? new a(t.headers) : null;
						return s.all([t.url, t.status, i, e]);
					})
					.then(function (t) {
						var e = t[0],
							i = t[1],
							n = t[2],
							s = t[3],
							a = r.timing ? Date.now() - y : null,
							_ = new o(e, i);
						return (_.body = s), (_.headers = n), (_.timing = r.timing ? { completed: a } : null), _;
					})
					.catch(function () {
						var t = r.timing ? Date.now() - y : null,
							e = new o(h);
						return (e.timing = r.timing ? { completed: t } : null), e;
					})
					.then(function (t) {
						return r.connectionObserver && (t.offline = !r.connectionObserver.isOnline()), t;
					});
			}
			var s = i(0),
				o = i(15),
				a = i(62),
				_ = i(8),
				c = { POST: !0, PUT: !0, DELETE: !0 },
				u = { json: !0, text: !0, arraybuffer: !0, blob: !0 };
			t.exports = { request: r, isSupported: n };
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			(this.get = t.get.bind(t)), (this.has = t.has.bind(t));
		}
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			if (!t.transport) throw new TypeError("Invalid transport instance.");
			(this._deviceDescriptor = s.resolve()),
				(this._transport = t.transport),
				(this._ownerRef = t.ownerRef),
				(this._allowLifecycleManagement = t.allowLifecycleManagement),
				(this._abbaClient = null),
				(this._systemInfo = s.defer()),
				(this._clientVersion = s.defer()),
				(this._sdkVersion = A),
				(this._logger = null),
				(this.emitEvent = this.emitEvent.bind(this)),
				this._init(t);
		}
		var r = i(2),
			s = i(0),
			o = i(3),
			a = i(64),
			_ = i(65),
			c = i(5),
			u = i(66),
			h = i(67),
			d = i(11),
			l = i(28),
			p = i(10),
			E = i(68),
			f = i(70),
			T = i(74),
			y = i(75),
			m = i(77),
			R = i(13),
			S = i(78),
			g = i(16),
			A = i(30),
			v = c.forTag("harmonyclient");
		r(n, o),
			(n.create = function (t) {
				return new n(t);
			}),
			(n.of = function (t) {
				return t._client;
			}),
			(n.prototype._parseDeviceInfo = function (t, e) {
				var i = e.capabilities || {},
					n = {
						change_volume: !("change_volume" in i) || i.change_volume,
						audio_podcasts: !("audio_podcasts" in i) || i.audio_podcasts,
						endsong_snooping: i.endsong_snooping,
						enable_play_token: !0,
						play_token_lost_behavior: t.playTokenLostBehavior || "pause",
						disable_connect: !!t.hidden,
						video_playback: i.video_playback,
						manifest_formats: [g.FILE_URLS_MP3],
					};
				e.nameTemplate && (e.name = y(e.nameTemplate));
				var r = h.create({
					id: T.get(e.id, e.randomizeId),
					model: e.model || y("harmony-{{name}}.{{version}}-{{platform}}").toLowerCase(),
					name: e.name || m(y("Spotify ({{name}}/{{platform}})")),
					type: e.type || u.COMPUTER,
					brand: e.brand || "SpotifyHarmonyGeneric",
					platform_identifier: e.platform_identifier,
					platform_version: e.platform_version,
					metadata: e.metadata || {},
					capabilities: n,
				});
				return (
					this._systemInfo.resolve(r.getPlatformIdentifier()),
					this._clientVersion.resolve(r.getPlatformVersion()),
					r
				);
			}),
			(n.prototype._init = function (t) {
				this._initDeviceDescriptor(t), this._initTransport(), this._initLogger();
			}),
			(n.prototype._initLogger = function () {
				this._logger = new f({
					transport: this._transport,
					sdkId: this.getSDKId(),
					platform: this._systemInfo.promise,
					clientVersion: this._clientVersion.promise,
				});
			}),
			(n.prototype._initDeviceDescriptor = function (t) {
				this._deviceDescriptor = s
					.resolve(t.descriptor || {})
					.then(this._parseDeviceInfo.bind(this, t))
					.then(
						function (t) {
							return (
								this.proxyEmit(t, d.DEVICE_DESCRIPTOR_CHANGED, d.CLIENT_DEVICE_DESCRIPTOR_CHANGED), t
							);
						}.bind(this)
					)
					.catch(
						function (t) {
							this._onError(l.HARMONY, { error: t });
						}.bind(this)
					);
			}),
			(n.prototype._initTransport = function () {
				var t = this._transport;
				t.on(p.TRANSPORT_CONNECTED, this._onConnected.bind(this)),
					t.on(p.TRANSPORT_CONNECTION_FAILED, this._onConnectionError.bind(this)),
					t.on(p.TRANSPORT_AUTHENTICATION_FAILED, this._onAuthenticationError.bind(this)),
					this.proxyEmit(t, p.TRANSPORT_AUTHENTICATED, d.CLIENT_AUTHENTICATED),
					this.proxyEmit(t, p.TRANSPORT_RECONNECTING, d.CLIENT_RECONNECTING),
					this.proxyEmit(t, p.TRANSPORT_RECONNECTED, d.CLIENT_RECONNECTED),
					this.proxyEmit(t, p.TRANSPORT_LOGGED_OUT, d.CLIENT_LOGGED_OUT),
					this.proxyEmitSync(t, p.TRANSPORT_BEFORE_OFFLINE_DISCONNECT, d.CLIENT_BEFORE_OFFLINE_DISCONNECT),
					this.proxyEmitSync(t, p.TRANSPORT_BEFORE_ONLINE_DISCONNECT, d.CLIENT_BEFORE_DISCONNECT),
					t.on(p.TRANSPORT_SHORT_SESSION_DISCONNECTED, this._onShortSessionDisconnect.bind(this)),
					(this._transport = t),
					(this._abbaClient = a.forSession(t));
				var e = _.create({ transport: t });
				e.on(d.PRODUCT_STATE_OBSERVER_PRODUCT_STATE_CHANGED, this.emitEvent),
					this.on(d.CLIENT_BEFORE_DISCONNECT, function (t) {
						if (t) {
							var i = e.deregister().catch(function () {});
							t.awaitPromise(i);
						}
					}),
					(this._productStateObserver = e);
			}),
			(n.prototype._onError = function (t, e) {
				this.emit(d.CLIENT_ERROR, { source: t, name: e.name, error: e.error }),
					e.error &&
						e.error.unrecoverable &&
						this.emit(d.CLIENT_UNRECOVERABLE_FAILURE, { source: t, name: e.name, error: e.error });
			}),
			(n.prototype._onConnected = function () {
				this.emit(d.CLIENT_CONNECTED),
					(this._transport.hasOwnerRef(this._ownerRef) || this._allowLifecycleManagement) &&
						this._transport.authenticate().catch(function () {});
			}),
			(n.prototype._onConnectionError = function (t) {
				var e = t && t.error ? t.error : t;
				this._onError(l.TRANSPORT, { error: e }), this.emit(d.CLIENT_CONNECTION_ERROR, t);
			}),
			(n.prototype._onAuthenticationError = function (t) {
				var e = t && t.error ? t.error : t;
				this._onError(l.TRANSPORT, { error: e }), this.emit(d.CLIENT_AUTHENTICATION_ERROR, e);
			}),
			(n.prototype._onShortSessionDisconnect = function (t) {
				this._logger
					.logClientEvent({
						source: "transport",
						source_version: A.tagged,
						source_vendor: "spotify",
						event: t.type,
						event_version: "1.0.0",
						json_data: { disconnectCount: t.disconnectCount, sessionLength: t.sessionLength },
					})
					.catch(function (e) {
						v.warn(t.type + " Logging Error", e);
					});
			}),
			(n.prototype.getVersionDescriptor = function () {
				return this._sdkVersion;
			}),
			(n.prototype.getSDKId = function () {
				return "harmony:" + this._sdkVersion.tagged;
			}),
			(n.prototype.getUntaggedSDKId = function () {
				return "harmony:" + this._sdkVersion.version;
			}),
			(n.prototype.getLogger = function () {
				return this._logger;
			}),
			(n.prototype.logAppMetrics = function (t, e) {
				return this._logger.logMetrics(t, e);
			}),
			(n.prototype.request = function (t, e) {
				return this._transport.request(t, e);
			}),
			(n.prototype.getPublicTransport = function () {
				return this._transport.toPublic();
			}),
			(n.prototype.getABBAClient = function () {
				return this._abbaClient;
			}),
			(n.prototype.getClientDescriptor = function () {
				return this._deviceDescriptor.then(function (t) {
					return t.toJSON();
				});
			}),
			(n.prototype.getDeviceDescriptor = function () {
				return this._deviceDescriptor;
			}),
			(n.prototype.getUserInfo = function () {
				return this._transport.request("https://@webapi/v1/me", { responseType: "json" }).then(function (t) {
					var e = t.body;
					if (200 !== t.status) {
						var i = new S(
							R.USER_INFO_REQUEST_FAILED_WITH_STATUS,
							"User info request failed with status " + t.status
						);
						return (i.status = t.status), s.reject(i);
					}
					return e
						? {
								display_name: e.display_name,
								followers: e.followers,
								id: e.id,
								images: e.images,
								uri: e.uri,
						  }
						: s.reject(new S(R.USER_INFO_REQUEST_EMPTY_RESPONSE, "Unexpected empty response."));
				});
			}),
			(n.prototype.getProductState = function () {
				return this._productStateObserver.getCurrentState();
			}),
			(n.prototype.connect = function () {
				return this._allowLifecycleManagement
					? this._transport.connect()
					: E.connectIfOwned(this._transport, this._ownerRef);
			}),
			(n.prototype.disconnect = function () {
				return this._allowLifecycleManagement
					? this._transport.disconnect()
					: E.disconnectIfOwned(this._transport, this._ownerRef);
			}),
			(n.prototype.forceDisconnect = function () {
				return this._allowLifecycleManagement
					? this._transport.forceDisconnect()
					: E.forceDisconnectIfOwned(this._transport, this._ownerRef);
			}),
			(n.prototype.setName = function (t) {
				return this._deviceDescriptor.then(function (e) {
					return e.setName(t);
				});
			}),
			(n.prototype.setNameTemplate = function (t) {
				return this.setName(y(t));
			}),
			(n.prototype.setCapability = function (t, e) {
				return this._deviceDescriptor.then(function (i) {
					return i.setCapability(t, e);
				});
			}),
			(n.prototype.notifyError = function (t, e, i) {
				this._onError(t, { name: e, error: i });
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			s.call(this);
			var i = e || {};
			(this._session = t),
				(this._endpoint = i.endpoint || a),
				(this._authenticated = o.defer()),
				(this._dataDeferred = o.defer()),
				(this._flagMap = {}),
				this._init();
		}
		var r = i(2),
			s = i(3),
			o = i(0),
			a = "https://@webapi/v1/me/feature-flags";
		r(n, s),
			(n.forSession = function (t, e) {
				return new n(t, e);
			}),
			(n.prototype._init = function () {
				this._session.on(
					"authenticated",
					function () {
						this._authenticated.resolve(!0);
					}.bind(this)
				);
			}),
			(n.prototype._fetchData = function (t) {
				if (
					t.every(
						function (t) {
							return t in this._flagMap;
						}.bind(this)
					)
				)
					return o.resolve(!0);
				var e = this._dataDeferred;
				(this._dataDeferred = o.defer()), this._dataDeferred.promise.then(e.resolve, e.reject);
				var i = this._endpoint + "?tests=" + t.join(",");
				return this._session
					.request(i, { authorize: !0, responseType: "json" })
					.then(this._parseData.bind(this))
					.catch(
						function (t) {
							return (
								this.emit("error", { name: "abbaError", error: t }), this._dataDeferred.resolve(!1), !1
							);
						}.bind(this)
					);
			}),
			(n.prototype._parseData = function (t) {
				var e = t.body;
				if (200 !== t.status) throw new Error("Request to abba-service failed with status code " + t.status);
				if (!e) throw new Error("Unexpected empty response from abba service.");
				if (!e.flags) throw new Error("Unexpected response format from abba service.");
				return (
					Object.keys(e.flags).forEach(
						function (t) {
							this._flagMap[t] = e.flags[t];
						}.bind(this)
					),
					this._dataDeferred.resolve(!0),
					!0
				);
			}),
			(n.prototype.getCell = function (t) {
				return this.getCells([t]).then(function (e) {
					return e[t];
				});
			}),
			(n.prototype.getCells = function (t) {
				return this._authenticated.promise.then(this._fetchData.bind(this, t)).then(
					function (e) {
						for (var i = {}, n = 0; n < t.length; n++) {
							var r = t[n];
							i[r] = {
								value: this._flagMap[r] || null,
								exists: r in this._flagMap,
								featureName: r,
								fromAbba: e,
							};
						}
						return i;
					}.bind(this)
				);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			s.call(this),
				(this._transport = t.transport),
				(this._endpoint = t.endpoint || c),
				(this._currentState = null),
				(this._currentConnectionId = null),
				(this._handleUserUpdate = this._handleUserUpdate.bind(this)),
				this._init();
		}
		var r = i(2),
			s = i(3),
			o = i(0),
			a = i(8),
			_ = i(10),
			c = "@webgate/melody",
			u = /^wss:\/\/event$/;
		r(n, s),
			(n.create = function (t) {
				return new n(t);
			}),
			(n.prototype._init = function () {
				this._transport.on(
					_.TRANSPORT_CONNECTION_ID,
					function (t) {
						this.register(t.id).catch(function () {});
					}.bind(this)
				);
			}),
			(n.prototype._handleUserUpdate = function () {
				this._transport.forceTokenRefresh().catch(function () {}),
					this.getCurrentState(!0)
						.then(
							function (t) {
								this.emit(_.PRODUCT_STATE_CHANGED, { productState: t });
							}.bind(this)
						)
						.catch(function () {});
			}),
			(n.prototype._shouldRetry = function (t, e) {
				var i = t.getStatusFamily();
				return i === e.SERVER_ERROR || i === e.BROWSER_ERROR;
			}),
			(n.prototype._createSubURL = function (t) {
				return "@webapi/v1/me/notifications/user?connection_id=" + encodeURIComponent(t);
			}),
			(n.prototype.getCurrentState = function (t) {
				return !t && this._currentState
					? o.resolve(this._currentState)
					: this._transport
							.request(this._endpoint + "/v1/product_state", {
								method: "GET",
								responseType: "json",
								retry: { condition: this._shouldRetry },
							})
							.then(
								function (t) {
									return t.status !== a.OK
										? ((this._currentState = null),
										  o.reject(new Error("Cannot get the user's product state.")))
										: ((this._currentState = t.body), t.body);
								}.bind(this)
							);
			}),
			(n.prototype.register = function (t) {
				return (
					t || o.reject(new TypeError("ConnectionId cannot be null")),
					this._transport.matchMessages(u, this._handleUserUpdate),
					this._transport
						.request(this._createSubURL(t), {
							method: "PUT",
							ignoreResponseBody: !0,
							ignoreUnauthorized: !0,
							retry: { condition: this._shouldRetry },
						})
						.then(
							function (e) {
								if (e.status !== a.OK) {
									var i =
										"Cannot register for product state updates: service responded with status " +
										e.status;
									return o.reject(new Error(i));
								}
								return (this._connectionId = t), !0;
							}.bind(this)
						)
				);
			}),
			(n.prototype.deregister = function () {
				var t = this._connectionId;
				return t
					? (this._transport.unmatchMessages(u, this._handleUserUpdate),
					  this._transport
							.request(this._createSubURL(t), {
								method: "DELETE",
								ignoreResponseBody: !0,
								ignoreUnauthorized: !0,
								retry: { condition: this._shouldRetry },
							})
							.then(
								function (t) {
									return t.status === a.OK
										? ((this._connectionId = null), o.resolve(!0))
										: o.resolve(!1);
								}.bind(this)
							))
					: o.resolve(!1);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		var n = i(6),
			r = {
				UNKNOWN: "unknown",
				COMPUTER: "computer",
				TABLET: "tablet",
				SMARTPHONE: "smartphone",
				SPEAKER: "speaker",
				TV: "tv",
				AVR: "avr",
				STB: "stb",
				AUDIO_DONGLE: "audio_dongle",
				GAME_CONSOLE: "game_console",
				CAST_VIDEO: "cast_video",
				CAST_AUDIO: "cast_audio",
			};
		t.exports = n(r);
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			return JSON.parse(JSON.stringify(t));
		}
		function r(t) {
			if ((o.call(this), !t)) throw new TypeError("Invalid argument `options`.");
			if (!t.id) throw new TypeError("Argument `options.id` is required.");
			if (!t.name || !t.model || !t.type) throw new TypeError("Incomplete `options` value.");
			(this._id = t.id),
				(this._type = t.type),
				(this._brand = t.brand),
				(this._model = t.model),
				(this._name = t.name),
				(this._platformIdentifier = t.platform_identifier),
				(this._platformVersion = t.platform_version),
				(this._metadata = t.metadata || {}),
				(this._capabilities = t.capabilities || { manifest_formats: [] });
		}
		var s = i(2),
			o = i(3),
			a = i(11);
		s(r, o),
			(r.create = function (t) {
				return new r(t);
			}),
			(r.prototype.getId = function () {
				return this._id;
			}),
			(r.prototype.setCapability = function (t, e) {
				switch (t) {
					case "manifest_formats":
						throw new TypeError('Cannot change capability "manifest_formats"');
					default:
						return (
							(this._capabilities[t] = e),
							this.emit(a.DEVICE_DESCRIPTOR_CHANGED, { descriptor: this.toJSON() }),
							!0
						);
				}
			}),
			(r.prototype.getCapability = function (t) {
				switch (t) {
					case "manifest_formats":
						throw new TypeError("Use `descriptor.getManifestFormats()`.");
					default:
						return this._capabilities[t];
				}
			}),
			(r.prototype.setName = function (t) {
				return (this._name = t), this.emit(a.DEVICE_DESCRIPTOR_CHANGED, { descriptor: this.toJSON() }), !0;
			}),
			(r.prototype.getName = function () {
				return this._name;
			}),
			(r.prototype.getPlatformIdentifier = function () {
				return this._platformIdentifier || ["Partner", this._brand, this._model].join(" ");
			}),
			(r.prototype.getPlatformVersion = function () {
				return this._platformVersion;
			}),
			(r.prototype.getManifestFormats = function () {
				return this._capabilities.manifest_formats || [];
			}),
			(r.prototype.appendManifestFormat = function () {
				var t = Array.prototype.slice.call(arguments),
					e = this._capabilities.manifest_formats;
				Array.isArray(e) && e.push.apply(e, t);
			}),
			(r.prototype.toJSON = function () {
				return {
					id: this._id,
					type: this._type,
					brand: this._brand,
					model: this._model,
					name: this._name,
					platform_identifier: this._platformIdentifier,
					platform_version: this._platformVersion,
					metadata: n(this._metadata),
					capabilities: n(this._capabilities),
				};
			}),
			(r.prototype.toTrackPlaybackJSON = function () {
				return {
					device_id: this._id,
					device_type: this._type,
					brand: this._brand,
					model: this._model,
					name: this._name,
					platform_identifier: this._platformIdentifier,
					platform_version: this._platformVersion,
					metadata: n(this._metadata),
					capabilities: n(this._capabilities),
				};
			}),
			(t.exports = r);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			return t.hasOwnerRef(e)
				? t.connect()
				: o.reject(
						new _(
							a.TRANSPORT_LIFECYCLE_DISABLED,
							"Method `connect` must be called from the Transport instance."
						)
				  );
		}
		function r(t, e) {
			return t.hasOwnerRef(e)
				? t.disconnect()
				: o.reject(
						new _(
							a.TRANSPORT_LIFECYCLE_DISABLED,
							"Method `disconnect` must be called from the Transport instance."
						)
				  );
		}
		function s(t, e) {
			return t.hasOwnerRef(e)
				? t.forceDisconnect()
				: o.reject(
						new _(
							a.TRANSPORT_LIFECYCLE_DISABLED,
							"Method `forceDisconnect` must be called from the Transport instance."
						)
				  );
		}
		var o = i(0),
			a = i(9),
			_ = i(69);
		t.exports = { connectIfOwned: n, disconnectIfOwned: r, forceDisconnectIfOwned: s };
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			Error.call(this, t), (this.code = t), (this.message = e);
		}
		(n.prototype = new Error()),
			(n.prototype.constructor = n),
			(n.prototype.name = "TransportError"),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			var e = t || {};
			if (!t.transport) throw new TypeError("Logger `option.transport` must be a valid transport.");
			(this._transport = e.transport),
				(this._endpoint = e.endpoint || u),
				(this._sdkId = null),
				(this._platformId = null),
				(this._clientVersion = null),
				(this._sdkIdPromise = r.resolve(e.sdkId || "transport:1.0.0")),
				(this._platformPromise = r.resolve(e.platform || "spotify-transport")),
				(this._clientVersionPromise = r.resolve(e.clientVersion || "0.0.0")),
				(this._allowUnauthenticated = e.allowUnauthenticated);
		}
		var r = i(0),
			s = i(8),
			o = i(71),
			a = i(72),
			_ = i(73),
			c = i(9),
			u = "https://@webgate/melody",
			h = { UNKNOWN: "unknown", EMPTY: "", ZERO: 0, EMPTY_VERSION: "0.0.0" },
			d = {
				CLIENT_EVENT: { url: "/v1/logging/client_event" },
				ELAPSED_TIME: { url: "/v1/logging/elapsed_time" },
				JSSDK_ERROR: { url: "/v1/logging/jssdk_error", allowUnauthenticated: !0 },
				JSSDK_INTERVAL_TIMER: { url: "/v1/logging/jssdk_interval_timer" },
				JSSDK_PLAYBACK_STATS: { url: "/v1/logging/jssdk_playback_stats", allowUnauthenticated: !0 },
				JSSDK_STALL: { url: "/v1/logging/jssdk_stall", allowUnauthenticated: !0 },
				JSSDK_TIMER: { url: "/v1/logging/jssdk_timer" },
				JSSDK_WARNING: { url: "/v1/logging/jssdk_warning", allowUnauthenticated: !0 },
				TRACK_STREAM_VERIFICATION: { url: "/v1/logging/track_stream_verification" },
				METRICS: { url: "/v1/metric" },
			};
		(n.create = function (t) {
			return new n(t);
		}),
			(n.prototype._getIdentData = function () {
				return this._platformId && this._sdkId
					? r.resolve({
							platform: this._platformId,
							sdk_id: this._sdkId,
							client_version: this._clientVersion,
					  })
					: r.all([this._platformPromise, this._sdkIdPromise, this._clientVersionPromise]).spread(
							function (t, e, i) {
								return (
									(this._platformId = t),
									(this._sdkId = e),
									(this._clientVersion = i),
									r.resolve({ platform: t, sdk_id: e, client_version: i })
								);
							}.bind(this)
					  );
			}),
			(n.prototype._decoratePayload = function (t) {
				return this._getIdentData().then(function (e) {
					return (t.sdk_id = e.sdk_id), (t.platform = e.platform), (t.client_version = e.client_version), t;
				});
			}),
			(n.prototype._sendLog = function (t, e) {
				var i = !this._allowUnauthenticated || !t.allowUnauthenticated || this._transport.isAuthenticated();
				console.log("_sendLog", e);
				return this._transport
					.request(this._endpoint + t.url, {
						method: "POST",
						authorize: i,
						payload: JSON.stringify(e),
						retry: {
							maxRetries: 5,
							condition: function (t) {
								return t.status !== s.ACCEPTED;
							},
						},
					})
					.then(function (t) {
						var e = t.status;
						return (
							e === s.ACCEPTED ||
							r.reject(new _(c.LOGGING_REQUEST_FAILED, "Logging service responded with status " + e, e))
						);
					});
			}),
			(n.prototype._logErrorVariant = function (t, e, i) {
				var n = {
					sdk_id: null,
					platform: null,
					source: e.source || h.UNKNOWN,
					source_version: e.source_version || h.UNKNOWN,
					type: e.type || h.UNKNOWN,
					message: e.message || h.EMPTY,
					stack: JSON.stringify(e.stack || h.EMPTY),
					json_data: "json" === i ? e.json_data || "{}" : JSON.stringify(e.json_data || {}),
					json_data_version: e.json_data_version || h.EMPTY_VERSION,
				};
				return this._decoratePayload(n).then(this._sendLog.bind(this, t));
			}),
			(n.prototype.createStepTimer = function (t) {
				return a.create(t, this);
			}),
			(n.prototype.createIntervalTimer = function (t, e) {
				return o.create(t, e, this);
			}),
			(n.prototype.logClientEvent = function (t, e) {
				if (!t) return r.reject(new TypeError("Logger.logClientEvent `data` cannot be null."));
				var i = {
					sdk_id: null,
					platform: null,
					source: t.source || h.UNKNOWN,
					context: t.context || h.UNKNOWN,
					event: t.event || h.UNKNOWN,
					event_version: t.event_version || h.EMPTY,
					test_version: t.test_version || h.EMPTY,
					source_version: t.source_version || h.UNKNOWN,
					source_vendor: t.source_vendor || h.UNKNOWN,
					json_data: "json" === e ? t.json_data || "{}" : JSON.stringify(t.json_data || {}),
				};
				return this._decoratePayload(i).then(this._sendLog.bind(this, d.CLIENT_EVENT));
			}),
			(n.prototype.logElapsedTime = function (t) {
				if (!t) return r.reject(new TypeError("Logger.logElapsedTime `data` cannot be null."));
				var e = this._transport,
					i = {
						sdk_id: null,
						platform: null,
						unique_id: t.unique_id || e.getInitTime(),
						event: t.event || h.UNKNOWN,
						elapsed_time: t.elapsed_time || h.ZERO,
					};
				return this._decoratePayload(i).then(this._sendLog.bind(this, d.ELAPSED_TIME));
			}),
			(n.prototype.logJSSDKError = function (t, e) {
				return t
					? this._logErrorVariant(d.JSSDK_ERROR, t, e)
					: r.reject(new TypeError("Logger.logJSSDKError `data` cannot be null."));
			}),
			(n.prototype.logJSSDKWarning = function (t, e) {
				return t
					? this._logErrorVariant(d.JSSDK_WARNING, t, e)
					: r.reject(new TypeError("Logger.logJSSDKWarning `data` cannot be null."));
			}),
			(n.prototype.logJSSDKPlaybackStats = function (t) {
				if (!t) return r.reject(new TypeError("Logger.logJSSDKPlaybackStats `data` cannot be null."));
				var e = {
					sdk_id: null,
					platform: null,
					play_track: t.play_track,
					file_id: t.file_id,
					playback_id: t.playback_id,
					internal_play_id: t.internal_play_id,
					memory_cached: t.memory_cached,
					persistent_cached: t.persistent_cached,
					audio_format: t.audio_format,
					video_format: t.video_format,
					manifest_id: t.manifest_id,
					protected: t.isProtected,
					key_system: t.key_system,
					key_system_impl: t.key_system_impl,
					urls_json: t.urls_json,
					start_time: t.start_time,
					end_time: t.end_time,
					external_start_time: t.external_start_time,
					ms_play_latency: t.ms_play_latency,
					ms_init_latency: t.ms_init_latency,
					ms_head_latency: t.ms_head_latency,
					ms_manifest_latency: t.ms_manifest_latency,
					ms_resolve_latency: t.ms_resolve_latency,
					ms_license_generation_latency: t.ms_license_generation_latency,
					ms_license_request_latency: t.ms_license_request_latency,
					ms_license_session_latency: t.ms_license_session_latency,
					ms_license_update_latency: t.ms_license_update_latency,
					ms_played: t.ms_played,
					ms_nominal_played: t.ms_nominal_played,
					ms_file_duration: t.ms_file_duration,
					ms_actual_duration: t.ms_actual_duration,
					ms_start_position: t.ms_start_position,
					ms_end_position: t.ms_end_position,
					ms_seek_rebuffer: t.ms_seek_rebuffer,
					ms_seek_rebuffer_longest: t.ms_seek_rebuffer_longest,
					ms_stall_rebuffer: t.ms_stall_rebuffer,
					ms_stall_rebuffer_longest: t.ms_stall_rebuffer_longest,
					n_stalls: t.n_stalls,
					n_seekback: t.n_seekback,
					n_seekforward: t.n_seekforward,
					start_bitrate: t.start_bitrate,
					time_weighted_bitrate: t.time_weighted_bitrate,
					reason_start: t.reason_start,
					reason_end: t.reason_end,
					initially_paused: t.initially_paused,
					had_error: t.had_error,
					n_warnings: t.n_warnings,
					n_navigator_offline: t.n_navigator_offline,
					session_id: t.sessionId,
					sequence_id: t.sequenceId,
				};
				return this._decoratePayload(e).then(this._sendLog.bind(this, d.JSSDK_PLAYBACK_STATS));
			}),
			(n.prototype.logJSSDKStall = function (t) {
				if (!t) return r.reject(new TypeError("Logger.logJSSDKStall `data` cannot be null."));
				var e = {
					sdk_id: null,
					platform: null,
					session_id: t.session_id || h.EMPTY,
					playback_id: t.playback_id || h.EMPTY,
					play_track: t.play_track || h.EMPTY,
					file_id: t.file_id || h.EMPTY,
					byte_offset: t.byte_offset || h.ZERO,
					time_offset: t.time_offset || h.ZERO,
					ms_stalled: t.ms_stalled || h.ZERO,
					timed_out: !!t.timed_out,
				};
				return this._decoratePayload(e).then(this._sendLog.bind(this, d.JSSDK_STALL));
			}),
			(n.prototype.logJSSDKTimer = function (t, e) {
				if (!t) return r.reject(new TypeError("Logger.logJSSDKTimer `data` cannot be null."));
				if (!Array.isArray(t.breakdown))
					return r.reject(new TypeError("Logger.logJSSDKTimer `data.breakdown` must be an array."));
				var i = {
					sdk_id: null,
					platform: null,
					timer_name: t.timer_name || h.EMPTY,
					ms_duration: t.ms_duration || h.ZERO,
					breakdown: JSON.stringify(t.breakdown),
					breakdown_version: t.breakdown_version || h.EMPTY_VERSION,
					json_data: "json" === e ? t.json_data || "{}" : JSON.stringify(t.json_data || {}),
					json_data_version: t.json_data_version || h.EMPTY_VERSION,
				};
				return this._decoratePayload(i).then(this._sendLog.bind(this, d.JSSDK_TIMER));
			}),
			(n.prototype.logJSSDKIntervalTimer = function (t) {
				if (!t) return r.reject(new TypeError("Logger.logJSSDKIntervalTimer `data` cannot be null."));
				var e = {
					sdk_id: null,
					platform: null,
					timer_name: t.name || h.EMPTY,
					timer_id: t.id || h.EMPTY,
					intervals: t.intervals,
				};
				return this._decoratePayload(e).then(this._sendLog.bind(this, d.JSSDK_INTERVAL_TIMER));
			}),
			(n.prototype.logTrackStreamVerification = function (t) {
				if (!t) return r.reject(new TypeError("Logger.logTrackStreamVerification `data` cannot be null."));
				var e = {
					sdk_id: null,
					platform: null,
					play_track: t.play_track,
					playback_id: t.playback_id,
					ms_played: t.ms_played,
					session_id: t.session_id,
					sequence_id: t.sequence_id,
					next_playback_id: t.next_playback_id,
				};
				return this._decoratePayload(e).then(this._sendLog.bind(this, d.TRACK_STREAM_VERIFICATION));
			}),
			(n.prototype.logMetrics = function (t, e) {
				if (!t && !e) return r.resolve(!0);
				var i = t || [],
					n = e || [];
				if (!i.length && !n.length) return r.resolve(!0);
				if (!Array.isArray(i) || !Array.isArray(n))
					return r.reject(new TypeError("Logger.logMetrics `meters` and `timers` must be null or an array."));
				var s, o;
				for (s = 0, o = i.length; s < o; s++) {
					var a = i[s];
					if (!("what" in a && "result" in a && "reason" in a))
						return r.reject(new TypeError("Logger.logMetrics: Invalid meter format in `meters` array."));
				}
				for (s = 0, o = n.length; s < o; s++) {
					var _ = n[s];
					if (!("what" in _ && "duration" in _))
						return r.reject(new TypeError("Logger.logMetrics: Invalid timer format in `timers` array."));
				}
				var c = { sdk_id: null, platform: null, meters: i, timers: n };
				return this._decoratePayload(c).then(this._sendLog.bind(this, d.METRICS));
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t, e, i) {
				(this._name = t), (this._id = e), (this._logger = i), (this._intervals = {});
			}
			var r = i(5).forTag("transport.intervaltimer"),
				s = void 0 !== e.performance && "function" == typeof e.performance.now,
				o = function () {
					return s ? performance.now() : Date.now();
				};
			(n.prototype.start = function (t) {
				t in this._intervals && r.warn("Overriding already started interval"),
					(this._intervals[t] = { start: o(), end: null });
			}),
				(n.prototype.end = function (t) {
					t in this._intervals && !this._intervals[t].end
						? (this._intervals[t].end = o())
						: r.warn("Tried to end an invalid interval");
				}),
				(n.prototype.getIntervals = function () {
					return this._intervals;
				}),
				(n.prototype.sendLog = function () {
					var t = { name: this._name, id: this._id, intervals: this._intervals },
						e = this.clear.bind(this);
					return this._logger.logJSSDKIntervalTimer(t).then(e, e);
				}),
				(n.prototype.clear = function () {
					return (this._intervals = {}), this;
				}),
				(n.create = function (t, e, i) {
					return new n(t, e, i);
				}),
				(t.exports = n);
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function i(t, e) {
				(this._name = t),
					(this._logger = e),
					(this._steps = []),
					(this._stepMap = {}),
					(this._rootStep = null),
					(this._lastStep = null),
					(this._calculated = null);
			}
			var n = void 0 !== e.performance && "function" == typeof e.performance.now;
			(i.create = function (t, e) {
				return new i(t, e);
			}),
				(i.prototype._walkStepTree = function (t) {
					for (var e = [], i = 0, n = 0, r = t.children, s = 0; s < r.length; s++) {
						var o = r[s],
							a = Math.ceil(o.timestamp - t.timestamp);
						(n = Math.max(a, n)),
							e.push({ name: o.name, ms_duration: a, parent: "__init__" === t.name ? null : t.name });
						var _ = this._walkStepTree(o);
						(i += _.ms_duration), e.push.apply(e, _.breakdown);
					}
					return (i += n), { ms_duration: i, breakdown: e };
				}),
				(i.prototype._getTimestamp = function () {
					return n ? performance.now() : Date.now();
				}),
				(i.prototype.start = function () {
					if (this._lastStep) throw new Error("StepTimer already started.");
					return (this._rootStep = this._createStep("__init__")), this;
				}),
				(i.prototype._createStep = function (t, e) {
					var i = { name: t, timestamp: this._getTimestamp(), children: [] };
					return (
						(this._stepMap[i.name] = i),
						e && e.children.push(i),
						(this._lastStep = i),
						(this._calculated = null),
						i
					);
				}),
				(i.prototype.markStep = function (t) {
					return this.markStepFrom(this._lastStep && this._lastStep.name, t);
				}),
				(i.prototype.markStepFrom = function (t, e) {
					if (!this._lastStep) throw new TypeError("Cannot add step to a non-started StepTimer.");
					if (e in this._stepMap) return this;
					var i = t ? this._stepMap[t] : this._rootStep;
					return i ? (this._createStep(e, i), this) : this;
				}),
				(i.prototype.calculate = function () {
					if (this._calculated) return this._calculated;
					var t = this._walkStepTree(this._rootStep),
						e = {
							timer_name: this._name,
							ms_duration: Math.ceil(t.ms_duration),
							breakdown: t.breakdown,
							breakdown_version: "1.0.0",
						};
					return (this._calculated = e), e;
				}),
				(i.prototype.sendLog = function (t, e) {
					var i = t || {},
						n = this.calculate();
					return (
						(n.json_data = i.json_data),
						(n.json_data_version = i.json_data_version),
						this._logger.logJSSDKTimer(n, e)
					);
				}),
				(t.exports = i);
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		function n(t, e, i) {
			Error.call(this), (this.message = e), (this.code = t), (this.status = i || 0);
		}
		(n.prototype = new Error()),
			(n.prototype.constructor = n),
			(n.prototype.name = "LoggingError"),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n() {
				var t = new e.Uint8Array(16);
				return e.crypto.getRandomValues(t), o.toHex(t.join(""), 40).slice(0, 40);
			}
			function r() {
				for (var t = new Array(27), e = t.length; e--; ) t[e] = Math.floor(8 * Math.random());
				return o.toHex(t.join(""), 40);
			}
			function s(t, i) {
				if (t && "string" == typeof t) return t;
				if (i) return _();
				var n = e.localStorage.getItem(c);
				return n || ((n = _()), e.localStorage.setItem(c, n)), n;
			}
			var o = i(29),
				a =
					"function" == typeof e.Uint8Array &&
					void 0 !== e.crypto &&
					"function" == typeof e.crypto.getRandomValues,
				_ = a ? n : r,
				c = "_spharmony_device_id";
			t.exports = { get: s, generate: _, generateWithCrypto: n, generateWithRandom: r };
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			var n = i(76);
			t.exports = function (t) {
				if (!t) return t;
				var i = n(e.navigator.userAgent, e.navigator.platform);
				return t.replace(/\{\{([^}]+?)\}\}/g, function (t, e) {
					return e in i ? i[e] : "";
				});
			};
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		var n = /(edge)[\s\/:]([\w\d\.]+)/,
			r = new RegExp(
				"(opera|ie|firefox|chrome|trident|crios|version)[\\s/:]([\\w\\d\\.]+)?.*?(safari|(?:rv[\\s\\/:]|version[\\s\\/:])([\\w\\d\\.]+)|$)"
			),
			s = {};
		t.exports = function (t, e) {
			var i = t.toLowerCase(),
				o = e ? e.toLowerCase() : "",
				a = i + ":" + o;
			if (a in s) return s[a];
			var _ = i.match(n);
			_ || (_ = i.match(r) || [null, "unknown", 0]),
				"trident" === _[1] ? ((_[1] = "ie"), _[4] && (_[2] = _[4])) : "crios" === _[1] && (_[1] = "chrome"),
				"win" ===
					(o = i.match(/ip(?:ad|od|hone)/)
						? "ios"
						: (i.match(/(?:webos|android)/) || i.match(/mac|win|linux|cros/) || ["other"])[0]) &&
					(o = "windows");
			var c = {
				name: "version" === _[1] ? _[3] : _[1],
				version: parseFloat("opera" === _[1] && _[4] ? _[4] : _[2]),
				platform: o || "unknown",
			};
			return (s[a] = c), c;
		};
	},
	function (t, e, i) {
		"use strict";
		t.exports = function (t) {
			return t.replace(/\b[a-z]/g, function (t) {
				return t.toUpperCase();
			});
		};
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			(this.code = t), (this.message = e), (this.status = -1), (this.debug = {});
		}
		(n.prototype = new Error()),
			(n.prototype.constructor = new n()),
			(n.prototype.name = "HarmonyError"),
			(n.prototype.fatal = function () {
				return (this.unrecoverable = !0), this;
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			var i = e || {},
				n = t.getSDKId(),
				d = t.getPublicTransport(),
				l = t.getLogger(),
				p = t.getABBAClient(),
				E = t.getDeviceDescriptor(),
				f = "initialVolume" in i ? i.initialVolume : 1;
			(i.sdkId = t.getUntaggedSDKId()), (i.logger = l);
			var T = o.createACMEPlayer(d, i).then(function (t) {
					return t.player;
				}),
				y = T.then(function (t) {
					return t.getKeySystemInfo();
				})
					.then(function (t) {
						return { keySystem: t.keySystem, supportsVideo: !!t.videoFormats.length };
					})
					.catch(function () {
						return { keySystem: "", supportsVideo: !1 };
					}),
				m = r.all([E, y]).spread(function (t, e) {
					return (
						t.getCapability("audio_podcasts") &&
							!i.disableExternalFiles &&
							t.appendManifestFormat(u.FILE_URLS_EXTERNAL),
						e.keySystem !== s.WIDEVINE || i.preferMultiDRMFormat
							? t.appendManifestFormat(u.FILE_IDS_MP4_DUAL, u.FILE_IDS_MP4)
							: t.appendManifestFormat(u.FILE_IDS_MP4, u.FILE_IDS_MP4_DUAL),
						e.supportsVideo &&
							t.getCapability("video_playback") &&
							t.appendManifestFormat(u.MANIFEST_IDS_VIDEO),
						t
					);
				}),
				R = a.create({ trackPlayer: T }),
				S = _.create({
					ListClass: c,
					clientVersion: n,
					transport: d,
					logger: l,
					listPlayer: R,
					descriptor: m,
					endpoint: i.endpoint,
					abbaClient: p,
					initialVolume: f,
				});
			return new h({
				client: t,
				descriptor: m,
				listPlayer: R,
				tpApiClient: S,
				playerPromise: T,
				initialVolume: f,
			});
		}
		var r = i(0),
			s = i(14),
			o = i(80),
			a = i(107),
			_ = i(112),
			c = i(114),
			u = i(16),
			h = i(116);
		t.exports = {
			forClient: n,
			of: function (t) {
				return t._streamer;
			},
		};
	},
	function (t, e, i) {
		"use strict";
		var n = i(0),
			r = i(81),
			s = i(95),
			o = i(98),
			a = i(99),
			_ = i(103),
			c = i(104),
			u = i(106);
		t.exports = {
			createACMEPlayer: function (t, e) {
				return new n(function (i, n) {
					if (!t) return void n(new TypeError("Argument transport is required."));
					var h = e || {};
					if (!h.logger) return void n(new TypeError("Argument `options.logger` is required."));
					var d = h.createPlayer || null,
						l = h.videoPlayerContainer || null,
						p = a.create(),
						E = new o(t),
						f = new _(t),
						T = (h.sdkId || "").split(":"),
						y = new c({
							transport: t,
							sdk: { name: T[0] || "", version: T[1] || "" },
							securityLevel: h.securityLevel,
						});
					h.ensureEMERobustness &&
						(h.disallowRobustnessValues || (h.disallowRobustnessValues = []),
						h.disallowRobustnessValues.push(u.EMPTY));
					var m = {
						transport: t,
						createPlayer: d,
						videoPlayerContainer: l,
						tracker: p,
						audioResolver: E,
						videoResolver: f,
						licenseURLResolver: y,
						trackCacheSize: h.trackCacheSize,
						disallowRobustnessValues: h.disallowRobustnessValues,
						synthesizeEnded: h.synthesizeEnded,
						noServerCertificate: h.noServerCertificate,
						preferredKeySystems: h.preferredKeySystems,
						newElementPerTrack: h.newElementPerTrack,
						newBufferPerTrack: !("newBufferPerTrack" in h) || h.newBufferPerTrack,
						newMediaKeysPerTrack: h.newMediaKeysPerTrack,
						clearBufferOnSeek: h.clearBufferOnSeek,
						rebufferOnQuotaExceeded: h.rebufferOnQuotaExceeded,
						disableCache: h.disableCache,
						cubicVolume: h.cubicVolume,
						disallowProtectedTracks: h.disallowProtectedTracks,
					};
					r.create(m)
						.then(function (e) {
							return { player: e, logger: s.create({ transport: t, player: e, logger: h.logger }) };
						})
						.then(i, n);
				});
			},
		};
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t) {
				return document.createElement(t);
			}
			function r(t) {
				return Math.ceil(1e3 * t);
			}
			function s(t) {
				return t / 1e3;
			}
			function o(t) {
				_.call(this),
					(this.id = t.id),
					(this._createPlayer = t.createPlayer || n),
					(this._videoPlayerContainer = t.videoPlayerContainer || null),
					(this._subtitlesVisible = !1),
					(this._cubicVolume = t.cubicVolume),
					(this._subtitleLanguage = ""),
					(this._audioResolver = t.audioResolver),
					(this._videoResolver = t.videoResolver),
					(this._licenseURLResolver = t.licenseURLResolver),
					(this._player = null),
					(this._emeManager = t.disallowProtectedTracks ? null : t.emeManager),
					(this._tracker = t.tracker),
					(this._activeCodecs = ""),
					(this._cache = new u(t.trackCacheSize || g)),
					h.info("Setting ACMEPlayer track cache to:", t.trackCacheSize || g),
					(this._synthesizeEnded = t.synthesizeEnded),
					(this._newElementPerTrack = t.newElementPerTrack),
					(this._newBufferPerTrack = t.newBufferPerTrack),
					(this._newMediaKeysPerTrack = t.newMediaKeysPerTrack),
					(this._clearBufferOnSeek = t.clearBufferOnSeek),
					(this._rebufferOnQuotaExceeded = t.rebufferOnQuotaExceeded),
					(this._disableCache = t.disableCache),
					(this._acmeTrack = null),
					(this._upcomingACMETrack = null),
					(this._lastLoadedTS = 0),
					(this._preloadingTracks = {}),
					(this._playId = 0),
					(this._loaded = !1),
					(this._pauseToken = null),
					(this._syntheticEndedToken = null),
					(this._transport = t.transport),
					(this._canPreloadEmitted = !1),
					(this._playerVolume = 1),
					(this._fatalOnNextError = !1),
					(this._lastTimeUpdatePostion = 0),
					(this._onCanPlay = this._onCanPlay.bind(this)),
					(this._onCanPlayThrough = this._onCanPlayThrough.bind(this)),
					(this._onTimeUpdate = this._onTimeUpdate.bind(this)),
					(this._onDurationChange = this._onDurationChange.bind(this)),
					(this._onPlaying = this._onPlaying.bind(this)),
					(this._onPause = this._onPause.bind(this)),
					(this._onSeeking = this._onSeeking.bind(this)),
					(this._onEncrypted = this._onEncrypted.bind(this)),
					(this._onEnded = this._onEnded.bind(this)),
					(this._onError = this._onError.bind(this)),
					(this._onRequiresDuration = this._onRequiresDuration.bind(this)),
					(this._onQuotaExceeded = this._onQuotaExceeded.bind(this)),
					(this._onLoadedMetadata = this._onLoadedMetadata.bind(this)),
					(this._onWaiting = this._onWaiting.bind(this)),
					this.proxyEmitSync(this._tracker, T.TRACKER_TRACKING_DATA_CREATED, T.PLAYER_TRACKING_DATA_CREATED),
					this.proxyEmitSync(
						this._tracker,
						T.TRACKER_TRACKING_DATA_FINALIZED,
						T.PLAYER_TRACKING_DATA_FINALIZED
					),
					this._tracker.on(T.TRACKER_PLAYED_THRESHOLD_REACHED, this._onPlayedThresholdReached.bind(this)),
					this._emeManager &&
						(this._emeManager.on(T.EME_LICENSE_REQUEST_CAPPED, this._onLicenseRequestCapped.bind(this)),
						this._emeManager.on(T.EME_LICENSE_REQUEST_ERROR, this._onLicenseRequestError.bind(this))),
					this._init();
			}
			var a = i(2),
				_ = i(3),
				c = i(0),
				u = i(82),
				h = i(5).forTag("playback.acme_player"),
				d = i(17),
				l = i(18),
				p = i(83),
				E = i(85),
				f = i(86),
				T = i(7),
				y = i(87),
				m = i(94),
				R = i(4),
				S = i(36),
				g = 2,
				A = /^blob:/,
				v = { SHOWING: "showing", HIDDEN: "hidden" };
			a(o, _),
				(o.prototype._onLicenseRequestError = function (t) {
					if (t.playId === this._playId) {
						var e = this._acmeTrack;
						if (e) {
							var i = t.error;
							i.shouldRefreshEndpoint &&
								this._licenseURLResolver.remove(e.getKeySystem(), e.getMediaType()),
								this._emitError(i, !i.unrecoverable, e.toLogJSON());
						}
					}
				}),
				(o.prototype._onLicenseRequestCapped = function (t) {
					if (t.playId === this._playId) {
						this._acmeTrack && (this.pause(), this.emit(T.PLAYER_CAPPED));
					}
				}),
				(o.create = function (t) {
					return t.disableProtection
						? o.createWithOptions(t)
						: y
								.create({
									transport: t.transport,
									disallowRobustnessValues: t.disallowRobustnessValues,
									noServerCertificate: t.noServerCertificate,
									preferredKeySystems: t.preferredKeySystems,
								})
								.then(function (e) {
									return (t.emeManager = e), new o(t);
								});
				}),
				(o.createWithOptions = function (t) {
					return new c(function (e) {
						e(new o(t));
					});
				}),
				(o.prototype._init = function () {
					this._disableCache && h.info("Cache disabled."),
						this._transport.on(
							this._transport.EVENT_CONNECTION_OFFLINE,
							this._onNavigatorOffline.bind(this)
						),
						(this._abrManager = new p()),
						(this._buffer = m.create(this._tracker)),
						this._buffer.on(T.BUFFER_APPEND_ERROR, this._onBufferError.bind(this)),
						this._buffer.on(T.BUFFER_QUOTA_EXCEEDED, this._onQuotaExceeded),
						this.proxyEmit(this._buffer, T.BUFFER_STALLED, T.PLAYER_BUFFER_STALLED),
						this.proxyEmit(this._buffer, T.BUFFERING_START, T.PLAYER_BUFFERING_START),
						this.proxyEmit(this._buffer, T.BUFFERING_END, T.PLAYER_BUFFERING_END);
				}),
				(o.prototype._onNavigatorOffline = function () {
					this._tracker.trackNavigatorOffline();
				}),
				(o.prototype._onBufferError = function (t) {
					this._emitError(t.error, t.canPlayNext, t.track);
				}),
				(o.prototype._addPlayerEvents = function (t) {
					t.addEventListener(T.MEDIA_TIMEUPDATE, this._onTimeUpdate),
						t.addEventListener(T.MEDIA_PLAYING, this._onPlaying),
						t.addEventListener(T.MEDIA_PAUSE, this._onPause),
						t.addEventListener(T.MEDIA_SEEKING, this._onSeeking),
						t.addEventListener(T.MEDIA_ENCRYPTED, this._onEncrypted),
						t.addEventListener(T.MEDIA_ENDED, this._onEnded),
						t.addEventListener(T.MEDIA_ERROR, this._onError),
						t.addEventListener(T.MEDIA_LOADEDMETADATA, this._onLoadedMetadata),
						t.addEventListener(T.MEDIA_DURATIONCHANGE, this._onDurationChange),
						t.addEventListener(T.MEDIA_WAITING, this._onWaiting),
						t.addEventListener(T.MEDIA_CANPLAY, this._onCanPlay),
						t.addEventListener(T.MEDIA_CANPLAYTHROUGH, this._onCanPlayThrough),
						t.addEventListener(T.INTERNAL_MEDIA_REQUIRES_DURATION, this._onRequiresDuration);
				}),
				(o.prototype._removePlayerEvents = function (t) {
					t.removeEventListener(T.MEDIA_TIMEUPDATE, this._onTimeUpdate),
						t.removeEventListener(T.MEDIA_PLAYING, this._onPlaying),
						t.removeEventListener(T.MEDIA_PAUSE, this._onPause),
						t.removeEventListener(T.MEDIA_SEEKING, this._onSeeking),
						t.removeEventListener(T.MEDIA_ENCRYPTED, this._onEncrypted),
						t.removeEventListener(T.MEDIA_ENDED, this._onEnded),
						t.removeEventListener(T.MEDIA_ERROR, this._onError),
						t.removeEventListener(T.MEDIA_WAITING, this._onWaiting),
						t.removeEventListener(T.MEDIA_CANPLAY, this._onCanPlay),
						t.removeEventListener(T.MEDIA_CANPLAYTHROUGH, this._onCanPlayThrough),
						t.removeEventListener(T.MEDIA_LOADEDMETADATA, this._onLoadedMetadata),
						t.removeEventListener(T.MEDIA_DURATIONCHANGE, this._onDurationChange),
						t.removeEventListener(T.INTERNAL_MEDIA_REQUIRES_DURATION, this._onRequiresDuration);
				}),
				(o.prototype._recreateMediaElement = function (t, e, i, n) {
					if (i !== this._playId)
						return h.info("Recreate player dropped: playId has changed."), c.resolve(!1);
					var r = this._activeCodecs === e.join(""),
						s = this._player;
					if (s) {
						if (!this._newElementPerTrack) {
							for (var o = !0, a = 0, _ = e.length; a < _; a++)
								if ("probably" !== s.canPlayType(e[a])) {
									o = !1;
									break;
								}
							if (r && o && s.withProtection)
								return (
									h.info("Reusing old audio player with default protection."),
									this._newBufferPerTrack && (h.info("Recreating buffer."), this._buffer.recreate(e)),
									c.resolve(!0)
								);
							if (r && s.withProtection === t)
								return (
									h.info("Reusing old audio player with variable protection."),
									this._newBufferPerTrack && (h.info("Recreating buffer."), this._buffer.recreate(e)),
									c.resolve(!0)
								);
						}
						this._removePlayerEvents(s),
							s.pause(),
							this._emeManager &&
								this._emeManager.removeMediaKeys(s).catch(function (t) {
									h.warn("Failed to remove media keys.", t);
								}),
							(this._player = null);
					}
					h.info("Creating new media element.");
					var u = this._createPlayer(n),
						d = this._playerVolume;
					return (
						(u.autoplay = !1),
						(u.loop = !1),
						(u.volume = this._cubicVolume ? d * d * d : d),
						(u.withProtection = t),
						(this._player = u),
						this._addPlayerEvents(u),
						this._buffer.recreate(e),
						(this._activeCodecs = e.join("")),
						c.resolve(!0)
					);
				}),
				(o.prototype._getVideoContainer = function () {
					return "string" == typeof this._videoPlayerContainer
						? document.querySelector(this._videoPlayerContainer)
						: this._videoPlayerContainer || null;
				}),
				(o.prototype.getVideoProfiles = function () {
					if (!this._acmeTrack || "video" !== this._acmeTrack.getMediaType()) return [];
					for (var t = [], e = this._acmeTrack.getVideoProfiles(), i = 0, n = e.length; i < n; i++) {
						var r = e[i];
						t.push({ width: r.video_width, height: r.video_height, bitrate: r.video_bitrate });
					}
					return t;
				}),
				(o.prototype.setPreferredBitrate = function (t) {
					return "number" != typeof t
						? c.resolve(d.INVALID)
						: (this._acmeTrack &&
								"video" === this._acmeTrack.getMediaType() &&
								t > 0 &&
								this._buffer.abort(!0),
						  this._abrManager.overrideBitrate(t),
						  c.resolve(d.SUCCESS));
				}),
				(o.prototype._createAudioTrack = function (t, e) {
					var i = { manifestLatency: 0, resolveLatency: 0 };
					return (this._emeManager
						? this._emeManager.getKeySystemInfo()
						: c.resolve({ keySystem: "com.spotify.invalid" })
					)
						.then(
							function (n) {
								return E.create({
									abrManager: this._abrManager,
									keySystem: n.keySystem,
									licenseEndpoint: e.licenseEndpoint,
									transport: this._transport,
									resolver: this._audioResolver,
									uri: t,
									fileId: e.fileId,
									format: e.format,
									isAd: e.isAd,
									resolvedURL: e.resolvedURL,
									noManifest: e.noManifest,
									preloadedManifest: e.preloadedManifest,
									logData: e.logData,
									disableCache: this._disableCache,
									emitWarning: this._emitWarning.bind(this),
								}).load(i);
							}.bind(this)
						)
						.then(
							function (t) {
								var n = this._tracker;
								return (
									n.setResolveLatency(i.resolveLatency),
									n.setManifestLatency(i.manifestLatency),
									t.isProtected() && e.fileId && !this._disableCache && this._cache.set(e.fileId, t),
									t
								);
							}.bind(this)
						);
				}),
				(o.prototype._createVideoTrack = function (t) {
					var e = { manifestLatency: 0, resolveLatency: 0 },
						i = t.fileId;
					return this._emeManager
						.getKeySystemInfo()
						.then(
							function (n) {
								var r = n.audioFormats[0],
									s = n.videoFormats[0];
								return f
									.create({
										abrManager: this._abrManager,
										resolver: this._videoResolver,
										keySystem: n.keySystem,
										licenseEndpoint: t.licenseEndpoint,
										fileId: i,
										isAd: t.isAd,
										transport: this._transport,
										videoCodec: s.codec,
										videoMimeType: s.mimeType,
										audioCodec: r.codec,
										audioMimeType: r.mimeType,
										disableCache: this._disableCache,
									})
									.load(e);
							}.bind(this)
						)
						.then(
							function (t) {
								var n = this._tracker;
								return (
									n.setResolveLatency(e.resolveLatency),
									n.setManifestLatency(e.manifestLatency),
									t.isProtected() && i && !this._disableCache && this._cache.set(i, t),
									t
								);
							}.bind(this)
						);
				}),
				(o.prototype._onDurationChange = function () {
					var t = this._playId,
						e = function () {
							if (t !== this._playId) return void h.info("Duration changed drop: playId has changed.");
							var e = r(this._player.duration);
							this._tracker.setActualDuration(e),
								this.emit(T.PLAYER_DURATION_CHANGED, {
									timestamp: Date.now(),
									position: r(this._player.currentTime),
									duration: e,
								});
						}.bind(this);
					this._loaded ? e() : this.once(T.PLAYER_LOAD, e);
				}),
				(o.prototype._onPlaying = function () {
					var t = this._acmeTrack,
						e = r(this._player.currentTime);
					this._tracker.trackPlaying(e),
						this.emit(T.PLAYER_PLAYING, {
							timestamp: Date.now(),
							position: e,
							logData: t ? t.getLogData() : null,
						});
				}),
				(o.prototype._onPause = function () {
					var t = r(this._player.currentTime);
					this._tracker.trackPaused(t);
					var e = this._acmeTrack ? this._acmeTrack.getLogData() : null;
					this._pauseToken = setTimeout(
						function () {
							clearTimeout(this._syntheticEndedToken),
								this.emit(T.PLAYER_PAUSED, { position: t, logData: e });
						}.bind(this),
						10
					);
				}),
				(o.prototype._onSeeking = function () {
					this._buffer.abort(this._clearBufferOnSeek), this._onTimeUpdate();
				}),
				(o.prototype._onRequiresDuration = function () {
					this._acmeTrack &&
						this._acmeTrack.isProtected() &&
						(this._player.duration = this._acmeTrack.getCalculatedDuration());
				}),
				(o.prototype._onQuotaExceeded = function () {
					if (this._rebufferOnQuotaExceeded)
						h.info("Exceeded quota: rebuffering current track."),
							this._buffer.abort(!0),
							(this._player.currentTime = this._player.currentTime),
							this._onTimeUpdate();
					else {
						h.info("Exceeded quota: moving to next track."), this._player.pause(), this._buffer.abort();
						var t = new S(R.PLAYER_BUFFER_QUOTA_EXCEEDED, "Buffer quota exceeded.");
						this._emitError(t, !0, this._acmeTrack ? this._acmeTrack.toLogJSON() : {});
					}
				}),
				(o.prototype._onEncrypted = function () {
					h.info("Got Encrypted event");
				}),
				(o.prototype._onEnded = function () {
					(this._synthesizeEnded && this._acmeTrack.isProtected()) ||
						(h.info("Native ended emitted."), this._emitEnded());
				}),
				(o.prototype._onSyntheticEnded = function () {
					this._synthesizeEnded &&
						this._acmeTrack &&
						this._acmeTrack.isProtected() &&
						(h.info("Synthetic ended emitted."), this._emitEnded());
				}),
				(o.prototype._onError = function () {
					var t = this._player,
						i = t.error,
						n = {},
						r = !1,
						s = this._acmeTrack,
						o = !1;
					s && ((r = s.isProtected()), (n = s.toLogJSON()), (o = s.isAd()), s.clearCachedBuffers());
					var a,
						_,
						c,
						u = !0,
						h = !s || o || !this._fatalOnNextError,
						d = i && i.msExtendedCode ? "0x" + (i.msExtendedCode >>> 0).toString(16).toUpperCase() : null;
					if (i instanceof e.MediaError) {
						var l = e.MediaError;
						switch (i.code) {
							case l.MEDIA_ERR_ABORTED:
								(a = R.MEDIA_ABORTED), (_ = "Media aborted.");
								break;
							case l.MEDIA_ERR_NETWORK:
								(a = R.MEDIA_NETWORK_ERROR), (_ = "Network error.");
								break;
							case l.MEDIA_ERR_DECODE:
								(a = R.MEDIA_DECODING_ERROR), (_ = "Media decoding error."), (u = h);
								break;
							case l.MEDIA_ERR_SRC_NOT_SUPPORTED:
								(a = R.MEDIA_NOT_SUPPORTED), (_ = "Media not supported."), (u = h);
								break;
							default:
								(a = R.PLAYER_MEDIA_ERROR), (_ = "Media error."), (c = !0);
						}
						_ += " (" + (i.message || d || i.toString()) + ")";
					} else
						(a = R.PLAYER_PLAYBACK_ERROR),
							(_ = i ? i.message || i.toString() : "Error message undefined"),
							(c = !0);
					this._buffer.abort(!0);
					var p = new S(a, _);
					u || p.fatal(),
						(p.listPlayerIgnore = o),
						(p.debug.src_url = t.src),
						(p.debug.protected = r),
						(p.debug.extendedCode = d),
						(p.debug.rawExCode = (i && i.msExtendedCode) || null),
						c && i && ((p.debug.nativeCode = i.code || null), (p.debug.errorData = i)),
						this._emitError(p, u, n);
				}),
				(o.prototype._onLoadedMetadata = function () {
					this.emitSync(T.INTERNAL_PLAYER_LOADED_METADATA);
				}),
				(o.prototype._onCanPlay = function () {
					this.emitSync(T.INTERNAL_PLAYER_CANPLAY), this.emit(T.PLAYER_FIRST_BYTES);
				}),
				(o.prototype._onCanPlayThrough = function () {
					this.emitSync(T.INTERNAL_PLAYER_CANPLAYTHROUGH);
				}),
				(o.prototype._onWaiting = function () {
					clearTimeout(this._syntheticEndedToken),
						this._player.seeking ||
							this._getBufferingLatency().then(
								function (t) {
									this._tracker.trackMsStalled(t);
								}.bind(this)
							);
				}),
				(o.prototype._onPlayedThresholdReached = function (t) {
					this._acmeTrack &&
						this.emit(T.PLAYER_PLAYED_THRESHOLD_REACHED, {
							played: t.played,
							threshold: t.threshold,
							position: r(this._player.currentTime),
						});
				}),
				(o.prototype._emitEnded = function () {
					"video" === this._acmeTrack.getMediaType() && this.emit(T.PLAYER_ENDED_VIDEO),
						clearTimeout(this._pauseToken),
						this.emit(T.PLAYER_ENDED);
				}),
				(o.prototype._emitError = function (t, e, i) {
					h.error("Player Error", t, i, e),
						this._tracker.setHadError(!0),
						!this._disableCache && i && i.fileId && this._cache.remove(i.fileId),
						this.emit(T.PLAYER_ERROR, {
							playId: this._playId,
							error: t,
							track: i,
							canPlayNext: e,
							position: this._player ? r(this._player.currentTime) : 0,
						});
				}),
				(o.prototype._emitWarning = function (t, e) {
					h.error("Player Warning", t, e, !0),
						this._tracker.trackWarning(),
						this.emit(T.PLAYER_WARNING, {
							playId: this._playId,
							error: t,
							track: e,
							canPlayNext: !0,
							position: r(this._player.currentTime),
						});
				}),
				(o.prototype._prepareMediaElement = function (t, e) {
					return e === this._playId && this._upcomingACMETrack
						? this._recreateMediaElement(
								this._upcomingACMETrack.isProtected(),
								this._upcomingACMETrack.getPlayableCodecs(),
								e,
								this._upcomingACMETrack.getMediaType()
						  ).then(
								function (t) {
									if (!t || e !== this._playId)
										return (
											h.info("Load ACMETrack dropped after recreate: playId has changed."),
											c.resolve(!1)
										);
									var i = this._player;
									return i.withProtection &&
										this._emeManager &&
										(!i.mediaKeys ||
											i.mediaKeys.shouldRefreshPerTrack ||
											this._newMediaKeysPerTrack)
										? this._emeManager
												.createMediaKeys(i)
												.then(function () {
													return !0;
												})
												.catch(
													function (t) {
														return (
															t.fatal ? t.fatal() : (t.unrecoverable = !0),
															this._emitError(t, !1, this._upcomingACMETrack.toLogJSON()),
															c.reject(t)
														);
													}.bind(this)
												)
										: c.resolve(!0);
								}.bind(this)
						  )
						: (h.info("Load ACMETrack dropped: playId has changed."), c.resolve(!1));
				}),
				(o.prototype._handleLoadingComplete = function (t) {
					var e = this._acmeTrack.getMediaType(),
						i = this._getVideoContainer();
					return (
						"video" === e &&
							i &&
							this._player.parentNode !== i &&
							(i.appendChild(this._player), this.emit(T.PLAYER_VIDEO_ELEMENT_APPENDED)),
						(this._upcomingACMETrack = null),
						t
					);
				}),
				(o.prototype._handleLoadingError = function (t, e, i, n) {
					if (((this._upcomingACMETrack = null), i !== this._playId)) return c.resolve(!1);
					if (
						(this._tracker.trackLoadFailed(),
						this.emit(T.PLAYER_LOADING_FAILED, { uri: t, logData: e.logData }),
						n)
					) {
						var r = n.track || { uri: t, fileId: e.fileId, format: e.format, deviceId: e.logData.deviceId };
						this._emitError(n, !(n instanceof l) || n.canPlayNext, r);
					}
					return c.reject(n);
				}),
				(o.prototype._handleLoadedMetadata = function (t, e, i) {
					if (t !== this._playId)
						return void h.info("LoadedMetadata operations dropped: playId has changed.");
					this._loaded = !0;
					var n = this._player;
					this._buffer.dequeueUpdates();
					var s = i.position || 0;
					if (
						(s > n.duration && (s = 0),
						(this._lastTimeUpdatePostion = 0),
						(n.currentTime = s),
						this._tracker.trackLoadDone(r(n.currentTime)),
						setTimeout(this._onTimeUpdate.bind(this), 10),
						this.emitSync(T.PLAYER_LOAD, { autoplay: i.autoplay, position: s, logData: e }),
						i.autoplay && !n.error)
					) {
						var o = function () {
							if (this._playId !== t) return void h.info("Play trigger dropped; different playId");
							new c(
								function (t) {
									t(this._player.play());
								}.bind(this)
							)
								.catch(
									function (t) {
										if (t) {
											if ("NotSupportedError" === t.name) return c.reject(t);
											if ("NotAllowedError" === t.name)
												return this.emit(T.PLAYER_AUTOPLAY_FAILED), c.reject(t);
										}
										return this._player.play();
									}.bind(this)
								)
								.catch(
									function () {
										this._onPause();
									}.bind(this)
								);
						}.bind(this);
						n.readyState > 2
							? (h.info("Ready to play, triggering play."), o())
							: (h.info("Waiting to be playable."), this.once(T.INTERNAL_PLAYER_CANPLAY, o));
					}
				}),
				(o.prototype._handleCanPlayThrough = function (t) {
					if (t !== this._playId)
						return void h.info("CanPlayThrough operations dropped: playId has changed.");
					this._tracker.trackCanPlayThrough();
				}),
				(o.prototype._loadACMETrack = function (t, e) {
					if (e !== this._playId || !this._upcomingACMETrack)
						return h.info("Load ACMETrack dropped: playId has changed."), c.resolve(!1);
					this._canPreloadEmitted = !1;
					var i = this._upcomingACMETrack;
					(this._upcomingACMETrack = null), (this._acmeTrack = i);
					var n = t.callback;
					this.once(
						T.PLAYER_LOAD,
						function () {
							if (e !== this._playId)
								return void h.info("Load ACMETrack event dropped: playId has changed.");
							n();
						}.bind(this)
					),
						this.once(
							T.INTERNAL_PLAYER_LOADED_METADATA,
							this._handleLoadedMetadata.bind(this, e, this._acmeTrack.getLogData(), t)
						),
						this.once(T.INTERNAL_PLAYER_CANPLAYTHROUGH, this._handleCanPlayThrough.bind(this, e));
					var r = i.isProtected();
					return (
						this._tracker.setProtected(r),
						i instanceof f
							? this._loadVideoTrack(t, e)
							: r
							? this._loadProtectedTrack(t, e)
							: this._loadUnprotectedTrack()
					);
				}),
				(o.prototype._getBufferingLatency = function () {
					return new c(
						function (t) {
							var e = Date.now();
							this._player.addEventListener("canplaythrough", function i() {
								this.removeEventListener("canplaythrough", i), t(Date.now() - e);
							});
						}.bind(this)
					);
				}),
				(o.prototype._loadVideoTrack = function (t, i) {
					var n = this._acmeTrack;
					h.info("_loadVideoTrack"),
						this._buffer.once(
							T.BUFFER_SOURCE_OPEN,
							function (t) {
								this._acmeTrack.isProtected() && this._requestLicense(t);
							}.bind(this, i)
						),
						(this._player.src = e.URL.createObjectURL(this._buffer.getMediaSource()));
					var r = n.getVideoProfile(),
						s = n.getAudioProfile();
					this._tracker.trackVideoLoadStart({ bitrate: r.video_bitrate, audioProfile: s, videoProfile: r }),
						this._tracker.trackBufferLoadStart();
					var o = n.getInitFragment();
					return this._buffer
						.appendFragment(n, o)
						.then(this._buffer.setDuration.bind(this._buffer, n.getCalculatedDuration()))
						.then(
							function () {
								return (
									this._subtitleLanguage && this.setSubtitleLanguage(this._subtitleLanguage),
									c.resolve(!0)
								);
							}.bind(this)
						)
						.then(this._onAppendedHeadSegment(i));
				}),
				(o.prototype._loadUnprotectedTrack = function () {
					h.info("_loadUnprotectedTrack", this._acmeTrack.getURI()), this._tracker.trackBufferLoadStart();
					var t = this._acmeTrack.getResolvedURL();
					return this._tracker.trackBufferURL(t, { bandwidth: 0 }), (this._player.src = t), !0;
				}),
				(o.prototype._onAppendedHeadSegment = function (t) {
					return function () {
						return (
							t === this._playId &&
							(this._player.spload && this._player.spload(), h.info("Head segment appended."), !0)
						);
					}.bind(this);
				}),
				(o.prototype._loadProtectedTrack = function (t, i) {
					var n = this._acmeTrack;
					h.info("_loadProtectedTrack", n.getURI()),
						this._buffer.once(T.BUFFER_SOURCE_OPEN, this._requestLicense.bind(this, i)),
						(this._player.src = e.URL.createObjectURL(this._buffer.getMediaSource())),
						this._tracker.trackBufferLoadStart();
					var r = null,
						s = n.getFragmentForTime(t.position || 0);
					return (
						s === n.getFirstFragment()
							? (h.info("Appending combined init and playable fragment."),
							  (r = this._buffer.appendFragment(n, n.getHeadFragment())))
							: (h.info("Appending split init and playable fragment."),
							  (r = c.all([
									this._buffer.appendFragment(n, n.getInitFragment()),
									s ? n.getBufferForFragment(s) : c.resolve(!1),
							  ]))),
						r.then(this._onAppendedHeadSegment(i)).then(
							function () {
								return c.resolve(i === this._playId);
							}.bind(this)
						)
					);
				}),
				(o.prototype._requestLicense = function (t) {
					if (t !== this._playId) {
						return h.info("Request license dropped: playId has changed."), c.resolve(!1);
					}
					var e = Date.now(),
						i = this._player.mediaKeys,
						n = this._acmeTrack,
						r = n.getFileId(),
						s = n.getLogData(),
						o = n.toLogJSON(),
						a = n.getKeySystem(),
						_ = this._emeManager,
						u = this._tracker;
					return (
						u.setKeySystem(a),
						u.setKeySystemImpl(_.getKeySystemImpl()),
						c
							.all([
								n.getLicenseEndpoint() || this._licenseURLResolver.get(a, n.getMediaType()),
								n.getInitParams(),
							])
							.spread(function (n, s) {
								return (
									u.setLicenseSessionLatency(Date.now() - e),
									(s.licenseServer = n.replace(/\{contentId\}/, r)),
									(s.playId = t),
									(s.mediaKeys = i),
									_.createSessionWithParams(s)
								);
							})
							.then(
								function (i) {
									if (t !== this._playId)
										return h.info("License tracking dropped: playId has changed."), c.resolve(!1);
									i &&
										i.elapsed &&
										(u.setLicenseGenerationLatency(i.elapsed.generate),
										u.setLicenseRequestLatency(i.elapsed.request),
										u.setLicenseUpdateLatency(i.elapsed.update));
									var n = Date.now() - e;
									return (
										u.setKeyLatency(n),
										this.emit(T.PLAYER_KEY_RECEIVED, { requestTime: n, logData: s }),
										h.info("License updated."),
										c.resolve(!0)
									);
								}.bind(this)
							)
							.catch(
								function (e) {
									if (!e || t !== this._playId) return c.resolve(!1);
									var i = !(e && "canPlayNext" in e) || e.canPlayNext;
									return this._emitError(e, i, o), c.reject(e);
								}.bind(this)
							)
					);
				}),
				(o.prototype._onTimeUpdate = function () {
					if (this._loaded) {
						var t = 0,
							e = this._player.seeking,
							i = this._player.currentTime,
							n = "video" === this._acmeTrack.getMediaType();
						if (
							(n && (t = this._acmeTrack.getBitrateForTime(this._player.currentTime)),
							!e && this._lastTimeUpdatePostion && this._lastTimeUpdatePostion === i)
						)
							return void h.warn("Dropping duplicate time update.");
						(this._lastTimeUpdatePostion = e ? 0 : i),
							(n || this._acmeTrack.isProtected()) && this._buffer.progress(this._acmeTrack, e, i, n);
						var s = r(i),
							o = this._acmeTrack ? this._acmeTrack.getLogData() : null;
						e
							? (this._tracker.trackPositionChanged(s, this._player.paused),
							  this.emit(T.PLAYER_POSITION_CHANGED, { position: s, logData: o }))
							: (this._tracker.trackProgress(s, t),
							  this.emit(T.PLAYER_PROGRESS, {
									timestamp: Date.now(),
									position: s,
									interval: 500,
									logData: o,
							  })),
							!this._canPreloadEmitted && this._player.duration - i <= 10
								? ((this._canPreloadEmitted = !0), this.emit(T.PLAYER_CAN_PRELOAD))
								: (this._canPreloadEmitted = !1),
							clearTimeout(this._syntheticEndedToken),
							this._synthesizeEnded &&
								this._acmeTrack.isProtected() &&
								this._isPlaying() &&
								(this._syntheticEndedToken = setTimeout(
									this._onSyntheticEnded.bind(this),
									r(this._player.duration - i)
								));
					}
				}),
				(o.prototype._isPlaying = function () {
					return !!this._player && !this._player.paused;
				}),
				(o.prototype._shouldNextErrorBeFatal = function () {
					var t = this._acmeTrack;
					if (!t || t.isAd()) return !1;
					var i = this._player.error,
						n = e.MediaError;
					if (!(i && i instanceof n)) return (this._fatalOnNextError = !1), !1;
					switch (i.code) {
						case n.MEDIA_ERR_SRC_NOT_SUPPORTED:
						case n.MEDIA_ERR_DECODE:
							return !0;
						default:
							return !1;
					}
				}),
				(o.prototype.getId = function () {
					return this.id;
				}),
				(o.prototype.getCodecInfo = function () {
					return { audiocodec: "mp3", bitrate: 160 };
				}),
				(o.prototype.getMediaSource = function () {
					return this._buffer.getMediaSource();
				}),
				(o.prototype.load = function (t, e, i) {
					var n = e || {},
						o = t[n.uriProperty || "uri"];
					if ((h.info("load", o), !o))
						return c.reject(new S(R.PLAYER_CANNOT_FIND_PLAYABLE_URI, "Cannot find a playable URI."));
					if (!t.logData) return c.reject(Error("Invalid track: logging info not specified"));
					this.stop(t.logData, t.mediaType), (this._loaded = !1), (this._acmeTrack = null);
					var a = ++this._playId,
						_ = this._tracker;
					_.trackLoadStart(o, t.fileId, a.toString(), t.logData),
						this.emit(T.PLAYER_BEFORE_LOAD, {
							track: t,
							options: e,
							logData: t.logData,
							uri: o,
							timestamp: Date.now(),
						}),
						this._buffer.setPlayId(a);
					var u = {
						position: s(n.position || 0),
						autoplay: !("autoplay" in n) || n.autoplay,
						callback: i || function () {},
					};
					_.setPlayIntended(u.autoplay), _.setPlayedThreshold(n.playedThreshold);
					var d,
						l = this._cache;
					if ("video" === t.mediaType && !this._emeManager)
						return c.reject(new S(R.DISALLOW_PROTECTED_TRACK_ERROR, "Protected tracks not supported"));
					var p =
							"video" === t.mediaType
								? this._createVideoTrack.bind(this, t)
								: this._createAudioTrack.bind(this, o, t, a),
						E = this._preloadingTracks[t.fileId],
						f = this._disableCache ? null : l.get(t.fileId);
					return (
						E
							? (h.info("Waiting for preloading track.", t.fileId),
							  (d = E.then(
									function (e) {
										return (
											h.info("Preloading succeeded.", t.fileId),
											_.setResolveLatency(e.resolveLatency),
											_.setManifestLatency(e.manifestLatency),
											l.get(t.fileId)
										);
									},
									function () {
										return h.info("Preloading failed, creating new track", t.fileId), p();
									}
							  )))
							: f
							? (h.info("Using cached track.", t.fileId, f), _.setMemoryCached(!0), (d = c.resolve(f)))
							: (h.info("Creating new track", t.fileId), (d = p())),
						d
							.then(
								function (e) {
									return e.isProtected() && !this._emeManager
										? c.reject(
												new S(
													R.DISALLOW_PROTECTED_TRACK_ERROR,
													"Protected tracks not supported"
												)
										  )
										: (e.setLogData(t.logData),
										  _.setCalculatedDuration(r(e.getCalculatedDuration())),
										  (this._upcomingACMETrack = e),
										  c.resolve());
								}.bind(this)
							)
							.then(this._prepareMediaElement.bind(this, u, a))
							.then(this._loadACMETrack.bind(this, u, a))
							.then(this._handleLoadingComplete.bind(this), this._handleLoadingError.bind(this, o, t, a))
					);
				}),
				(o.prototype.preload = function (t) {
					var e = t.playableURI,
						i = t.fileId,
						n = this._cache;
					if (!i) return c.resolve(!1);
					if (!this._emeManager) return c.resolve(!1);
					var r = !this._disableCache,
						s = "video" === t.mediaType,
						o = "MP4" === t.format || "MP4_DUAL" === t.format;
					if (!r || !o || s || (r && n.get(i))) return c.resolve(!1);
					var a = this._preloadingTracks;
					if (a[i]) return a[i];
					h.info("Preloading track", i);
					var _ = { manifestLatency: 0, resolveLatency: 0 },
						u = this._emeManager
							.getKeySystemInfo()
							.then(
								function (n) {
									return E.create({
										abrManager: this._abrManager,
										keySystem: n.keySystem,
										licenseEndpoint: t.licenseEndpoint,
										transport: this._transport,
										resolver: this._audioResolver,
										uri: e,
										fileId: i,
										format: t.format,
										isAd: t.isAd,
										resolvedURL: t.resolvedURL,
										noManifest: t.noManifest,
										preloadedManifest: t.preloadedManifest,
										logData: t.logData,
										disableCache: this._disableCache,
										emitWarning: this._emitWarning.bind(this),
									}).load(_);
								}.bind(this)
							)
							.then(function (t) {
								return c.all([t, t.getBufferForFragment(t.getHeadFragment())]);
							})
							.spread(function (t) {
								return n.set(i, t), (a[i] = null), h.info("Cached", i), _;
							})
							.catch(
								function (t) {
									return (
										(a[i] = null),
										this.emit(T.PLAYER_PRELOADING_ERROR, {
											error: t,
											track: t.track || null,
											canPlayNext: !("canPlayNext" in t) || t.canPlayNext,
											preloading: !0,
										}),
										c.reject(t)
									);
								}.bind(this)
							);
					return (a[i] = u), u;
				}),
				(o.prototype.togglePlay = function () {
					this._isPlaying() ? this.pause() : this.resume();
				}),
				(o.prototype.setSubtitleLanguage = function (t) {
					if (((this._subtitleLanguage = t), "video" === this._acmeTrack.getMediaType())) {
						if (this._acmeTrack.getSubtitleLanguages().indexOf(t) < 0)
							return void h.warn("No available subtitle for language: ", t);
						var e = document.createElement("track");
						(e.label = t + " subtitles"),
							(e.kind = "subtitles"),
							(e.srclang = t),
							(e.src = this._acmeTrack.getSubtitleForLanguage(t)),
							this._player.appendChild(e),
							this._subtitlesVisible && this.showSubtitles();
					}
				}),
				(o.prototype.getSubtitleLanguages = function () {
					return "video" === this._acmeTrack.getMediaType() ? this._acmeTrack.getSubtitleLanguages() : [];
				}),
				(o.prototype.setVolume = function (t) {
					if (t < 0 || t > 1)
						throw new S(R.PLAYER_ATTEMPTED_VOLUME_OUT_OF_RANGE, "Volume should be in range [0, 1]");
					(this._playerVolume = t), this._player && (this._player.volume = this._cubicVolume ? t * t * t : t);
				}),
				(o.prototype.getVolume = function () {
					return this._playerVolume;
				}),
				(o.prototype.getPlayerState = function () {
					var t = this._player;
					return {
						playing: this._isPlaying(),
						position: t ? r(t.currentTime) : 0,
						duration: t ? r(t.duration) : 0,
						volume: t ? this._playerVolume : 1,
					};
				}),
				(o.prototype.seek = function (t) {
					if (this._player) {
						var e = this._playId,
							i = function () {
								if (e !== this._playId) return void h.info("Seek dropped: playId has changed.");
								var i = s(t);
								i < 0 ? (i = 0) : i >= this._player.duration && (i = this._player.duration),
									(this._player.currentTime = i);
							}.bind(this);
						this._loaded ? i() : this.once(T.PLAYER_LOAD, i),
							this._getBufferingLatency().then(
								function (t) {
									this._tracker.trackSeekRebuffering(t);
								}.bind(this)
							);
					}
				}),
				(o.prototype.pause = function () {
					this._player &&
						this._isPlaying() &&
						new c(
							function (t) {
								t(this._player.pause());
							}.bind(this)
						).catch(function () {});
				}),
				(o.prototype.resume = function () {
					this._player &&
						!this._isPlaying() &&
						new c(
							function (t) {
								t(this._player.play());
							}.bind(this)
						).catch(function () {});
				}),
				(o.prototype.stop = function (t, i) {
					var n = [],
						r = t || {};
					if (
						(this.emit(T.PLAYER_BEFORE_STOP, { timestamp: Date.now(), logData: r }),
						this._tracker.trackStopped(t),
						this._buffer.abort(!0),
						this._emeManager && n.push(this._emeManager.destroySessions()),
						this._player)
					) {
						(this._fatalOnNextError = this._shouldNextErrorBeFatal()),
							this._fatalOnNextError &&
								h.warn("MediaError detected: next immediate media error will be fatal.");
						var s = this._player.src;
						A.test(s) && e.URL.revokeObjectURL(s), this._player.removeAttribute("src"), this._player.load();
					}
					if (
						(this._acmeTrack && this._disableCache && this._acmeTrack.clearCachedBuffers(),
						this._acmeTrack && "video" === this._acmeTrack.getMediaType())
					) {
						for (var o = this._player.children, a = 0, _ = o.length; a < _; a++)
							this._player.removeChild(o[a]);
						var u = this._getVideoContainer();
						u &&
							this._player.parentNode === u &&
							(this._newElementPerTrack || "video" !== i) &&
							(u.removeChild(this._player), this.emit(T.PLAYER_VIDEO_ELEMENT_REMOVED));
					}
					return (
						this.emit(T.PLAYER_STOPPED),
						c.all(n).then(function () {
							return !0;
						})
					);
				}),
				(o.prototype.hideSubtitles = function () {
					for (var t = this._player.textTracks, e = 0, i = t.length; e < i; e++) t[e].mode = v.HIDDEN;
					this._subtitlesVisible = !1;
				}),
				(o.prototype.showSubtitles = function () {
					for (var t = this._player.textTracks, e = 0, i = t.length; e < i; e++) {
						var n = t[e];
						n.language === this._subtitleLanguage ? (n.mode = v.SHOWING) : (n.mode = v.HIDDEN);
					}
					this._subtitlesVisible = !0;
				}),
				(o.prototype.getKeySystemInfo = function () {
					return this._emeManager ? this._emeManager.getKeySystemInfo() : c.resolve(null);
				}),
				(t.exports = o);
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			(this._limit = t || 100), (this._list = null), (this._map = null), this.clear();
		}
		var r = i(31);
		(n.prototype.get = function (t) {
			var e = this._map[t];
			if (!e) return null;
			var i = this._list;
			return i.remove(e), i.append(e), e.value;
		}),
			(n.prototype.set = function (t, e) {
				if (!t) throw new TypeError("Cache key can't be empty!");
				var i = this._list,
					n = this._map;
				if (i.length >= this._limit) {
					var s = i.first;
					(n[s.key] = null), i.remove(s);
				}
				var o = n[t];
				o ? (i.remove(o), (o.value = e)) : ((o = new r.Node(e)), (o.key = t)), i.append(o), (n[t] = o);
			}),
			(n.prototype.remove = function (t) {
				var e = this._map,
					i = e[t];
				return i ? (this._list.remove(i), (e[t] = null), i.value) : null;
			}),
			(n.prototype.size = function () {
				return this._list.length;
			}),
			(n.prototype.clear = function () {
				(this._list = new r()), (this._map = {});
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t) {
				(this._defaultBandwidth = t || s),
					(this._totalBytes = 0),
					(this._short = new r(2)),
					(this._long = new r(5)),
					(this._overrideBitrate = 0),
					(this._onConnectionChange = this._onConnectionChange.bind(this)),
					this._init();
			}
			var r = i(84),
				s = 4e5;
			(n.prototype._init = function () {
				e.navigator &&
					e.navigator.connection &&
					e.navigator.connection.downlink &&
					((this._defaultBandwidth = 1e6 * e.navigator.connection.downlink),
					e.navigator.connection.addEventListener("change", this._onConnectionChange));
			}),
				(n.prototype._onConnectionChange = function (t) {
					this._defaultBandwidth = 1e6 * t.target.downlink;
				}),
				(n.prototype.getBandwidthEstimate = function () {
					if (this._overrideBitrate) return this._overrideBitrate;
					if (this._totalBytes < 128e3) return this._defaultBandwidth;
					var t = this._short.getEstimate(),
						e = this._long.getEstimate();
					return Math.min(t, e);
				}),
				(n.prototype.sample = function (t, e) {
					if (!(t < 16e3)) {
						var i = (8e3 * t) / e;
						(this._totalBytes += t), this._short.sample(e, i), this._long.sample(e, i);
					}
				}),
				(n.prototype.overrideBitrate = function (t) {
					this._overrideBitrate = t <= 0 ? 0 : t;
				}),
				(t.exports = n);
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			if (t < 0) throw new TypeError("Halflife must be set to a positive value.");
			(this._weightingDecrease = Math.exp(Math.log(0.5) / t)), (this._estimate = 0), (this._totalWeight = 0);
		}
		(n.prototype.sample = function (t, e) {
			var i = t / 1e3,
				n = Math.pow(this._weightingDecrease, i),
				r = e * (1 - n) + n * this._estimate;
			isNaN(r) || ((this._estimate = r), (this._totalWeight += e));
		}),
			(n.prototype.getEstimate = function () {
				return this._estimate / 1 - Math.pow(this._weightingDecrease, this._totalWeight);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t) {
				(this._keySystem = t.keySystem),
					(this._keySystemSettings = c[this._keySystem]),
					(this._abrManager = t.abrManager),
					(this._mediaType = "audio"),
					(this._uri = t.uri),
					(this._fileId = t.fileId),
					(this._format = t.format),
					(this._isAd = t.isAd),
					(this._transport = t.transport),
					(this._resolver = t.resolver),
					(this._resolvedURL = t.resolvedURL),
					(this._fallbackURLs = []),
					(this._resolvedURLs = []),
					(this._logData = t.logData || {}),
					(this._codec = t.codec || n.PROTECTED_CODEC),
					(this._bypassResolve = !!this._resolvedURL),
					(this._noManifest = t.noManifest || !1),
					(this._preloadedManifest = t.preloadedManifest || null),
					(this._disableCache = t.disableCache),
					(this._emitWarning = t.emitWarning || function () {}),
					(this._protection = null),
					(this._psshBox = null),
					(this._fragments = null),
					(this._duration = 0),
					(this._frontPaddingDuration = 0),
					(this._endPaddingDuration = 0),
					(this._initFragment = null),
					(this._headFragment = null),
					(this._fetching = []),
					(this._loaded = !1),
					(this._lastResolveTimestamp = 0),
					(this._lastResolveToken = null),
					(this._licenseEndpoint = t.licenseEndpoint || null);
			}
			var r = i(32),
				s = i(0),
				o = i(33),
				a = i(34),
				_ = i(4),
				c = i(19),
				u = i(14);
			(n.create = function (t) {
				return new n(t || {});
			}),
				(n.UNPROTECTED_CODEC = "audio/mpeg"),
				(n.PROTECTED_CODEC = 'audio/mp4; codecs="mp4a.40.2"'),
				(n.prototype.resolve = function (t) {
					if (this._bypassResolve)
						return (
							t && (t.resolveLatency = 0),
							s.resolve({
								lid: null,
								uri: this._resolvedURL,
								protection: !!this._preloadedManifest || !this._noManifest,
							})
						);
					clearTimeout(this._lastResolveToken);
					var e,
						i = function () {
							return (
								(this._lastResolveTimestamp = Date.now()),
								this._resolver.getCDNURL(this._uri, this._fileId, this._keySystem).then(
									function (e) {
										return t && (t.resolveLatency = Date.now() - this._lastResolveTimestamp), e;
									}.bind(this)
								)
							);
						}.bind(this),
						n = Date.now() - this._lastResolveTimestamp;
					return (
						(e =
							n < 1001
								? new s(
										function (t, e) {
											this._lastResolveToken = setTimeout(function () {
												i().then(t, e);
											}, 1001 - n);
										}.bind(this)
								  )
								: i()),
						e
							.then(
								function (t) {
									this._resolvedURLs = [];
									for (var e = 0, i = t.uris.length; e < i; e++) {
										var n = t.uris[e].split("?")[0];
										this._resolvedURLs.push(n);
									}
									return (
										(this._fallbackURLs = t.uris),
										(this._resolvedURL = this._fallbackURLs.shift()),
										t
									);
								}.bind(this)
							)
							.catch(
								function (t) {
									return t && (t.track = this.toLogJSON()), s.reject(t);
								}.bind(this)
							)
					);
				}),
				(n.prototype._parsePSSHBox = function (t) {
					for (var i = r.decode(t), n = new e.Uint8Array(i.length), s = 0, o = i.length; s < o; s++)
						n[s] = i.charCodeAt(s);
					return n;
				}),
				(n.prototype._getManifest = function (t) {
					if (this._noManifest) return t && (t.manifestLatency = 0), s.resolve(null);
					if (this._preloadedManifest)
						return t && (t.manifestLatency = 0), s.resolve(this._preloadedManifest);
					var e = Date.now();
					return this._resolver.getManifest(this._fileId, this._keySystem).then(function (i) {
						return t && (t.manifestLatency = Date.now() - e), i;
					});
				}),
				(n.prototype._calculateFragments = function (t) {
					var e = t.offset;
					this._initFragment = {
						init: !0,
						cacheBuffer: !this._disableCache,
						bufferURL: null,
						buffer: null,
						byteStart: 0,
						byteEnd: e - 1,
						codec: this._codec,
					};
					for (
						var i = t.segments, n = t.timescale, r = 0, s = i.length, o = new Array(s), a = 0, _ = 0, c = s;
						_ < c;
						_++
					) {
						var u = i[_],
							h = u[0],
							d = u[1],
							l = d / n;
						(o[_] = {
							cacheBuffer: !_ && !this._disableCache,
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
				}),
				(n.prototype._calculateFragmentsV1 = function (t) {
					var e = t.offset;
					this._initFragment = {
						init: !0,
						cacheBuffer: !this._disableCache,
						buffer: null,
						byteStart: 0,
						byteEnd: e - 1,
						codec: this._codec,
					};
					for (
						var i = t.references,
							n = t.timescale,
							r = 0,
							s = i.length,
							o = new Array(s),
							a = 0,
							_ = 0,
							c = s;
						_ < c;
						_++
					) {
						var u = i[_],
							h = u.duration / n;
						(o[_] = {
							cacheBuffer: !_ && !this._disableCache,
							buffer: null,
							byteStart: e,
							byteEnd: e + (u.size - 1),
							timeStart: r,
							timeEnd: r + h,
							codec: this._codec,
						}),
							(e += u.size),
							(a += u.duration),
							(r += h);
					}
					(o[o.length - 1].isLastFragment = !0), (this._fragments = o), (this._duration = a / n);
				}),
				(n.prototype.getFragmentLength = function () {
					return 10;
				}),
				(n.prototype.getLicenseEndpoint = function () {
					return this._licenseEndpoint;
				}),
				(n.prototype.getBufferForFragment = function (t) {
					if (!t) return null;
					if (t.buffer)
						return s.resolve({
							audio: { bufferURL: t.bufferURL, buffer: t.buffer, codec: this._codec, bandwidth: null },
						});
					if (!this._resolvedURL)
						return s.reject(new a(_.FILE_NOT_RESOLVED, "Cannot fetch buffer: No resolved URL"));
					var e = s.defer();
					this._startFetching(e.resolve);
					var i,
						n = t.byteEnd + 1 - t.byteStart,
						r = t.byteStart + "-" + t.byteEnd,
						c = t.timeStart + "-" + t.timeEnd,
						u = this._resolvedURL;
					return this._transport
						.request(u, {
							method: "GET",
							responseType: "arraybuffer",
							headers: { Range: "bytes=" + r },
							timing: !0,
							canceller: e.promise,
							retry: {
								condition: function (t, e) {
									if (0 === t.status) return t.offline;
									var i = t.getStatusFamily();
									return (
										i === e.CONNECTION_ERROR ||
										i === e.SERVER_ERROR ||
										(!(i !== e.SUCCESS || !t.body) && t.body.byteLength !== n)
									);
								},
							},
						})
						.then(
							function (a) {
								switch ((this._endFetching(e.resolve), a.status)) {
									case 0:
										if (a.offline)
											return s.reject(
												new o(
													_.FRAGMENT_OFFLINE_REQUEST_FAILED_WITH_ZERO,
													"Request failed with status 0.",
													0,
													{ time_range: c, byte_range: r }
												)
											);
										var h = new o(
											_.FRAGMENT_ONLINE_REQUEST_FAILED_WITH_ZERO,
											"Request failed with status 0.",
											0
										);
										return (
											(i = !1),
											this._resolvedURL !== u
												? (i = !0)
												: this._fallbackURLs.length &&
												  this._resolvedURL === u &&
												  ((i = !0), (this._resolvedURL = this._fallbackURLs.shift())),
											(h.debug.has_fallback = i),
											i
												? (this._emitWarning(h, this.toLogJSON()), this.getBufferForFragment(t))
												: s.reject(h)
										);
									case 200:
									case 206:
										if (!a.body)
											return s.reject(
												new o(
													_.FRAGMENT_REQUEST_EMPTY_RESPONSE,
													"Empty response for successful buffer.",
													a.status,
													{ time_range: c, byte_range: r }
												)
											);
										var d = a.body;
										if (d.byteLength !== n)
											return s.reject(
												new o(
													_.FRAGMENT_REQUEST_UNEXPECTED_LENGTH,
													"Received buffer of unexpected length.",
													a.status,
													{
														time_range: c,
														byte_range: r,
														received_length: d.byteLength,
														expected_length: n,
													}
												)
											);
										if (t.cacheBuffer && d && d.byteLength) {
											(t.bufferURL = u), (t.buffer = d);
											var l = t.sliceInto;
											if (l && l.length)
												for (var p = 0, E = t.sliceInto.length; p < E; p++) {
													var f = l[p];
													f.fragment &&
														f.fragment.cacheBuffer &&
														((f.fragment.bufferURL = u),
														(f.fragment.buffer = d.slice(f.start, f.end)));
												}
										}
										return (
											this._abrManager.sample(d.byteLength, a.timing.completed),
											{
												audio: {
													bufferURL: u,
													buffer: d,
													codec: this._codec,
													bandwidth: (8e3 * d.byteLength) / a.timing.completed,
												},
											}
										);
									case 403:
										return this.resolve().then(
											function () {
												return this.getBufferForFragment(t);
											}.bind(this)
										);
									default:
										return (
											(i = !1),
											this._resolvedURL !== u
												? (i = !0)
												: this._fallbackURLs.length &&
												  this._resolvedURL === u &&
												  ((i = !0), (this._resolvedURL = this._fallbackURLs.shift())),
											i
												? this.getBufferForFragment(t)
												: s.reject(
														new o(
															_.FRAGMENT_REQUEST_FAILED_WITH_STATUS,
															"Buffer request failed with status " + a.status,
															a.status,
															{ time_range: c, byte_range: r }
														)
												  )
										);
								}
							}.bind(this)
						);
				}),
				(n.prototype._startFetching = function (t) {
					this._fetching.push(t);
				}),
				(n.prototype._endFetching = function (t) {
					var e = this._fetching.indexOf(t);
					-1 !== e && this._fetching.splice(e, 1);
				}),
				(n.prototype.getURI = function () {
					return this._uri;
				}),
				(n.prototype.getResolvedURLs = function () {
					return this._resolvedURLs;
				}),
				(n.prototype.getFileId = function () {
					return this._fileId;
				}),
				(n.prototype.getFormat = function () {
					return this._format;
				}),
				(n.prototype.getCalculatedDuration = function () {
					return this._duration;
				}),
				(n.prototype.getResolvedURL = function () {
					return this._resolvedURL;
				}),
				(n.prototype.getLogData = function () {
					return this._logData;
				}),
				(n.prototype.getKeySystem = function () {
					return this._keySystem;
				}),
				(n.prototype.getMediaType = function () {
					return this._mediaType;
				}),
				(n.prototype.getInitParams = function () {
					var t = {
						keySystem: this._keySystem,
						initDataType: this._protection,
						initData: this._psshBox,
						licenseServer: null,
					};
					return s.resolve(t);
				}),
				(n.prototype.isAd = function () {
					return !!this._isAd;
				}),
				(n.prototype.isProtected = function () {
					return !!this._protection && !!this._psshBox;
				}),
				(n.prototype.setLogData = function (t) {
					return (this._logData = t), this;
				}),
				(n.prototype.load = function (t) {
					var i = t || {};
					return this._loaded
						? ((i.resolveLatency = 0), (i.manifestLatency = 0), s.resolve(this))
						: s.all([this.resolve(i), this._getManifest(i)]).spread(
								function (t, i) {
									if (((this._loaded = !0), !t.protection || !i)) return this;
									if (this._keySystem === u.INVALID_SPOTIFY_KEY)
										return (
											(this._protection = i.protection || "cenc"),
											(this._psshBox = new e.Uint8Array()),
											this
										);
									var n,
										r = this._keySystemSettings.pssh_field.audio,
										o = i[r];
									if (!o) {
										if ("pssh_widevine" !== r)
											return (
												(n = new a(
													_.FILE_FORMAT_NOT_SUPPORTED,
													"KeySystem does not support the file format."
												)),
												(n.track = this.toLogJSON()),
												s.reject(n)
											);
										o = i.pssh;
									}
									if (
										((this._protection = i.protection || "cenc"),
										(this._psshBox = this._parsePSSHBox(
											o ||
												"AAAAT3Bzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAAC8IARIQjkdvXv0rqMqeUvuJdEQ6BxoHc3BvdGlmeSIQU5XxcNx4EeWn2APhWavFng=="
										)),
										i.segments)
									)
										this._calculateFragments(i);
									else {
										if (!i.references)
											return (
												(n = new a(_.FILE_MALFORMED_SEEKTABLE, "Malformed seektable.")),
												(n.track = this.toLogJSON()),
												s.reject(n)
											);
										this._calculateFragmentsV1(i);
									}
									return this;
								}.bind(this)
						  );
				}),
				(n.prototype.getInitFragment = function () {
					return this._initFragment;
				}),
				(n.prototype.getFirstFragment = function () {
					return this._fragments[0];
				}),
				(n.prototype.getHeadFragment = function () {
					var t = this._initFragment,
						e = this._fragments[0];
					return (
						this._headFragment ||
							(this._headFragment = {
								init: !0,
								cacheBuffer: !0,
								bufferURL: null,
								buffer: null,
								byteStart: t.byteStart,
								byteEnd: e.byteEnd,
								codec: this._codec,
								sliceInto: [
									{ fragment: t, start: 0, end: e.byteStart },
									{ fragment: e, start: e.byteStart, end: void 0 },
								],
							}),
						this._headFragment
					);
				}),
				(n.prototype.clearCachedBuffers = function () {
					this._headFragment && (this._headFragment = null),
						this._initFragment && (this._initFragment.buffer = null),
						this._fragments && this._fragments[0] && (this._fragments[0].buffer = null);
				}),
				(n.prototype.getPlayableCodecs = function () {
					return [this.isProtected() ? this._codec : n.UNPROTECTED_CODEC];
				}),
				(n.prototype.getFragmentForTime = function (t) {
					if (null === this._fragments) return null;
					var e = null;
					if (0 === t || 0.01 === t) e = this._fragments[0];
					else
						for (var i = 0, n = this._fragments.length; i < n; i++)
							if (this._fragments[i].timeStart <= t && this._fragments[i].timeEnd >= t) {
								e = this._fragments[i];
								break;
							}
					return e;
				}),
				(n.prototype.getFragmentAfterTime = function (t) {
					if (null === this._fragments) return null;
					var e = null;
					if (0 === t || 0.01 === t) e = this._fragments[1];
					else
						for (var i = 0, n = this._fragments.length; i < n; i++)
							if (this._fragments[i].timeStart > t) {
								e = this._fragments[i];
								break;
							}
					return e;
				}),
				(n.prototype.abort = function () {
					this._fetching.forEach(function (t) {
						"function" == typeof t && t(!0);
					}),
						(this._fetching = []);
				}),
				(n.prototype.toLogJSON = function () {
					return {
						uri: this._uri,
						fileId: this._fileId,
						format: this._format,
						resolved_url: this._resolvedURL,
					};
				}),
				(t.exports = n);
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t) {
				var e = t || {};
				(this._keySystem = t.keySystem),
					(this._keySystemSettings = c[this._keySystem]),
					(this._mediaType = "video"),
					(this._loaded = !1),
					(this._transport = t.transport),
					(this._videoCodec = t.videoCodec || "vp8"),
					(this._videoMimeType = t.videoMimeType || "video/webm"),
					(this._audioCodec = t.audioCodec || "opus"),
					(this._audioMimeType = t.audioMimeType || "audio/webm"),
					(this._isAd = t.isAd),
					(this._fileId = t.fileId),
					(this._fragments = []),
					(this._segmentLength = 0),
					(this._subtitleLanguages = []),
					(this._duration = 0),
					(this._initFragment = null),
					(this._videoProfile = null),
					(this._videoProfiles = []),
					(this._audioProfile = null),
					(this._protection = null),
					(this._psshBox = null),
					(this._resolver = e.resolver),
					(this._abrManager = e.abrManager),
					(this._resolvedURLs = []),
					(this._baseURL = ""),
					(this._fallbackURLs = []),
					(this._initTemplate = ""),
					(this._segmentTemplate = ""),
					(this._disableCache = t.disableCache),
					(this._licenseEndpoint = t.licenseEndpoint || null);
			}
			var r = i(0),
				s = i(32),
				o = i(33),
				a = i(4),
				_ = i(34),
				c = i(19);
			(n.create = function (t) {
				return new n(t || {});
			}),
				(n.prototype._constructAudioMimeType = function (t) {
					return t.mime_type + ';codecs="' + t.audio_codec + '"';
				}),
				(n.prototype._constructVideoMimeType = function (t) {
					return t.mime_type + ';codecs="' + t.video_codec + '"';
				}),
				(n.prototype.abort = function () {}),
				(n.prototype._calculateFragments = function (t) {
					this._duration = t.end_time_millis / 1e3;
					var e = this._segmentLength;
					this._initFragment = {
						init: !0,
						cacheBuffer: !this._disableCache,
						bitrate: 0,
						quality: 0,
						audio: {
							bufferURL: null,
							buffer: null,
							codec: this._constructAudioMimeType(this._audioProfile),
						},
						video: {
							bufferURL: null,
							buffer: null,
							codec: this._constructVideoMimeType(this._videoProfile),
						},
					};
					for (var i = 0; i < this._duration; i += e)
						this._fragments.push({
							bitrate: 0,
							cacheBuffer: !i && !this._disableCache,
							timeStart: i,
							timeEnd: i + e,
							quality: 0,
							fetchingBufferPromise: null,
							audio: {
								bufferURL: null,
								buffer: null,
								codec: this._constructAudioMimeType(this._audioProfile),
							},
							video: {
								bufferURL: null,
								buffer: null,
								codec: this._constructVideoMimeType(this._videoProfile),
							},
						});
				}),
				(n.prototype._calculateVariants = function (t, e) {
					for (
						var i = this._videoCodec,
							n = this._videoMimeType,
							r = this._audioCodec,
							s = this._audioMimeType,
							o = [],
							a = [],
							_ = 0,
							c = t.length;
						_ < c;
						_++
					) {
						var u = t[_];
						u.video_codec === i && u.mime_type === n && u.encryption_index === e
							? o.push(u)
							: u.audio_codec === r && u.mime_type === s && u.encryption_index === e && a.push(u);
					}
					(this._videoProfiles = this._sortByProfilesByBitrate(o)), (this._audioProfiles = a);
				}),
				(n.prototype._sortByProfilesByBitrate = function (t) {
					return t.sort(function (t, e) {
						return t.max_bitrate - e.max_bitrate;
					});
				}),
				(n.prototype._constructFragmentURL = function (t) {
					return t.init
						? this._resolver.getInitSegmentURLs(
								this._baseURL,
								this._initTemplate,
								this._audioProfile,
								this._videoProfile
						  )
						: this._resolver.getSegmentURLs(
								this._baseURL,
								this._segmentTemplate,
								t.timeStart,
								this._audioProfile,
								this._videoProfile
						  );
				}),
				(n.prototype._fetchBufferForFragment = function (t) {
					if (!t.fetchingBufferPromise) {
						var e = Date.now(),
							i = this._videoProfile.video_resolution,
							n = {
								method: "GET",
								responseType: "arraybuffer",
								timing: !0,
								retry: {
									condition: function (t, e) {
										if (0 === t.status) return !0;
										var i = t.getStatusFamily();
										return i === e.CONNECTION_ERROR || i === e.SERVER_ERROR;
									},
								},
							},
							s = this._constructFragmentURL(t);
						t.fetchingBufferPromise = r
							.all([
								this._transport
									.request(s.audio, n)
									.then(this._parseFragmentResponse.bind(this, t, "audio")),
								this._transport
									.request(s.video, n)
									.then(this._parseFragmentResponse.bind(this, t, "video")),
							])
							.spread(
								function (n, r) {
									return (
										(t.quality = i),
										(t.bitrate = this._videoProfile.video_bitrate),
										t.cacheBuffer &&
											((t.audio.buffer = n.buffer),
											(t.audio.bufferURL = s.audioLogging),
											(t.video.buffer = r.buffer),
											(t.video.bufferURL = s.videoLogging)),
										(t.fetchingBufferPromise = null),
										this._abrManager.sample(
											n.buffer.byteLength + r.buffer.byteLength,
											Date.now() - e
										),
										this._updateVariants(),
										{
											audio: {
												bufferURL: s.audioLogging,
												buffer: n.buffer,
												codec: t.audio.codec,
												bandwidth: n.bandwidth,
											},
											video: {
												bufferURL: s.videoLogging,
												buffer: r.buffer,
												codec: t.video.codec,
												bandwidth: r.bandwidth,
											},
										}
									);
								}.bind(this)
							)
							.catch(function (e) {
								return (t.fetchingBufferPromise = null), r.reject(e);
							});
					}
					return t.fetchingBufferPromise;
				}),
				(n.prototype._parseFragmentResponse = function (t, e, i) {
					var n = t.timeStart + "-" + t.timeEnd,
						s = t[e] ? t[e].codec : null;
					switch (i.status) {
						case 0:
							return r.reject(
								new o(a.FRAGMENT_REQUEST_FAILED_WITH_ZERO, "Request failed with status 0.", 0, {
									time_range: n,
									codec: s,
									quality: t.quality,
								})
							);
						case 200:
						case 206:
							return i.body
								? r.resolve({
										buffer: i.body,
										bandwidth: (8e3 * i.body.byteLength) / i.timing.completed,
								  })
								: r.reject(
										new o(
											a.FRAGMENT_REQUEST_EMPTY_RESPONSE,
											"Empty response for successful buffer.",
											i.status,
											{ time_range: n, codec: s, quality: t.quality }
										)
								  );
					}
					return r.reject(
						new o(
							a.FRAGMENT_REQUEST_FAILED_WITH_STATUS,
							"Buffer request failed with status " + i.status,
							i.status,
							{ time_range: n, codec: s, quality: t.quality }
						)
					);
				}),
				(n.prototype.getBitrateForTime = function (t) {
					if (null === this._fragments) return 0;
					var e = this._segmentLength,
						i = (t - (t % e)) / e;
					return this._fragments[i].bitrate;
				}),
				(n.prototype.getFragmentLength = function () {
					return this._segmentLength;
				}),
				(n.prototype.getLicenseEndpoint = function () {
					return this._licenseEndpoint;
				}),
				(n.prototype.getBufferForFragment = function (t) {
					return t.audio.buffer && t.video.buffer && t.quality >= this._videoProfile.video_resolution
						? r.resolve({
								audio: {
									bufferURL: t.audio.bufferURL,
									buffer: t.audio.buffer,
									codec: t.audio.codec,
									bandwidth: null,
								},
								video: {
									bufferURL: t.video.bufferURL,
									buffer: t.video.buffer,
									codec: t.video.codec,
									bandwidth: null,
								},
						  })
						: this._fetchBufferForFragment(t);
				}),
				(n.prototype.clearCachedBuffers = function () {
					this._initFragment &&
						((this._initFragment.audio.buffer = null), (this._initFragment.video.buffer = null)),
						this._fragments.forEach(function (t) {
							(t.audio.buffer = null), (t.video.buffer = null);
						});
				}),
				(n.prototype._parsePSSHBox = function (t) {
					for (var i = s.decode(t), n = new e.Uint8Array(i.length), r = 0, o = i.length; r < o; r++)
						n[r] = i.charCodeAt(r);
					return n;
				}),
				(n.prototype._updateVariants = function () {
					var t,
						e = this._abrManager.getBandwidthEstimate(),
						i = this._videoProfiles,
						n = i.length;
					this._audioProfile = this._audioProfiles[0];
					for (var r = this._audioProfile.audio_bitrate, s = 0; s < n; s++) {
						var o = i[s];
						(o.video_bitrate + r < e - 1e5 || !t) && (t = o);
					}
					this._videoProfile = t || i[n - 1];
				}),
				(n.prototype.getDuration = function () {
					return this._endTime;
				}),
				(n.prototype.getFragmentAfterTime = function (t) {
					if (null === this._fragments) return null;
					var e = null;
					if (0 === t || 0.01 === t) e = this._fragments[1];
					else
						for (var i = 0, n = this._fragments.length; i < n; i++)
							if (this._fragments[i].timeStart >= t) {
								e = this._fragments[i];
								break;
							}
					return e;
				}),
				(n.prototype.getFragmentForTime = function (t) {
					if (null === this._fragments) return null;
					var e = null;
					if (0 === t || 0.01 === t) e = this._fragments[0];
					else
						for (var i = 0, n = this._fragments.length; i < n; i++)
							if (this._fragments[i].timeStart <= t && this._fragments[i].timeEnd >= t) {
								e = this._fragments[i];
								break;
							}
					return e;
				}),
				(n.prototype.getInitFragment = function () {
					return this._initFragment;
				}),
				(n.prototype.getSubtitleLanguages = function () {
					return this._subtitleLanguages;
				}),
				(n.prototype.getSubtitleForLanguage = function (t) {
					return this._subtitleTemplate.replace("{{profile_id}}", t);
				}),
				(n.prototype.load = function (t) {
					var e = t || {};
					if (this._loaded) return (e.resolveLatency = 0), (e.manifestLatency = 0), r.resolve(this);
					var i = Date.now();
					return this._resolver.getManifest(this._fileId).then(
						function (t) {
							(e.resolveLatency = 0), (e.manifestLatency = Date.now() - i);
							var n,
								s = t.contents[0];
							if (!s)
								return (
									(n = new _(a.FILE_MALFORMED_SEEKTABLE, "Malformed seektable: no contents.")),
									(n.track = this.toLogJSON()),
									r.reject(n)
								);
							(this._resolvedURLs = t.base_urls.slice()),
								(this._baseURL = t.base_urls.shift()),
								(this._fallbackURLs = t.base_urls),
								(this._initTemplate = t.initialization_template),
								(this._segmentTemplate = t.segment_template),
								(this._segmentLength = s.segment_length);
							var o = void 0;
							if (s.encryption_infos && s.encryption_infos.length) {
								for (
									var c,
										u = s.encryption_infos,
										h = this._keySystemSettings.commonName,
										d = 0,
										l = u.length;
									d < l;
									d++
								) {
									var p = u[d];
									if (p && p.key_system === h) {
										(o = d), (c = p[this._keySystemSettings.pssh_field.video]);
										break;
									}
								}
								if (!c)
									return (
										(n = new _(
											a.FILE_FORMAT_NOT_SUPPORTED,
											"KeySystem does not support the file format."
										)),
										(n.track = this.toLogJSON()),
										r.reject(n)
									);
								this._protection = "cenc";
								try {
									this._psshBox = this._parsePSSHBox(c);
								} catch (t) {
									return (
										(n = new _(a.FILE_MALFORMED_PSSH, "Invalid PSSH value.")),
										(n.track = this.toLogJSON()),
										r.reject(n)
									);
								}
							}
							return (
								(this._startTime = t.start_time_millis),
								(this._endTime = t.end_time_millis),
								this._calculateVariants(s.profiles, o),
								this._updateVariants(),
								this._calculateFragments(t),
								(this._subtitleLanguages = t.subtitle_language_codes || []),
								this
							);
						}.bind(this)
					);
				}),
				(n.prototype.setLogData = function (t) {
					return (this._logData = t), this;
				}),
				(n.prototype.getURI = function () {
					return this._uri;
				}),
				(n.prototype.getFileId = function () {
					return this._fileId;
				}),
				(n.prototype.getFormat = function () {
					return this._format;
				}),
				(n.prototype.getCalculatedDuration = function () {
					return this._duration;
				}),
				(n.prototype.getResolveLatency = function () {}),
				(n.prototype.getPlayableCodecs = function () {
					return [
						this._constructAudioMimeType(this._audioProfile),
						this._constructVideoMimeType(this._videoProfile),
					];
				}),
				(n.prototype.getResolvedURL = function () {
					return this._resolvedURL;
				}),
				(n.prototype.getResolvedURLs = function () {
					return this._resolvedURLs;
				}),
				(n.prototype.getLogData = function () {
					return this._logData;
				}),
				(n.prototype.getAudioProfile = function () {
					return this._audioProfile;
				}),
				(n.prototype.getVideoProfile = function () {
					return this._videoProfile;
				}),
				(n.prototype.getVideoProfiles = function () {
					return this._videoProfiles;
				}),
				(n.prototype.getInitParams = function () {
					var t = {
						keySystem: this._keySystem,
						initDataType: this._protection,
						initData: this._psshBox,
						licenseServer: null,
					};
					return r.resolve(t);
				}),
				(n.prototype.isAd = function () {
					return !!this._isAd;
				}),
				(n.prototype.isProtected = function () {
					return !!this._protection && !!this._psshBox;
				}),
				(n.prototype.getKeySystem = function () {
					return this._keySystem;
				}),
				(n.prototype.getMediaType = function () {
					return this._mediaType;
				}),
				(n.prototype.toLogJSON = function () {
					return {
						uri: this._uri,
						fileId: this._fileId,
						format: this._format,
						resolved_url: "unknown-video",
					};
				}),
				(t.exports = n);
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t) {
				_.call(this),
					(this._transport = t.transport),
					(this._noServerCertificate = t.noServerCertificate),
					(this._preferredKeySystems = t.preferredKeySystems || [
						h.WIDEVINE,
						h.PLAYREADY,
						h.PLAYREADY_HARDWARE,
					]),
					(this._configFilter = E(t.disallowRobustnessValues || [])),
					(this._emeImpl = t.emeImpl),
					(this._keySystemDeferred = s.defer()),
					(this._configuration = s.defer()),
					(this._keySystemSettings = null),
					(this._keySessions = []),
					(this._configs = []);
			}
			var r = i(2),
				s = i(0),
				o = i(20),
				a = i(88),
				_ = i(3),
				c = i(7),
				u = i(4),
				h = i(14),
				d = i(89),
				l = i(19),
				p = i(92),
				E = i(93),
				f = i(5).forTag("playback.eme_manager"),
				T = /([^;]+)(?:;\s?codecs="(.*)")?/;
			r(n, _),
				(n.create = function (t) {
					return new s(function (e) {
						var i = d.install();
						if (!i)
							throw new o(
								u.EME_API_NOT_SUPPORTED,
								"Platform does not support navigator.requestMediaKeySystemAccess"
							).fatal();
						(t.emeImpl = i), e(new n(t).init());
					});
				}),
				(n.prototype._prepareConfiguration = function (t) {
					var e = t.getConfiguration();
					f.info("KeySystem configured as ", e.label),
						(e.audioCapabilities && e.audioCapabilities.length) ||
							this._appendProbableMediaCapabilities(t.keySystem, e);
					var i = {
						keySystem: t.keySystem,
						keySystemImpl: this._emeImpl,
						audioFormats: this._parseCapabilities(e.audioCapabilities),
						videoFormats: this._parseCapabilities(e.videoCapabilities),
					};
					return (this._keySystemSettings = l[t.keySystem]), this._configuration.resolve(i), i;
				}),
				(n.prototype._parseCapabilities = function (t) {
					if (!t) return [];
					for (var e = [], i = 0, n = t.length; i < n; i++) {
						var r = t[i];
						if (r && r.contentType) {
							var s = r.contentType.match(T);
							e.push({ contentType: r.contentType, mimeType: s[1], codec: s[2] });
						}
					}
					return e;
				}),
				(n.prototype._appendProbableMediaCapabilities = function (t, i) {
					for (var n = this._configs, r = 0, s = n.length; r < s; r++) {
						var o,
							a,
							_,
							c,
							u = n[r],
							d = { audioCapabilities: [], videoCapabilities: [] },
							l = !1;
						if (u.audioCapabilities && u.audioCapabilities.length)
							for (l = !1, o = 0, a = u.audioCapabilities.length; o < a; o++)
								(_ = u.audioCapabilities[o]),
									(c = _.contentType),
									e.MediaSource.isTypeSupported(c) && (d.audioCapabilities.push(_), (l = !0));
						if (u.videoCapabilities && u.videoCapabilities.length)
							for (l = !1, o = 0, a = u.videoCapabilities.length; o < a; o++)
								(_ = u.videoCapabilities[o]),
									(c = _.contentType),
									(-1 === c.indexOf("webm") || (t !== h.PLAYREADY && t !== h.PLAYREADY_HARDWARE)) &&
										e.MediaSource.isTypeSupported(c) &&
										(d.videoCapabilities.push(_), (l = !0));
						if (l)
							return (
								(i.audioCapabilities = d.audioCapabilities),
								void (i.videoCapabilities = d.videoCapabilities)
							);
					}
				}),
				(n.prototype._trySetServerCertificate = function (t, e) {
					return this._transport
						.request(t + "/v1/application-certificate", {
							authorize: !0,
							responseType: "arraybuffer",
							retry: {
								condition: function (t, e) {
									return t.getStatusFamily() === e.SERVER_ERROR;
								},
							},
						})
						.then(function (t) {
							return e.setServerCertificate(t.body);
						})
						.then(
							function () {
								return this;
							}.bind(this)
						)
						.catch(
							function (t) {
								return f.warn("Error from setting server certificate", t), this;
							}.bind(this)
						);
				}),
				(n.prototype._extractPlayReadyChallenge = function (t, i) {
					var n = null,
						r = String.fromCharCode.apply(null, new e.Uint16Array(t));
					if (-1 === r.indexOf("PlayReadyKeyMessage"))
						return f.info("Using unextracted PlayReady message."), t;
					var s = new e.DOMParser().parseFromString(r, "application/xml");
					if (s.getElementsByTagName("Challenge")[0])
						try {
							n = atob(s.getElementsByTagName("Challenge")[0].childNodes[0].nodeValue);
							var a = s.getElementsByTagName("name"),
								_ = s.getElementsByTagName("value");
							if (a.length !== _.length)
								throw new o(
									u.EME_HEADER_KEY_VALUE_MISMATCH,
									"Mismatched header <name>/<value> pair in key message"
								);
						} catch (t) {
							this.emit(c.EME_LICENSE_REQUEST_ERROR, { playId: i, error: t }), (n = null);
						}
					else
						this.emit(c.EME_LICENSE_REQUEST_ERROR, {
							playId: i,
							error: new o(
								u.EME_HEADER_KEY_VALUE_MISMATCH,
								"Mismatched header <name>/<value> pair in key message"
							),
						});
					return n;
				}),
				(n.prototype._onMessage = function (t, e) {
					(t.timeMap.generate.end = Date.now()), f.info("Got EME message event with type", e.messageType);
					var i = e.message;
					if ((i && t.keySystem === h.PLAYREADY && (i = this._extractPlayReadyChallenge(i, t.playId)), !i))
						return void f.info("Ignoring message event: no valid request payload");
					(t.timeMap.request.start = Date.now()),
						this._transport
							.request(t.licenseServer, {
								method: "POST",
								payload: i,
								responseType: "arraybuffer",
								retry: {
									condition: function (t, e) {
										return (
											400 !== t.status &&
											402 !== t.status &&
											403 !== t.status &&
											(!t.body || t.getStatusFamily() !== e.SUCCESS)
										);
									},
								},
							})
							.then(this._handleLicenseResponse.bind(this, t));
				}),
				(n.prototype._handleLicenseResponse = function (t, i) {
					var n = function (e) {
						(e.playId = t.playId),
							(e.licenseServer = t.licenseServer),
							this.emit(c.EME_LICENSE_REQUEST_ERROR, { playId: t.playId, error: e });
					}.bind(this);
					t.timeMap.request.end = Date.now();
					var r;
					if (200 !== i.status) {
						var s;
						try {
							var _ = String.fromCharCode.apply(String, new e.Uint8Array(i.body));
							s = JSON.parse(_).errorMsg;
						} catch (t) {}
						402 === i.status
							? this.emit(c.EME_LICENSE_REQUEST_CAPPED, {
									playId: t.playId,
									error: new a(u.CAPPING_USER_IS_CAPPED, "User is capped."),
							  })
							: 400 === i.status && "widevine error" === s
							? ((r = new o(
									u.EME_LICENSE_REQUEST_WIDEVINE_ERROR,
									"Widevine license server failed to parse request."
							  )),
							  (r.status = i.status),
							  (r.shouldRefreshEndpoint = !0),
							  r.fatal(),
							  n(r))
							: ((r = new o(
									u.EME_LICENSE_REQUEST_FAILED_WITH_STATUS,
									"License request failed (" + (s || "unknown") + ")"
							  )),
							  (r.status = i.status),
							  (r.shouldRefreshEndpoint = 400 === i.status || 403 === i.status),
							  n(r));
					} else {
						if (!i.body)
							return (
								(r = new o(u.EME_LICENSE_REQUEST_EMPTY_RESPONSE, "Empty license response body")),
								(r.status = i.status),
								void n(r)
							);
						try {
							(t.timeMap.update.start = Date.now()),
								t.keySession.update(i.body).catch(function (t) {
									n(new o(u.EME_LICENSE_UPDATE_FAILED, t.message || "License update failed."));
								}),
								f.info("KeySession updated.");
						} catch (t) {
							n(new o(u.EME_LICENSE_UPDATE_FAILED, t.message || "License update failed."));
						}
					}
				}),
				(n.prototype._saveSession = function (t) {
					this._keySessions.push(t);
				}),
				(n.prototype.destroySessions = function () {
					for (var t = [], e = this._keySessions, i = 0, n = e.length; i < n; i++)
						try {
							var r = e[i],
								o = r.keySession;
							o.removeEventListener(c.KEY_SESSION_MESSAGE, r.onMessageListener),
								o.removeEventListener(c.KEY_SESSION_STATUSES_CHANGE, r.onKeyStatusChangeListener);
							var a = s.resolve(o.close()).catch(function (t) {
								f.warn("Failed to close KeySession", t);
							});
							t.push(a),
								(r.keySession = null),
								(r.onMessageListener = null),
								(r.onKeyStatusChangeListener = null),
								f.info("Closed KeySession");
						} catch (t) {
							f.warn("Failed to close KeySession", t);
						}
					return (this._keySessions = []), s.all(t);
				}),
				(n.prototype.init = function () {
					for (
						var t = this._keySystemDeferred, i = e.navigator, n = {}, r = [], a = [], _ = 0, c = p.length;
						_ < c;
						_++
					) {
						var d = p[_];
						this._configFilter.test(d.label) || a.push(d);
					}
					this._configs = a;
					for (var l in h)
						Object.prototype.hasOwnProperty.call(h, l) &&
							r.push(
								i
									.requestMediaKeySystemAccess(h[l], a)
									.then(function (t) {
										n[t.keySystem] = t;
									})
									.catch(function () {})
							);
					return s
						.all(r)
						.then(this._selectKeySystem.bind(this, n))
						.then(
							function (t) {
								return t
									? this._testMediaKeys(t)
									: s.reject(
											new o(u.EME_NO_SUPPORTED_KEYSYSTEM, "No supported keysystem was found.")
									  );
							}.bind(this)
						)
						.then(
							function (e) {
								return this._prepareConfiguration(e), t.resolve(e), this;
							}.bind(this)
						)
						.catch(function (e) {
							var i = e.code || u.EME_NO_SUPPORTED_KEYSYSTEM,
								n = e.message || "No supported keysystem";
							return t.reject(new o(i, n).fatal()), t.promise;
						});
				}),
				(n.prototype._selectKeySystem = function (t) {
					for (var e = this._preferredKeySystems, i = 0, n = e.length; i < n; i++) {
						var r = e[i];
						if (r in t) return t[r];
					}
					return null;
				}),
				(n.prototype._testMediaKeys = function (t) {
					return new s(function (e) {
						e(t.createMediaKeys());
					}).then(
						function (e) {
							if (!e)
								return s.reject(
									new o(
										u.EME_MEDIA_KEYS_NOT_SUPPORTED,
										"Cannot create MediaKeys from KeySystemAccess"
									).fatal()
								);
							try {
								if (!e.createSession()) throw new Error("");
							} catch (t) {
								return s.reject(
									new o(
										u.EME_MEDIA_KEY_SESSION_NOT_SUPPORTED,
										t.message || "Cannot create MediaKeySession from KeySystemAccess"
									).fatal()
								);
							}
							return t;
						},
						function (t) {
							return (
								f.error(t.name),
								s.reject(new o(u.EME_MEDIA_KEYS_NOT_SUPPORTED, t.message || "Unknown error").fatal())
							);
						}
					);
				}),
				(n.prototype.createMediaKeys = function (t) {
					return this._keySystemDeferred.promise
						.then(function (t) {
							return t.createMediaKeys();
						})
						.then(function (e) {
							return s.all([t.setMediaKeys(e), e]);
						})
						.spread(
							function (e, i) {
								if (!t.mediaKeys)
									throw new o(
										u.EME_PLAYER_MEDIA_KEYS_SETTING_FAILED,
										"Failed to set MediaKeys on HTMLMediaElement"
									);
								return this._configuration.promise.then(
									function () {
										var t = this._keySystemSettings;
										return this._noServerCertificate || !t.withCertificate
											? this
											: this._trySetServerCertificate(t.licenseServer, i);
									}.bind(this)
								);
							}.bind(this)
						);
				}),
				(n.prototype.removeMediaKeys = function (t) {
					return s.resolve(t.setMediaKeys(null)).then(
						function () {
							return this;
						}.bind(this)
					);
				}),
				(n.prototype.getKeySystemInfo = function () {
					return this._configuration.promise;
				}),
				(n.prototype.getKeySystemImpl = function () {
					return this._emeImpl;
				}),
				(n.prototype.createSessionWithParams = function (t) {
					return new s(
						function (e, i) {
							f.info("Creating KeySession", t.keySystem);
							var n = t.mediaKeys.createSession(),
								r = {
									generate: { start: 0, end: 0 },
									request: { start: 0, end: 0 },
									update: { start: 0, end: 0 },
								},
								a = this._onMessage.bind(this, {
									keySystem: t.keySystem,
									keySession: n,
									licenseServer: t.licenseServer || this._keySystemSettings.licenseServer,
									playId: t.playId,
									timeMap: r,
								});
							n.addEventListener(c.KEY_SESSION_MESSAGE, a);
							var _ = function () {
								f.info("KeyStatus change"),
									(r.update.end = Date.now()),
									e({
										elapsed: {
											generate: Math.max(r.generate.end - r.generate.start, 0),
											request: Math.max(r.request.end - r.request.start, 0),
											update: Math.max(r.update.end - r.update.start, 0),
										},
									});
							};
							n.addEventListener(c.KEY_SESSION_STATUSES_CHANGE, _),
								this._saveSession({
									keySession: n,
									onMessageListener: a,
									onKeyStatusChangeListener: _,
								}),
								f.info("Generating KeySession request", t.keySystem),
								(r.generate.start = Date.now()),
								s.resolve(n.generateRequest(t.initDataType, t.initData.buffer)).catch(function (t) {
									if (t) {
										var e;
										switch (t.name) {
											case "NotSupportedError":
												e = u.EME_NOT_SUPPORTED_ERROR;
												break;
											case "InvalidStateError":
												e = u.EME_INVALID_STATE_ERROR;
												break;
											default:
												e = u.EME_UNKNOWN_ERROR;
										}
										i(new o(e, t.message || "Unknown error message."));
									}
								});
						}.bind(this)
					);
				}),
				(t.exports = n);
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			Error.call(this, t), (this.code = t), (this.message = e);
		}
		(n.prototype = new Error()),
			(n.prototype.constructor = n),
			(n.prototype.name = "CappingError"),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			var n = i(5).forTag("eme_polyfills.tester"),
				r = i(90),
				s = i(91);
			t.exports = {
				install: function () {
					var t = e.navigator;
					return t &&
						t.requestMediaKeySystemAccess &&
						e.MediaKeySystemAccess &&
						e.MediaKeySystemAccess.prototype.getConfiguration
						? (n.log("Using native EME implementation."), "native")
						: e.HTMLMediaElement && e.HTMLMediaElement.prototype.webkitGenerateKeyRequest
						? (n.log('Detected "webkit" Prefixed EME v0.1b. Polyfilling.'),
						  s.setup("webkit"),
						  "v0.1b-webkit")
						: e.HTMLMediaElement && e.HTMLMediaElement.prototype.generateKeyRequest
						? (n.log("Detected Unprefixed EME v0.1b. Polyfilling."), s.setup(), "v0.1b")
						: e.MSMediaKeys
						? (n.log("Detected MS IE EME. Polyfilling."), r.setup(), "ms-ie")
						: (n.warn("Detected no EME APIs."), null);
				},
			};
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t) {
				var e = this.mediaKeys;
				return (
					e && e !== t && e.detach(this),
					delete this.mediaKeys,
					(this.mediaKeys = t),
					t ? t.attach(this) : c.resolve()
				);
			}
			function r(t, e) {
				if (((this.keySystem = t), (this._configuration = null), !this._checkConfig(e)))
					throw new d(h.EME_NO_SUPPORTED_CONFIGURATION, "No supported configurations");
			}
			function s(t) {
				(this._nativeMediaKeys = new e.MSMediaKeys(t)),
					(this._lastBoundSetter = null),
					(this.shouldRefreshPerTrack = !0);
			}
			function o(t) {
				_.call(this),
					(this._nativeMediaKeys = t),
					(this._nativeKeySession = null),
					(this._lastUpdateDeferred = null),
					(this._lastGenerateDeferred = null),
					(this.addEventListener = this.addListener),
					(this.removeEventListener = this.removeListener),
					(this._onKeyMessage = this._onKeyMessage.bind(this)),
					(this._onKeyAdded = this._onKeyAdded.bind(this)),
					(this._onKeyError = this._onKeyError.bind(this));
			}
			var a = i(2),
				_ = i(3),
				c = i(0),
				u = i(7),
				h = i(4),
				d = i(20),
				l = i(35);
			(r.prototype._checkConfig = function (t) {
				for (var i = this.keySystem, n = 0, r = t.length; n < r; n++) {
					var s,
						o,
						a,
						_,
						c,
						u = t[n],
						h = {
							initDataTypes: u.initiDataTypes,
							audioCapabilities: [],
							videoCapabilities: [],
							persistentState: "optional",
							distinctiveIdentifier: "optional",
							sessionTypes: ["temporary"],
							label: u.label,
						};
					if (u.audioCapabilities && u.audioCapabilities.length)
						for (c = !1, s = 0, o = u.audioCapabilities.length; s < o; s++)
							(a = u.audioCapabilities[s]),
								(_ = a.contentType.split(";")[0]),
								e.MSMediaKeys.isTypeSupported(i, _) && (h.audioCapabilities.push(a), (c = !0));
					if (u.videoCapabilities && u.videoCapabilities.length)
						for (c = !1, s = 0, o = u.videoCapabilities.length; s < o; s++)
							(a = u.videoCapabilities[s]),
								(_ = a.contentType.split(";")[0]),
								e.MSMediaKeys.isTypeSupported(i, _) && (h.videoCapabilities.push(a), (c = !0));
					if (c) return (this._configuration = h), !0;
				}
				return !1;
			}),
				(r.prototype.getConfiguration = function () {
					return this._configuration;
				}),
				(r.prototype.createMediaKeys = function () {
					var t = this.keySystem;
					return new c(function (e) {
						e(new s(t));
					});
				}),
				(s.prototype.attach = function (t) {
					return new c(
						function (e) {
							if (t.readyState >= 1) return t.msSetMediaKeys(this._nativeMediaKeys), void e();
							var i = function () {
								t.removeEventListener(u.MEDIA_LOADEDMETADATA, i),
									(this._lastBoundSetter = null),
									t.msSetMediaKeys(this._nativeMediaKeys);
							}.bind(this);
							(this._lastBoundSetter = i),
								t.addEventListener(u.MEDIA_LOADEDMETADATA, i),
								t.addEventListener(u.MS_NEEDKEY, l),
								e();
						}.bind(this)
					);
				}),
				(s.prototype.detach = function (t) {
					this._lastBoundSetter &&
						(t.removeEventListener(u.MS_NEEDKEY, l),
						t.removeEventListener(u.MEDIA_LOADEDMETADATA, this._lastBoundSetter),
						(this._lastBoundSetter = null));
				}),
				(s.prototype.setServerCertificate = function () {
					return c.reject(
						new d(
							h.EME_CANNOT_SET_CERTIFICATE_FOR_PLATFORM,
							"Cannot set server certificate on this platform."
						)
					);
				}),
				(s.prototype.createSession = function () {
					return new o(this._nativeMediaKeys);
				}),
				a(o, _),
				(o.prototype._attach = function () {
					var t = this._nativeKeySession;
					t.addEventListener(u.MS_KEY_ADDED, this._onKeyAdded),
						t.addEventListener(u.MS_KEY_ERROR, this._onKeyError),
						t.addEventListener(u.MS_KEY_MESSAGE, this._onKeyMessage);
				}),
				(o.prototype._detach = function () {
					var t = this._nativeKeySession;
					t.removeEventListener(u.MS_KEY_ADDED, this._onKeyAdded),
						t.removeEventListener(u.MS_KEY_ERROR, this._onKeyError),
						t.removeEventListener(u.MS_KEY_MESSAGE, this._onKeyMessage);
				}),
				(o.prototype._onKeyMessage = function (t) {
					t.message &&
						t.message.buffer &&
						(this.emit(u.KEY_SESSION_MESSAGE, {
							messageType: "license-request",
							message: t.message.buffer,
						}),
						this._lastGenerateDeferred &&
							(this._lastGenerateDeferred.resolve(!0), (this._lastGenerateDeferred = null)));
				}),
				(o.prototype._onKeyAdded = function () {
					this._lastUpdateDeferred &&
						(this._lastUpdateDeferred.resolve(!0), (this._lastUpdateDeferred = null)),
						this._lastGenerateDeferred &&
							(this._lastGenerateDeferred.resolve(!0), (this._lastGenerateDeferred = null)),
						this.emit(u.KEY_SESSION_STATUSES_CHANGE);
				}),
				(o.prototype._onKeyError = function () {
					var t = this._nativeKeySession.error;
					this._lastGenerateDeferred &&
						(this._lastGenerateDeferred.reject(t), (this._lastGenerateDeferred = null)),
						this._lastUpdateDeferred &&
							(this._lastUpdateDeferred.reject(t), (this._lastUpdateDeferred = null)),
						this.emit(u.KEY_SESSION_STATUSES_CHANGE);
				}),
				(o.prototype.generateRequest = function (t, i) {
					return new c(
						function (t, n) {
							(this._lastGenerateDeferred = { resolve: t, reject: n }),
								(this._nativeKeySession = this._nativeMediaKeys.createSession(
									"audio/mp4",
									new e.Uint8Array(i),
									null
								)),
								this._attach();
						}.bind(this)
					);
				}),
				(o.prototype.update = function (t) {
					return new c(
						function (i, n) {
							(this._lastUpdateDeferred = { resolve: i, reject: n }),
								this._nativeKeySession.update(new e.Uint8Array(t));
						}.bind(this)
					);
				}),
				(o.prototype.close = function () {
					return new c(
						function (t) {
							this._nativeKeySession.close(), this._detach(), t(!0);
						}.bind(this)
					);
				}),
				(t.exports = {
					setup: function () {
						e.navigator.requestMediaKeySystemAccess = function (t, e) {
							return new c(function (i) {
								i(new r(t, e));
							});
						};
						var t = e.HTMLMediaElement;
						t && (delete t.prototype.mediaKeys, (t.prototype.setMediaKeys = n));
					},
				});
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		(function (e) {
			function n(t) {
				var e = this.mediaKeys;
				return (
					e && e !== t && e.detach(this),
					delete this.mediaKeys,
					(this.mediaKeys = t),
					t && t.attach(this),
					c.resolve()
				);
			}
			function r(t, e, i) {
				if (((this.keySystem = t), (this._configuration = null), (this._prefix = i), !this._checkConfig(e)))
					throw new d(h.EME_NO_SUPPORTED_CONFIGURATION, "No supported configurations");
			}
			function s(t, e) {
				(this._keySystem = t),
					(this._prefix = e),
					(this._mediaElement = null),
					(this._waitingForSessionIds = []),
					(this._sessionMap = {}),
					(this.shouldRefreshPerTrack = !0),
					(this._onKeyMessage = this._onKeyMessage.bind(this)),
					(this._onKeyAdded = this._onKeyAdded.bind(this)),
					(this._onKeyError = this._onKeyError.bind(this));
			}
			function o(t, e, i) {
				_.call(this),
					(this._keySystem = t),
					(this._mediaElement = e),
					(this._prefix = i),
					(this._lastUpdateDeferred = null),
					(this._lastGenerateDeferred = null),
					(this.sessionId = null),
					(this.addEventListener = this.addListener),
					(this.removeEventListener = this.removeListener);
			}
			var a = i(2),
				_ = i(3),
				c = i(0),
				u = i(7),
				h = i(4),
				d = i(20),
				l = i(35),
				p = i(5).forTag("eme_polyfill.v0_1b");
			(r.prototype._checkConfig = function (t) {
				for (var e = this.keySystem, i = document.createElement("video"), n = 0, r = t.length; n < r; n++) {
					var s,
						o,
						a,
						_,
						c = t[n],
						u = {
							initDataTypes: c.initiDataTypes,
							audioCapabilities: [],
							videoCapabilities: [],
							persistentState: "optional",
							distinctiveIdentifier: "optional",
							sessionTypes: ["temporary"],
							label: c.label,
						},
						h = !1;
					if (c.audioCapabilities && c.audioCapabilities.length)
						for (h = !1, s = 0, o = c.audioCapabilities.length; s < o; s++)
							(a = c.audioCapabilities[s]),
								(_ = a.contentType.split(";")[0]),
								i.canPlayType(_, e) && (u.audioCapabilities.push(a), (h = !0));
					if (c.videoCapabilities && c.videoCapabilities.length)
						for (h = !1, s = 0, o = c.videoCapabilities.length; s < o; s++)
							(a = c.videoCapabilities[s]),
								(_ = a.contentType),
								i.canPlayType(_, e) && (u.videoCapabilities.push(a), (h = !0));
					if (h) return (this._configuration = u), !0;
				}
				return !1;
			}),
				(r.prototype.getConfiguration = function () {
					return this._configuration;
				}),
				(r.prototype.createMediaKeys = function () {
					var t = this.keySystem,
						e = this._prefix;
					return new c(function (i) {
						i(new s(t, e));
					});
				}),
				(s.prototype.attach = function (t) {
					this._mediaElement = t;
					var e = this._prefix;
					t.addEventListener(e + u.V0_1B_NEEDKEY, l),
						t.addEventListener(e + u.V0_1B_KEY_ADDED, this._onKeyAdded),
						t.addEventListener(e + u.V0_1B_KEY_ERROR, this._onKeyError),
						t.addEventListener(e + u.V0_1B_KEY_MESSAGE, this._onKeyMessage);
				}),
				(s.prototype.detach = function (t) {
					this._mediaElement = null;
					var e = this._prefix;
					t.removeEventListener(e + u.V0_1B_NEEDKEY, l),
						t.removeEventListener(e + u.V0_1B_KEY_ADDED, this._onKeyAdded),
						t.removeEventListener(e + u.V0_1B_KEY_ERROR, this._onKeyError),
						t.removeEventListener(e + u.V0_1B_KEY_MESSAGE, this._onKeyMessage);
				}),
				(s.prototype._getSession = function (t) {
					var e = this._sessionMap[t];
					if (e) return e;
					var i = this._waitingForSessionIds.shift();
					return i ? ((i.sessionId = t), (this._sessionMap[t] = i), i) : null;
				}),
				(s.prototype._onKeyMessage = function (t) {
					var e = this._getSession(t.sessionId);
					if (!e) return void p.warn("Got keymessage without session.");
					e.generateComplete(t.message);
				}),
				(s.prototype._onKeyAdded = function (t) {
					var e = this._getSession(t.sessionId);
					if (!e) return void p.warn("Got keyadded without session.");
					e.updateComplete();
				}),
				(s.prototype._onKeyError = function (t) {
					var e = this._getSession(t.sessionId);
					if (!e) return void p.warn("Got keyerror without session.");
					e.handleErrorEvent(t);
				}),
				(s.prototype.setServerCertificate = function () {
					return c.reject(
						new d(
							h.EME_CANNOT_SET_CERTIFICATE_FOR_PLATFORM,
							"Cannot set server certificate on this platform."
						)
					);
				}),
				(s.prototype.createSession = function () {
					var t = new o(this._keySystem, this._mediaElement, this._prefix);
					return this._waitingForSessionIds.push(t), t;
				}),
				a(o, _),
				(o.prototype._addPrefix = function (t) {
					return this._prefix
						? this._prefix +
								t.replace(/\b[a-z]/, function (t) {
									return t.toUpperCase();
								})
						: t;
				}),
				(o.prototype.generateComplete = function (t) {
					this.emit(u.KEY_SESSION_MESSAGE, { messageType: "license-request", message: t }),
						this._lastGenerateDeferred &&
							(this._lastGenerateDeferred.resolve(!0), (this._lastGenerateDeferred = null));
				}),
				(o.prototype.updateComplete = function () {
					this._lastUpdateDeferred &&
						(this._lastUpdateDeferred.resolve(!0), (this._lastUpdateDeferred = null)),
						this.emit(u.KEY_SESSION_STATUSES_CHANGE);
				}),
				(o.prototype.handleErrorEvent = function (t) {
					var e = new d(h.EME_MEDIA_KEY_SESSION_V0_1B_ERROR, "MediaKeySession v0.1b Error");
					(e.debug.errorCode = t.errorCode),
						(e.debug.systemCode = t.systemCode),
						!t.sessionId && this._lastGenerateDeferred
							? (this._lastGenerateDeferred.reject(e), (this._lastGenerateDeferred = null))
							: t.sessionId && this._lastUpdateDeferred
							? (this._lastUpdateDeferred.reject(e), (this._lastUpdateDeferred = null))
							: this.emit(u.KEY_SESSION_STATUSES_CHANGE);
				}),
				(o.prototype.generateRequest = function (t, i) {
					return new c(
						function (t, n) {
							this._lastGenerateDeferred = { resolve: t, reject: n };
							try {
								this._mediaElement[this._addPrefix("generateKeyRequest")](
									this._keySystem,
									new e.Uint8Array(i)
								);
							} catch (t) {
								n(t), (this._lastGenerateDeferred = null);
							}
						}.bind(this)
					);
				}),
				(o.prototype.update = function (t) {
					if (this._lastUpdateDeferred) {
						var i = this.update.bind(this, t);
						return this._lastUpdateDeferred.promise.then(i, i);
					}
					var n = c.defer();
					this._lastUpdateDeferred = n;
					try {
						this._mediaElement[this._addPrefix("addKey")](
							this._keySystem,
							new e.Uint8Array(t),
							null,
							this.sessionId
						);
					} catch (t) {
						n.reject(t), (this._lastUpdateDeferred = null);
					}
					return n.promise;
				}),
				(o.prototype.close = function () {
					if (this.sessionId)
						try {
							this._mediaElement[this._addPrefix("cancelKeyRequest")](this._keySystem, this.sessionId);
						} catch (t) {
							p.warn("Could not close keysession", t);
						}
					return c.resolve(!0);
				}),
				(t.exports = {
					setup: function (t) {
						e.navigator.requestMediaKeySystemAccess = function (e, i) {
							return new c(function (n) {
								n(new r(e, i, t));
							});
						};
						var i = e.HTMLMediaElement;
						i && (delete i.prototype.mediaKeys, (i.prototype.setMediaKeys = n));
					},
				});
		}.call(e, i(1)));
	},
	function (t, e, i) {
		"use strict";
		t.exports = [
			{
				label: "video-sw-decode",
				initDataTypes: ["cenc"],
				audioCapabilities: [{ contentType: 'audio/mp4; codecs="mp4a.40.2"', robustness: "SW_SECURE_CRYPTO" }],
				videoCapabilities: [
					{ contentType: 'video/webm; codecs="vp8"', robustness: "SW_SECURE_DECODE" },
					{ contentType: 'video/mp4; codecs="avc1.4d401f"', robustness: "SW_SECURE_DECODE" },
					{ contentType: 'video/mp2t; codecs="avc1.4d401f"', robustness: "SW_SECURE_DECODE" },
				],
				distinctiveIdentifier: "optional",
				persistenceState: "optional",
				sessionTypes: ["temporary"],
			},
			{
				label: "video-sw-crypto",
				initDataTypes: ["cenc"],
				audioCapabilities: [{ contentType: 'audio/mp4; codecs="mp4a.40.2"', robustness: "SW_SECURE_CRYPTO" }],
				videoCapabilities: [
					{ contentType: 'video/webm; codecs="vp8"', robustness: "SW_SECURE_CRYPTO" },
					{ contentType: 'video/mp4; codecs="avc1.4d401f"', robustness: "SW_SECURE_CRYPTO" },
					{ contentType: 'video/mp2t; codecs="avc1.4d401f"', robustness: "SW_SECURE_CRYPTO" },
				],
				distinctiveIdentifier: "optional",
				persistenceState: "optional",
				sessionTypes: ["temporary"],
			},
			{
				label: "video-no-robustness",
				initDataTypes: ["cenc"],
				audioCapabilities: [{ contentType: 'audio/mp4; codecs="mp4a.40.2"', robustness: "" }],
				videoCapabilities: [
					{ contentType: 'video/webm; codecs="vp8"', robustness: "" },
					{ contentType: 'video/mp4; codecs="avc1.4d401f"', robustness: "" },
					{ contentType: 'video/mp2t; codecs="avc1.4d401f"', robustness: "" },
				],
				distinctiveIdentifier: "optional",
				persistenceState: "optional",
				sessionTypes: ["temporary"],
			},
			{
				label: "audio-sw-crypto",
				initDataTypes: ["cenc"],
				audioCapabilities: [{ contentType: 'audio/mp4; codecs="mp4a.40.2"', robustness: "SW_SECURE_CRYPTO" }],
				videoCapabilities: [],
				distinctiveIdentifier: "optional",
				persistenceState: "optional",
				sessionTypes: ["temporary"],
			},
			{
				label: "audio-no-robustness",
				initDataTypes: ["cenc"],
				audioCapabilities: [{ contentType: 'audio/mp4; codecs="mp4a.40.2"', robustness: "" }],
				videoCapabilities: [],
				distinctiveIdentifier: "optional",
				persistenceState: "optional",
				sessionTypes: ["temporary"],
			},
		];
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			var e = ["--ensure-no-match--"];
			if (t && t.length) for (var i = t.length; i--; ) r.hasOwnProperty(t[i]) && e.push(r[t[i]]);
			return new RegExp("(" + e.join("|") + ")$");
		}
		var r = {
			EMPTY: "-no-robustness",
			SW_CRYPTO: "-sw-crypto",
			SW_DECODE: "-sw-decode",
			HW_CRYPTO: "-hw-crypto",
			HW_DECODE: "-hw-decode",
			HW_ALL: "-hw-all",
		};
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			return Math.ceil(1e3 * t);
		}
		function r() {}
		function s(t, e) {
			a.call(this),
				(this._mediaSource = null),
				(this._sourceBuffers = {}),
				(this._appendingFragments = []),
				(this._updateQueue = []),
				(this._codecs = e || []),
				(this._playId = 0),
				(this._lastBufferClearTime = Date.now()),
				(this._tracker = t),
				(this._onSourceOpen = this._onSourceOpen.bind(this)),
				(this._onSourceClose = this._onSourceClose.bind(this)),
				(this.dequeueUpdates = this.dequeueUpdates.bind(this)),
				this._init();
		}
		var o = i(2),
			a = i(3),
			_ = i(0),
			c = i(7),
			u = i(5).forTag("playback.acme_buffer");
		o(s, a),
			(s.create = function (t, e) {
				return new s(t, e);
			}),
			(s.prototype._init = function () {
				var t = new MediaSource();
				t.addEventListener(c.MEDIA_SOURCE_OPEN, this._onSourceOpen),
					t.addEventListener(c.MEDIA_SOURCE_CLOSE, this._onSourceClose),
					(this._mediaSource = t),
					(this._sourceBuffers = {});
			}),
			(s.prototype._onSourceOpen = function () {
				u.info("MediaSource opened.");
				var t = this._mediaSource;
				if (0 === t.sourceBuffers.length && "open" === t.readyState) {
					u.info("Creating source buffers for codecs", this._codecs);
					for (var e = 0, i = this._codecs.length; e < i; e++) this._addSourceBuffer(this._codecs[e]);
				}
				this.dequeueUpdates(), this.emit(c.BUFFER_SOURCE_OPEN);
			}),
			(s.prototype._onSourceClose = function () {
				u.info("MediaSource closed."), this._destroySourceBuffers(), this.emit(c.BUFFER_SOURCE_CLOSE);
			}),
			(s.prototype._removeAppendingFragment = function (t) {
				if (t) {
					var e = this._appendingFragments,
						i = e.indexOf(t);
					-1 !== i && e.splice(i, 1);
				}
			}),
			(s.prototype.dequeueUpdates = function () {
				this._updateQueue.length && this.tryUpdate(this._updateQueue.shift());
			}),
			(s.prototype._addSourceBuffer = function (t) {
				var e = this._mediaSource.addSourceBuffer(t);
				e.addEventListener(c.SOURCE_BUFFER_UPDATE_END, this.dequeueUpdates), (this._sourceBuffers[t] = e);
			}),
			(s.prototype._trackBufferingProgress = function (t) {
				this._tracker.trackBytesDownloaded(t.audio.buffer.byteLength),
					t.video && this._tracker.trackBytesDownloaded(t.video.buffer.byteLength);
			}),
			(s.prototype.appendFragment = function (t, e, i) {
				if (-1 !== this._appendingFragments.indexOf(e)) return _.resolve([!1]);
				this._appendingFragments.push(e), this.emit(c.BUFFERING_START);
				var n = Date.now(),
					r = this._playId,
					s = t.toLogJSON();
				return t
					.getBufferForFragment(e)
					.then(
						function (t) {
							return (
								this._trackBufferingProgress(t),
								r !== this._playId
									? (u.info("Append fragment dropped: playId has changed."), [!1])
									: (i || this._checkStalling(Date.now() - n, e, !1),
									  this._appendBufferData(t, e, r, n))
							);
						}.bind(this)
					)
					.catch(
						function (t) {
							return (
								this._removeAppendingFragment(e),
								i || this._checkStalling(Date.now() - n, e, !0),
								this.emit(c.BUFFER_APPEND_ERROR, { error: t, canPlayNext: !0, track: s }),
								_.reject(t)
							);
						}.bind(this)
					);
			}),
			(s.prototype._checkStalling = function (t, e, i) {
				t > 9e3 &&
					this.emit(c.BUFFER_STALLED, {
						byteStart: e.byteStart,
						timeStart: n(e.timeStart),
						stallAmount: t - 9e3,
						didTimeout: i,
					});
			}),
			(s.prototype._appendBufferData = function (t, e, i, n) {
				this.emit(c.BUFFERING_END);
				var r = n || Date.now(),
					s = [],
					o = _.defer();
				if (
					(this.tryUpdate({
						playId: i,
						timestamp: r,
						type: "append",
						buffer: t.audio.buffer,
						fragment: e,
						codec: t.audio.codec,
						init: e.init,
						resolve: o.resolve,
					}),
					s.push(o),
					null !== t.audio.bandwidth &&
						this._tracker.trackBufferURL(t.audio.bufferURL, { bandwidth: t.audio.bandwidth }),
					t.video)
				) {
					var a = _.defer();
					this.tryUpdate({
						playId: i,
						timestamp: r,
						type: "append",
						buffer: t.video.buffer,
						fragment: e,
						codec: t.video.codec,
						init: e.init,
						resolve: a.resolve,
					}),
						s.push(a),
						null !== t.video.bandwidth &&
							this._tracker.trackBufferURL(t.video.bufferURL, { bandwidth: t.video.bandwidth });
				}
				return _.all(s);
			}),
			(s.prototype._appendUpdate = function (t) {
				var e = this._sourceBuffers[t.codec];
				if (!e || e.updating) return void this._updateQueue.push(t);
				this._removeAppendingFragment(t.fragment);
				try {
					e.appendBuffer(t.buffer);
				} catch (e) {
					if (
						("QuotaExceededError" === e.name && this.emitSync(c.BUFFER_QUOTA_EXCEEDED),
						u.warn("Failed to append buffer", e),
						_.resolve()
							.then(this.dequeueUpdates)
							.then(
								function () {
									if (t.init) return void this._updateQueue.push(t);
								}.bind(this)
							),
						t.init)
					)
						return;
				}
				t.resolve && t.resolve(!0);
			}),
			(s.prototype.abort = function (t) {
				if (((this._lastBufferClearTime = Date.now()), this._mediaSource))
					for (var e = this._mediaSource.sourceBuffers, i = 0, n = e.length; i < n; i++)
						if ("open" === this._mediaSource.readyState) {
							var r = e[i];
							try {
								r.abort();
								var s = r.buffered;
								if (t && s.length) {
									var o = s.start(0),
										a = s.end(s.length - 1);
									r.remove(o, a), u.info("Cleared buffer range", o, a);
								}
							} catch (t) {
								u.warn("ACMEBuffer.clear failed.", t);
							}
						}
				this._appendingFragments = [];
			}),
			(s.prototype._getBufferedFor = function (t) {
				var e =
					this._mediaSource.sourceBuffers &&
					this._mediaSource.sourceBuffers.length > 0 &&
					this._mediaSource.sourceBuffers[0].buffered;
				if (e)
					for (var i, n, r = 0; r < e.length; r++)
						if (((i = e.start(r)), (n = e.end(r)), i <= t && t <= n)) return { start: i, end: n };
				return null;
			}),
			(s.prototype.getMediaSource = function () {
				return this._mediaSource;
			}),
			(s.prototype.tryUpdate = function (t) {
				if (t) {
					if (t.playId !== this._playId)
						return u.info("Try update dropped: playId has changed"), void this._abortUpdate(t);
					if (t.timestamp < this._lastBufferClearTime)
						return (
							u.info("Try update dropped: update is older than the last clear"), void this._abortUpdate(t)
						);
					var e = this._mediaSource;
					"open" !== e.readyState && "ended" !== e.readyState
						? this._updateQueue.push(t)
						: this._processUpdate(t);
				}
			}),
			(s.prototype._abortUpdate = function (t) {
				t.fragment && this._removeAppendingFragment(t.fragment),
					t.resolve && t.resolve(!1),
					_.resolve().then(this.dequeueUpdates);
			}),
			(s.prototype._processUpdate = function (t) {
				"end" === t.type
					? this._endUpdate(t)
					: "duration" === t.type
					? this._durationUpdate(t)
					: "append" === t.type && this._appendUpdate(t);
			}),
			(s.prototype._isUpdating = function () {
				for (var t = this._mediaSource, e = t.sourceBuffers, i = 0, n = e.length; i < n; i++) {
					var r = e[i];
					if (r && r.updating) return !0;
				}
				return !1;
			}),
			(s.prototype._endUpdate = function (t) {
				this._isUpdating()
					? this._updateQueue.push(t)
					: "open" === this._mediaSource.readyState &&
					  (this._mediaSource.endOfStream(), t.resolve && t.resolve(!0));
			}),
			(s.prototype._durationUpdate = function (t) {
				this._isUpdating()
					? this._updateQueue.push(t)
					: ((this._mediaSource.duration = t.duration), t.resolve && t.resolve(!0));
			}),
			(s.prototype._destroySourceBuffers = function () {
				var t = this._mediaSource;
				if (t) {
					var e = t.sourceBuffers;
					if (e.length)
						for (var i = 0, n = e.length; i < n; i++) {
							var r = e[i];
							r.removeEventListener("updateend", this.dequeueUpdates);
							try {
								t.removeSourceBuffer(r), u.info("Removed source buffer");
							} catch (t) {
								u.warn("Failed to remove sourcebuffer", t);
							}
						}
					this._sourceBuffers = {};
				}
			}),
			(s.prototype.destroy = function () {
				var t = this._mediaSource;
				t &&
					(u.info("Source destroyed"),
					t.removeEventListener("sourceopen", this._onSourceOpen),
					t.removeEventListener("sourceclose", this._onSourceClose),
					this._destroySourceBuffers(),
					(this._mediaSource = null));
			}),
			(s.prototype._endOfStream = function () {
				"ended" !== this._mediaSource.readyState &&
					this.tryUpdate({ playId: this._playId, timestamp: Date.now(), type: "end" });
			}),
			(s.prototype.progress = function (t, e, i) {
				var n = this._mediaSource;
				if (n && t && ("open" === n.readyState || "ended" === n.readyState)) {
					var s,
						o,
						a = "video" === t.getMediaType(),
						_ = this._getBufferedFor(i);
					if (_) {
						if (i + 10 > n.duration) return void ("open" === n.readyState && this._endOfStream());
						var c = t.getFragmentLength();
						Math.ceil(i / c) > Math.floor(_.end / c) &&
							(s = t.getFragmentForTime(i)) &&
							this.appendFragment(t, s, e).catch(r);
						var u = Math.floor(_.end - i);
						if (u > 10) return;
						var h = Math.min(t.getFragmentLength(), 10 - u);
						if (h < 1) return;
						(o = Math.floor(_.end + h)),
							(s = t.getFragmentForTime(o)),
							s ? this.appendFragment(t, s, e).catch(r) : this._endOfStream();
					} else if ((s = t.getFragmentForTime(i))) {
						if ((this.appendFragment(t, s, e).catch(r), s.timeEnd < i + 5)) {
							o = a ? Math.floor(i) : i;
							var d = t.getFragmentAfterTime(o);
							d ? this.appendFragment(t, d, e).catch(r) : this._endOfStream();
						}
					} else this._endOfStream();
				}
			}),
			(s.prototype.recreate = function (t) {
				this.abort(), this.destroy(), (this._codecs = t), this._init();
			}),
			(s.prototype.setDuration = function (t) {
				this.tryUpdate({ playId: this._playId, timestamp: Date.now(), type: "duration", duration: t });
			}),
			(s.prototype.setPlayId = function (t) {
				this._playId = t;
			}),
			(t.exports = s);
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			(this._transport = t.transport),
				(this._transportLogger = t.logger),
				(this._player = t.player),
				(this._currentTrackingData = null),
				(this._sequenceId = 0),
				(this._sequenceSessionStorage = {}),
				this._init();
		}
		var r = i(2),
			s = i(3),
			o = i(96),
			a = i(7),
			_ = i(4),
			c = i(5).forTag("playback.logger"),
			u = i(97);
		r(n, s),
			(n.create = function (t) {
				return new n(t);
			}),
			(n.prototype._init = function () {
				var t = this._player;
				t.on(a.PLAYER_LOAD, this._onPlayerLoad.bind(this)),
					t.on(a.PLAYER_ERROR, this._onError.bind(this, !1)),
					t.on(a.PLAYER_WARNING, this._onError.bind(this, !0)),
					t.on(a.PLAYER_PRELOADING_ERROR, this._onError.bind(this, !1)),
					t.on(a.PLAYER_TRACKING_DATA_CREATED, this._onTrackingDataCreated.bind(this)),
					t.on(a.PLAYER_TRACKING_DATA_FINALIZED, this._onTrackingDataFinalized.bind(this));
			}),
			(n.prototype._emitError = function (t, e) {
				this.emit(a.LOGGER_ERROR, { error: t, data: e });
			}),
			(n.prototype._onError = function (t, e) {
				var i = e.error,
					n = this._currentTrackingData;
				if (n && !n.noLog) {
					var r = (i && i.debug) || {};
					r.position = e.position;
					var s = {
						track: e.track || {},
						debug: r,
						preloading: !!e.preloading,
						session_id: this._sessionId,
						playback_id: n.playbackId || null,
						player_play_id: e.playId || null,
						http_status_code: "status" in i ? i.status : null,
						license_server: i.licenseServer || null,
					};
					this._logError(i.code || _.UNKNOWN, i, s, t);
				}
			}),
			(n.prototype._onPlayerLoad = function (t) {
				var e = t.logData;
				if (e)
					if (e.impressionURLs)
						for (var i = e.impressionURLs.length; i--; ) this._logImpression(e.impressionURLs[i]);
					else e.impressionURL && this._logImpression(e.impressionURL);
			}),
			(n.prototype._onTrackingDataCreated = function (t) {
				var e = t.data;
				if (e.noLog) return void (this._currentTrackingData = null);
				(this._currentTrackingData = e), this._setSessionId(), e.noTSV || this._setSequenceId();
			}),
			(n.prototype._setSessionId = function () {
				this._sessionId = this._transport.getInitTime().toString();
			}),
			(n.prototype._setSequenceId = function () {
				this._sessionId && (this._sequenceId = this._getSequenceId(this._sessionId));
			}),
			(n.prototype._onTrackingDataFinalized = function (t) {
				var e = t.data;
				if (!e.noLog) {
					var i = this._sessionId !== this._transport.getInitTime().toString();
					if ((i && this._setSessionId(), e.playbackId && !e.noTSV)) {
						if ((i && this._setSequenceId(), !e.playIntended && !e.played))
							return void this._rollbackSequenceId(this._sessionId);
						this._logTrackStreamVerification(e);
					}
					e.noStats || this._logPlaybackStats(e);
				}
			}),
			(n.prototype._logTrackStreamVerification = function (t) {
				var e = {
					play_track: t.currentTrackUri,
					playback_id: t.playbackId,
					ms_played: t.msPlayed,
					session_id: this._sessionId,
					sequence_id: this._sequenceId,
					next_playback_id: t.nextPlaybackId,
				};
				c.debug("Logged TrackStreamVerification", e),
					this._transportLogger.logTrackStreamVerification(e).catch(
						function (i) {
							var n = new o(_.TSV_SENDING_FAILED, i.message || "Unknown reason.");
							this._logError(n.code, i, e), this._emitError(n, t);
						}.bind(this)
					);
			}),
			(n.prototype._logPlaybackStats = function (t) {
				var e = {
					play_track: t.currentTrackUri,
					file_id: t.fileId,
					playback_id: t.playbackId,
					internal_play_id: t.internalPlayId,
					memory_cached: t.memoryCached,
					persistent_cached: t.persistentCached,
					audio_format: t.audiocodec,
					video_format: t.videocodec,
					manifest_id: t.fileId,
					isProtected: t.isProtected,
					key_system: t.keySystem,
					key_system_impl: t.keySystemImpl,
					urls_json: JSON.stringify(t.urls),
					start_time: t.loadTime,
					end_time: t.stopTime,
					external_start_time: t.externalLoadTime,
					ms_play_latency: t.msPlayLatency,
					ms_init_latency: t.msInitLatency,
					ms_head_latency: t.msHeadLatency,
					ms_manifest_latency: t.msManifestLatency,
					ms_resolve_latency: t.msResolveLatency,
					ms_license_session_latency: t.msLicenseSessionLatency,
					ms_license_generation_latency: t.msLicenseGenerationLatency,
					ms_license_request_latency: t.msLicenseRequestLatency,
					ms_license_update_latency: t.msLicenseUpdateLatency,
					ms_played: t.msPlayed,
					ms_nominal_played: t.msPlayed,
					ms_file_duration: t.msFileDuration,
					ms_actual_duration: t.msActualDuration,
					ms_start_position: t.startPosition,
					ms_end_position: t.position,
					ms_seek_rebuffer: t.msSeekRebuffering,
					ms_seek_rebuffer_longest: t.maxMsSeekRebuffering,
					ms_stall_rebuffer: t.msStalled,
					ms_stall_rebuffer_longest: t.maxMsStalled,
					n_stalls: t.nStalls,
					n_seekback: t.nSeeksBackward,
					n_seekforward: t.nSeeksForward,
					start_bitrate: t.startBitrate,
					time_weighted_bitrate: t.timeWeightedBitrate,
					reason_start: t.reasonStart,
					reason_end: t.reasonEnd,
					initially_paused: !t.playIntended,
					had_error: t.hadError,
					n_warnings: t.nWarnings,
					n_navigator_offline: t.nOffline,
					session_id: this._sessionId,
					sequence_id: this._sequenceId,
				};
				c.info("Logging PlaybackStats"),
					this._transportLogger.logJSSDKPlaybackStats(e).catch(
						function (i) {
							var n = new o(_.PLAYBACK_STATS_SENDING_FAILED, i.message || "Unknown reason.");
							this._logError(n.code, i, e), this._emitError(n, t);
						}.bind(this)
					);
			}),
			(n.prototype._getSequenceId = function (t) {
				var e = this._sequenceSessionStorage[t];
				return e || (e = 0), e + 1 >= 9007199254740991 && (e = 0), (this._sequenceSessionStorage[t] = e + 1), e;
			}),
			(n.prototype._rollbackSequenceId = function (t) {
				var e = this._sequenceSessionStorage[t];
				e && (this._sequenceSessionStorage[t] = Math.max(e - 1, 0));
			}),
			(n.prototype._logImpression = function (t) {
				this._transport.request(t, { forget: !0 }).catch(function (t) {
					c.warn("Unable to send impression request", t);
				});
			}),
			(n.prototype._logError = function (t, e, i, n) {
				var r = "";
				e && ((r = e.stack) || (r = e.toString()));
				var s = {
					source: "playback",
					source_version: u.tagged,
					type: t,
					message: e && e.message,
					stack: r,
					json_data: i,
					json_data_version: "1.0.0",
				};
				n
					? this._transportLogger.logJSSDKWarning(s).catch(function (t) {
							c.warn("Failed to log warning", s, t);
					  })
					: this._transportLogger.logJSSDKError(s).catch(function (t) {
							c.warn("Failed to log error", s, t);
					  });
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			Error.call(this, t), (this.code = t), (this.message = e), (this.debug = {});
		}
		(n.prototype = new Error()),
			(n.prototype.constructor = n),
			(n.prototype.name = "LoggingError"),
			(t.exports = n);
	},
	function (t, e) {
		t.exports = { tagged: "5.15.0-3c72598", version: "5.15.0", revision: "3c72598" };
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			this._transport = t;
		}
		var r = i(0),
			s = i(18),
			o = i(4),
			a = i(5).forTag("playback.storage_resolve");
		(n.prototype._parseResponse = function (t, e) {
			var i;
			if (200 !== e.status)
				return (
					(i = new s(o.STORAGE_FAILED_WITH_STATUS, "Storage Resolve responded with " + e.status)),
					(i.status = e.status),
					(i.fileId = t),
					r.reject(i)
				);
			var n = e.body;
			return n && n.cdnurl && n.cdnurl.length
				? { uri: n.cdnurl[0], uris: n.cdnurl, protection: "cenc" }
				: ((i = new s(o.STORAGE_RETURNED_NO_TRACKS, "Storage Resolve returned no tracks for fileId " + t)),
				  (i.fileId = t),
				  r.reject(i));
		}),
			(n.prototype.getCDNURL = function (t, e) {
				a.info("Requesting CDN URL for ", e);
				var i = [
					"http://@webgate/storage-resolve/files/audio/interactive/",
					e,
					"?version=10000000&product=9&platform=39&alt=json",
				].join("");
				return this._transport
					.request(i, {
						responseType: "json",
						retry: {
							condition: function (t, e) {
								return t.getStatusFamily() !== e.SUCCESS;
							},
						},
					})
					.then(this._parseResponse.bind(this, e));
			}),
			(n.prototype.getManifest = function (t) {
				var e = "https://seektables.scdn.co/seektable/" + t + ".json";
				return (
					a.info("Requesting JSON manifest for ", t),
					this._transport
						.request(e, {
							responseType: "json",
							retry: {
								condition: function (t, e) {
									return t.getStatusFamily() !== e.SUCCESS;
								},
							},
						})
						.then(function (e) {
							var i;
							return 200 !== e.status
								? ((i = new s(
										o.STORAGE_TRACK_MANIFEST_FAILED,
										"Track manifest request failed with status code " + e.status
								  )),
								  (i.debug.file_id = t),
								  (i.status = e.status),
								  r.reject(i))
								: e.body
								? e.body
								: ((i = new s(o.STORAGE_TRACK_MANIFEST_EMPTY, "Received empty manifest.")),
								  (i.debug.file_id = t),
								  (i.status = e.status),
								  r.reject(i));
						})
				);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			var e = t || {};
			(this._playedThreshold = e.playedThreshold || u),
				(this._playedThresholdReached = !1),
				(this._trackingData = null),
				(this._totalStreamTime = 0);
		}
		var r = i(2),
			s = i(3),
			o = i(100),
			a = i(37),
			_ = i(7),
			c = i(5).forTag("playback.tracker"),
			u = 31e3;
		r(n, s),
			(n.create = function (t) {
				return new n(t);
			}),
			(n.prototype._checkPlayedThreshold = function () {
				var t = this._trackingData;
				!t ||
					!this._playedThreshold ||
					this._playedThresholdReached ||
					t.msPlayed < this._playedThreshold ||
					((this._playedThresholdReached = !0),
					this.emit(_.TRACKER_PLAYED_THRESHOLD_REACHED, {
						played: t.msPlayed,
						threshold: this._playedThreshold,
					}));
			}),
			(n.prototype.trackLoadStart = function (t, e, i, n) {
				var r = o.create();
				(this._trackingData = r),
					(this._playedThresholdReached = !1),
					(r.fileId = e),
					(r.currentTrackUri = t),
					(r.loadTime = Date.now()),
					(r.internalPlayId = i),
					(r.externalLoadTime = n.externalLoadTime || 0),
					(r.displayTrack = n.displayTrack || a.EMPTY),
					(r.playContext = n.playContext || a.EMPTY),
					(r.reasonStart = n.reason || a.UNKNOWN),
					(r.sourceStart = n.source || a.UNKNOWN);
				var s = n.referrer || {};
				(r.referrer = s.name || a.UNKNOWN),
					(r.referrerVersion = s.version || a.UNKNOWN),
					(r.referrerVendor = s.vendor || a.UNKNOWN);
				var c = n.format || {};
				c.codec && (r.audiocodec = c.codec.toLowerCase()),
					c.bitrate && (r.bitrate = c.bitrate),
					(r.gaiaDevId = n.deviceId || "none"),
					(r.playbackId = n.playbackId || null),
					(r.noLog = "noLog" in n && n.noLog),
					(r.noTSV = "noTSV" in n && n.noTSV),
					(r.noStats = "noStats" in n && n.noStats),
					this.emit(_.TRACKER_TRACKING_DATA_CREATED, { data: r });
			}),
			(n.prototype.trackBufferLoadStart = function () {
				var t = this._trackingData;
				t && (t.bufferLoadStartTime = Date.now());
			}),
			(n.prototype.trackBytesDownloaded = function (t) {
				var e = this._trackingData;
				e && (e.totalBytes += t);
			}),
			(n.prototype.trackLoadDone = function (t) {
				var e = this._trackingData;
				if (e) {
					var i = Date.now();
					(e.msInitLatency = i - e.bufferLoadStartTime),
						(e.lastPlayStartTime = i),
						(e.localTimeMs = i),
						(e.position = t),
						(e.startPosition = t),
						e.addStartSegment();
				}
			}),
			(n.prototype.trackCanPlayThrough = function () {
				var t = this._trackingData;
				if (t && !t.msPlayLatency) {
					var e = Date.now();
					(t.msPlayLatency = e - t.loadTime), (t.msHeadLatency = e - t.bufferLoadStartTime);
				}
			}),
			(n.prototype.trackBufferURL = function (t, e) {
				var i = this._trackingData;
				i && i.trackBufferURL(t, e);
			}),
			(n.prototype.trackNavigatorOffline = function () {
				var t = this._trackingData;
				t && (t.nOffline += 1);
			}),
			(n.prototype.trackSeekRebuffering = function (t) {
				this._trackingData &&
					(t > this._trackingData.maxMsSeekRebuffering && (this._trackingData.maxMsSeekRebuffering = t),
					(this._trackingData.msSeekRebuffering += t));
			}),
			(n.prototype.trackMsStalled = function (t) {
				var e = this._trackingData;
				e && (t > e.maxMsStalled && (e.maxMsStalled = t), (e.msStalled += t), e.nStalls++);
			}),
			(n.prototype.trackLoadFailed = function () {
				var t = this._trackingData;
				t && ((t.msPlayLatency = Date.now() - t.loadTime), (t.position = 0), t.addStartSegment());
			}),
			(n.prototype.trackStopped = function (t) {
				var e = t || {},
					i = this._trackingData;
				if (i && !i.isFinalized()) {
					var n = Date.now();
					(i.stopTime = n),
						i.lastPlayStartTime && (i.addMSPlayed(n - i.lastPlayStartTime), this._checkPlayedThreshold()),
						i.addEndSegment(),
						(i.sourceEnd = e.source || a.UNKNOWN),
						(i.reasonEnd = e.reason || a.UNKNOWN),
						(i.nextPlaybackId = e.playbackId || a.EMPTY),
						i.finalize(),
						(this._totalStreamTime += i.msPlayed),
						c.info("Tracker data finalized.");
					var r = i.getPlaybackStats();
					this.emit(_.TRACKER_TRACKING_DATA_FINALIZED, { data: i, playbackStats: r });
				}
			}),
			(n.prototype.trackPositionChanged = function (t, e) {
				var i = this._trackingData;
				if (i) {
					var n = i.position;
					t !== n &&
						(i.addEndSegment(),
						t > n
							? (i.nSeeksForward++, (i.msSeeksForward += t - n))
							: t < n && (i.nSeeksBackward++, (i.msSeeksBackward += n - t)),
						e || (i.lastPlayStartTime = Date.now()),
						(i.position = t),
						i.addStartSegment());
				}
			}),
			(n.prototype.trackPlaying = function (t) {
				var e = this._trackingData;
				e && ((e.played = !0), (e.lastPlayStartTime = Date.now()), (e.position = t));
			}),
			(n.prototype.trackPaused = function (t) {
				var e = this._trackingData;
				e && ((e.lastPlayStartTime = 0), (e.position = t));
			}),
			(n.prototype.trackProgress = function (t, e) {
				var i = this._trackingData;
				if (i) {
					var n = Date.now(),
						r = 0;
					i.lastPlayStartTime && (r = n - i.lastPlayStartTime),
						(i.lastPlayStartTime = n),
						i.addMSPlayed(r),
						this._checkPlayedThreshold(),
						(i.position = t),
						e && i.trackBitrate(e, r);
				}
			}),
			(n.prototype.trackVideoLoadStart = function (t) {
				var e = this._trackingData;
				e && e.registerVideoVariant(t);
			}),
			(n.prototype.trackWarning = function () {
				var t = this._trackingData;
				t && t.nWarnings++;
			}),
			(n.prototype.trackOffline = function () {
				var t = this._trackingData;
				t && t.nOffline++;
			}),
			(n.prototype.setActualDuration = function (t) {
				var e = this._trackingData;
				e && (e.msActualDuration = t);
			}),
			(n.prototype.setKeySystem = function (t) {
				var e = this._trackingData;
				e && (e.keySystem = t);
			}),
			(n.prototype.setKeySystemImpl = function (t) {
				var e = this._trackingData;
				e && (e.keySystemImpl = t);
			}),
			(n.prototype.setManifestLatency = function (t) {
				var e = this._trackingData;
				e && (e.msManifestLatency = t);
			}),
			(n.prototype.setPlayIntended = function (t) {
				this._trackingData && (this._trackingData.playIntended = !!t);
			}),
			(n.prototype.setKeyLatency = function (t) {
				var e = this._trackingData;
				e && (e.msKeyLatency = t);
			}),
			(n.prototype.setMemoryCached = function (t) {
				var e = this._trackingData;
				e && (e.memoryCached = !!t);
			}),
			(n.prototype.setPersistentCached = function (t) {
				var e = this._trackingData;
				e && (e.persistentCached = !!t);
			}),
			(n.prototype.setProtected = function (t) {
				var e = this._trackingData;
				e && (e.isProtected = !!t);
			}),
			(n.prototype.setHadError = function (t) {
				var e = this._trackingData;
				e && (e.hadError = !!t);
			}),
			(n.prototype.setLicenseSessionLatency = function (t) {
				var e = this._trackingData;
				e && (e.msLicenseSessionLatency = t);
			}),
			(n.prototype.setLicenseGenerationLatency = function (t) {
				var e = this._trackingData;
				e && (e.msLicenseGenerationLatency = t);
			}),
			(n.prototype.setLicenseRequestLatency = function (t) {
				var e = this._trackingData;
				e && (e.msLicenseRequestLatency = t);
			}),
			(n.prototype.setLicenseUpdateLatency = function (t) {
				var e = this._trackingData;
				e && (e.msLicenseUpdateLatency = t);
			}),
			(n.prototype.setResolveLatency = function (t) {
				var e = this._trackingData;
				e && (e.msResolveLatency = t);
			}),
			(n.prototype.setCalculatedDuration = function (t) {
				var e = this._trackingData;
				e && (e.msFileDuration = t);
			}),
			(n.prototype.setPlayedThreshold = function (t) {
				this._playedThreshold = t || 0;
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n() {
			(this._bitrates = {}),
				(this._isFinalized = !1),
				(this._needsEndSegment = !1),
				(this._segments = []),
				(this._cdnURLTracker = new a()),
				(this.audiocodec = null),
				(this.bitrate = 16e4),
				(this.bufferingPercentage = null),
				(this.bufferLoadStartTime = 0),
				(this.urls = {}),
				(this.currentTrackUri = s.EMPTY),
				(this.displayTrack = s.EMPTY),
				(this.externalLoadTime = 0),
				(this.fileId = ""),
				(this.gaiaDevId = "none"),
				(this.hadError = !1),
				(this.internalPlayId = ""),
				(this.isProtected = !1),
				(this.keySystem = ""),
				(this.keySystemImpl = ""),
				(this.lastPlayStartTime = 0),
				(this.loadTime = 0),
				(this.localTimeMs = -1),
				(this.maxContinuous = 0),
				(this.maxMsSeekRebuffering = 0),
				(this.maxMsStalled = 0),
				(this.memoryCached = !1),
				(this.msActualDuration = 0),
				(this.msFileDuration = 0),
				(this.msHeadLatency = 0),
				(this.msInitLatency = 0),
				(this.msKeyLatency = 0),
				(this.msLicenseGenerationLatency = 0),
				(this.msLicenseRequestLatency = 0),
				(this.msLicenseSessionLatency = 0),
				(this.msLicenseUpdateLatency = 0),
				(this.msManifestLatency = 0),
				(this.msPlayed = 0),
				(this.msPlayedUnion = 0),
				(this.msPlayLatency = 0),
				(this.msResolveLatency = 0),
				(this.msSeekRebuffering = 0),
				(this.msSeeksBackward = 0),
				(this.msSeeksForward = 0),
				(this.nextPlaybackId = ""),
				(this.nOffline = 0),
				(this.noLog = !1),
				(this.noTSV = !1),
				(this.noStats = !1),
				(this.nWarnings = 0),
				(this.msStalled = 0),
				(this.nSeeksBackward = 0),
				(this.nSeeksForward = 0),
				(this.nStalls = 0),
				(this.persistentCached = !1),
				(this.playbackId = ""),
				(this.playContext = s.EMPTY),
				(this.played = !1),
				(this.position = 0),
				(this.reasonEnd = s.UNKNOWN),
				(this.reasonStart = s.UNKNOWN),
				(this.referrer = s.UNKNOWN),
				(this.referrerVendor = s.UNKNOWN),
				(this.referrerVersion = s.UNKNOWN),
				(this.sourceEnd = s.UNKNOWN),
				(this.sourceStart = s.UNKNOWN),
				(this.startBitrate = null),
				(this.startPosition = 0),
				(this.stopTime = 0),
				(this.streamingRule = "none"),
				(this.timeWeightedBitrate = 0),
				(this.totalBytes = 0),
				(this.videocodec = null);
		}
		var r = i(101),
			s = i(37),
			o = i(4),
			a = i(102),
			_ = i(14);
		(n.create = function () {
			return new n();
		}),
			(n.prototype._calculateUnion = function () {
				for (
					var t = this._segments.slice(0), e = 0, i = 0, n = 0, r = 0, s = 0, o = 0, a = this.maxContinuous;
					s < t.length;
					s++
				)
					s % 2 != 0 &&
						void 0 !== t[s - 1] &&
						"start" === t[s - 1].type &&
						((o = t[s].time - t[s - 1].time), (a = o > a ? o : a));
				for (
					this.maxContinuous = a,
						t.sort(function (t, e) {
							return t.time - e.time;
						});
					r < t.length;
					r++
				)
					"start" === t[r].type && (0 === i && (n = r), ++i),
						"end" === t[r].type && 0 === --i && (e += t[r].time - t[n].time);
				return e;
			}),
			(n.prototype._calculateWeightedBitrate = function (t) {
				var e = this._bitrates,
					i = 0;
				for (var n in e) "dummy" !== n && e.hasOwnProperty(n) && t > 0 && (i += (parseInt(n, 10) * e[n]) / t);
				return Math.round(i);
			}),
			(n.prototype.registerVideoVariant = function (t) {
				var e = t.bitrate || "dummy";
				(this._bitrates[e] = this._bitrates[e] || 0),
					this.startBitrate || (this.startBitrate = e),
					t.audioProfile && t.audioProfile.audio_codec && (this.audiocodec = t.audioProfile.audio_codec),
					t.videoProfile && t.videoProfile.video_codec && (this.videocodec = t.videoProfile.video_codec);
			}),
			(n.prototype.addStartSegment = function () {
				this._segments.push({ type: "start", time: this.position }), (this._needsEndSegment = !0);
			}),
			(n.prototype.addEndSegment = function () {
				this._needsEndSegment &&
					(this._segments.push({ type: "end", time: this.position }), (this._needsEndSegment = !1));
			}),
			(n.prototype.addMSPlayed = function (t) {
				t && (this.msPlayed += t);
			}),
			(n.prototype.trackBitrate = function (t, e) {
				var i = t || "dummy";
				(this._bitrates[i] = this._bitrates[i] || 0), (this._bitrates[i] += e);
			}),
			(n.prototype.trackBufferURL = function (t, e) {
				this._cdnURLTracker.track(t, e);
			}),
			(n.prototype.finalize = function () {
				if (this._isFinalized) throw new r(o.TRACK_DATA_ALREADY_FINALIZED, "TrackData already finalized.");
				return (
					(this.msPlayedUnion = this._calculateUnion(this.msPlayed)),
					this.nSeeksBackward ||
						this.nSeeksForward ||
						(this.msPlayed = this.maxContinuous = this.msPlayedUnion),
					(this.timeWeightedBitrate = this._calculateWeightedBitrate(this.msPlayed)),
					(this.bufferingPercentage = this.msStalled / this.msPlayed),
					(this.urls = this._cdnURLTracker.toJSON()),
					(this._isFinalized = !0),
					!0
				);
			}),
			(n.prototype.getPlaybackStats = function () {
				var t;
				switch (this.keySystem) {
					case _.WIDEVINE:
						t = "widevine";
						break;
					case _.PLAYREADY:
					case _.PLAYREADY_HARDWARE:
						t = "playready";
						break;
					default:
						t = "none";
				}
				return {
					ms_total_est: this.msActualDuration,
					ms_manifest_latency: this.msManifestLatency,
					ms_latency: this.msPlayLatency,
					start_offset_ms: this.startPosition,
					ms_initial_buffering: this.msPlayLatency,
					ms_seek_rebuffering: this.msSeekRebuffering,
					ms_stalled: this.msStalled,
					max_ms_seek_rebuffering: this.maxMsSeekRebuffering,
					max_ms_stalled: this.maxMsStalled,
					n_stalls: this.nStalls,
					audiocodec: this.audiocodec ? this.audiocodec.toLowerCase() : void 0,
					videocodec: this.videocodec ? this.videocodec.toLowerCase() : void 0,
					start_bitrate: this.startBitrate || void 0,
					full_screen: void 0,
					time_weighted_bitrate: this.timeWeightedBitrate,
					buffering_percentage: void 0,
					prefetched_bytes: void 0,
					prefetched_bytes_loaded: void 0,
					prefetched_initial_bitrate: void 0,
					key_system: t,
					ms_key_latency: this.msKeyLatency,
					total_bytes: this.totalBytes,
					local_time_ms: this.localTimeMs,
					ms_played_background: void 0,
				};
			}),
			(n.prototype.isFinalized = function () {
				return this._isFinalized;
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			Error.call(this, e), (this.code = t), (this.message = e), (this.debug = {});
		}
		(n.prototype = new Error()),
			(n.prototype.constructor = n),
			(n.prototype.name = "TrackingError"),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n() {
			(this._version = "1.0.0"), (this._list = null), (this._map = null), this.clear();
		}
		var r = i(31);
		(n.prototype.clear = function () {
			(this._list = new r()), (this._map = {});
		}),
			(n.prototype.track = function (t, e) {
				var i = this._map[t];
				i ||
					((i = new r.Node({ url: t, segments: 0, bandwidths: [] })),
					this._list.append(i),
					(this._map[t] = i));
				var n = i.value;
				(n.segments += 1), n.bandwidths.push(e.bandwidth);
			}),
			(n.prototype.toJSON = function () {
				for (var t = [], e = this._list.first; e; ) {
					for (var i = e.value, n = i.bandwidths, r = 0, s = n.length; s--; ) r += n[s];
					t.push({ url: i.url, segments: i.segments, avg_bw: parseFloat((r / n.length).toFixed(7)) }),
						(e = e.next);
				}
				return { version: this._version, urls: t };
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			this._transport = t;
		}
		var r = i(0),
			s = i(18),
			o = i(4);
		(n.create = function (t) {
			return new n(t);
		}),
			(n.prototype._parseManifestResponse = function (t) {
				if (200 !== t.status) {
					var e = new s(
						o.STORAGE_VIDEO_MANIFEST_FAILED,
						"Video manifest request failed with status " + t.status
					);
					return (e.status = t.status), r.reject(e);
				}
				return t.body;
			}),
			(n.prototype.getInitSegmentURLs = function (t, e, i, n) {
				var r = t + e.replace("{{profile_id}}", i.id).replace("{{file_type}}", i.file_type),
					s = t + e.replace("{{profile_id}}", n.id).replace("{{file_type}}", n.file_type);
				return { audio: r, video: s, audioLogging: r, videoLogging: s };
			}),
			(n.prototype.getSegmentURLs = function (t, e, i, n, r) {
				var s = t + e.replace("{{profile_id}}", n.id).replace("{{file_type}}", n.file_type),
					o = t + e.replace("{{profile_id}}", r.id).replace("{{file_type}}", r.file_type);
				return {
					audio: s.replace("{{segment_timestamp}}", i),
					video: o.replace("{{segment_timestamp}}", i),
					audioLogging: s,
					videoLogging: o,
				};
			}),
			(n.prototype.getManifest = function (t) {
				var e = ["https://@webgate/manifests/v6/json/sources/", t, "/options/supports_drm"].join("");
				return this._transport
					.request(e, {
						authorize: !0,
						responseType: "json",
						retry: {
							condition: function (t, e) {
								return t.getStatusFamily() !== e.SUCCESS;
							},
						},
					})
					.then(this._parseManifestResponse);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			(this._transport = t.transport),
				(this._sdk = t.sdk || { name: "", version: "" }),
				(this._securityLevel = t.securityLevel),
				(this._urls = {}),
				this._init();
		}
		var r = i(0),
			s = i(105),
			o = i(4);
		(n.prototype._init = function () {
			this._transport.on(
				this._transport.EVENT_CONNECTION_ID,
				function () {
					this._urls = {};
				}.bind(this)
			);
		}),
			(n.prototype.get = function (t, e) {
				var i = t + ":" + e,
					n = this._urls[i];
				if (n && n.expires > Date.now() + 6e4) return r.resolve(n.uri);
				var a = [
					"@webgate/melody/v1/license_url",
					"?keysystem=",
					t,
					"&mediatype=",
					e,
					"&sdk_name=",
					this._sdk.name,
					"&sdk_version=",
					this._sdk.version,
				].join("");
				return this._transport
					.request(a, {
						responseType: "json",
						retry: {
							condition: function (t, e) {
								var i = t.getStatusFamily();
								return i === e.SERVER_ERROR || i === e.CONNECTION_ERROR;
							},
						},
					})
					.then(
						function (t) {
							var e = t.body;
							if (200 === t.status)
								return (
									(e.expires *= 1e3),
									(e.uri = "@webgate/" + e.uri),
									this._securityLevel &&
										(e.uri += [
											-1 !== e.uri.indexOf("?") ? "&" : "?",
											"sl=",
											this._securityLevel,
										].join("")),
									(this._urls[i] = e),
									e.uri
								);
							var n;
							return (
								400 === t.status && e && "deprecated-version" === e.code
									? ((n = new s(
											o.LICENSE_RESOLVER_DEPRECATED_VERSION,
											"This version of the SDK is no longer supported. Please upgrade"
									  )),
									  (n.canPlayNext = !1),
									  n.fatal())
									: (n = new s(
											o.LICENSE_RESOLVER_CANT_RESOLVE_URL,
											"License URL endpoint responded with status " + t.status
									  )),
								(n.status = t.status),
								r.reject(n)
							);
						}.bind(this)
					);
			}),
			(n.prototype.remove = function (t, e) {
				this._urls[t + ":" + e] = null;
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			Error.call(this, e),
				(this.code = t),
				(this.message = e),
				(this.status = -1),
				(this.debug = {}),
				(this.canPlayNext = !0);
		}
		(n.prototype = new Error()),
			(n.prototype.constructor = n),
			(n.prototype.name = "LicenseError"),
			(n.prototype.fatal = function () {
				return (this.unrecoverable = !0), this;
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		t.exports = {
			EMPTY: "EMPTY",
			SW_CRYPTO: "SW_CRYPTO",
			SW_DECODE: "SW_DECODE",
			HW_CRYPTO: "HW_CRYPTO",
			HW_DECODE: "HW_DECODE",
			HW_ALL: "HW_ALL",
		};
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			var e = t || {};
			if (!e.trackPlayer) throw new TypeError("Argument `options.trackPlayerManager` not found.");
			(this._trackPlayerPromise = o.defer()),
				(this._maxListErrors = e.maxListErrors || E),
				(this._uid = 0),
				(this._loadedList = null),
				(this._loadedOptions = null),
				(this._currentTrack = null),
				(this._currentTrackOptions = null),
				(this._listPlayCount = 0),
				(this._listErrorCount = 0),
				(this._shuffled = !1),
				(this._repeatMode = c.NONE),
				(this._currentSeqId = 0),
				(this._setListOptions = this._setListOptions.bind(this)),
				(this._replaceCurrentList = this._replaceCurrentList.bind(this)),
				(this._handleCapped = this._handleCapped.bind(this)),
				(this._handlePlaying = this._handlePlaying.bind(this)),
				(this._handlePaused = this._handlePaused.bind(this)),
				(this._handleEnded = this._handleEnded.bind(this)),
				(this._handleCanPreload = this._handleCanPreload.bind(this)),
				(this._handleError = this._handleError.bind(this)),
				(this._handlePositionChanged = this._handlePositionChanged.bind(this)),
				(this._handleDurationChanged = this._handleDurationChanged.bind(this)),
				(this._handleTimeout = this._handleTimeout.bind(this)),
				(this._handlePlayedThresholdReached = this._handlePlayedThresholdReached.bind(this)),
				this._init(e.trackPlayer);
		}
		var r = i(2),
			s = i(3),
			o = i(0),
			a = i(4),
			_ = i(17),
			c = i(108),
			u = i(109),
			h = i(110),
			d = i(7),
			l = i(36),
			p = i(111),
			E = 5;
		r(n, s),
			(n.create = function (t) {
				return new n(t);
			}),
			(n.prototype._init = function (t) {
				this._trackPlayerPromise.promise.catch(function () {}),
					o
						.resolve(t)
						.then(
							function (t) {
								this._attachPlayerEvents(t), this._trackPlayerPromise.resolve(t);
							}.bind(this)
						)
						.catch(this._handlePlayerInitError.bind(this));
			}),
			(n.prototype._attachPlayerEvents = function (t) {
				t.on(d.PLAYER_CAN_PRELOAD, this._handleCanPreload),
					t.on(d.PLAYER_CAPPED, this._handleCapped),
					t.on(d.PLAYER_ENDED, this._handleEnded),
					t.on(d.PLAYER_ERROR, this._handleError),
					t.on(d.PLAYER_PAUSED, this._handlePaused),
					t.on(d.PLAYER_PLAYING, this._handlePlaying),
					t.on(d.PLAYER_TIMEOUT, this._handleTimeout),
					t.on(d.PLAYER_POSITION_CHANGED, this._handlePositionChanged),
					t.on(d.PLAYER_DURATION_CHANGED, this._handleDurationChanged),
					t.on(d.PLAYER_PLAYED_THRESHOLD_REACHED, this._handlePlayedThresholdReached),
					this.proxyEmit(t, d.PLAYER_PROGRESS, d.LIST_PLAYER_PROGRESS),
					this.proxyEmit(t, d.PLAYER_AUTOPLAY_FAILED, d.LIST_PLAYER_AUTOPLAY_FAILED),
					this.proxyEmit(t, d.PLAYER_BEFORE_LOAD, d.LIST_PLAYER_BEFORE_PLAYER_LOAD),
					this.proxyEmitSync(t, d.PLAYER_LOAD, d.LIST_PLAYER_PLAYER_LOAD),
					this.proxyEmit(t, d.PLAYER_TRACKING_DATA_CREATED, d.LIST_PLAYER_TRACKING_DATA_CREATED),
					this.proxyEmit(t, d.PLAYER_TRACKING_DATA_FINALIZED, d.LIST_PLAYER_TRACKING_DATA_FINALIZED),
					this.proxyEmit(t, d.PLAYER_BUFFER_STALLED, d.LIST_PLAYER_BUFFER_STALLED),
					this.proxyEmit(t, d.PLAYER_BUFFERING_START, d.LIST_PLAYER_BUFFERING_START),
					this.proxyEmit(t, d.PLAYER_BUFFERING_END, d.LIST_PLAYER_BUFFERING_END),
					this.proxyEmit(t, d.PLAYER_VIDEO_ELEMENT_APPENDED, d.LIST_PLAYER_VIDEO_ELEMENT_APPENDED),
					this.proxyEmit(t, d.PLAYER_VIDEO_ELEMENT_REMOVED, d.LIST_PLAYER_VIDEO_ELEMENT_REMOVED);
			}),
			(n.prototype._handlePlayerInitError = function (t) {
				this._trackPlayerPromise.reject(
					new l(a.LIST_PLAYER_NO_TRACK_PLAYER, t.message || "Track player promise was rejected.")
				);
			}),
			(n.prototype._handleCapped = function () {
				var t = this._currentTrack;
				t &&
					this.emit(d.LIST_PLAYER_CAPPED, {
						uid: this._uid,
						track: t,
						options: this._currentTrackOptions,
						list: this._loadedList,
					});
			}),
			(n.prototype._handlePlaying = function (t) {
				var e = this._currentTrack;
				e &&
					this.emit(d.LIST_PLAYER_PLAYING, {
						uid: this._uid,
						track: e,
						options: this._currentTrackOptions,
						list: this._loadedList,
						position: t.position,
					});
			}),
			(n.prototype._handlePaused = function (t) {
				var e = this._currentTrack;
				e &&
					this.emit(d.LIST_PLAYER_PAUSED, {
						uid: this._uid,
						track: e,
						options: this._currentTrackOptions,
						list: this._loadedList,
						position: t.position,
					});
			}),
			(n.prototype._handleCanPreload = function () {
				this._preloadUpcomingTrack().catch(function () {});
			}),
			(n.prototype._handleEnded = function () {
				var t = this._currentTrack;
				t &&
					(this.emit(d.LIST_PLAYER_TRACK_ENDED, {
						uid: this._uid,
						track: t,
						options: this._currentTrackOptions,
						list: this._loadedList,
					}),
					this.next(h.TRACK_DONE));
			}),
			(n.prototype._handleTimeout = function () {
				var t = this._currentTrack;
				t &&
					(this.emit(d.LIST_PLAYER_TRACK_TIMEOUT, {
						uid: this._uid,
						track: t,
						options: this._currentTrackOptions,
						list: this._loadedList,
					}),
					this.next(h.TRACK_ERROR));
			}),
			(n.prototype._handlePositionChanged = function (t) {
				var e = this._currentTrack;
				e &&
					this.emit(d.LIST_PLAYER_POSITION_CHANGED, {
						uid: this._uid,
						track: e,
						options: this._currentTrackOptions,
						list: this._loadedList,
						position: t.position,
					});
			}),
			(n.prototype._handleDurationChanged = function (t) {
				var e = this._currentTrack;
				e &&
					this.emit(d.LIST_PLAYER_DURATION_CHANGED, {
						uid: this._uid,
						track: e,
						options: this._currentTrackOptions,
						list: this._loadedList,
						position: t.position,
						duration: t.duration,
					});
			}),
			(n.prototype._handlePlayedThresholdReached = function (t) {
				var e = this._currentTrack;
				e &&
					this.emit(d.LIST_PLAYER_PLAYED_THRESHOLD_REACHED, {
						uid: this._uid,
						track: e,
						options: this._currentTrackOptions,
						list: this._loadedList,
						total: t.total,
						threshold: t.threshold,
						position: t.position,
					});
			}),
			(n.prototype._handleError = function (t) {
				if (this._currentTrack) {
					this.emit(d.LIST_PLAYER_ERROR, t), this.emitSync(d.LIST_PLAYER_ERROR_SYNC, t);
					var e = !!t.error && t.error.listPlayerIgnore;
					e || this._listErrorCount++,
						t.canPlayNext &&
							(e || this._listErrorCount <= this._maxListErrors
								? this.next(h.TRACK_ERROR)
								: this.emit(d.LIST_PLAYER_MAX_LIST_ERRORS_REACHED, {
										count: this._listErrorCount,
										threshold: this._maxListErrors,
								  }));
				}
			}),
			(n.prototype._handleTrackLoaded = function (t) {
				this.emitSync(d.LIST_PLAYER_TRACK_LOADED, t);
			}),
			(n.prototype._incrementSeqId = function () {
				return (
					this._currentSeqId >= 9007199254740991 ? (this._currentSeqId = 0) : (this._currentSeqId += 1),
					this._currentSeqId
				);
			}),
			(n.prototype._getTrackPlayer = function () {
				return this._trackPlayerPromise.promise;
			}),
			(n.prototype._setListIndex = function (t, e) {
				var i = e.index && -1 !== e.index ? e.index : 0;
				return o.all([t, e, t.startAt(i)]);
			}),
			(n.prototype._setListOptions = function (t, e) {
				return o.all([t.setShuffle(!!this._shuffled), t.setRepeatMode(this._repeatMode)]).then(function () {
					return [t, e];
				});
			}),
			(n.prototype._replaceCurrentList = function (t, e) {
				return (
					this.emitSync(d.LIST_PLAYER_BEFORE_LIST_CHANGE, {
						newList: t,
						newOptions: e,
						oldList: this._loadedList,
						oldOptions: this._loadedOptions,
					}),
					(this._loadedList = t),
					(this._loadedOptions = e),
					(this._listPlayCount = 0),
					(this._listErrorCount = 0),
					this.emit(d.LIST_PLAYER_LIST_CHANGED, { list: t, options: e }),
					_.SUCCESS
				);
			}),
			(n.prototype._preloadTrack = function (t) {
				return this._getTrackPlayer().then(function (e) {
					return e.preload(t).catch(function () {}), _.SUCCESS;
				});
			}),
			(n.prototype._changeTrack = function (t, e, i) {
				if (this._currentSeqId !== i) return _.CANCELLED;
				this.emitSync(d.LIST_PLAYER_BEFORE_TRACK_LOAD, {
					list: this._loadedList,
					newTrack: t,
					oldTrack: this._currentTrack,
				}),
					this._uid++;
				var n = ++this._listPlayCount,
					r = this._loadedOptions,
					s = !0,
					a = 0,
					c = 3e4;
				1 === n ? ((s = !r.paused), (a = r.initialPosition || r.position || 0)) : (a = r.position || 0);
				var u = e === h.TRACK_DONE;
				if ("options" in t) {
					var l = t.options;
					"paused" in l && (s = !l.paused),
						"position" in l && (a = l.position),
						"playedThreshold" in l && (c = l.playedThreshold);
				}
				(this._currentTrack = t),
					(this._currentTrackOptions = { reason: e, paused: !s, position: a, playedThreshold: c });
				var p = this._handleTrackLoaded.bind(this, {
					uid: this._uid,
					track: this._currentTrack,
					options: this._currentTrackOptions,
					list: this._loadedList,
				});
				return this._getTrackPlayer().then(
					function (e) {
						return this._currentSeqId !== i
							? _.CANCELLED
							: (o
									.resolve(
										e.load(
											t,
											{
												uriProperty: "playableURI",
												autoplay: s,
												position: a,
												playedThreshold: c,
												continuePrevious: u,
											},
											p
										)
									)
									.catch(function () {}),
							  _.SUCCESS);
					}.bind(this)
				);
			}),
			(n.prototype.load = function (t, e) {
				var i = e || this._loadedOptions || {},
					n = p.create(i);
				return this._setListIndex(t, n).spread(this._setListOptions).spread(this._replaceCurrentList);
			}),
			(n.prototype.play = function (t, e) {
				var i = this;
				return this.load(t, e).then(function () {
					return i._loadedList !== t ? _.CANCELLED : i.next(i._loadedOptions.reason);
				});
			}),
			(n.prototype.canChangeTrack = function () {
				return this._loadedList
					? this._loadedList.peekNext({ reason: h.FORWARD_BUTTON, listConstants: u }).then(function (t) {
							return t !== u.FORBIDDEN;
					  })
					: o.resolve(!0);
			}),
			(n.prototype._preloadUpcomingTrack = function () {
				var t = this._loadedList;
				if (!t) return o.reject(new l(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."));
				var e = { reason: h.TRACK_DONE, listConstants: u };
				return t.peekNext(e).then(
					function (t) {
						return t === u.FORBIDDEN
							? _.FORBIDDEN
							: t === u.NULL_VALUE
							? this._preloadUpcomingTrack()
							: t === u.LIST_END
							? _.LIST_END
							: t.playable
							? this._preloadTrack(t)
							: _.INVALID;
					}.bind(this)
				);
			}),
			(n.prototype.next = function (t) {
				if (!t) return o.reject(new l(a.LIST_PLAYER_INVALID_ARGUMENT, "The argument `reason` is required."));
				var e = this._loadedList;
				if (!e) return o.reject(new l(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."));
				this.emitSync(d.LIST_PLAYER_BEFORE_NEXT, { list: e, reason: t });
				var i = this._incrementSeqId(),
					n = { reason: t, listConstants: u };
				return e.next(n).then(
					function (n) {
						return this._currentSeqId !== i
							? _.CANCELLED
							: n === u.FORBIDDEN
							? _.FORBIDDEN
							: n === u.NULL_VALUE
							? this.next(t)
							: n === u.LIST_END
							? (this.emit(d.LIST_PLAYER_LIST_ENDED, { list: e, reason: h.END_PLAY }),
							  this.clear(t),
							  _.LIST_END)
							: n.playable
							? this._changeTrack(n, t, i)
							: (this.emit(d.LIST_PLAYER_TRACK_UNPLAYABLE, { track: n, list: e }), this.next(t));
					}.bind(this)
				);
			}),
			(n.prototype.previous = function (t) {
				if (!t) return o.reject(new l(a.LIST_PLAYER_INVALID_ARGUMENT, "The argument `reason` is required."));
				var e = this._loadedList;
				if (!e) return o.reject(new l(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."));
				this.emitSync(d.LIST_PLAYER_BEFORE_PREVIOUS, { list: e, reason: t });
				var i = this._incrementSeqId(),
					n = { reason: t, listConstants: u };
				return e.previous(n).then(
					function (n) {
						return this._currentSeqId !== i
							? _.CANCELLED
							: n === u.FORBIDDEN
							? _.FORBIDDEN
							: n === u.NULL_VALUE
							? this.previous(t)
							: n === u.LIST_START
							? (this.emit(d.LIST_PLAYER_LIST_ENDED, { list: e, reason: h.END_PLAY }),
							  this.clear(t),
							  _.LIST_END)
							: n.playable
							? this._changeTrack(n, t, i)
							: (this.emit(d.LIST_PLAYER_TRACK_UNPLAYABLE, { track: n, list: e }), this.previous(t));
					}.bind(this)
				);
			}),
			(n.prototype.pause = function () {
				return this._loadedList
					? this._currentTrack
						? this._getTrackPlayer().then(function (t) {
								return t.pause(), _.SUCCESS;
						  })
						: o.resolve(_.SUCCESS)
					: o.reject(new l(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."));
			}),
			(n.prototype.resume = function () {
				return this._loadedList
					? this._currentTrack
						? this._getTrackPlayer().then(function (t) {
								return t.resume(), _.SUCCESS;
						  })
						: o.resolve(_.SUCCESS)
					: o.reject(new l(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."));
			}),
			(n.prototype.togglePlay = function () {
				return this._loadedList
					? this._currentTrack
						? this._getTrackPlayer().then(function (t) {
								return t.togglePlay(), _.SUCCESS;
						  })
						: o.resolve(_.SUCCESS)
					: o.reject(new l(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."));
			}),
			(n.prototype.stop = function (t) {
				var e = { reason: t || "unknown" },
					i = this._currentTrack;
				return (
					i && i.logData && (e.source = i.logData.source),
					this._incrementSeqId(),
					this._getTrackPlayer().then(
						function (t) {
							return (
								t.stop(e),
								this.emit(d.LIST_PLAYER_STOPPED, {
									uid: this._uid,
									options: this._currentTrackOptions,
									list: this._loadedList,
								}),
								_.SUCCESS
							);
						}.bind(this)
					)
				);
			}),
			(n.prototype.clear = function (t) {
				return this.stop(t).then(
					function () {
						return (
							(this._loadedList = null),
							(this._loadedOptions = null),
							(this._currentTrack = null),
							(this._currentTrackOptions = null),
							this.emit(d.LIST_PLAYER_CLEARED),
							_.SUCCESS
						);
					}.bind(this)
				);
			}),
			(n.prototype.setShuffle = function (t) {
				var e = !!t;
				if (this._shuffled !== e) {
					(this._shuffled = e), this.emit(d.LIST_PLAYER_SHUFFLE_CHANGED, { player: this, shuffled: e });
					var i = this._loadedList;
					i && i.setShuffle(this._shuffled);
				}
				return o.resolve(_.SUCCESS);
			}),
			(n.prototype.setRepeatMode = function (t) {
				if (!(t in c))
					return o.reject(
						new l(
							a.LIST_PLAYER_INVALID_ARGUMENT,
							"The value of repeat mode is not a correct RepeatMode enum value"
						)
					);
				if (this._repeatMode !== t) {
					(this._repeatMode = t),
						this.emit(d.LIST_PLAYER_REPEAT_MODE_CHANGED, { player: this, repeatMode: t });
					var e = this._loadedList;
					e && e.setRepeatMode(this._repeatMode);
				}
				return o.resolve(_.SUCCESS);
			}),
			(n.prototype.getVolume = function () {
				return this._getTrackPlayer().then(function (t) {
					return t.getVolume();
				});
			}),
			(n.prototype.setVolume = function (t, e) {
				return this._getTrackPlayer().then(
					function (i) {
						return (
							i.setVolume(t),
							this.emit(d.LIST_PLAYER_VOLUME_CHANGED, { volume: t, commandId: e || null }),
							_.SUCCESS
						);
					}.bind(this)
				);
			}),
			(n.prototype.seek = function (t) {
				var e = this._loadedList;
				return e
					? "function" != typeof e.allowSeeking || e.allowSeeking()
						? this._currentTrack
							? this._getTrackPlayer().then(function (e) {
									return e.seek(t), _.SUCCESS;
							  })
							: o.resolve(_.SUCCESS)
						: o.reject(new l(a.LIST_PLAYER_FORBIDDEN, "The operation is not allowed."))
					: o.reject(new l(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."));
			}),
			(n.prototype.getListConstants = function () {
				return u;
			}),
			(n.prototype.getLoadedList = function () {
				return this._loadedList;
			}),
			(n.prototype.getLoadedOptions = function () {
				return this._loadedOptions;
			}),
			(n.prototype.getPlayerState = function () {
				return this._getTrackPlayer().then(function (t) {
					return t.getPlayerState();
				});
			}),
			(n.prototype.getState = function () {
				return this.getPlayerState().then(
					function (t) {
						return {
							playbackState: t,
							track: this._currentTrack,
							list: this._loadedList,
							options: this._loadedOptions,
						};
					}.bind(this)
				);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		var n = { NONE: "NONE", CONTEXT: "CONTEXT", TRACK: "TRACK" };
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		var n = {
			NULL_VALUE: new (function () {})(),
			LIST_START: new (function () {})(),
			LIST_END: new (function () {})(),
			FORBIDDEN: new (function () {})(),
		};
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		var n = {
			APPLOAD: "appload",
			BACK_BUTTON: "backbtn",
			CLICK_ROW: "clickrow",
			CLICK_SIDE: "clickside",
			END_PLAY: "endplay",
			FORWARD_BUTTON: "fwdbtn",
			LOGOUT: "logout",
			PLAY_BUTTON: "playbtn",
			POPUP: "popup",
			REMOTE: "remote",
			TRACK_DONE: "trackdone",
			TRACK_ERROR: "trackerror",
			UNKNOWN: "unknown",
			URI_OPEN: "uriopen",
		};
		t.exports = n;
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			if (!(this instanceof n)) return new n(t);
			var e = t || {};
			(this.index = "index" in e ? e.index : -1),
				(this.position = "position" in e ? e.position : 0),
				(this.initialPosition = "initialPosition" in e ? e.initialPosition : 0),
				(this.duration = "duration" in e ? e.duration : -1),
				(this.paused = "paused" in e && e.paused),
				(this.reason = e.reason || "unknown");
		}
		(n.create = function (t) {
			return t instanceof n ? t : new n(t);
		}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			s.call(this),
				(this._transport = t.transport),
				(this._logger = t.logger),
				(this._endpoint = t.endpoint || m),
				(this._listPlayer = t.listPlayer),
				(this._ListClass = t.ListClass),
				(this._abbaClient = t.abbaClient),
				(this._currentGaiaVolume = t.initialVolume * R),
				(this._clientVersion = t.clientVersion),
				(this._descriptorPromise = o.resolve(t.descriptor)),
				(this._deviceId = null),
				(this._deviceInfo = null),
				(this._manifestFormats = []),
				(this._connectionId = null),
				(this._sequenceNumber = 0),
				(this._currentContext = null),
				(this._loading = !1),
				(this._lastSentStateUpdatePayload = null),
				(this._totalStreamTime = 0),
				(this._isSendingConflict = !1),
				(this._queuedRejectedStates = []),
				(this._isSendingUpdate = !1),
				(this._queueSendUpdate = []),
				(this._previousTrackPosition = void 0),
				(this._currentTrackPosition = void 0),
				(this._currentTrackDuration = void 0),
				(this._registered = !1),
				(this._isDeregistering = !1),
				(this._waitingForTrackingData = null),
				(this._lastProcessedStateId = null),
				(this._limitStateUpdates = !1),
				(this._lastUpdateStateTime = 0),
				(this._volumeDebouncer = new a(this._sendVolume.bind(this), { blockInitial: !0 })),
				(this._initialUpdateSent = !1),
				(this._performCommand = this._performCommand.bind(this)),
				(this._handleRegisterResponse = this._handleRegisterResponse.bind(this)),
				(this._handleStateConflictResponse = this._handleStateConflictResponse.bind(this)),
				(this._onBeforeTrackChange = this._onBeforeTrackChange.bind(this)),
				this._init();
		}
		var r = i(2),
			s = i(3),
			o = i(0),
			a = i(113),
			_ = i(5),
			c = i(13),
			u = i(11),
			h = i(7),
			d = i(38),
			l = i(30),
			p = _.forTag("tpapiclient"),
			E = _.forTag("tpapiclient.endsong"),
			f = _.forTag("tpapiclient.endsongs"),
			T = /^hm:\/\/track-playback\/v1/,
			y = /^hm:\/\/play-token\/lost/,
			m = "http://@webgate/track-playback",
			R = 65535,
			S = function (t, e) {
				var i = t.getStatusFamily();
				return i === e.SERVER_ERROR || i === e.CONNECTION_ERROR;
			},
			g = { condition: S, algo: "exp", maxRetries: 8 },
			A = { condition: S, maxRetries: 2 };
		r(n, s),
			(n.create = function (t) {
				return new n(t);
			}),
			(n.prototype._init = function () {
				(this._waitingForTrackingData = o.defer()),
					this._waitingForTrackingData.resolve(!0),
					this._transport.on(this._transport.EVENT_CONNECTION_ID, this._onConnectionId.bind(this)),
					this._transport.matchMessages(y, this._onPlayTokenLost.bind(this)),
					this._transport.matchMessages(T, this._onTrackPlaybackMessage.bind(this));
				var t = this._listPlayer;
				t.on(h.LIST_PLAYER_CAPPED, this._onCapped.bind(this)),
					t.on(h.LIST_PLAYER_ERROR_SYNC, this._onError.bind(this)),
					t.on(h.LIST_PLAYER_BEFORE_NEXT, this._onBeforeTrackChange),
					t.on(h.LIST_PLAYER_BEFORE_PREVIOUS, this._onBeforeTrackChange),
					t.on(h.LIST_PLAYER_BEFORE_PLAYER_LOAD, this._onBeforePlayerLoad.bind(this)),
					t.on(h.LIST_PLAYER_PLAYER_LOAD, this._onTrackLoaded.bind(this)),
					t.on(h.LIST_PLAYER_BEFORE_TRACK_LOAD, this._onBeforeTrackLoad.bind(this)),
					t.on(h.LIST_PLAYER_POSITION_CHANGED, this._onPositionChanged.bind(this)),
					t.on(h.LIST_PLAYER_DURATION_CHANGED, this._onDurationChanged.bind(this)),
					t.on(h.LIST_PLAYER_VOLUME_CHANGED, this._onVolumeChanged.bind(this)),
					t.on(h.LIST_PLAYER_PAUSED, this._onPlayPause.bind(this, !0)),
					t.on(h.LIST_PLAYER_PLAYING, this._onPlayPause.bind(this, !1)),
					t.on(h.LIST_PLAYER_PLAYED_THRESHOLD_REACHED, this._onPlayThresholdReached.bind(this)),
					t.on(h.LIST_PLAYER_PROGRESS, this._onProgress.bind(this)),
					t.on(h.LIST_PLAYER_TRACKING_DATA_CREATED, this._onTrackDataEvent.bind(this, "created")),
					t.on(h.LIST_PLAYER_TRACKING_DATA_FINALIZED, this._onTrackDataEvent.bind(this, "finalized")),
					this._descriptorPromise.then(
						function (t) {
							t.on(
								u.DEVICE_DESCRIPTOR_CHANGED,
								function () {
									this._parseDescriptor(t), this._updateDeviceInfo();
								}.bind(this)
							);
						}.bind(this)
					);
			}),
			(n.prototype._onBeforeTrackChange = function () {
				if (!this._nextFinalizedDataPayload && !this._switchingContext) {
					var t = this._currentContext ? this._currentContext.getStateRef() : null,
						e = this._generateStatePayload(t, "track_data_finalized");
					this._setSequenceNumber(e), (this._nextFinalizedDataPayload = e);
				}
			}),
			(n.prototype._onBeforeTrackLoad = function () {
				(this._loading = !0), (this._switchingContext = !1);
			}),
			(n.prototype._onBeforePlayerLoad = function (t) {
				var e = this._currentContext;
				if (e) {
					var i = e.getCurrentTrack();
					this._currentTrackDuration = i && i.metadata ? i.metadata.duration || 0 : 0;
					var n = t.options;
					e.setPaused(!n.autoplay),
						this._setCurrentTrackPosition(n ? n.position || 0 : 0),
						this._updateState("before_track_load"),
						(this._initialUpdateSent = !1);
				}
			}),
			(n.prototype._onCapped = function () {
				this._listPlayer.clear("capped"),
					(this._currentContext = null),
					this._updateState("capped"),
					this._setCurrentTrackPosition(void 0),
					(this._lastProcessedStateId = null),
					this.emit(u.TP_API_STATE_CLEARED);
			}),
			(n.prototype._onConnectionId = function (t) {
				if (((this._connectionId = t.id), !this._isDeregistering)) {
					this._registered = !1;
					var e = null;
					this._abbaClient &&
						(e = this._abbaClient
							.getCell("tps_send_all_state_updates")
							.then(
								function (t) {
									t.fromAbba && "on" !== t.value && (this._limitStateUpdates = !0);
								}.bind(this)
							)
							.catch(function () {
								return !1;
							})),
						o
							.all([
								e,
								this._listPlayer.getVolume(),
								this._descriptorPromise.then(this._parseDescriptor.bind(this)),
							])
							.then(
								this.register.bind(this),
								function (t) {
									p.info("Skipping registration due to error", t),
										this.emit(u.TP_API_REGISTRATION_ABORTED, { reason_error: t });
								}.bind(this)
							)
							.catch(function () {});
				}
			}),
			(n.prototype._onDurationChanged = function (t) {
				(this._currentTrackDuration = t.duration), this._emitStateChanged();
			}),
			(n.prototype._onError = function (t) {
				"position" in t && (this._setCurrentTrackPosition(t.position), this._updateState("error"));
			}),
			(n.prototype._onPlayPause = function (t, e) {
				var i = this._currentContext;
				i &&
					(i.setPaused(t),
					"position" in e && this._setAllTrackPositions(e.position),
					e.track && this._shouldSendUpdateForEvent(e.track.stateId)
						? this._updateState(t ? "pause" : "resume")
						: ((this._lastProcessedStateId = null), this._emitStateChanged()));
			}),
			(n.prototype._onPlayThresholdReached = function (t) {
				(this._initialUpdateSent = !0),
					this._setAllTrackPositions(t.position),
					this._updateState("played_threshold_reached");
			}),
			(n.prototype._onPlayTokenLost = function () {
				this._listPlayer.pause().catch(function () {});
			}),
			(n.prototype._onPositionChanged = function (t) {
				this._loading ||
					(this._setCurrentTrackPosition(t.position),
					t.track && this._shouldSendUpdateForEvent(t.track.stateId)
						? this._updateState("position_changed")
						: ((this._lastProcessedStateId = null), this._emitStateChanged()));
			}),
			(n.prototype._onProgress = function (t) {
				if (!this._loading && this._currentContext) {
					this._setAllTrackPositions(t.position);
					var e = t.logData;
					if (e) {
						e.noLog || (this._totalStreamTime += t.interval || 500);
						var i = this._currentContext.getCurrentTrack(),
							n = i.ms_playing_update_interval;
						this._initialUpdateSent &&
							n > 0 &&
							Date.now() - this._lastUpdateStateTime > n &&
							this._updateState("progress");
					}
				}
			}),
			(n.prototype._onTrackDataEvent = function (t, e) {
				switch (t) {
					case "created":
						this._waitingForTrackingData = o.defer();
						break;
					case "finalized":
						var i = this._nextFinalizedDataPayload;
						i && ((i.playback_stats = e.playbackStats), this._updateState("track_data_finalized", i)),
							(this._nextFinalizedDataPayload = null),
							this._waitingForTrackingData.resolve(!0);
						break;
					default:
						return;
				}
			}),
			(n.prototype._onTrackLoaded = function (t) {
				this._loading = !1;
				var e = this._currentContext;
				e && (e.setPaused(!t.autoplay), this._setCurrentTrackPosition(t.position || 0));
			}),
			(n.prototype._onTrackPlaybackMessage = function (t) {
				var e = t.payloads;
				Array.isArray(e) && e.length && this._performCommand(e[0]);
			}),
			(n.prototype._onVolumeChanged = function (t) {
				this._currentGaiaVolume = t.volume * R;
				var e = t.command_id || "",
					i = { seq_num: null, volume: this._currentGaiaVolume, command_id: e };
				this._volumeDebouncer.async(i);
			}),
			(n.prototype._clearSessionData = function () {
				(this._connectionId = null),
					(this._sequenceNumber = 0),
					(this._currentContext = null),
					(this._lastSentStateUpdatePayload = null),
					(this._totalStreamTime = 0),
					(this._isSendingConflict = !1),
					(this._isSendingUpdate = !1),
					(this._queueSendUpdate = []),
					(this._previousTrackPosition = void 0),
					(this._currentTrackPosition = void 0),
					(this._currentTrackDuration = void 0),
					(this._lastProcessedStateId = null),
					this.emit(u.TP_API_STATE_CLEARED);
			}),
			(n.prototype._createStateRef = function (t, e) {
				if (!e) return null;
				var i = t.states[e.state_index];
				if (!i) throw new d(c.TP_CANNOT_CREATE_STATE_REF, "Invalid state reference.");
				return { state_machine_id: t.state_machine_id, state_id: i.state_id, paused: e.paused };
			}),
			(n.prototype._deregisterFromService = function (t) {
				var e = null,
					i = this._currentContext;
				i && (t && (i.setPaused(!t.playing), this._setAllTrackPositions(t.position)), (e = i.getStateRef()));
				var n = this._generateStatePayload(e, "deregister");
				this._setSequenceNumber(n);
				var r = this._endpoint + "/v1/devices/" + this._deviceId;
				return this._transport
					.request(r, {
						authorize: !0,
						method: "DELETE",
						payload: JSON.stringify(n),
						responseType: "json",
						retry: A,
					})
					.then(
						function (t) {
							if (200 !== t.status && 204 !== t.status) return (this._registered = !0), !1;
							var e = t.body;
							return (
								e && (e.endsong && E.log(e.endsong), e.endsongs && f.log(e.endsongs)),
								this._clearSessionData(),
								this.emit(u.TP_API_DEREGISTERED),
								!0
							);
						}.bind(this)
					);
			}),
			(n.prototype._emitError = function (t, e) {
				this._logger
					.logJSSDKError({
						source: "tpapi-client",
						version: l.tagged,
						type: t.code,
						message: t && t.message,
						stack: t && t.stack,
						json_data: e,
						json_data_version: "1.0.0",
					})
					.catch(function (t) {
						p.error("Track-Playback Logging Error", t);
					}),
					this.emit(u.TP_API_ERROR, { error: t, data: e });
			}),
			(n.prototype._emitStateChanged = function () {
				var t = this._currentContext;
				t &&
					this.emit(u.TP_API_STATE_CHANGED, {
						stateMachine: t.getStateMachine(),
						stateRef: t.getInternalStateRef(),
						position: this._currentTrackPosition || 0,
						duration: this._currentTrackDuration || 0,
						paused: t.isPaused(),
					});
			}),
			(n.prototype._generateStatePayload = function (t, e) {
				return {
					seq_num: void 0,
					seq_nums: void 0,
					state_ref: t,
					sub_state: {
						playback_speed: t && !t.paused ? 1 : 0,
						position: this._currentTrackPosition,
						duration: this._currentTrackDuration || void 0,
						stream_time: this._totalStreamTime,
					},
					previous_position: this._previousTrackPosition,
					playback_stats: void 0,
					rejected_state_refs: void 0,
					debug_source: e,
				};
			}),
			(n.prototype._handleRegisterResponse = function (t) {
				var e;
				if (429 === t.status)
					return (
						(e = new d(c.TP_MAX_SUBSCRIPTIONS_REACHED, "Max connections reached").fatal()),
						(e.maxedSubscriptions = !0),
						(e.status = t.status),
						this.emit(u.TP_API_MAX_SUBSCRIPTIONS_REACHED, { error: e }),
						o.reject(e)
					);
				if (
					(403 === t.status && t.body && "PREMIUM_REQUIRED" === t.body.error_type
						? (e = new d(
								c.TP_REGISTRATION_FAILED_NON_PREMIUM,
								"Cannot register to Track Playback with non-premium user."
						  ).fatal())
						: 200 !== t.status
						? (e = new d(
								c.TP_REGISTRATION_FAILED_WITH_STATUS,
								"track-playback service responded with status " + t.status + " when registering device"
						  ).fatal())
						: t.body ||
						  (e = new d(
								c.TP_NO_RESPONSE_BODY,
								"Unexpected empty response body from registration request."
						  ).fatal()),
					e)
				)
					return (e.status = t.status), o.reject(e);
				var i = t.body;
				return (
					i.endsong && E.log(i.endsong),
					i.endsongs && f.log(i.endsongs),
					(this._sequenceNumber = i.initial_seq_num),
					(this._registered = !0),
					this.emit(u.TP_API_REGISTERED, { deviceId: this._deviceId }),
					!0
				);
			}),
			(n.prototype._handleStateConflictResponse = function (t) {
				if (t.status >= 200 && t.status < 300) {
					var e = t.body;
					if (!e || !e.commands || !e.commands.length) return;
					for (var i = e.commands, n = 0, r = i.length; n < r; n++) this._performCommand(i[n]);
				} else {
					var s = new d(
						c.TP_CONFLICT_REQUEST_FAILED_WITH_STATUS,
						"Track-Playback service responded with " + t.status
					);
					(s.status = t.status), this._emitError(s);
				}
			}),
			(n.prototype._handleStateUpdateResponse = function (t, e) {
				var i;
				if (200 !== e.status)
					return (
						(i = new d(
							c.TP_PARSE_STATE_UPDATE_FAILED_WITH_STATUS,
							"Service responded with status " + e.status
						)),
						(i.status = e.status),
						o.reject(i)
					);
				if (!e.body)
					return (
						(i = new d(
							c.TP_UPDATE_REQUEST_EMPTY_RESPONSE,
							"Unexpected empty response body from state update request."
						)),
						(i.status = e.status),
						o.reject(i)
					);
				var n = e.body;
				n.endsong && E.log(n.endsong), n.endsongs && f.log(n.endsongs);
				var r = this._currentContext;
				if (!r) return o.resolve();
				var s = n.state_machine,
					a = n.updated_state_ref;
				return this._isCurrentStateRef(t)
					? (r.setStateMachine(s), r.setCurrentState(a), this._emitStateChanged(), o.resolve())
					: o.resolve();
			}),
			(n.prototype._isCurrentStateRef = function (t) {
				var e = this._currentContext ? this._currentContext.getStateRef() : null;
				return (
					(!e && !t) ||
					(!(!e || !t) &&
						e.state_machine_id === t.state_machine_id &&
						e.state_id === t.state_id &&
						e.paused === t.paused)
				);
			}),
			(n.prototype._logUnsentStateUpdate = function (t) {
				p.info("Unsent state update.", t),
					this._logger
						.logClientEvent({
							source: "tpapi-client",
							source_version: l.tagged,
							source_vendor: "spotify",
							event: "unsent-state-update",
							event_version: "1.0.0",
							json_data: t,
						})
						.catch(function (t) {
							p.error("Track-Playback Logging Error", t);
						});
			}),
			(n.prototype._logout = function () {
				this._listPlayer.pause().catch(function () {}),
					this.emit(u.TP_API_STATE_CLEARED),
					this.deregister().then(
						function (t) {
							(this._currentContext = null),
								this._setCurrentTrackPosition(void 0),
								t && this.emit(u.TP_API_LOGOUT);
						}.bind(this)
					);
			}),
			(n.prototype._parseDescriptor = function (t) {
				return (
					(this._deviceId = t.getId()),
					(this._deviceInfo = t.toTrackPlaybackJSON()),
					(this._manifestFormats = t.getManifestFormats()),
					!0
				);
			}),
			(n.prototype._performCommand = function (t) {
				switch (t.type) {
					case "set_volume":
						this._setVolume(t);
						break;
					case "log_out":
						this._logout();
						break;
					case "replace_state":
						this._replaceState(t);
						break;
					case "ping":
						this._updateState("ping");
						break;
					default:
						var e = new d(c.TP_UNKNOWN_COMMAND, "Received unknown command.");
						this._emitError(e, { command: t });
				}
			}),
			(n.prototype._rejectState = function (t) {
				var e = this._queuedRejectedStates;
				if ((void 0 !== t && e.push(t), this._registered && !this._isSendingConflict && e.length)) {
					this._isSendingConflict = !0;
					var i = e.splice(0, 5),
						n = this._currentContext ? this._currentContext.getStateRef() : null,
						r = this._generateStatePayload(n);
					(r.rejected_state_refs = i), this._setSequenceNumbers(r, i.length);
					var s = function () {
							(this._isSendingConflict = !1), this._rejectState();
						}.bind(this),
						o = this._endpoint + "/v1/devices/" + this._deviceId + "/state_conflict";
					this._transport
						.request(o, {
							authorize: !0,
							method: "POST",
							headers: { "Content-Type": "application/json" },
							responseType: "json",
							payload: JSON.stringify(r),
							retry: A,
						})
						.then(this._handleStateConflictResponse)
						.then(s, s);
				}
			}),
			(n.prototype._replaceState = function (t) {
				var e = this._listPlayer,
					i = t.state_machine,
					n = t.state_ref,
					r = this._createStateRef(i, n);
				if (!this._isCurrentStateRef(t.prev_state_ref)) return void this._rejectState(r);
				if (!n)
					return (
						e.pause().catch(function () {}),
						e.clear("remote"),
						(this._currentContext = null),
						this._updateState("state_clear"),
						this._setAllTrackPositions(void 0),
						(this._lastProcessedStateId = null),
						this.emit(u.TP_API_STATE_CLEARED),
						void (this._loading = !0)
					);
				var s = this._currentContext ? this._currentContext.getStateRef() : null;
				if (((this._lastProcessedStateId = r.state_id), s && s.state_id === r.state_id)) {
					var o = this._currentContext;
					o.setStateMachine(i),
						o.setCurrentState(n),
						n.paused ? (o.setPaused(!0), e.pause()) : (o.setPaused(!1), e.resume());
					var a = parseInt(t.seek_to, 10);
					o.allowSeeking() && !isNaN(a) && (e.seek(a), this._setCurrentTrackPosition(a)),
						this._updateState("modify_current_state");
				} else {
					this._currentContext && this._onBeforeTrackChange();
					var _ = this._ListClass.create("spotify:app:jsspeaker", this._manifestFormats);
					_.setStateMachine(i), _.startAtState(n), _.setDeviceId(this._deviceId), (this._currentContext = _);
					var c = t.seek_to || 0;
					_.setInitialPosition(c),
						(this._loading = !0),
						(this._switchingContext = !0),
						e.play(_, { reason: "remote" });
				}
			}),
			(n.prototype._sendDevicesRequest = function (t, e) {
				var i = this._endpoint + "/v1/devices";
				return (
					"PUT" === t && (i += "/" + this._deviceId),
					this._transport.request(i, {
						authorize: !0,
						method: t || "POST",
						headers: { "Content-Type": "application/json" },
						responseType: "json",
						payload: JSON.stringify(e),
						retry: g,
					})
				);
			}),
			(n.prototype._sendVolume = function (t) {
				var e = this._endpoint + "/v1/devices/" + this._deviceId + "/volume";
				return (
					this._setSequenceNumber(t),
					this._transport.request(e, {
						authorize: !0,
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						payload: JSON.stringify(t),
					})
				);
			}),
			(n.prototype._setAllTrackPositions = function (t) {
				(this._previousTrackPosition = t), (this._currentTrackPosition = t);
			}),
			(n.prototype._setCurrentTrackPosition = function (t) {
				(this._previousTrackPosition = this._currentTrackPosition), (this._currentTrackPosition = t);
			}),
			(n.prototype._setSequenceNumber = function (t) {
				return void 0 === t.seq_num && (t.seq_num = ++this._sequenceNumber), t;
			}),
			(n.prototype._setSequenceNumbers = function (t, e) {
				t.seq_nums = [];
				for (var i = 0; i < e; i++) t.seq_nums.push(++this._sequenceNumber);
				return t;
			}),
			(n.prototype._setVolume = function (t) {
				var e = t.volume / R;
				this._listPlayer.setVolume(e, t.command_id);
			}),
			(n.prototype._shouldSendUpdateForEvent = function (t) {
				return !(!t || t === this._lastProcessedStateId);
			}),
			(n.prototype._updateDeviceInfo = function () {
				this._registered &&
					this._sendDevicesRequest("PUT", this._deviceInfo).then(
						function (t) {
							204 === t.status && this.emit(u.TP_API_REGISTRATION_UPDATED);
						}.bind(this)
					);
			}),
			(n.prototype._updateState = function (t, e) {
				if (this._registered) {
					var i, n;
					if (
						(e
							? ((i = e.state_ref), (n = e))
							: ((i = this._currentContext ? this._currentContext.getStateRef() : null),
							  (n = this._generateStatePayload(i, t))),
						!this._wasStatePayloadSentRecently(n))
					)
						return void p.info("State update ignored (duplicate).", n);
					if ((this._emitStateChanged(), this._isSendingUpdate && this._limitStateUpdates))
						return this._logUnsentStateUpdate(n), void this._queueSendUpdate.push(t);
					(this._isSendingUpdate = !0),
						(this._queueSendUpdate = []),
						this._setSequenceNumber(n),
						(this._lastSentStateUpdatePayload = n);
					var r = function () {
							(this._isSendingUpdate = !1),
								this._queueSendUpdate.length && this._updateState(this._queueSendUpdate.join(",")),
								p.info("State update sent.", t, n);
						}.bind(this),
						s = this._endpoint + "/v1/devices/" + this._deviceId + "/state";
					(this._lastUpdateStateTime = Date.now()),
						this._transport
							.request(s, {
								authorize: !0,
								method: "PUT",
								headers: { "Content-Type": "application/json" },
								responseType: "json",
								payload: JSON.stringify(n),
								retry: g,
							})
							.then(this._handleStateUpdateResponse.bind(this, i))
							.then(
								r,
								function (t) {
									this._emitError(t), r();
								}.bind(this)
							);
				}
			}),
			(n.prototype._wasStatePayloadSentRecently = function (t) {
				var e = this._lastSentStateUpdatePayload;
				if (!e || !e.state_ref || !t.state_ref) return !0;
				var i = t.state_ref,
					n = e.state_ref;
				if (i.paused !== n.paused || i.state_id !== n.state_id || i.state_machine_id !== n.state_machine_id)
					return !0;
				var r = t.sub_state,
					s = e.sub_state;
				return (
					r.playback_speed !== s.playback_speed ||
					r.position !== s.position ||
					r.duration !== s.duration ||
					t.previous_position !== e.previous_position
				);
			}),
			(n.prototype.deregister = function () {
				return this._registered
					? ((this._isDeregistering = !0),
					  (this._registered = !1),
					  this._listPlayer.getPlayerState().then(
							function (t) {
								return o
									.all([
										this._deregisterFromService(t),
										this._waitingForTrackingData.promise,
										this._listPlayer.stop().catch(function () {}),
									])
									.spread(
										function (t) {
											return (this._isDeregistering = !1), t;
										}.bind(this)
									);
							}.bind(this),
							function () {
								return (this._isDeregistering = !1), (this._registered = !0), !1;
							}.bind(this)
					  ))
					: o.resolve(!1);
			}),
			(n.prototype.register = function () {
				if (this._registered) return o.resolve(!1);
				var t = null,
					e = this._currentContext;
				return (
					e && ((t = this._generateStatePayload(e.getStateRef(), "register")), this._setSequenceNumber(t)),
					this._sendDevicesRequest("POST", {
						device: this._deviceInfo,
						connection_id: this._connectionId,
						client_version: this._clientVersion,
						previous_session_state: t,
						volume: this._currentGaiaVolume,
					})
						.then(this._handleRegisterResponse)
						.catch(
							function (t) {
								return t && !t.maxedSubscriptions && ((t.registration = !0), this._emitError(t)), !1;
							}.bind(this)
						)
				);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			var i = e || {};
			(this._fn = t),
				(this._cancelFn = i.cancel || null),
				(this._threshold = i.threshold || o.threshold),
				(this._ts = i.initialTimetamp || o.timestamp),
				(this._blockInital = i.blockInitial || o.blockInitial),
				(this._deferredTimer = null),
				(this.sync = this.sync.bind(this)),
				(this.async = this.async.bind(this));
		}
		var r = i(0),
			s = Array.prototype.slice,
			o = { threshold: 1e3, timestamp: 0, blockInitial: !1 };
		(n.prototype._deferFn = function (t) {
			this._fn.apply(this._fn, t);
		}),
			(n.prototype._deferPromise = function (t, e) {
				this._fn.apply(this._fn, t).then(function (t) {
					e.resolve(t);
				});
			}),
			(n.prototype.sync = function () {
				var t = s.call(arguments),
					e = Date.now() - this._ts;
				return (
					(this._ts = Date.now()),
					e < this._threshold
						? (this._cancelFn && this._deferredTimer && this._cancelFn(),
						  clearTimeout(this._deferredTimer),
						  void (this._deferredTimer = setTimeout(this._deferFn.bind(this, t), this._threshold)))
						: !0 === this._blockInital
						? void this.sync.apply(this, t)
						: void this._fn.apply(this._fn, t)
				);
			}),
			(n.prototype.async = function () {
				var t = s.call(arguments),
					e = Date.now() - this._ts;
				if (((this._ts = Date.now()), e < this._threshold)) {
					this._cancelFn && this._deferredTimer && this._cancelFn(), clearTimeout(this._deferredTimer);
					var i = r.defer();
					return (
						(this._deferredTimer = setTimeout(this._deferPromise.bind(this, t, i), this._threshold)),
						i.promise
					);
				}
				return !0 === this._blockInital ? this.async.apply(this, t) : this._fn.apply(this._fn, t);
			}),
			(n.prototype.setCancel = function (t) {
				this._cancelFn = t;
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			(this._uri = t),
				(this._manifestFormats = e),
				(this._deviceId = null),
				(this._stateMachine = null),
				(this._currentState = null),
				(this._currentStateIndex = null),
				(this._pausedState = !1),
				(this._initialPlaybackPosition = null);
		}
		var r = i(0),
			s = i(115),
			o = i(38),
			a = i(13);
		(n.create = function (t, e) {
			return new n(t, e);
		}),
			(n.prototype.setPaused = function (t) {
				this._pausedState = !!t;
			}),
			(n.prototype.isPaused = function () {
				return this._currentStateIndex < 0 ? this._currentState.transitions.advance.paused : this._pausedState;
			}),
			(n.prototype.setInitialPosition = function (t) {
				this._initialPlaybackPosition = t;
			}),
			(n.prototype.setStateMachine = function (t) {
				this._stateMachine = t;
			}),
			(n.prototype.setDeviceId = function (t) {
				this._deviceId = t;
			}),
			(n.prototype.startAtState = function (t) {
				var e = this._stateMachine.states[t.state_index];
				if (!e) throw new o(a.TP_MISSING_INITIAL_STATE, "Invalid state reference.");
				var i = e.transitions;
				(this._currentStateIndex = -1),
					(this._currentState = {
						decoy: !0,
						paused: !!t.paused,
						track: -1,
						state_id: null,
						transitions: {
							advance: t,
							show_next: i.show_next,
							show_prev: i.show_prev,
							skip_next: t,
							skip_prev: i.skip_prev,
						},
					});
			}),
			(n.prototype.setCurrentState = function (t) {
				var e = t.state_index;
				(this._currentStateIndex = e), (this._currentState = this._stateMachine.states[e]);
			}),
			(n.prototype.getStateMachine = function () {
				return this._stateMachine;
			}),
			(n.prototype.getInternalStateRef = function () {
				var t = this._pausedState,
					e = this._currentStateIndex;
				if (e < 0) {
					var i = this._currentState.transitions.advance;
					(e = i.state_index), (t = i.paused);
				}
				return { paused: t, state_index: e };
			}),
			(n.prototype.getStateRef = function () {
				var t = this._stateMachine;
				if (!t) return null;
				var e, i;
				if (this._currentStateIndex < 0) {
					var n = this._currentState.transitions.advance;
					(e = t.states[n.state_index]), (i = n.paused);
				} else (e = t.states[this._currentStateIndex]), (i = this._pausedState);
				return e ? { state_machine_id: t.state_machine_id, state_id: e.state_id, paused: i } : null;
			}),
			(n.prototype.getCurrentTrack = function () {
				var t = this._stateMachine;
				if (!t) return null;
				var e;
				if (this._currentStateIndex < 0) {
					var i = this._currentState.transitions.advance;
					e = t.states[i.state_index];
				} else e = t.states[this._currentStateIndex];
				return e ? t.tracks[e.track] : null;
			}),
			(n.prototype.startAt = function () {
				return r.resolve(!0);
			}),
			(n.prototype.setShuffle = function () {
				return r.resolve(!0);
			}),
			(n.prototype.setRepeatMode = function () {
				return r.resolve(!0);
			}),
			(n.prototype.next = function (t) {
				var e = this._currentState,
					i = e.transitions,
					n = null;
				switch (t.reason) {
					case "nextbtn":
					case "fwdbtn":
						"skip_next" in i && (n = i.skip_next);
						break;
					default:
						"advance" in i && (n = i.advance);
				}
				return this._transitionTo(n, t, !1);
			}),
			(n.prototype.peekNext = function (t) {
				var e = this._currentState,
					i = e.transitions,
					n = null;
				switch (t.reason) {
					case "nextbtn":
					case "fwdbtn":
						"skip_next" in i && (n = i.skip_next);
						break;
					default:
						"advance" in i && (n = i.advance);
				}
				return this._transitionTo(n, t, !0);
			}),
			(n.prototype.previous = function (t) {
				var e = this._currentState,
					i = e.transitions,
					n = i.skip_prev;
				return this._transitionTo(n, t, !1);
			}),
			(n.prototype.allowSeeking = function () {
				return this._currentState && !this._currentState.disallow_seeking;
			}),
			(n.prototype._transitionTo = function (t, e, i) {
				var n = e.reason,
					o = e.listConstants;
				if (!t || null === t) return r.resolve(o.FORBIDDEN);
				var a = this._stateMachine,
					_ = a.states,
					c = _[t.state_index];
				if (!c) return r.resolve(o.NULL_VALUE);
				var u = a.tracks[c.track];
				if (!u || !u.metadata || !u.metadata.uri) return r.resolve(o.NULL_VALUE);
				var h = this._currentState,
					d = h.decoy ? !!h.paused : t.paused;
				i || ((this._currentState = c), (this._currentStateIndex = t.state_index), (this._pausedState = d));
				var l = 0;
				i || null === this._initialPlaybackPosition
					? "initial_playback_position" in c
						? (l = c.initial_playback_position || 0)
						: "seek_to" in c && (l = c.seek_to || 0)
					: ((l = this._initialPlaybackPosition), (this._initialPlaybackPosition = null));
				var p = s(this._manifestFormats, u);
				if (!p) return r.resolve(o.NULL_VALUE);
				var E = this._uri;
				u.metadata && u.metadata.context_uri && (E = u.metadata.context_uri);
				var f = n,
					T = u.ms_played_until_update,
					y = {
						uri: p.uri,
						playableURI: p.uri,
						fileId: p.fileId,
						resolvedURL: p.resolvedURL,
						playable: p.playable,
						isAd: p.isAd,
						format: p.format,
						mediaType: p.mediaType,
						noManifest: p.noManifest,
						options: { position: l, paused: d, playedThreshold: T },
						logData: {
							noLog: !!p.noLog,
							noTSV: !!p.noTSV,
							noStats: !!p.noStats,
							deviceId: this._deviceId,
							playbackId: c.state_id,
							reason: f,
							displayTrack: p.uri,
							playContext: E,
							impressionURL: p.impressionURL,
							impressionURLs: p.impressionURLs,
							format: { codec: p.format, bitrate: p.bitrate },
							uriType: p.uriType,
						},
						stateId: c.state_id,
					};
				return r.resolve(y);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			for (
				var i = e.manifest,
					n = e.metadata.uri,
					c = r.from(n),
					u = !(!c || c.type !== r.Type.AD),
					h = 0,
					d = t.length;
				h < d;
				h++
			) {
				var l = t[h];
				if (l in i) {
					var p = i[l];
					if (p.length) {
						var E = p[0];
						if (E.file_id || E.file_url) {
							var f = E.file_url || null,
								T = E.file_id || "";
							if (l === s.FILE_URLS_MP3 && u) {
								if ((T = f.replace(a, "$2")) === f) continue;
								f = null;
							}
							if ((f && !o.test(f) && (f = null), T || f)) {
								var y;
								return (
									(y = e.track_type
										? e.track_type.toLowerCase()
										: l === s.MANIFEST_IDS_VIDEO
										? "video"
										: "audio"),
									{
										uri: n,
										uriType: c && c.type,
										fileId: T,
										resolvedURL: f,
										mediaType: y,
										format: _[l],
										bitrate: E.bitrate || 128e3,
										impressionURL: E.impression_url,
										impressionURLs: E.impression_urls,
										isAd: u,
										noLog: !1,
										noTSV: u,
										noStats: u,
										noManifest: !!E.file_url,
										playable: !0,
									}
								);
							}
						}
					}
				}
			}
			return null;
		}
		var r = i(39),
			s = i(16),
			o = /^https:\/\//,
			a = /^(.+?)\/([^.\/]+)(\.[^\/]*)?$/,
			_ = {};
		(_[s.FILE_URLS_MP3] = "MP3"),
			(_[s.FILE_URLS_EXTERNAL] = "MP3"),
			(_[s.FILE_IDS_MP4] = "MP4"),
			(_[s.FILE_IDS_MP4_DUAL] = "MP4"),
			(_[s.MANIFEST_IDS_VIDEO] = "MANIFEST"),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t) {
			s.call(this),
				(this._descriptor = t.descriptor),
				(this._client = t.client),
				(this._listPlayer = t.listPlayer),
				(this._tpApiClient = t.tpApiClient),
				(this._playerPromise = t.playerPromise),
				(this._initialVolume = t.initialVolume),
				(this._playbackStateObserver = null),
				this._init();
		}
		var r = i(2),
			s = i(3),
			o = i(117),
			a = i(28),
			_ = i(11),
			c = i(7),
			u = i(17);
		r(n, s),
			(n.prototype._init = function () {
				this._client.on(_.CLIENT_BEFORE_DISCONNECT, this._onClientBeforeDisconnect.bind(this)),
					this._client.on(
						_.CLIENT_BEFORE_OFFLINE_DISCONNECT,
						this._onClientBeforeOfflineDisconnect.bind(this)
					);
				var t = this._listPlayer;
				t.on(c.LIST_PLAYER_CAPPED, this._onCapped.bind(this)),
					t.on(c.LIST_PLAYER_TRACK_ENDED, this._onTrackEnded.bind(this)),
					t.on(c.LIST_PLAYER_ERROR, this._onError.bind(this, a.PLAYBACK)),
					this.proxyEmit(t, c.LIST_PLAYER_AUTOPLAY_FAILED, _.STREAMER_AUTOPLAY_FAILED),
					this.proxyEmit(t, c.LIST_PLAYER_TRACK_LOADED, _.STREAMER_TRACK_LOADED),
					this.proxyEmit(t, c.LIST_PLAYER_DURATION_CHANGED, _.STREAMER_DURATION_CHANGED),
					this.proxyEmit(t, c.LIST_PLAYER_LOAD_VIDEO, _.STREAMER_LOAD_VIDEO),
					this.proxyEmit(t, c.LIST_PLAYER_STOPPED_VIDEO, _.STREAMER_STOPPED_VIDEO),
					this.proxyEmit(t, c.LIST_PLAYER_POSITION_CHANGED, _.STREAMER_POSITION_CHANGED),
					this.proxyEmit(t, c.LIST_PLAYER_PROGRESS, _.STREAMER_PROGRESS),
					this.proxyEmit(t, c.LIST_PLAYER_BUFFERING_END, _.STREAMER_BUFFERING_END),
					this.proxyEmit(t, c.LIST_PLAYER_BUFFERING_START, _.STREAMER_BUFFERING_START),
					this.proxyEmit(t, c.LIST_PLAYER_MAX_LIST_ERRORS_REACHED, _.STREAMER_MAX_LIST_ERRORS_REACHED),
					this.proxyEmit(t, c.LIST_PLAYER_VIDEO_ELEMENT_APPENDED, _.STREAMER_VIDEO_ELEMENT_APPENDED),
					this.proxyEmit(t, c.LIST_PLAYER_VIDEO_ELEMENT_REMOVED, _.STREAMER_VIDEO_ELEMENT_REMOVED),
					this.proxyEmit(t, c.LIST_PLAYER_LIST_ENDED, _.STREAMER_CONTEXT_ENDED);
				var e = this._tpApiClient;
				e.on(_.TP_API_LOGOUT, this._onTPAPILogout.bind(this)),
					e.on(_.TP_API_ERROR, this._onError.bind(this, a.TRACK_PLAYBACK)),
					this.proxyEmit(e, _.TP_API_MAX_SUBSCRIPTIONS_REACHED, _.STREAMER_MAX_SUBSCRIPTIONS_REACHED),
					this.proxyEmit(e, _.TP_API_DEREGISTERED, _.STREAMER_DEREGISTERED),
					this.proxyEmit(e, _.TP_API_REGISTERED, _.STREAMER_REGISTERED),
					this.proxyEmit(e, _.TP_API_REGISTRATION_ABORTED, _.STREAMER_REGISTRATION_ABORTED),
					(this._playbackStateObserver = new o(this._tpApiClient, {
						manifestFormats: this._descriptor.then(function (t) {
							return t.getManifestFormats();
						}),
					})),
					this.proxyEmit(
						this._playbackStateObserver,
						_.PLAYBACK_STATE_OBSERVER_STATE_CHANGED,
						_.STREAMER_STATE_CHANGED
					),
					this._playerPromise.then(
						function (t) {
							t.setVolume(this._initialVolume), this.emit(_.STREAMER_PLAYER_INITIALIZATION_DONE);
						}.bind(this),
						function (t) {
							this.emit(_.STREAMER_PLAYER_INITIALIZATION_FAILED, { reason: t.message, error: t });
						}.bind(this)
					);
			}),
			(n.prototype._assertOperationSuccess = function (t) {
				return t === u.SUCCESS;
			}),
			(n.prototype._onTrackEnded = function () {
				this.emit(_.STREAMER_TRACK_ENDED);
			}),
			(n.prototype._onClientBeforeDisconnect = function (t) {
				t && t.awaitPromise(this.deregister().catch(function () {}));
			}),
			(n.prototype._onClientBeforeOfflineDisconnect = function (t) {
				t && t.awaitPromise(this.pause().catch(function () {}));
			}),
			(n.prototype._onCapped = function () {
				this.emit(_.STREAMER_PLAYBACK_CAPPED);
			}),
			(n.prototype._onError = function (t, e) {
				var i = e.error;
				i && i.registration && t === a.TRACK_PLAYBACK && this.emit(_.STREAMER_REGISTRATION_ERROR, { error: i }),
					this.emit(_.STREAMER_ERROR, { source: t, name: e.name, error: i }),
					this._client.notifyError(t, e.name, e.error);
			}),
			(n.prototype._onTPAPILogout = function () {
				this._client.disconnect(), this.emit(_.STREAMER_LOGGED_OUT);
			}),
			(n.prototype.register = function () {
				return this._tpApiClient.register();
			}),
			(n.prototype.deregister = function () {
				return this._tpApiClient.deregister();
			}),
			(n.prototype.resume = function () {
				return this._listPlayer.resume().then(this._assertOperationSuccess);
			}),
			(n.prototype.pause = function () {
				return this._listPlayer.pause().then(this._assertOperationSuccess);
			}),
			(n.prototype.nextTrack = function (t) {
				return this._listPlayer.next(t || "nextbtn").then(this._assertOperationSuccess);
			}),
			(n.prototype.canChangeTrack = function () {
				return this._listPlayer.canChangeTrack();
			}),
			(n.prototype.previousTrack = function (t) {
				return this._listPlayer.previous(t || "prevbtn").then(this._assertOperationSuccess);
			}),
			(n.prototype.togglePlay = function () {
				return this._listPlayer.togglePlay().then(this._assertOperationSuccess);
			}),
			(n.prototype.setVolume = function (t) {
				return this._listPlayer.setVolume(t).then(this._assertOperationSuccess);
			}),
			(n.prototype.getVolume = function () {
				return this._listPlayer.getVolume();
			}),
			(n.prototype.seek = function (t) {
				return this._listPlayer.seek(t).then(this._assertOperationSuccess);
			}),
			(n.prototype.getCurrentState = function () {
				return this._playbackStateObserver.getCurrentState();
			}),
			(n.prototype.getVideoProfiles = function () {
				return this._playerPromise.then(function (t) {
					return t.getVideoProfiles();
				});
			}),
			(n.prototype.setPreferredBitrate = function (t) {
				return this._playerPromise.then(
					function (e) {
						return e.setPreferredBitrate(t).then(this._assertOperationSuccess);
					}.bind(this)
				);
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		function n(t, e) {
			a.call(this);
			var i = e || {};
			(this._tpApiClient = t),
				(this._numPreviousTracks = i.numPrevious || 2),
				(this._numNextTracks = i.numNextTracks || 2),
				(this._state = null),
				this._init();
		}
		var r = i(5).forTag("stream.PlaybackStateObserver"),
			s = i(0),
			o = i(2),
			a = i(3),
			_ = i(39),
			c = i(11),
			u = i(118),
			h = /^disallow_([^]+)_reasons$/;
		o(n, a),
			(n.create = function (t, e) {
				return new n(t, e);
			}),
			(n.prototype._init = function () {
				this._tpApiClient.on(c.TP_API_STATE_CHANGED, this._onStateChanged.bind(this)),
					this._tpApiClient.on(c.TP_API_STATE_CLEARED, this._onStateCleared.bind(this));
			}),
			(n.prototype._parseDisallows = function (t) {
				var e = {},
					i = t.restrictions;
				for (var n in i)
					if (i.hasOwnProperty(n)) {
						var r = !(!i[n] || !i[n].length);
						e[n.replace(h, "$1")] = r;
					}
				return e;
			}),
			(n.prototype._onStateChanged = function (t) {
				var e = t.position,
					i = t.duration,
					n = Date.now(),
					s = t.paused,
					o = t.stateMachine,
					a = t.stateRef.state_index,
					_ = o.states,
					u = _[a],
					h = u.restrictions || {},
					d = this._parseDisallows(u);
				if (!u) return void r.warn("_onStateChanged called with no current state", t);
				var l = this,
					p = function (t, e) {
						return l._getTrackMetadata(o, e, t);
					},
					E = {
						current_track: p(i, u),
						next_tracks: this._getNextStates(u, _).map(p.bind(null, null)),
						previous_tracks: this._getPreviousStates(u, _).map(p.bind(null, null)),
					};
				i || (i = E.current_track ? E.current_track.duration_ms : 0);
				var f = this._getRepeatSetting(o),
					T = {
						context: { uri: null, metadata: {} },
						bitrate: 0,
						position: e,
						duration: i,
						paused: s,
						shuffle: this._getShuffleSetting(o),
						repeat_mode: f,
						track_window: E,
						timestamp: n,
						restrictions: h,
						disallows: d,
					},
					y = o.tracks[u.track];
				y &&
					y.metadata &&
					(y.metadata.context_uri && (T.context.uri = y.metadata.context_uri),
					y.metadata.context_description &&
						(T.context.metadata.context_description = y.metadata.context_description)),
					(this._state = T),
					this.emit(c.PLAYBACK_STATE_OBSERVER_STATE_CHANGED, { state: this._copyState() });
			}),
			(n.prototype._onStateCleared = function () {
				(this._state = null), this.emit(c.PLAYBACK_STATE_OBSERVER_STATE_CHANGED, { state: null });
			}),
			(n.prototype._getRepeatSetting = function (t) {
				var e = t.attributes.options;
				return e.repeating_track ? u.TRACK : e.repeating_context ? u.CONTEXT : u.OFF;
			}),
			(n.prototype._getShuffleSetting = function (t) {
				return t.attributes.options.shuffling_context;
			}),
			(n.prototype._getNextStates = function (t, e) {
				for (
					var i = this._numNextTracks, n = [], r = t;
					r && "show_next" in r.transitions && r.transitions.show_next;

				) {
					var s = r.transitions,
						o = e[s.show_next.state_index];
					if ((n.push(o), (r = o), n.length >= i)) break;
				}
				return n;
			}),
			(n.prototype._getPreviousStates = function (t, e) {
				for (
					var i = this._numPreviousTracks, n = [], r = t;
					r && "show_prev" in r.transitions && r.transitions.show_prev;

				) {
					var s = r.transitions,
						o = e[s.show_prev.state_index];
					if ((n.unshift(o), (r = o), n.length >= i)) break;
				}
				return n;
			}),
			(n.prototype._getTrackMetadata = function (t, e, i) {
				var n = t.tracks[e.track];
				if (!n && n.metadata) return null;
				var r = n.metadata,
					s = n.manifest && "manifest_ids_video" in n.manifest,
					o = _.from(r.uri),
					a = r.linked_from_uri ? _.fromString(r.linked_from_uri) : null;
				return {
					id: o ? _.hexToId(o.id) : null,
					uri: r.uri,
					type: o ? o.type : null,
					linked_from_uri: r.linked_from_uri || null,
					linked_from: { uri: r.linked_from_uri || null, id: a ? _.hexToId(a.id) : null },
					media_type: s ? "video" : "audio",
					name: r.name,
					duration_ms: i || r.duration,
					artists: r.authors,
					album: { uri: r.group_uri, name: r.group_name, images: r.images },
					is_playable: !0,
				};
			}),
			(n.prototype.getCurrentState = function () {
				if (this._state && !this._state.paused) {
					var t = Date.now(),
						e = this._state.position + (t - this._state.timestamp);
					(this._state.position = e), (this._state.timestamp = t);
				}
				return s.resolve(this._copyState());
			}),
			(n.prototype._copyState = function () {
				return JSON.parse(JSON.stringify(this._state));
			}),
			(t.exports = n);
	},
	function (t, e, i) {
		"use strict";
		var n = i(6),
			r = { OFF: 0, CONTEXT: 1, TRACK: 2 };
		t.exports = n(r);
	},
]);
