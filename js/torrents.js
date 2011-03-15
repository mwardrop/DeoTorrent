/*!
 * DeoTorrent - Web UI
 * http://www.mitchwardrop.com/
 *
 * Copyright 2011, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function TORRENTS() {

	this.data = null;
	this.stateTypes = {
        queued_for_checking: "Queued",
        checking_files: "Checking",
        downloading_metadata: "Downloading",
        downloading: "Downloading Meta",
        finished: "Complete",
        seeding: "Seeding",
        allocating: "Allocating",
        checking_resume_data: "Resuming" 
    };

	this.__construct = function () { 
		this.data = new Array();
	}
	
	this.load = function() {
		this.update();
	}
	
	this.update = function() {
		this.getStatus();
		var self = this;
		if(deotorrent.socket.connected){ setTimeout(function() { self.update(); }, config['updateInterval']); }
	}
	
	this.add = function(evt) {
		var files = evt.target.files;

		var output = [];
		for (var i = 0, f; f = files[i]; i++) {
			var reader = new FileReader();
			reader.onload = function(e) {
				var bin = e.target.result;
				deotorrent.socket.send("torrent_add", {raw_torrent: deotorrent.socket.encode64(bin)});
				alert("sent");
			}
			reader.readAsBinaryString(f);
		}
	}

	this.del = function (key) {
		deotorrent.socket.send("torrent_del", {info_hash: key});
	}

	this.start = function (key) {
		deotorrent.socket.send("torrent_start", {info_hash: key});
	}

	this.stop = function (key) {
		deotorrent.socket.send("torrent_stop", {info_hash: key});
	}

	this.pause = function(key) {
		deotorrent.socket.send("torrent_pause", {info_hash: key});
	}
	
	this.getStatus = function(key) {
		if(key) {
			deotorrent.socket.send("torrent_status", {info_hash: key});
		} else {
			deotorrent.socket.send("torrent_status");
		}
	}
	
	this.getInfo = function(key) {
		if(key) {
			deotorrent.socket.send("torrent_info", {info_hash: key});
		} else {
			for(var key in this.data) {
				deotorrent.socket.send("torrent_info", {info_hash: key});
			}
		}
	}
	
	this.parseStatusInfo = function(obj) {
		for(var key in obj) {
			if(!this.data[key]) {
				this.data[key] = new TORRENT();
			}
			for(var item in obj[key]) {
				this.data[key][item] = obj[key][item];
			}
			if(!this.data[key].hasInfo) {
				this.getInfo(key);
				this.data[key].hasInfo = true;
			}
		}
	}

	this.__construct();
}

function TORRENT() {

	this.hasInfo = false;
	
	this.key = null;
	this.num_incomplete = null;
	this.upload_payload_rate = null;
	this.active_time = null;
	this.num_uploads = null;
	this.total_payload_upload = null;
	this.list_peers = null;
	this.seed_rank = null;
	this.upload_rate = null;
	this.last_scrape = null;
	this.list_seeds = null;
	this.distributed_fraction = null;
	this.download_payload_rate = null;
	this.num_peers = null;
	this.block_size = null;
	this.distributed_full_copies = null;
	this.total_wanted_done = null;
	this.total_wanted = null;
	this.all_time_upload = null;
	this.uploads_limit = null;
	this.priority = null;
	this.current_tracker = null;
	this.progress = null;
	this.total_done = null;
	this.num_pieces = null;
	this.progress_ppm = null;
	this.download_rate = null;
	this.down_bandwidth_queue = null;
	this.connections_limit = null;
	this.seeding_time = null;
	this.pieces = null;
	this.all_time_download = null;
	this.total_redundant_bytes = null;
	this.num_seeds = null;
	this.up_bandwidth_queue = null;
	this.paused = null;
	this.num_complete = null;
	this.finished_time = null;
	this.total_download = null;
	this.num_connections = null;
	this.distributed_copies = null;
	this.total_payload_copies = null;
	this.error = null;
	this.total_upload = null;
	this.total_failed_bytes = null;
	
	this.state = null;
	this.announce_interval = null;
	this.next_announce = null;

	this.files = null;
	this.comment = null;
	this.num_pieces = null;
	this.creator = null;
	this.piece_size = null;
	this.creation_date = null;
	this.piece_length = null;
	this.priv = null;
	this.name = null;
	this.trackers = null;
	this.total_size = null;
	this.num_files = null;

}