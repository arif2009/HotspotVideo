	'use strict';
	//Extend jQuery function : http://stackoverflow.com/a/36186735/3835843
	
	function init(settings) {
		
		var video = $(settings.video)[0];
		var $hotspot = $(settings.hotspot);
		var $caption = $(settings.caption);
		var arrHotspots = settings.hotspotPositions;

		// Currently shown hotspot.
 		var idxHotspot = -1;
		
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