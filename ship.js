var THREE = require('three');
THREE.OBJLoader     = require('./lib/OBJLoader.js');
var loader = new THREE.OBJLoader();

var ship;
var shipMaterial = new THREE.MeshPhongMaterial({ color: '#777777' });

module.exports = {
  load: function(callback) {

    loader.load('./meshes/spaceship.obj', function(object) {
      object.traverse(function(child) {
        if(child instanceof THREE.Mesh) {
          child.material = shipMaterial;
          //child.material.map = THREE.ImageUtils.loadTexture('./images/metal.png');
          //child.material.needsUpdate = true;
        }
      });
      ship = object;
      callback.apply(null, [ship]);
    });

  }
};
