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
}

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
