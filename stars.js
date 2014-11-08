var THREE = require('three');

var Stars = {
	init: function(scene) {
		var particles, geometry, materials = [], parameters, i, color, size;

		geometry = new THREE.Geometry();

		// Opera 8.0+, Firefox, Chrome, Safari
		var http_request = new XMLHttpRequest();
		http_request.onreadystatechange = function() {
			if (http_request.readyState === 4) {
				// Javascript function JSON.parse to parse JSON data
				var stars = JSON.parse(http_request.responseText);
				
				var logga = 10;
				stars.forEach(function(star) {
					var vertex = new THREE.Vector3();
					vertex.x = star.pos[0];
					vertex.y = star.pos[1];
					vertex.z = star.pos[2];
					geometry.vertices.push(vertex);		
				});
				
				var colors = [];
				for( var i = 0; i < geometry.vertices.length; i++ ) {
					colors[i] = new THREE.Color();
					colorint = stars[i].color;
					if( logga > 0 ){
						console.log(colorint);
						logga--;
					}
					
					colors[i].setRGB( colorint[0]/255, colorint[1]/255, colorint[2]/255 );
				}
				geometry.colors = colors;
				
				
				

				// var pMaterial = new THREE.PointCloudMaterial({size: 0.01});
				 
				var pMaterial = new THREE.PointCloudMaterial({
					color: 0xFFFFFF,
					size: 1,
					map: THREE.ImageUtils.loadTexture(
						"images/particle2.png"
					),
					blending: THREE.AdditiveBlending,
					transparent: true,
					vertexColors: THREE.VertexColors
				});
				

				particles = new THREE.PointCloud(geometry, pMaterial);

				scene.add(particles);

				console.log("Stars Born");
			}
		};
		http_request.open("GET", "data/stars.json", true);
		http_request.send();
	}

};

module.exports = Stars;
