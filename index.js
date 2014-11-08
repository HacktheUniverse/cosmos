'use strict';

var _     = require('lodash');
var THREE = require('three');
var Stats = require('./lib/Stats.js');

var stars    = require('./stars.js');
var constll  = require('./constellations.js');
var labels   = require('./labels.js');
var shipLoader = require('./ship.js');

var universeScale = 100;
var universe = require('./universe-sphere.js').init(universeScale);

var clock = new THREE.Clock();

THREE.OrbitControls       = require('./lib/OrbitControls.js');
THREE.FirstPersonControls = require('./lib/FirstPersonControls.js');

window.scene = null;
window.stats = null;
window.renderer = null;
window.camera = null;
window.steeringCube = null;
window.container = document.getElementById('container');
window.controls = null;

var init = function() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 1000000*universeScale);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // STATS
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild(stats.domElement);

  // Lights!
  var light = new THREE.PointLight('#FFFFFF', 1, 0);
  light.position.set(0,0,0.1);
  scene.add(light);
  var ambient = new THREE.AmbientLight( 0x334455 );
  scene.add(ambient);
	scene.add(universe);

  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: '#FF0000'
  });

  shipLoader.load(function(shipModel) {
    steeringCube.add(shipModel);
  });

  // camera moves with ship
   camera.position.set(0,200,200);
  // camera.up = new THREE.Vector3(0,1,0);
  // camera.lookAt(15,3,200);

  var cubeGeom = new THREE.BoxGeometry(0.01,0.01,0.01);
	steeringCube = new THREE.Mesh(cubeGeom, cubeMaterial);
	steeringCube.position.set(0, 0, 0);
	scene.add(steeringCube);

  // STAR DATA
  stars.init(scene, universeScale);
  constll.init(scene, camera, universeScale);

  // CONTROLS
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  //controls = new THREE.FirstPersonControls(camera);
  //controls.movementSpeed = 1;
  //controls.lookSpeed = 0.125;
  //controls.lookVertical = true;
};

var render = function() {
  requestAnimationFrame( render );

  /*
  var relativeCameraOffset = new THREE.Vector3(0,0,0.3);
  var cameraOffset = relativeCameraOffset.applyMatrix4(steeringCube.matrixWorld);
  camera.position.x = cameraOffset.x;
  camera.position.y = cameraOffset.y;
  camera.position.z = cameraOffset.z;
  camera.lookAt(steeringCube.position);
  steeringCube.translateZ(-0.1);
  steeringCube.rotateY(-0.001);
  */

  //camera.updateProjectionMatrix();
  labels.updateLabels(camera);
  renderer.render(scene, camera);
  
  stats.update();
  controls.update();
};

init();
render();
