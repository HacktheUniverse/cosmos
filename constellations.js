var THREE = require('three');

var Constll = {
	init: function(scene) {
		var particles, geometry, materials = [], parameters, i, color, size;

		var material = new THREE.LineBasicMaterial({
			color: 0x00ffff
		});

		// Opera 8.0+, Firefox, Chrome, Safari
		var http_request = new XMLHttpRequest();
		http_request.onreadystatechange = function() {
			if (http_request.readyState === 4) {
				// Javascript function JSON.parse to parse JSON data
				//console.log("wut ");
				var constll = JSON.parse(http_request.responseText);

				constll.forEach(function(con) {
					
					var starArrs = con.stars;
					//console.log("drawing "+con.abbr);
					// need to draw the label here
					starArrs.forEach(function(stars){
						var geometry = new THREE.Geometry();
						
						stars.forEach(function(star){
							geometry.vertices.push(
								new THREE.Vector3(star.x, star.y, star.z)
							);
						});
						
						var line = new THREE.Line( geometry, material );
						scene.add( line );
					});
					
				});

				console.log("Constellations Drawn");
			}
		};
		http_request.open("GET", "data/constellations.json", true);
		http_request.send();
	}

};

module.exports = Constll;
