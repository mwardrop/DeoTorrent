/*!
 * DeoTorrent - Web UI
 * http://www.mitchwardrop.com/
 *
 * Copyright 2011, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function GRID() {

	this.grid = null;
	this.buttons = null;
	this.sortOrder = "asc";
	this.selectedRow = null;
	this.click = true;
	
	this.addrows = false;
	
	this.__construct = function () {
		this.buttons = new BUTTONS();
	}
	
	this.update = function () {
		this.refresh();
		var self = this;
        setTimeout(function() { self.update(); }, config['updateInterval']);
	}
	
	this.refresh = function () {
		var data = deotorrent.torrents.data;
		var rows = new Array();
		var filter = $("input[name=filter]:checked").val();
		for(var key in data) {
			var ETA = "Complete";
			if(data[key].progress != 1) {
				seconds = ((data[key].total_wanted - data[key].total_wanted_done) / data[key].download_rate);
				ETA = deotorrent.ui.timeSpan(seconds);
			}
			var size = deotorrent.ui.convertBytes(data[key].total_size);
			var downSpeed = deotorrent.ui.convertBytes(data[key].download_rate);
			var upSpeed = deotorrent.ui.convertBytes(data[key].upload_rate);
			var uploaded = deotorrent.ui.convertBytes(data[key].all_time_upload);
			var downloaded = deotorrent.ui.convertBytes(data[key].total_payload_download)
			
			if(filter == "all" || data[key].state == filter) {
				rows.push({id: key,
							cell: [ data[key].priority, 
									data[key].name, 
									size[0] + " " + size[1], 
									(data[key].progress * 100).toFixed(0) + " %", 
									deotorrent.torrents.stateTypes[data[key].state], 
									data[key].num_seeds, 
									data[key].num_peers, 
									downSpeed[0] + " " + downSpeed[2], 
									upSpeed[0] + " " + upSpeed[2] ,
									ETA,
									uploaded[0] + " " + uploaded[2], 
									downloaded[0] + " " + downloaded[2], 
									data[key].distributed_copies]});
			}
			
			size = null;
			downSpeed = null;
			upSpeed = null;
			uploaded = null;
			
		}
		var updateObj = {
			total: rows.length,
			page: 1,
			rows: rows
		};
		

		if(this.addrows) {
			this.grid.flexAddData(updateObj);
			this.sort("#gridView");
			this.addrows = false;
		} else {
			this.updateRows(updateObj);
		}
		
		updateObj = null;
		data = null;
		rows = null;

			
		// TODO: Move this somewhere else, it really should be independant
		// TODO: Add total up / total down status bar updates.
		var downSpeed = deotorrent.ui.convertBytes(deotorrent.session.data['payload_download_rate']);
		var downTotal = deotorrent.ui.convertBytes(deotorrent.session.data['total_payload_download']);
		var upSpeed = deotorrent.ui.convertBytes(deotorrent.session.data['payload_upload_rate']);
		var upTotal = deotorrent.ui.convertBytes(deotorrent.session.data['total_payload_upload']);
		
		$("#downSpeed").html(downSpeed[0] + " " + downSpeed[2]);
		$("#downTotal").html(downTotal[0] + " " + downTotal[2]);
		$("#upSpeed").html(upSpeed[0] + " " + upSpeed[2]);
		$("#upTotal").html(upTotal[0] + " " + upTotal[2]);
		
		if(this.selectedRow) {
			$("#row" + this.selectedRow).addClass("trSelected");
		}
		
	}

	this.updateRows = function (update) {
		for (r = 0;r < update.rows.length; r++) {
			var row = update.rows[r];
			for(c = 0; c < row.cell.length; c++) {
				var cell = $("#row" + row.id).find("td")[c];
				$(cell).find("div").text(row.cell[c]);
				cell = null;
			}
			row = null;
		}
	}
	
	this.addClickEvent = function (celDiv,id) {
		$(celDiv).click(function (evt) {
			deotorrent.ui.grid.selectedRow = id;
		});
		
	}
	
	this.init = function () {
		this.grid = $("#gridView");
		var filterHTML = '	<div id="filter"> \
								<input type="radio" id="radioAll" name="filter" checked="checked" value="all" /><label for="radioAll">All</label> \
								<input type="radio" id="radioDownload" name="filter" value="downloading" /><label for="radioDownload">Downloading</label> \
								<input type="radio" id="radioSeed" name="filter" value="seeding" /><label for="radioSeed">Seeding</label> \
								<input type="radio" id="radioQueued" name="filter" value="queued_for_Checking" /><label for="radioQueued">Queued</label> \
								<input type="radio" id="radioComplete" name="filter" value="finished" /><label for="radioComplete">Complete</label> \
							</div> ';
							
		this.grid.flexigrid({
			colModel : [
				{display: '#', name : 'priority', width : 20, sortable : true, align: 'center', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Name', name : 'name', width : 400, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Size', name : 'size', width : 65, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Done', name : 'done', width : 50, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Status', name : 'status', width : 70, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Seeds', name : 'seeds', width : 40, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Peers', name : 'peers', width : 40, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Down Speed', name : 'downspeed', width : 75, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Up Speed', name : 'upspeed', width : 75, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'ETA', name : 'eta', width : 90, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Uploaded', name : 'uploaded', width : 75, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Downloaded', name : 'downloaded', width : 75, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Available', name : 'available', width : 75, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent}
			],
			searchitems : [
				{display: 'Name', name : 'name', isdefault: true}
			],
			buttons : [
				{name: 'Settings', bclass: 'settings', onpress : deotorrent.ui.grid.buttons.settings},
				{separator: true},
				{name: 'Add Torrent', bclass: 'add', onpress : deotorrent.ui.grid.buttons.add},
				{separator: true},
				{name: 'Delete', bclass: 'delete', onpress : deotorrent.ui.grid.buttons.del},
				{name: 'Remove', bclass: 'remove', onpress : deotorrent.ui.grid.buttons.remove},
				{separator: true},
				{name: '', bclass: 'start', onpress : deotorrent.ui.grid.buttons.start},
				{name: '', bclass: 'pause', onpress : deotorrent.ui.grid.buttons.pause},
				{name: '', bclass: 'stop', onpress : deotorrent.ui.grid.buttons.stop},
				{separator: true},
				//{name: '', bclass: 'rss', onpress : deotorrent.ui.grid.buttons.rss},
				//{separator: true},
				{name: '', bclass: 'console', onpress : deotorrent.ui.grid.buttons.console},
				{name: '', bclass: 'session', onpress : deotorrent.ui.grid.buttons.session}
			],
			onChangeSort: function(name, order) { 
				deotorrent.ui.grid.sort("#gridView", order); 
			}, 
			dataType: 'json',
			sortname: "name",
			sortorder: "asc",
			title: '<img src="styles/server.png" /> DeoTorrent ' + filterHTML,
			useRp: false,
			showTableToggleBtn: false,
			width: 'auto',
			height: 700,
			usepager: true,
			novstripe: true,
			singleSelect: true
		});
		$(window).resize(function() {
			$(".bDiv").height($(window).height() - 120);
		});
		$(window).resize();
		this.grid.contextMenu({
					menu: 'contextMenu'
				},
					function(action, el, pos) {
						switch(action) {
							case "details":
								deotorrent.ui.showDetails();
								break;
						}
				});
		
		
		$("input[name=filter]").change(function(){
			deotorrent.ui.grid.addrows = true;
			deotorrent.ui.grid.refresh();
		});
 
		$( "#filter" ).buttonset();
		this.hide(false);
	}
	
	this.hide = function (fade) {
		if(fade){
			this.grid.fadeOut();
		} else {
			this.grid.hide();
		}
	}

	this.show = function (fade) {
		if(fade){
			this.grid.fadeIn();
		} else {
			this.grid.show();
		}
	}
	
	// Thanks to Kobus for this sort snippet
	// http://groups.google.com/group/flexigrid/browse_thread/thread/5494e9e463f4b1ce
	// TODO: Fix numeric sorting, floating points do not work correctly.
	this.sort =  function sort(table, order) {
		if(order) {
			deotorrent.ui.grid.sortOrder = order;
		} else {
			order = deotorrent.ui.grid.sortOrder;
		}
		// Remove all characters in c from s. 
		var stripChar = function(s, c) { 
			var r = ""; 
			for(var i = 0; i < s.length; i++) { 
				r += c.indexOf(s.charAt(i))>=0 ? "" : s.charAt(i); 
			} 
			return r; 
		} 
		// Test for characters accepted in numeric values. 
		var isNumeric = function(s) { 
			var valid = "0123456789.,- "; 
			var result = true; 
			var c; 
			for(var i = 0; i < s.length && result; i++) { 
				c= s.charAt(i); 
				if(valid.indexOf(c) <= -1) { 
					result = false; 
				} 
			} 
			return result; 
		} 
		// Sort table rows. 
		var asc = order == "asc"; 
		var rows = $(table).find("tbody > tr").get(); 
		var column = $(table).parent(".bDiv").siblings(".hDiv").find("table tr th").index($("th.sorted", ".flexigrid:has(" + table + ")")); 
		rows.sort(function(a, b) { 
			var keyA = $(asc? a : b).children("td").eq(column).text().toUpperCase(); 
			var keyB = $(asc? b : a).children("td").eq(column).text().toUpperCase(); 
			if((isNumeric(keyA)||keyA.length<1) && (isNumeric(keyB)|| keyB.length<1)) { 
				keyA = stripChar(keyA,", "); 
				keyB = stripChar(keyB,", "); 
				if(keyA.length < 1) keyA = 0; 
				if(keyB.length < 1) keyB = 0; 
				keyA = new Number(parseFloat(keyA)); 
				keyB = new Number(parseFloat(keyB)); 
			} 
			return keyA>keyB ? 1 : keyA<keyB ? -1 : 0; 
		}); 
		// Rebuild the table body. 
		$.each(rows, function(index, row) { 
			$(table).children("tbody").append(row); 
		}); 
		// Fix styles 
		$(table).find("tr").removeClass("erow");  // Clear the striping. 
		$(table).find("tr:odd").addClass("erow"); // Add striping to odd numbered rows. 
		$(table).find("td.sorted").removeClass("sorted"); // Clear sorted class from table cells. 
		$(table).find("tr").each( function(){ 
			$(this).find("td:nth(" + column + ")").addClass("sorted");  // Add sorted class to sorted column cells. 
		}); 
	}	 
	
	this.__construct();
	
}

function BUTTONS() {

	this.settings = function() {
		deotorrent.ui.showSettings();
	}
	
	this.add = function() {
		$("#datafile").click();
	}
	
	this.del = function() {
		deotorrent.ui.confirmDelete(deotorrent.ui.grid.selectedRow);
	}
	
	this.start = function() {
		deotorrent.torrents.start(deotorrent.ui.grid.selectedRow);
	}
	
	this.stop = function () {
		deotorrent.torrents.stop(deotorrent.ui.grid.selectedRow);
	}
	
	this.pause = function () {
		deotorrent.torrents.pause(deotorrent.ui.grid.selectedRow);
	}
	
	this.console = function () {
		deotorrent.ui.showConsole();
	}
	
	this.session = function () {
		deotorrent.ui.showSessionStatus();
	}
}