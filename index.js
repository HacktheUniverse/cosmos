'use strict';

var _ = require('lodash');
var $ = require('jquery');
var THREE = require('three');
var Stats = require('./lib/Stats.js');

var stars = require('./stars.js');
var lspm = require('./lspm.js');
var constll = require('./constellations.js');
var labels = require('./labels.js');
var orbits = require('./orbits.js');
var shipLoader = require('./ship.js');
var ship;

var universeScale = 100;
var universe = require('./universe-sphere.js').init(universeScale);

var clock = new THREE.Clock();

var startPosition = new THREE.Vector3(0, 0, 0);
var steering = false;
var steerXY = {
	x: 0,
	y: 0
};
var naturalVelocity = 50 / 1000; // parsecs per millisecond
var hyperspaceVelocity = 2.0;
var hyperspace = false;
var brake = false;
var velocity = naturalVelocity;
var last_frame = 0;

THREE.OrbitControls = require('./lib/OrbitControls.js');
THREE.FirstPersonControls = require('./lib/FirstPersonControls.js');

window.scene = null;
window.stats = null;
window.renderer = null;
window.camera = null;
window.container = document.getElementById('container');
window.controls = null;
window.coords = document.getElementById('coords');

var ww = window.innerWidth;
var wh = window.innerHeight;
var cw = ww / 2.0;
var ch = wh / 2.0;
var mouse = {
	x: cw,
	y: ch
};

container.onmousedown = function(e) { 
	steering = true; 
	mouse.x = e.clientX - cw;
	mouse.y = e.clientY - ch;
};
container.onmouseup   = function(e) { 
	steering = false; 
	mouse.x = e.clientX - cw;
	mouse.y = e.clientY - ch;
};
container.onmousemove = function(e) {
	if (steering) {
		mouse.x = e.clientX - cw;
		mouse.y = e.clientY - ch;
	}
};
document.onkeydown =  function(e) {
	switch(e.which){
		case 16:
			hyperspace = true;
			break;
		case 17:
			brake = true;
			break;
	}
};
document.onkeyup =  function(e) {
	switch(e.which){
		case 16:
			hyperspace = false;
			break;
		case 17:
			brake = false;
			break;
	}
};

var init = function() {
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(ww, wh);
	//renderer.setClearColor(0x000000, 1.0);
	container.appendChild(renderer.domElement);

	// Lights!
	var light = new THREE.PointLight('#FFFFFF', 1.5);
	light.position.set(0, 0, 0.3);
	scene.add(light);
	var ambient = new THREE.AmbientLight('#292725');
	scene.add(ambient);
	scene.add(universe);

	camera = new THREE.PerspectiveCamera(55, ww / wh, 0.1, 100000000);
	
	shipLoader.load(function(shipModel) {
		ship = shipModel;
		
		ship.rotateY(Math.PI * 1.5); // orient toward galactic center
		scene.add(ship);
		
		camera.position.set(0, 6.05, 1); // looks like you're sitting in the chair
		camera.rotateX(Math.PI * 0.05);
		ship.add(camera);
	});
	
	// STAR DATA
	stars.init(scene, universeScale, function(){
		stars.show();
	});
	lspm.init(scene, universeScale, function(){
		// don't show automatically
	});
	orbits.init(scene, universeScale, function(){
		// don't show automatically
	});
	constll.init(scene, universeScale, function(){
		constll.show();
	});

	// CONTROLS
	// controls = new THREE.OrbitControls( camera, renderer.domElement );
	//controls = new THREE.FirstPersonControls(camera);
	//controls.movementSpeed = 1;
	//controls.lookSpeed = 0.125;
	//controls.lookVertical = true;
	
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild(stats.domElement);
};

var render = function(frame_time) {
	requestAnimationFrame(render);
	
	if( !ship ){
		last_frame = frame_time;
		return;
	}

	// Forward
	if( brake ){
		velocity += (0 - velocity) * .05;
	} else if( hyperspace ){
		velocity += (hyperspaceVelocity - velocity) * .05;
	} else {
		velocity += (naturalVelocity - velocity) * .05;
	}
	ship.translateZ(-velocity * (frame_time - last_frame)); // velocity * dT
	last_frame = frame_time;
	
	// Orientation
	if (steering) {
		steerXY.x -= .05 * (steerXY.x - mouse.x);
		steerXY.y -= .05 * (steerXY.y - mouse.y);
	} else {
		steerXY.x = steerXY.x * .95;
		steerXY.y = steerXY.y * .95;
	}
	ship.rotateY(0.00005 * -steerXY.x);
	ship.rotateX(0.00005 * -steerXY.y);

	// speedometer
	var scp = ship.position;
	var scr = ship.rotation;
	var xyz_str = "x:" + scp.x.toFixed(3) + ", y:" + scp.y.toFixed(3) + ", z:" + scp.z.toFixed(3);
	var rot_str = "rx:" + scr.x.toFixed(3) + ", ry:" + scr.y.toFixed(3);
	coords.innerHTML = xyz_str + " &nbsp; | &nbsp; " + rot_str;

	//camera.updateProjectionMatrix();
	labels.updateLabels(camera, [ship]);
	renderer.render(scene, camera);

	stats.update();
	//controls.update();
};

init();
console.log("rendering");
render(0);

$('#button-data').on('click', function() {
	$('#menu-search').removeClass('active');
	$('#menu-data').toggleClass('active');
});
$('#button-search').on('click', function() {
	$('#menu-data').removeClass('active');
	$('#menu-search').toggleClass('active');
});
$(".menuItem#constellations").addClass("active");
$(".menuItem").click(function(ev){
	$(this).toggleClass("active");
	switch(this.id){
		case "nearest":
			lspm.toggle();
			break;
		case "constellations":
			constll.toggle();
			break;
		case "orbits":
			orbits.toggle();
			break;
	}
});