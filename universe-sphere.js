var THREE = require('three');

// radius, segmentsWidth, segmentsHeight
var sphereGeom =  new THREE.SphereGeometry(9000000, 32, 16); 
var texture = THREE.ImageUtils.loadTexture( './images/milkyway_pan.jpg' );

module.exports = {
  init: function(scaleFactor) {
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: false
    });
    material.side = THREE.BackSide;
    var obj = new THREE.Mesh(sphereGeom.clone(), material);
    obj.position.set(0, 0, 0);
    //obj.scale.set(scaleFactor);
    return obj;
  }
};
