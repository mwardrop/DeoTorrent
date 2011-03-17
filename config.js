/*!
 * DeoTorrent - Web UI
 * http://www.mitchwardrop.com/
 *
 * Copyright 2011, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function CONFIG() {
	this.server = "ws://127.0.0.1:8081/"; 	// URL of the RoTorrent WebSocket
	
	this.username = "admin"; 				// Username for automatic login ( Leave blank in multiuser mode )
	
	this.password = "changeme"; 			// Password for automatic login ( Leave blank in multiuser mode )
	
	this.autoLogin = true; 					// True: Login automatically for single user enviroment
											// False: Provide login box for multiuser enviroment
 	
	this.updateInterval = 3000; 			// How often torrent status is updated ( Milliseconds )
	
	this.__construct = function() {
		if(localStorage.getItem('username')) {
			this.username = localStorage.getItem('username');
		}
		if(localStorage.getItem('password')) {
			this.password = localStorage.getItem('password');
		}
		if(localStorage.getItem('updateInterval')) {
			this.updateInterval = localStorage.getItem('updateInterval');
		}
	}
	
	this.__construct();
}

var config = new CONFIG();