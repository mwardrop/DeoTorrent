				 ____           _____                         _
				|  _ \  ___  __|_   _|__  _ __ _ __ ___ _ __ | |_ 
				| | | |/ _ \/ _ \| |/ _ \| '__| '__/ _ \ '_ \| __|
				| |_| |  __/ (_) | | (_) | |  | | |  __/ | | | |_
				|____/ \___|\___/|_|\___/|_|  |_|  \___|_| |_|\__|
													Alpha RC 1.3
 
Contents
--------

	1. What is DeoTorrent
	2. How to install
	3. Usage
	4. Known issues
	5. Changelog
	
What is DeoTorret
-----------------

	DeoTorrent is a HTML 5 and Javascript based client to the RoTorrent server.
	
How to install
--------------

	Requirements: 
		1. Latest version of Google Chrome *
		2. Working install of RoTorrent to connect to	

	* DeoTorrent will work with FireFox 4 if you enable WebSocket support.
	
	Instructions (windows):
		1. Download DeoTorrent, extract it where you want to run it from
		2. Edit config.js in the root directory ( instructions inside config )
		3. Open the properties dialog (right-click > properties) for the 
			"DeoTorrent - Web UI" link
		4. At the end of the "Target" field alter the following argument:
			--app="file:///C:/Users/mwardrop/Projects/DeoTorrent/index.html"
			Set the file location to your copy of DeoTorrent
		5. Close all copies of Google Chrome **
		5. Execute the "DeoTorrent - Web UI" link
		
	** In order to run from your local file system it is required that you
		override Google Chromes local file security policy. The link provided
		already does this, if you wish to do this yourself add 
		"--allow-file-access-from-files" to the list of command line arguments
		passed to Chrome on startup. This command must be run on the first 
		instance of Google Chrome.
		
	Instructions (linux):
		Coming soon.
		
Usage
-----

	Menu Strip:
		1. Settings
			Allows you to set per client settings
		2. Add Torrent
			- Currently has encoding issue's with the server
		3. Delete Torrent
			- Not implemented
		4. Remove Torrent
			- Not implemented
		5. Start Torrent
			- Not implemented
		6. Pause Torrent
			- Not implemented
		7. Stop Torrent
			- Not implemented
		8. RSS
			- Not implemented
		9. Console
			- Loads the interactive console
	
	Torrent List:
		The torrent list displays all torrents loaded into the RoTorrent server.
		All columns are sortable and can be hidden through the header controls.
		Menu Strip and Context Menu controls effect whatever torrent is selected 
		in this list.
	
	Context Menu:
		The Context Menu can be accesed by right clicking anywhere on the 
		Torrent List.
		
		Items:
			1. Start Torrent
				- Not implemented
			2. Pause Torrent
				- Not implemented
			3. Stop Torrent
				- Not implemented
			4. Delete Torrent
				- Not implemented
			5. Remove Torrent
				- Not implemented
			6. Details
				- Provides a list of properties for the currently selected 
					torrent.
	
	Console:
		The DeoTorrent Console is an interactive javascript console that allows
		you to execute any javascript code from within DeoTorrent.
		
		By accessing the 'deoorrent' and 'config' objects a user can directly 
		control the application from the console. To see this in action try 
		executing one of the following commands inside the console.
		
			alert(config['server']); //Will alert the WebSocket server url
			alert(deotorrent.version); //Will alert the current DeoTorrent Ver.
			
		One of the main purposes of the console is to debug and understand 
		requests to the server and the responses it provides. The 
		deotorrent.console object supplies a debug array with flags that will 
		enable the debugging of requests being made to the server and the 
		responses the server provides. Execute the following two commands in 
		the console to enable these features.
		
			deotorrent.console.debug['requests'] = true;
				// Enables watching of server requests
				
			deotorrent.console.debug['responses'] = true;
				// Enables watching of server responses
		
		Another major use of the Console is for directly sending requests to 
		the RoTorrent server. This is done through the socket.send method 
		which uses the following syntax.
		
			deotorrent.socket.send(cmd[string], args[hash]);
		
		The cmd parameter is a string variable containing the command to be 
		executed and the args paramter is a key / value pair of the arguements
		the server requires to execute the command. The following example would
		retrieve the status of the torrent with the provided hash_key.
		
			var key = "63414465656cb535269b110ecc7aead6b5be0d3b";
			deotorrent.socket.send("torrent_status", {info_hash: key});
		
		In combination with enabling request and response debugging you can
		manually test any feature of the server with the socket.send method.
		
		The console provides a basic autocomplete feature that will 
		automatically remember any commands you use. As well, the autocomplete 
		feature is already pre loaded with the 'deotorrent' and 'config' basic
		namespace.
		
		Scrolling of the console output can be enabled and disabled using the
		"Scroll Output" button.
		

Known issues
------------

	- There is a massive memory leak in the FlexiGrid component used for 
		displaying the torrent list. Setting your config.updateInterval setting 
		to a high value should help slow the memory leak until a better solution
		can be found
		
	- The grid will not display on initial load. A delay equal to that of the 
		config['updateInterval'] is present. This is due to the grid attempting
		to update on init before the sockets first response is parsed. A work
		around is not yet know

Changelog
---------

	Alpha RC 1.0
		- Basic connect and list support
		- Initial draft of the console
		
	Alpha RC 1.1
		- Added torrent status parsing and filtering
		- Added new menu strip and context menu items ( methods not implemented )
		- Refactored console to be more user friendly
		- Added config file
		
	Alpha RC 1.2
		- Added details window
		- Added updateInterval to the config
		- Added readme.txt
	
	Alpha RC 1.3
		- Fixed big: initial grid load delay
		- Improved status filter responsiveness
		- Added settings dialog ( Allows per client settings )
		- Updated details dialog UI