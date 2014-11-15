var THREE = require('three');
var particles, shown = false;


var LSPM = {
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

					var color = new THREE.Color();
					colors.push(color);
					colorint = star.color;					
					color.setRGB( colorint[0]/255, colorint[1]/255, colorint[2]/255 );
					colorsh[i] = [colorint[0]/255, colorint[1]/255, colorint[2]/255];
					lumsh[i] = Math.pow(star.luminosity, 0.25);
				});
				
				geometry.colors = colors;

				var sMaterial = new THREE.ShaderMaterial( {
					uniforms: {
						cutoff: { type: 'f', value: 0.1}
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
				
				console.log("LSPM Born");
				
				callback();
			}
		};
		http_request.open("GET", "data/lspm.json", true);
		http_request.send();
	},
	hide: function(){
		this.scene.remove(particles);
		shown = false;
	},
	show: function(){
		this.scene.add(particles);
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

module.exports = LSPM;
