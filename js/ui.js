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
	
	this.showDetails = function() {
		var details = "No torrent selected!";
		var key = deotorrent.ui.grid.selectedRow;
		if(key) {
			details = "";
			var torrent = deotorrent.torrents.data[key];
			var cCount = 0;
			for(var item in torrent) {
				if(cCount == 0) { details += "<tr>"; }
				
				details += "<td class='detailsItem'>" + item + ":</td><td class='detailsValue' width='300' >" + torrent[item] + "<br /></td>";
				
				cCount ++;
				if(cCount == 2) { details += "</tr>"; cCount = 0;}
				
			}
		}
		$("#torrentDetails > table").html(details);
		$( "#torrentDetails" ).dialog({
			modal: true,
			height: 700,
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
	
	
	
	this.__construct();
}