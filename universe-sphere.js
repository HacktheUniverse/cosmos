var THREE = require('three');

// radius, segmentsWidth, segmentsHeight

module.exports = {
  init: function(scaleFactor) {
    var sphereGeom =  new THREE.SphereGeometry(90000000 * scaleFactor, 32, 16); 

    var texture = THREE.ImageUtils.loadTexture( './images/mellinger-optmw.png' );
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7
    });
    material.side = THREE.BackSide;
    var obj = new THREE.Mesh( sphereGeom.clone(), material );
    obj.position.set(0, 0, 0);
    return obj;
  }
};
