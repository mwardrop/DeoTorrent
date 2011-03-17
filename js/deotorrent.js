/*!
 * DeoTorrent - Web UI
 * http://www.mitchwardrop.com/
 *
 * Copyright 2011, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function DEOTORRENT() {

	this.version = "Alpha RC 1.3";

	this.socket = null;
	this.torrents = null;
	this.ui = null;
	this.console = null;
	this.session = null;
	
	this.authenticated = false;
	
	this.__construct = function () {
		this.socket = new SOCKET();
		this.torrents = new TORRENTS();
		this.ui = new UI();
		this.console = new CONSOLE();
		this.session = new SESSION();
	}

	this.load = function () {
		this.socket.connect();
		this.ui.showLogin(true);
	}
	
	this.attemptLogin = function () {
		if(!this.socket.connected) { this.socket.connect(); }
		
		var username = $("#username").val();
		var password = $("#password").val();
		
		if(config['autoLogin']) {
			username = config['username'];
			password = config['password'];
		}
		
		this.socket.send("authenticate", {"username": username, "password": password});
	}

	this.authenticate = function (status) {
		if(status == 0) {
			this.torrents.load();
			
			this.authenticated = true;
			
			this.ui.hideLogin();
			
			this.ui.grid.init();
			this.session.update();
			this.ui.grid.update();
			this.ui.grid.show(true);
			
			// Due to the torrent data not being loaded by the time grid.update is called
			// this timed refresh is set so we don't have to wait for the next update which
			// could be some time if the updateInterval is set long.
			setTimeout('deotorrent.ui.grid.refresh();', 100);
		} else {
			this.authenticated = false;
			this.ui.showLoginFail(true);
		}
	}
	
	this.__construct();
}





