var THREE = require('three');
var labels   = require('./labels.js');
var descriptions = require('./descriptions.js');
var lines = [];
var shown = false;

var Constll = {
	init: function(scene, scaleFactor, callback) {
		this.scene = scene;

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
										
					var sumX=0, sumY=0, sumZ=0, sumStars=0;
					
					// need to draw the label here
					starArrs.forEach(function(stars){
						var geometry = new THREE.Geometry();
						stars.forEach(function(star){
							star.x = Number(star.x) * scaleFactor;
							star.y = Number(star.y) * scaleFactor;
							star.z = Number(star.z) * scaleFactor;
							geometry.vertices.push( 
								new THREE.Vector3(star.x, star.y, star.z)
							);
							sumX += star.x;
							sumY += star.y;
							sumZ += star.z;
							sumStars++;
						});
						var line = new THREE.Line( geometry, material );
						lines.push(line);
						scene.add( line );
					});
					
					var pos = new THREE.Vector3(
					  sumX / sumStars,
					  sumY / sumStars,
					  sumZ / sumStars
					);
			
					var name;
					if(con.hasOwnProperty('name')){
						name = con.name;
					} else {
						 name = con.abbr;
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
					
					callback();
				});

				console.log("Constellations Drawn");
			}
		};
		http_request.open("GET", "data/constellations.json", true);
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

module.exports = Constll;
