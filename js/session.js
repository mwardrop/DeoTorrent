/*!
 * DeoTorrent - Web UI
 * http://www.mitchwardrop.com/
 *
 * Copyright 2011, Mitch Wardrop
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 */
 
function SESSION() {
	this.data = {
		total_tracker_download: null,
		num_unchoked: null, 
		unchoke_counter: null,
		total_payload_upload: null,
		upload_rate: null, 
		payload_upload_rate: null,
		num_peers: null,
		dht_global_nodes: null,
		tracker_download_rate: null,
		tracker_upload_rate: null,
		dht_download_rate: null,
		total_ip_overhead_download: null,
		total_dht_download: null,
		total_ip_overhead_upload: null,
		dht_node_cache: null,
		total_payload_download: null,
		download_rate: null,
		total_tracker_upload: null,
		dht_nodes: null,
		dht_torrents: null,
		total_redundant_bytes: null,
		allowed_upload_slots: null,
		payload_download_rate: null,
		total_download: null,
		tip_overhead_upload_rate: null,
		has_incoming_connections: null,
		ip_overhead_download_rate: null,
		dht_upload_rate: null,
		total_dht_upload: null,
		total_upload: null,
		total_failed_bytes: null,
		optimistic_unchoke_counter: null
	}
	
	this.__construct = function() {

	}
	
	this.update = function() {
	
		deotorrent.socket.send("session_status");
		
		var self = this;
		if(deotorrent.socket.connected){ setTimeout(function() { self.update(); }, config['updateInterval']); }
	}
	
	this.parse = function(obj) {
		for(var key in obj) {
			this.data[key] = obj[key];
		}
	}
	
	this.__construct();
}


