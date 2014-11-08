var _     = require('lodash');
var THREE = require('three');
var Stats = require('./lib/Stats.js');

window.scene = null;
var camera, renderer, container, light;

// meshes and objects
var universe = require('./universe-sphere.js');

var init = function() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(0,150,400);
  //camera.lookAt(scene.position);
  camera.lookAt(0,0,0);

  scene.add(universe);
  
  initStars(scene);

  // LIGHT
	light = new THREE.PointLight(0xffffff);
	light.position.set(0,150,100);
	scene.add(light);

  renderer = new THREE.WebGLRenderer();
  container = document.getElementById('container');
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild( stats.domElement );
};



var initStars = function(scene){
	var particles, geometry, materials = [], parameters, i, color, size;
	
	geometry = new THREE.Geometry();

	for ( i = 0; i < 20000; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 2000 - 1000;
		vertex.y = Math.random() * 2000 - 1000;
		vertex.z = Math.random() * 2000 - 1000;

		geometry.vertices.push( vertex );
	}

	parameters = [
		[ [1, 1, 0.5], 5 ],
		[ [0.95, 1, 0.5], 4 ],
		[ [0.90, 1, 0.5], 3 ],
		[ [0.85, 1, 0.5], 2 ],
		[ [0.80, 1, 0.5], 1 ]
	];

	for ( i = 0; i < parameters.length; i ++ ) {
		color = parameters[i][0];
		size  = parameters[i][1];

		materials[i] = new THREE.PointCloudMaterial( { size: size } );

		particles = new THREE.PointCloud( geometry, materials[i] );

		particles.rotation.x = Math.random() * 6;
		particles.rotation.y = Math.random() * 6;
		particles.rotation.z = Math.random() * 6;

		scene.add( particles );
	}
};


init();
animate();

function animate() {
  requestAnimationFrame( animate );
	render();		
	update();
}

function update() {	
	//controls.update();
	stats.update();
}

function render() {
	renderer.render( scene, camera );
}
