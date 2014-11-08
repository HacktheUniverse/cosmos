var THREE = require('three');

var Constll = {
	labels: [],
	updateLabels: function(camera){
		
		this.labels.forEach(function(item){
			
			var newPos = toXYCoords(item.v, camera);
			item.text.style.top = newPos.y + 'px';
			item.text.style.left = newPos.x + 'px';
		});
	},
	init: function(scene, camera, scaleFactor) {
		var that = this;
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
				//con = constll[0];
				
					var starArrs = con.stars;
					var l = {};
					
					var text2 = document.createElement('div');
					text2.className = "label";
					text2.innerHTML = con.abbr;
					
					var pos = new THREE.Vector3(
					  starArrs[0][0].x * scaleFactor,
					  starArrs[0][0].y * scaleFactor,
					  starArrs[0][0].z * scaleFactor
					);
					
					l.text = text2;
					l.v = pos;
					that.labels.push(l);
					document.getElementById("container").appendChild(l.text);
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

var projector = new THREE.Projector();
function toXYCoords(pos, camera) {

		var vector = pos.clone();
        projector.projectVector(vector, camera);
        vector.x = (vector.x + 1)/2 * window.innerWidth;
        vector.y = -(vector.y - 1)/2 * window.innerHeight;
        return vector;
}
