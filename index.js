var _     = require('lodash');
var THREE = require('three');
var Stats = require('./lib/Stats.js');
THREE.OrbitControls = require('./lib/OrbitControls.js');
var stars = require('./stars.js');

window.scene = null;
window.stats = null;
window.renderer = null;
window.camera = null;
window.cube = null;
window.container = document.getElementById('container');

//var universe = require('./universe-sphere.js');

var init = function() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // GEOMETRY
  var geometry = new THREE.BoxGeometry(1,1,1);
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( geometry, material );
  scene.add(cube);

  stars.init(scene);

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

render();
