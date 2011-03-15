/*!
 * DeoTorrent - Web UI
 * http://www.mitchwardrop.com/
 *
 * Copyright 2011, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */

function SOCKET() {

	this.socket = null;
	this.server = config['server'];
	this.connected = false;

	this.error = null;

	this.__construct = function () { }

	this.connect = function () {
		var self = this;
		this.socket = new WebSocket(this.server);

		this.socket.onmessage = this.handleResponse;
		this.socket.onclose = function(e) { self.connected = false; }
		this.socket.onopen = function (e) { self.connected = true; if(config['autoLogin']) { deotorrent.attemptLogin(); } }
	}

	this.handleResponse = function (e) {
		var stop = "stop";
		if(deotorrent.console.debug['responses']) {
			deotorrent.console.append(e.data);
		}
		var resp = JSON.parse(e.data);
		switch(resp.cmd) {
			case 'authenticate':
				deotorrent.authenticate(resp.status);
			break;
			case 'torrent_status':
				deotorrent.torrents.parseStatusInfo(resp.data);
			break;
			case 'torrent_info':
				deotorrent.torrents.parseStatusInfo(resp.data);
			break;
		}
	}

	this.send = function (cmd, args) {
		if(this.connected) {
			var args = typeof(args) != 'undefined' ? args : {};
			var req = {'cmd' : cmd, 'args' : args};
			if(deotorrent.console.debug['requests']) {
				deotorrent.console.append(JSON.stringify(req));
			}
			this.socket.send(JSON.stringify(req));
		} else {
			deotorrent.ui.noSocket();
		}
	}

	this.__construct();
}