	'use strict';
	
	// Currently shown hotspot.
 	var idxHotspot = -1;
	
	// Set up our hotspots.
	var arrHotspots = [
		{"startTime":1,"endTime":4,"top":100,"left":100,"text":"Razia & Tania apa"},
		{"startTime":7,"endTime":8,"top":100,"left":230,"text":"Naznin Sultana & Akhi Hafsa"},
		{"startTime":10,"endTime":15,"top":100,"left":500,"text":"Md Robiul Alam"},
		{"startTime":18,"endTime":20,"top":100,"left":550,"text":"Taposh"},
		{"startTime":28,"endTime":30,"top":100,"left":600,"text":"Md Mahbub Alam Sir"},
		{"startTime":57,"endTime":60,"top":150,"left":380,"text":"Sandipan Saha"}
	];
	
	function init() {
		
		var video = $('#sampleVideo')[0];
		var $hotspot = $('#hotspot');
		var $caption = $('#caption');
		
		// Add the mouse events for the hotspot
		$hotspot.bind('mouseover', function(event) {
			video.pause();
		});
		
		$hotspot.bind('mouseout', function() {
			video.play();
		});
		
		// Determine when to show a hotspot.
		video.addEventListener('timeupdate', function() {

			// Grab the current video pointer time mark.
			var vidCurrentTime = video.currentTime;
			
			// Set flag if we need to show a new hotspot.
			var idxNewHotspot = -1;
			
			// Find if need to show a hostpot. Assumes only one hotspot at a time.
			for (var i=0; i<arrHotspots.length; i++) {
				if (vidCurrentTime >= arrHotspots[i].startTime && vidCurrentTime < arrHotspots[i].endTime) {
					idxNewHotspot = i;
				}
			}
			
			// Set up hotspot or remove a currently displayed one.
			if (idxNewHotspot > -1) {
				if (idxNewHotspot != idxHotspot) {
					
					// Position and size hotspot.
					$hotspot.css({
						left : arrHotspots[idxNewHotspot].left+'px',
						top : arrHotspots[idxNewHotspot].top+'px'
					}).show();

					// Position and size Caption.
					$caption.html(arrHotspots[idxNewHotspot].text);
					$caption.css({
						left: (arrHotspots[idxNewHotspot].left + 20) + "px",
						top: (arrHotspots[idxNewHotspot].top - 75) + "px"
					}).show();
					
					// Set the current hotspot shown.
					idxHotspot = idxNewHotspot;
				}
			} else {
				// Hide the current hotspot
				$hotspot.hide();
				$caption.hide();
			}
		}, false);
	}