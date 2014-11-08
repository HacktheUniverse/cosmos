var THREE = require('three');

var Stars = {
	init: function(scene, scaleFactor) {
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
					vertex.x = star.pos[0] * scaleFactor;
					vertex.y = star.pos[1] * scaleFactor;
					vertex.z = star.pos[2] * scaleFactor;
					geometry.vertices.push(vertex);		
				});
				
				var colors = [];
				var colorsh = [];
				for( var i = 0; i < geometry.vertices.length; i++ ) {
					colors[i] = new THREE.Color();
					colorint = stars[i].color;
					if( logga > 0 ){
						console.log(colorint);
						logga--;
					}
					
					colors[i].setRGB( colorint[0]/255, colorint[1]/255, colorint[2]/255 );
					colorsh[i] = [colorint[0]/255, colorint[1]/255, colorint[2]/255];
				}
				geometry.colors = colors;


				// var pMaterial = new THREE.PointCloudMaterial({size: 0.01});
				var sMaterial = new THREE.ShaderMaterial( {
					attributes: {
						color: { type: 'v3', value: colorsh }
					},
					vertexShader:   document.getElementById('vertexshader').textContent,
					fragmentShader: document.getElementById('fragmentshader').textContent,
					side: THREE.DoubleSide
				});
				
				var gMaterial = new THREE.PointCloudMaterial({ 
					map: THREE.ImageUtils.loadTexture(
						"images/map_mask.png"
					),
					color          : 0xffffff, 
					size           : 100, 
					blending       : THREE.NormalBlending, 
					transparent    : true, 
					depthWrite     : false, 
					vertexColors   : true,
					sizeAttenuation: true 
				});
				 
				particles = new THREE.PointCloud(geometry, gMaterial);
				scene.add(particles);
				console.log("Stars Born");
			}
		};
		http_request.open("GET", "data/stars.json", true);
		http_request.send();
	}

};

module.exports = Stars;
