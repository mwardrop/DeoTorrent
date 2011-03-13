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
	
	this.__construct = function () {
		this.buttons = new BUTTONS();
	}
	
	this.update = function () {
		var data = deotorrent.torrents.data;
		var rows = new Array();
		for(var key in data) {
			var ETA = "Complete";
			if(data[key].progress != 1) {
				ETA = (((data[key].total_wanted - data[key].total_wanted_done) / data[key].download_rate) * 60).toFixed(1);
				ETA += " Mins.";
			}
			rows.push({id: key,
						cell: [ data[key].priority, 
								data[key].name, 
								(data[key].total_size / 1000 / 1000).toFixed(2) + " Mb", 
								(data[key].progress * 100).toFixed(0) + " %", 
								"Active", 
								data[key].num_seeds, 
								data[key].num_peers, 
								(data[key].download_rate / 1000).toFixed(2) + " Kb/s", 
								(data[key].upload_rate / 1000).toFixed(2) + " Kb/s",
								ETA,
								(data[key].all_time_upload / 1000 / 1000).toFixed(2) + " Mb", 
								data[key].distributed_copies]});
			
		}
		var updateObj = {
			total: 3,
			page: 1,
			rows: rows
		};
		
		this.grid.flexAddData(updateObj);
		this.sort("#gridView")
		
		if(this.selectedRow) {
			$("#row" + this.selectedRow).addClass("trSelected");
		}
		var self = this;
        setTimeout(function() { self.update(); }, 1000);
	}

	this.addClickEvent = function (celDiv,id) {
		$(celDiv).click(function (evt) {
			deotorrent.ui.grid.selectedRow = id;
		});
		
	}
	
	this.init = function () {
		this.grid = $("#gridView");
		var filterHTML = '	<div id="filter"> \
								<input type="radio" id="radio1" name="radio" checked="checked" /><label for="radio1">All</label> \
								<input type="radio" id="radio2" name="radio" /><label for="radio2">Downloading</label> \
								<input type="radio" id="radio3" name="radio" /><label for="radio3">Completed</label> \
								<input type="radio" id="radio4" name="radio" /><label for="radio4">Active</label> \
								<input type="radio" id="radio5" name="radio" /><label for="radio5">Inactive</label> \
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
				{display: 'ETA', name : 'eta', width : 80, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Uploaded', name : 'uploaded', width : 75, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent},
				{display: 'Available', name : 'available', width : 75, sortable : true, align: 'left', process: deotorrent.ui.grid.addClickEvent}
			],
			searchitems : [
				{display: 'Name', name : 'name', isdefault: true}
			],
			buttons : [
				{name: 'Add Torrent', bclass: 'add', onpress : deotorrent.ui.grid.buttons.add},
				{separator: true},
				{name: 'Delete Torrent', bclass: 'delete', onpress : deotorrent.ui.grid.buttons.del},
				{separator: true},
				{name: '', bclass: 'start', onpress : deotorrent.ui.grid.buttons.start},
				{name: '', bclass: 'pause', onpress : deotorrent.ui.grid.buttons.pause},
				{name: '', bclass: 'stop', onpress : deotorrent.ui.grid.buttons.stop},
				{separator: true},
				{name: '', bclass: 'console', onpress : deotorrent.ui.grid.buttons.console},
			],
			onChangeSort: function(name, order) { 
				deotorrent.ui.grid.sort("#gridView", order); 
			}, 
			dataType: 'json',
			sortname: "name",
			sortorder: "asc",
			title: '<img src="styles/server.png" /> DeoTorrent ' + filterHTML,
			useRp: true,
			rp: 15,
			showTableToggleBtn: false,
			width: 'auto',
			height: 700,
			novstripe: true,
			singleSelect: true
		});
		$(window).resize(function() {
			$(".bDiv").height($(window).height() - 103);
		});
		$(window).resize();
		this.grid.contextMenu({
					menu: 'contextMenu'
				},
					function(action, el, pos) {
					alert(
						'Action: ' + action + '\n\n' +
						'Element ID: ' + $(el).attr('id') + '\n\n' + 
						'X: ' + pos.x + '  Y: ' + pos.y + ' (relative to element)\n\n' + 
						'X: ' + pos.docX + '  Y: ' + pos.docY+ ' (relative to document)'
						);
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
		deotorrent.ui.toggleConsole();
	}
}