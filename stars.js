var Stars = {
	init: function(scene) {
		var particles, geometry, materials = [], parameters, i, color, size;

		geometry = new THREE.Geometry();

		// Opera 8.0+, Firefox, Chrome, Safari
		http_request = new XMLHttpRequest();
		http_request.onreadystatechange = function() {
			if (http_request.readyState === 4) {
				// Javascript function JSON.parse to parse JSON data
				var stars = JSON.parse(http_request.responseText);

				stars.forEach(function(star) {
					var vertex = new THREE.Vector3();
					vertex.x = star.pos[0];
					vertex.y = star.pos[1];
					vertex.z = star.pos[2];
					geometry.vertices.push(vertex);
				});

				particles = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({size: 1}));

				scene.add(particles);

				console.log("Stars Born");
			}
		};
		http_request.open("GET", "data/stars.json", true);
		http_request.send();
	}

};

module.exports = Stars;
