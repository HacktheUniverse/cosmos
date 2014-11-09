'use strict';

var _     = require('lodash');
var $     = require('jquery');
var THREE = require('three');
var Stats = require('./lib/Stats.js');

var stars    = require('./stars.js');
var lspm     = require('./lspm.js');
var constll  = require('./constellations.js');
var labels   = require('./labels.js');
var orbits   = require('./orbits.js');
var shipLoader = require('./ship.js');
var ship;

var universeScale = 100;
var universe = require('./universe-sphere.js').init(universeScale);

var clock = new THREE.Clock();

var startPosition = new THREE.Vector3(0,1,0);

var steering = false;
var steerXY  = {
  x: 0,
  y: 0
};

THREE.OrbitControls       = require('./lib/OrbitControls.js');
THREE.FirstPersonControls = require('./lib/FirstPersonControls.js');

window.scene    = null;
window.stats    = null;
window.renderer = null;
window.camera   = null;
window.steeringCube = null;
window.container= document.getElementById('container');
window.controls = null;
window.coords   = document.getElementById('coords');

var ww = window.innerWidth;
var wh = window.innerHeight;

container.onmousedown = function() { steering = true; };
container.onmouseup   = function() { steering = false; };
container.onmousemove = function(e) {
  if(steering) {
    steerXY = {
      x: e.clientX - (ww/2),
      y: e.clientY - (wh/2)
    };
  } else {
    steerXY = {
      x: steerXY.x,
      y: steerXY.y
    };
  }
};

var init = function() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55, ww/wh, 0.1, 100000000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(ww, wh);
  container.appendChild( renderer.domElement );

  // STATS
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild(stats.domElement);

  // Lights!
  var light = new THREE.PointLight('#FFFFFF', 1.5);
  light.position.set(0,0,0.3);
  scene.add(light);
  var ambient = new THREE.AmbientLight('#292725');
  scene.add(ambient);
	scene.add(universe);

  // camera moves with ship
   camera.position.set(0,20,20);
  // camera.up = new THREE.Vector3(0,1,0);
  // camera.lookAt(15,3,200);

  var cubeGeom = new THREE.BoxGeometry(0.01,0.01,0.01);
  var cubeMaterial = new THREE.MeshBasicMaterial({ color: '#4488BB' });
	steeringCube = new THREE.Mesh(cubeGeom, cubeMaterial);
	console.log("start",startPosition);
	steeringCube.position.set(startPosition.x, startPosition.y, startPosition.z);
	scene.add(steeringCube);
	console.log("cube",steeringCube);

  shipLoader.load(function(shipModel) {
    steeringCube.add(shipModel);
    ship = shipModel;
  });

  // STAR DATA
  stars.init(scene, universeScale);
  lspm.init(scene, universeScale);
  orbits.init(scene, universeScale);
  constll.init(scene, universeScale);

  // CONTROLS
  // controls = new THREE.OrbitControls( camera, renderer.domElement );
  //controls = new THREE.FirstPersonControls(camera);
  //controls.movementSpeed = 1;
  //controls.lookSpeed = 0.125;
  //controls.lookVertical = true;
};

var render = function() {
  requestAnimationFrame( render );

  var relativeCameraOffset = new THREE.Vector3(0,0,0.2);
  var cameraOffset = relativeCameraOffset.applyMatrix4(steeringCube.matrixWorld);
  camera.position.x = cameraOffset.x;
  camera.position.y = cameraOffset.y;
  camera.position.z = cameraOffset.z;
  camera.lookAt(steeringCube.position);
  camera.rotation.z = steeringCube.rotation.z;
  // move around
  steeringCube.translateZ(-1.5);
  //steeringCube.rotateY(0.01);
  steeringCube.rotateY(0.0001 * -steerXY.x);
  steeringCube.rotateX(0.0001 * -steerXY.y);

  var scp = steeringCube.position;
  var scr = steeringCube.rotation;
  var xyz_str = "x:"+scp.x.toFixed(3)+", y:"+scp.y.toFixed(3)+", z:"+scp.z.toFixed(3);
  var rot_str = "rx:"+scr.x.toFixed(3)+", ry:"+scr.y.toFixed(3);
  coords.innerHTML = xyz_str+" &nbsp; | &nbsp; "+rot_str;

  camera.updateProjectionMatrix();
  labels.updateLabels(camera, [ship]);
  renderer.render(scene, camera);

  stats.update();
  //controls.update();
};

init();
console.log("rendering");
render();

$('#button-data').on('click',function() {
  $('#menu-search').removeClass('active');
  $('#menu-data').toggleClass('active');
});
$('#button-search').on('click',function() {
  $('#menu-data').removeClass('active');
  $('#menu-search').toggleClass('active');
});
