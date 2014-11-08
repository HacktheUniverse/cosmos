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
			if(newPos.z > 1.0){
				item.text.style.display = 'none';
			} else {
				item.text.style.display = 'block';
			}
		});
	},
	addLabel: function(vector, name, description, type, append){
		var l = {};
		
		var text2 = document.createElement('div');
		if( description ){
			text2.className = "label described "+type;
			text2.innerHTML = "<h3>"+name+"</h3><p class='description'>"+description+"</p>";
			text2.onclick = function(){ 
				var positiveSelect = this.className.indexOf("selected") === -1;
				Array.prototype.forEach.call(document.getElementsByClassName("selected"), function(el) {
					el.className = el.className.substring(0,el.className.length - 9);	
				});
				if( positiveSelect ){
					this.className = this.className + " selected";	
				} else {
					this.className = this.className.split(" ").filter(function(clazz){ return clazz !== "selected"; }).join(" ");
				}
			};
		} else {
			text2.className = "label";
			text2.innerHTML = "<h3>"+name+"</h3>";
		}
		
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


