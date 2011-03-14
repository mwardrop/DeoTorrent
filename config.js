/*!
 * DeoTorrent - Web UI
 * http://www.mitchwardrop.com/
 *
 * Copyright 2011, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function CONFIG() {
	this.server = "ws://172.16.1.11:8081/"; // RoTorrent web socket url
	this.username = "admin"; // auto login username
	this.password = "changeme"; // Auto login password
	this.autoLogin = true; // Auto login or prompte for credentials?
}

var config = new CONFIG();