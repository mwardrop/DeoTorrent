/*!
 * DeoTorrent - Web UI
 * http://www.mitchwardrop.com/
 *
 * Copyright 2011, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function CONSOLE() {

	this.debug = {
		requests: false,
		responses: false
	}
	
	this.scroll = false;
	
	this.autoIndex = 0;
	this.autoMemory = [
		"deotorrent",
		"deotorrent.torrents",
		"deotorrent.console",
		"deotorrent.ui",
		"deotorrent.ui.grid",
		"deotorrent.socket",
		"config"
	];
	
	this.__construct = function () { }
	
	this.exec = function (cmd) {
		var msg;
		try {
			msg = eval(cmd);
		} catch (e) {
			msg = e.message;
		} finally {
			this.append(msg);
		}
		
	}
	
	this.toggleScroll = function() {
		if(this.scroll) {
			this.scroll = false;
		} else {
			this.scroll = true;
		}
	}

	this.append = function (msg) {
		$("#output").append(msg + "<br />");
		
		if($('#scrollConsole:checked').val() !== undefined) {
			$("#output").attr({ scrollTop: $("#output").attr("scrollHeight") });
		}
	}
	
	this.__construct();
}