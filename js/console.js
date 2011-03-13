/*!
 * DeoTorrent - Web UI
 * http://www.mitchwardrop.com/
 *
 * Copyright 2011, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function CONSOLE() {

	this.respDebug = true;
	this.reqDebug = false;


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

	this.append = function (msg) {
		$("#output").append(msg + "<br />");
		$("#output").attr({ scrollTop: $("#output").attr("scrollHeight") });
	}
	
	this.__construct();
}