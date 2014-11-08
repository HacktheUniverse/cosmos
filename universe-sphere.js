var THREE = require('three');

// radius, segmentsWidth, segmentsHeight
var sphereGeom =  new THREE.SphereGeometry( 5, 32, 16 ); 
var material = new THREE.MeshPhongMaterial({
  // light
  specular: '#a9fcff',
  // intermediate
  color: '#00abb1',
  // dark
  emissive: '#006063',
  shininess: 100 
});

var texture = THREE.ImageUtils.loadTexture( './images/mellinger-optmw.png' );
//var material = new THREE.MeshBasicMaterial( { map: texture } );
//material.side = THREE.BackSide;
var obj = new THREE.Mesh( sphereGeom.clone(), material );
obj.position.set(-100, 50, 0);

module.exports = obj;
