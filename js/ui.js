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
	

	this.showConsole = function (fade) {
		$( "#console" ).dialog({
			minWidth: 800,
			minHeight: 350,
			width: 800,
			height: 350
		});
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
	
	this.showSessionStatus = function () {
		var details = "";
		var data = deotorrent.session.data;
		var cCount = 0;
		for(var item in data) {
			if(cCount == 0) { details += "<tr>"; }
			
			details += "<td class='detailsItem'>" + item + ":</td><td class='detailsValue' ><input type='text' value='" + data[item] + "'  style='width: 250px;' /><br /></td>";
			
			cCount ++;
			if(cCount == 2) { details += "</tr>"; cCount = 0;}
		}

		$("#sessionStatus > table").html(details);
		$( "#sessionStatus" ).dialog({
			modal: true,
			height:570,
			width: 940,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			}
		});
	}
	
	this.showSettings = function () {
					
		$("#settings").find("input[name=server]").val(config['server']);			
		$("#settings").find("input[name=username]").val(config['username']);
		$("#settings").find("input[name=password]").val(config['password']);
		$("#settings").find("input[name=updateInterval]").val(config['updateInterval']);		

		$( "#settings" ).dialog({
			resizable: false,
			height: 290,
			width: 400,
			modal: true,
			buttons: {
				"Accept": function() {
					localStorage.setItem('username', $("#settings").find("input[name=username]").val());
					localStorage.setItem('password', $("#settings").find("input[name=password]").val());
					localStorage.setItem('updateInterval', $("#settings").find("input[name=updateInterval]").val());
					$( this ).dialog( "close" );

				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			}
		});
	}
	
	this.showDetails = function() {
		var details = "No torrent selected!";
		var key = deotorrent.ui.grid.selectedRow;
		if(key) {
			details = "";
			var torrent = deotorrent.torrents.data[key];
			var cCount = 0;
			for(var item in torrent) {
				if(cCount == 0) { details += "<tr>"; }
				
				details += "<td class='detailsItem'>" + item + ":</td><td class='detailsValue' ><input type='text' value='" + torrent[item] + "'  style='width: 250px;' /><br /></td>";
				
				cCount ++;
				if(cCount == 2) { details += "</tr>"; cCount = 0;}
				
			}
		}
		$("#torrentDetails > table").html(details);
		$( "#torrentDetails" ).dialog({
			modal: true,
			height: 500,
			width: 900,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			}
		});
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
	
	this.convertBytes = function (bytes) {
		if (bytes < 1024) { return Array(bytes, 'B', 'B/s'); }
		else if (bytes < 1048576) { return Array((bytes / 1024).toFixed(2), 'KB', 'Kb/s');}
		else if (bytes < 1073741824) { return Array((bytes / 1048576).toFixed(2), 'MB' , 'Mb/s');}
		else if (bytes < 1099511627776) { return Array((bytes / 1073741824).toFixed(2), 'GB', 'Gb/s');}
		else { return Array((bytes / 1099511627776).toFixed(2), 'TB', 'Tb/s');}
	}
	
	this.timeSpan = function(x) {
		seconds = Math.floor( x % 60);
		x /= 60;
		minutes = Math.floor(x % 60);
		x /= 60;
		hours = Math.floor(x % 24);
		x /= 24;
		days = Math.floor(x);
	
		return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
		return days + ":" + hours + ":" + minutes + ":" + seconds;
	}
	
	this.__construct();
}