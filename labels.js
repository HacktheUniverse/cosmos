var THREE = require('three');

var Labels = {
	projector: new THREE.Projector(),
	toXYCoords: function(pos, camera) {
		var vector = pos.clone();
    this.projector.projectVector(vector, camera);
    vector.x =  (vector.x + 1)/2 * window.innerWidth;
    vector.y = -(vector.y - 1)/2 * window.innerHeight;
    return vector;
	},
	labels: [],
	updateLabels: function(camera, intersects){
		var that = this;
		this.labels.forEach(function(item){
			
			var newPos = that.toXYCoords(item.v, camera);
			item.text.style.top  = newPos.y + 'px';
			item.text.style.left = newPos.x + 'px';
		});
	},
	addLabel: function(vector, text, append){
		var l = {};
		
		var text2 = document.createElement('div');
		text2.className = "label";
		text2.innerHTML = text;
		
		l.text = text2;
		l.v = vector;
		this.labels.push(l);
		if(append !== false){
			document.getElementById("container").appendChild(l.text);
		}
		return l.text;
	}

};

module.exports = Labels;


