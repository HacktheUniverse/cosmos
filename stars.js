var THREE = require('three');
var labels   = require('./labels.js');
var descriptions = require('./descriptions.js');

var logga = 10;

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
				
				var colors = [];
				var colorsh = [];
				var lumsh = [];
				stars.forEach(function(star, i) {
					var vertex = new THREE.Vector3();
					vertex.x = star.pos[0] * scaleFactor;
					vertex.y = star.pos[1] * scaleFactor;
					vertex.z = star.pos[2] * scaleFactor;
					geometry.vertices.push(vertex);		
					
					colors[i] = new THREE.Color();
					colorint = star.color;					
					colors[i].setRGB( colorint[0]/255, colorint[1]/255, colorint[2]/255 );
					colorsh[i] = [colorint[0]/255, colorint[1]/255, colorint[2]/255];
					lumsh[i] = Math.pow(star.luminosity, 0.25);
					
					if( logga > 0 ){
						console.log(lumsh[i]);
						logga--;
					}
					
					var description = descriptions.getForStar(star.hip);
					if( description ){
						labels.addLabel(vertex, description.name, description.description, "star");
					}
				});
				
				geometry.colors = colors;

				var sMaterial = new THREE.ShaderMaterial( {
					uniforms: {
						cutoff: { type: 'f', value: 0.25}
					},
					attributes: {
						color: { type: 'v3', value: colorsh },
						luminosity: { type: 'f', value: lumsh }
					},
					vertexShader:   document.getElementById('vertexshader').textContent,
					fragmentShader: document.getElementById('fragmentshader').textContent,
					side: THREE.DoubleSide,
					blending: THREE.AdditiveBlending,
					transparent: true,
					depthTest: true
				});
/*				
				var gMaterial = new THREE.PointCloudMaterial({ 
					map: THREE.ImageUtils.loadTexture(
						"images/map_mask.png"
					),
					color          : 0xffffff, 
					size           : 50, 
					blending       : THREE.NormalBlending, 
					transparent    : true, 
					depthWrite     : false, 
					vertexColors   : true,
					sizeAttenuation: true,
					fog            : false
				});
				
				var hMaterial = new THREE.PointCloudMaterial({ 
					map: THREE.ImageUtils.loadTexture(
						"images/map_mask_orb.png"
					),
					color          : 0xffffff, 
					size           : 20, 
					blending       : THREE.NormalBlending, 
					transparent    : true, 
					depthWrite     : false, 
					vertexColors   : false,
					sizeAttenuation: true,
					fog            : false
				});
								 
				particles = new THREE.PointCloud(geometry, gMaterial);
				scene.add(particles);
				
*/				
				particles = new THREE.PointCloud(geometry, sMaterial);
				scene.add(particles);
				
				
				console.log("Stars Born");
			}
		};
		http_request.open("GET", "data/stars.json", true);
		http_request.send();
	}

};

module.exports = Stars;
