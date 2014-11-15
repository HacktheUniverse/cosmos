var THREE = require('three');
var lines = [];
var shown = false;

var Orbits = {
	init: function(scene, scaleFactor, callback) {
		this.scene = scene;
		var material = new THREE.LineBasicMaterial({
			color: '#00C362'
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
					lines.push(line);
				});

				console.log("Orbits Drawn");
				
				callback();
			}
		};
		http_request.open("GET", "data/starorbits.json", true);
		http_request.send();
	},
	hide: function(){
		lines.forEach(function(line){
			this.scene.remove(line);
		}, this);
		shown = false;
	},
	show: function(){
		lines.forEach(function(line){
			this.scene.add(line);
		}, this);
		shown = true;
	},
	toggle: function(){
		if( shown ){
			this.hide();
		} else {
			this.show();
		}
	}
};

module.exports = Orbits;
