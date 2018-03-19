"use strict";

module.exports = {kare: 
	function(sinirlar, point, parent){
		this.sinirlar = sinirlar;
		this.point = point;
		this.childrens = [];
		this.parent = parent;
	},

	kokolustur: function(kok, stop, sbuttom, sleft, sright){
		kok.sinirlar = {top: stop, buttom: sbuttom, left: sleft, right: sright};
	},

	addpoint: function(hedefkare, point){
		if(hedefkare.point === undefined){
			hedefkare.point = point;
		}
		else{
			this.cocukolustur(hedefkare);
			this.karebul(hedefkare, hedefkare.point);
			hedefkare.point = undefined;
			this.karebul(hedefkare, point);
		}
	},

	karebul: function(tree, point){
		if(tree.childrens[1] !== undefined){
			for(var i in tree.childrens){
				if(tree.childrens[i].sinirlar.top > point.lat && tree.childrens[i].sinirlar.buttom < point.lat && tree.childrens[i].sinirlar.right > point.lng && tree.childrens[i].sinirlar.left < point.lng){
					this.karebul(tree.childrens[i], point);
					continue;
				}
			}
		}
		else{
			this.addpoint(tree, point);
		}
	},

	cocukolustur: function(parentkare){
		for(var i = 0; i < 4; i++){
			parentkare.childrens.push(new this.kare());
			parentkare.childrens[i].parent = parentkare;
		}

		parentkare.childrens[0].sinirlar = {top: parentkare.sinirlar.top, buttom: (parentkare.sinirlar.top + parentkare.sinirlar.buttom)/2, right: parentkare.sinirlar.right, left: (parentkare.sinirlar.left + parentkare.sinirlar.right)/2};
		parentkare.childrens[1].sinirlar = {top: parentkare.sinirlar.top, buttom: (parentkare.sinirlar.top + parentkare.sinirlar.buttom)/2, right: (parentkare.sinirlar.right + parentkare.sinirlar.left)/2, left: parentkare.sinirlar.left};
		parentkare.childrens[2].sinirlar = {top: (parentkare.sinirlar.top + parentkare.sinirlar.buttom)/2, buttom: parentkare.sinirlar.buttom, right: parentkare.sinirlar.right, left: (parentkare.sinirlar.left + parentkare.sinirlar.right)/2};
		parentkare.childrens[3].sinirlar = {top: (parentkare.sinirlar.top + parentkare.sinirlar.buttom)/2, buttom: parentkare.sinirlar.buttom, right: (parentkare.sinirlar.left + parentkare.sinirlar.right)/2, left: parentkare.sinirlar.left};
	},

	agacdolas: function(tree){
		for(var i in tree.childrens){
			this.agacdolas(tree.childrens[i]);
		}
		if(tree.point != undefined){
			this.points.push(tree.point);
		}
	},

	kapsayanalanbul: function(tree, sinirlar){
		if(tree.childrens[1] !== undefined){
			for(var i in tree.childrens){
				if(tree.childrens[i].sinirlar.top > sinirlar.top && tree.childrens[i].sinirlar.buttom < sinirlar.buttom && tree.childrens[i].sinirlar.right > sinirlar.right && tree.childrens[i].sinirlar.left < sinirlar.left){
					return this.kapsayanalanbul(tree.childrens[i], sinirlar);
					break;
				}
				else if(i == 3){
					return this.noktalaribul(tree, sinirlar);
				}
			}
		}
		else{
			return this.noktalaribul(tree, sinirlar);
		}
	},

	noktalaribul: function(tree, sinirlar){
		var sorgu = [];
		this.points = [];
		this.agacdolas(tree);
		for(var i in this.points){
			if(this.points[i].lat < sinirlar.top && this.points[i].lat > sinirlar.buttom && this.points[i].lng < sinirlar.right && this.points[i].lng > sinirlar.left){
				sorgu.push(this.points[i]);
			}
			if(i == this.points.length -1){
				return sorgu;
			}
		}

	},

	points: []
}