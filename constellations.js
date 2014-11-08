var THREE = require('three');

var Constll = {
	labels: [],
	updateLabels: function(camera){
		//console.log("wut");
		this.labels.forEach(function(item){
			//console.log(item.v.x);
			var newPos = toXYCoords(item.v, camera);
			item.text.style.top = newPos.x + 'px';
			item.text.style.left = newPos.y + 'px';
		});
	},
	init: function(scene, camera) {
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

				//constll.forEach(function(con) {
				con = constll[0];
				
					var starArrs = con.stars;
					console.log("drawing "+con.abbr);
					var l = {};
					
					var text2 = document.createElement('div');
					text2.style.position = 'absolute';
					//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
					text2.style.width = 100;
					text2.style.height = 100;
					text2.style.backgroundColor = "red";
					text2.innerHTML = con.abbr;					
					
					var pos = new THREE.Vector3(starArrs[0][0].x, starArrs[0][0].y, starArrs[0][0].z);
					var newPos = toXYCoords(pos, camera);
					text2.style.top = newPos.x + 'px';
					text2.style.left = newPos.y + 'px';
									
					
					l.text = text2;
					l.v = pos;
					that.labels.push(l);
					document.body.appendChild(l.text);
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
					
				//});

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
		//var vector = pos.clone().unproject( camera );
        var vector = projector.projectVector(pos.clone(), camera);
        vector.x = (vector.x + 1)/2 * window.innerWidth;
        vector.y = -(vector.y - 1)/2 * window.innerHeight;
        return vector;
}
