/*!
 * DeoTorrent - Web UI
 * http://www.mitchwardrop.com/
 *
 * Copyright 2011, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function DEOTORRENT() {

	this.socket = null;
	this.torrents = null;
	this.ui = null;
	this.console = null;
	
	this.authenticated = false;
	
	this.__construct = function () {
		this.socket = new SOCKET(this);
		this.torrents = new TORRENTS(this);
		this.ui = new UI(this);
		this.console = new CONSOLE(this);
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
			this.authenticated = true;
			this.ui.grid.init();
			this.torrents.load();
			this.ui.grid.update();
			this.ui.hideLogin();
			this.ui.grid.show(true);
		} else {
			this.authenticated = false;
			this.ui.showLoginFail(true);
		}
	}
	
	this.__construct();
}









