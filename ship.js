var THREE = require('three');
THREE.OBJLoader     = require('./lib/OBJLoader.js');
var loader = new THREE.OBJLoader();

var ship;
var shipMaterial = new THREE.MeshLambertMaterial({ color: '#999999' });

module.exports = {
  load: function(callback) {

    loader.load('./meshes/spaceship.obj', function(object) {
      object.traverse(function(child) {
        if(child instanceof THREE.Mesh) {
          child.material.map = THREE.ImageUtils.loadTexture('./images/metal.png');
          child.material.needsUpdate = true;
        }
      });
      ship = object;
      ship.scale.set(0.1,0.1,0.1);
      ship.translateY(-0.5);
      callback.apply(null, [ship]);
    });

  }
};
