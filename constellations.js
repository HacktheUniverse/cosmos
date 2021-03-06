var THREE = require('three');
var labels   = require('./labels.js');
var descriptions = require('./descriptions.js');

var Constll = {
	init: function(scene, scaleFactor) {
		var that = this;
		var particles, geometry, materials = [], parameters, i, color, size;

		var material = new THREE.LineBasicMaterial({
			color: '#5566ee'
		});

		// Opera 8.0+, Firefox, Chrome, Safari
		var http_request = new XMLHttpRequest();
		http_request.onreadystatechange = function() {
			if (http_request.readyState === 4) {
				// Javascript function JSON.parse to parse JSON data
				//console.log("wut ");
				var constll = JSON.parse(http_request.responseText);

				constll.forEach(function(con) {
				//var con = constll[0];
					var starArrs = con.stars;
					var pos = new THREE.Vector3(
					  starArrs[0][0].x * scaleFactor,
					  starArrs[0][0].y * scaleFactor,
					  starArrs[0][0].z * scaleFactor
					);
					var name = con.abbr;

					if(con.hasOwnProperty('name')){
						name = con.name;
					}
					
					var description = descriptions.getForConstellation(name);
					if( description ){
						description_str = "";
						if( description.nickname ){
							description_str += "("+description.nickname+"): ";
						}
						description = description_str + description.description;
					} else {
						description = null;
					}
					labels.addLabel(pos, name, description, "constellation");
					
					
					
					// need to draw the label here
					starArrs.forEach(function(stars){
						var geometry = new THREE.Geometry();
						
						stars.forEach(function(star){
							geometry.vertices.push(
								new THREE.Vector3(star.x * scaleFactor, star.y * scaleFactor, star.z * scaleFactor)
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
