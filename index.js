'use strict';

var _     = require('lodash');
var THREE = require('three');
var Stats = require('./lib/Stats.js');
THREE.OrbitControls = require('./lib/OrbitControls.js');
var stars = require('./stars.js');
THREE.ColladaLoader = require('./lib/ColladaLoader.js');
var loader = new THREE.ColladaLoader();
var constll = require('./constellations.js');

window.scene = null;
window.stats = null;
window.renderer = null;
window.camera = null;
window.cube = null;
window.container = document.getElementById('container');
window.controls = null;

var dae;

var onProgress = function ( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

var onError = function ( xhr ) {
};

var universe = require('./universe-sphere.js');

var init = function() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // STATS
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild(stats.domElement);

	// use a "lambert" material rather than "basic" for realistic lighting.
	/*
  var sphereGeometry = new THREE.SphereGeometry( 1, 32, 16 ); 
	var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff} ); 
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	scene.add(sphere);
	*/
	scene.add(universe);

  // Lights!
  var light = new THREE.PointLight('#FFFFFF', 1, 0);
  light.position.set(0,0.1,0);
  scene.add(light);
  var ambient = new THREE.AmbientLight( 0x334455 );
  scene.add(ambient);

  // GEOMETRY
  var shipMaterial = new THREE.MeshLambertMaterial({
    color: 0x999999
  });

  // Starship mesh in COLLADA format
  var group = new THREE.Object3D();
  loader.options.convertUpAxis = true;
  loader.load( './meshes/spaceship.dae', function ( collada ) {
    dae = collada.scene;
    console.log("collada mesh loaded", dae);
    dae.scale.x = dae.scale.y = dae.scale.z = 0.1;
    dae.updateMatrix(); // need this for scaling to take effect
    scene.add(dae);
  });
  // camera moves with ship
  camera.position.set(0,2,2);
  //camera.up = new THREE.Vector3(0,1,0);
  //camera.lookAt(15,3,200);

  var cubeGeom = new THREE.CubeGeometry(5, 5, 5);
	cube = new THREE.Mesh(cubeGeom, shipMaterial);
	cube.position.set(0, 0, 0);
	scene.add(cube);

  // STAR DATA
  stars.init(scene);
  constll.init(scene);

  // ORBIT CONTROLS
  controls = new THREE.OrbitControls( camera, renderer.domElement );
};

var render = function() {
  requestAnimationFrame( render );

  //cube.rotation.x += 0.1;
  //cube.rotation.y += 0.1;

  /*
  if(dae) {
    camera.position.set(dae.position);
  }
  */

  /*
  var relativeCameraOffset = new THREE.Vector3(0,2,10);
  var cameraOffset = relativeCameraOffset.applyMatrix4( cube.matrixWorld );
  camera.position.x = cameraOffset.x;
  camera.position.y = cameraOffset.y;
  camera.position.z = cameraOffset.z;
  camera.lookAt( cube.position );
  cube.translateZ(-0.1);
  */

  renderer.render(scene, camera);
  stats.update();
  controls.update();
};

init();
render();
