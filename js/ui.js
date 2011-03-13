/*!
 * DeoTorrent - Web UI
 * http://www.mitchwardrop.com/
 *
 * Copyright 2011, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function UI() {

	this.grid = null;
	
	this.__construct = function () { 
		this.grid = new GRID();
	}
	
	this.hideConsole = function (fade) {
		if(fade){
			$("#console").fadeOut();
		} else {
			$("#console").hide();
		}
	}

	this.showConsole = function (fade) {
		if(fade){
			$("#console").fadeIn();
		} else {
			$("#console").show();
		}
	}

	this.toggleConsole = function(fade) {	
		fade = typeof(fade) == 'undefined' ? fade : true;
		if($("#console").is(':hidden')) { 
			deotorrent.ui.showConsole(fade);
		} else { 
			deotorrent.ui.hideConsole(fade); 
		}
	}



	this.showLogin = function (fade) {
		if(fade){
			$("#login").fadeIn();
		} else {
			$("#login").show();
		}
	}

	this.hideLogin = function (fade) {
		if(fade){
			$("#login").fadeOut();
		} else {
			$("#login").hide();
		}
	}

	this.showLoginFail = function (fade) {
		if(fade){
			$("#failedLogin").fadeIn();
		} else {
			$("#failedLogin").show();
		}
	}
	
	this.confirmDelete = function(key) {
		$( "#confirmDelete" ).dialog({
			resizable: false,
			height:140,
			modal: true,
			buttons: {
				"Delete": function() {
					$( this ).dialog( "close" );
					deotorrent.torrents.del(key);
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
	}
	
	this.noSocket = function() {
		$( "#noSocket" ).dialog({
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			}
		});
	}
	
	
	
	this.__construct();
}