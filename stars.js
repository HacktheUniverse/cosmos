var THREE = require('three');
var labels   = require('./labels.js');
var descriptions = require('./descriptions.js');
var particles;

var Stars = {
	init: function(scene, scaleFactor, callback) {
		this.scene = scene;
		var geometry = new THREE.Geometry();

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
					
					var description = descriptions.getForStar(star.hip);
					if( description ){
						labels.addLabel(vertex, description.name, description.description, "star");
					}
				});
				
				geometry.colors = colors; // For Some reason, this is still necessary...

				var sMaterial = new THREE.ShaderMaterial( {
					uniforms: {
						cutoff: { type: 'f', value: 0.2}
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
	
				particles = new THREE.PointCloud(geometry, sMaterial);
				
				console.log("Stars Born");
				
				callback();
			}
		};
		http_request.open("GET", "data/stars.json", true);
		http_request.send();
	},
	hide: function(){
		this.scene.remove(particles);
	},
	show: function(){
		this.scene.add(particles);
	}
};

module.exports = Stars;
