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
	this.server = "ws://172.16.1.11:8081/";
	this.connected = false;

	this.error = null;
	
	this.__construct = function () { }

	this.connect = function () {
		var self = this;
		this.socket = new WebSocket(this.server);

		this.socket.onmessage = this.handleResponse;
		this.socket.onclose = function(e) { self.connected = false; }
		this.socket.onopen = function (e) { self.connected = true; deotorrent.attemptLogin(); }
	}
	
	this.handleResponse = function (e) {
		var stop = "stop";
		if(deotorrent.console.respDebug) {
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
			if(deotorrent.console.reqDebug) {
				deotorrent.console.append(JSON.stringify(req));
			}
			this.socket.send(JSON.stringify(req));
		} else {
			deotorrent.ui.noSocket();
		}
	}
	

	this.keyStr = "ABCDEFGHIJKLMNOP" +
				  "QRSTUVWXYZabcdef" +
				  "ghijklmnopqrstuv" +
				  "wxyz0123456789+/" +
				  "=";

	this.encode64 = function(input) {
		input = escape(input);
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;

		do {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
			   enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
			   enc4 = 64;
			}

			output = output +
			   this.keyStr.charAt(enc1) +
			   this.keyStr.charAt(enc2) +
			   this.keyStr.charAt(enc3) +
			   this.keyStr.charAt(enc4);
			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		} while (i < input.length);

		return output;
	}

	this.decode64 = function(input) {
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;

		 // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
		var base64test = /[^A-Za-z0-9\+\/\=]/g;
		if (base64test.exec(input)) {
			alert("There were invalid base64 characters in the input text.\n" +
				  "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
				  "Expect errors in decoding.");
		}
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		do {
			enc1 = this.keyStr.indexOf(input.charAt(i++));
			enc2 = this.keyStr.indexOf(input.charAt(i++));
			enc3 = this.keyStr.indexOf(input.charAt(i++));
			enc4 = this.keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
			   output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
			   output = output + String.fromCharCode(chr3);
			}

			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";

		} while (i < input.length);

		return unescape(output);
	}


	
	this.__construct();
}