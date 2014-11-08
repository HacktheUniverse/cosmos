var _     = require('lodash');
var THREE = require('three');
var Stats = require('./lib/Stats.js');
THREE.OrbitControls = require('./lib/OrbitControls.js');
var stars = require('./stars.js');
THREE.OBJLoader = require('./lib/OBJLoader.js');
var loader = new THREE.OBJLoader();
var constll = require('./constellations.js');

window.scene = null;
window.stats = null;
window.renderer = null;
window.camera = null;
window.cube = null;
window.container = document.getElementById('container');

var onProgress = function ( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

var onError = function ( xhr ) {
};

//var universe = require('./universe-sphere.js');

var init = function() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = -3;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

	// use a "lambert" material rather than "basic" for realistic lighting.
  var sphereGeometry = new THREE.SphereGeometry( 1, 32, 16 ); 
	var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff} ); 
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	//scene.add(sphere);

  var light = new THREE.PointLight('#FF00FF', 5, 0);
  light.position.set(10,10,10);
  scene.add(light);
  var ambient = new THREE.AmbientLight( 0x334455 );
  scene.add(ambient);

  // GEOMETRY
  var shipMaterial = new THREE.MeshLambertMaterial({
    color: 0x999999
  });
  loader.load('./meshes/spaceship.obj', function (object) {
    object.traverse(function(child) {
      if(child instanceof THREE.Mesh) {
        child.material = shipMaterial;
        child.material.needsUpdate = true;
        child.material.side = THREE.DoubleSide;
      }
    });
    object.scale.set(0.1,0.1,0.1);
    scene.add(object);
  }, onProgress, onError);

  stars.init(scene);
  constll.init(scene);

  controls = new THREE.OrbitControls( camera, renderer.domElement );

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild( stats.domElement );
};

var render = function() {
  requestAnimationFrame( render );

  //cube.rotation.x += 0.1;
  //cube.rotation.y += 0.1;

  renderer.render(scene, camera);
  stats.update();
  controls.update();
};

init();
render();
