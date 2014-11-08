var _     = require('lodash');
var THREE = require('three');
var Stats = require('./lib/Stats.js');

var init = function() {
  window.scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(0,150,400);
  camera.lookAt(scene.position);

  var universe = require('./universe-sphere.js');
  scene.add(universe);	

  var renderer = new THREE.WebGLRenderer();
  var container = document.getElementById('container');
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
	if ( keyboard.pressed("z") ) 
	{ 
		// do something
	}
	
	controls.update();
	stats.update();
}

function render() {
	renderer.render( scene, camera );
}
