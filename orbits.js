var THREE = require('three');

var Orbits = {
	init: function(scene, scaleFactor) {
		var that = this;
		var particles, geometry, materials = [], parameters, i, color, size;

		var material = new THREE.LineBasicMaterial({
			color: 0x00ff00
		});

		// Opera 8.0+, Firefox, Chrome, Safari
		var http_request = new XMLHttpRequest();
		http_request.onreadystatechange = function() {
			if (http_request.readyState === 4) {
				// Javascript function JSON.parse to parse JSON data
				//console.log("wut ");
				var orbits = JSON.parse(http_request.responseText);

				orbits.forEach(function(orbitsObj) {
					
					var posArrs = orbitsObj.steps;
					//console.log(orbitsObj.name);
					var geometry = new THREE.Geometry();
					
					posArrs.forEach(function(pos){
						geometry.vertices.push(
								new THREE.Vector3(pos[0] * scaleFactor, pos[1] * scaleFactor, pos[2] * scaleFactor)
							);
					});
					/*geometry.vertices.push(
						new THREE.Vector3(posArrs[0][0] * scaleFactor, posArrs[0][1] * scaleFactor, posArrs[0][2] * scaleFactor)
					);*/
					var line = new THREE.Line( geometry, material );
					scene.add( line );
					
				});

				console.log("Orbits Drawn");
			}
		};
		http_request.open("GET", "data/starorbits.json", true);
		http_request.send();
	}

};

module.exports = Orbits;
