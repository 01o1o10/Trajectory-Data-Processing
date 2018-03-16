"use strict";

module.exports = {kare: 
	function(sinirlar, point, childrens, parent){
		this.sinirlar = sinirlar;
		this.point = point;
		this.childrens = childrens;
		this.parent = parent;
	},

	kokolustur: function(kok, stop, sbuttom, sleft, sright){
		kok.sinirlar = {top: stop, buttom: sbuttom, left: sleft, right: sright};
	},

	addpoint: function(tree, point){
		var hedefkare = this.karedondur(tree, point);
		if(hedefkare == undefined){
			console.log("undefinid ile karşilaştim");
		}

		if(hedefkare.point == undefined){
			hedefkare.point = point;
		}
		else{
			this.cocukolustur(hedefkare);
			this.addpoint(hedefkare, hedefkare.point);
			hedefkare.point = undefined;
			console.log("//////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
			console.log(hedefkare);
			this.addpoint(hedefkare, point);
		}
	},

	karedondur: function(tree, point){
		if(tree.childrens != undefined){
			if(tree.childrens.kb.sinirlar.top > point.lat && tree.childrens.kb.sinirlar.buttom < point.lat && tree.childrens.kb.sinirlar.right > point.lng && tree.childrens.kb.sinirlar.left < point.lng){
				tree = this.karedondur(tree.childrens.kb, point);
			}
			else if(tree.childrens.kd.sinirlar.top > point.lat && tree.childrens.kd.sinirlar.buttom < point.lat && tree.childrens.kd.sinirlar.right > point.lng && tree.childrens.kd.sinirlar.left < point.lng){
				tree = this.karedondur(tree.childrens.kd, point);
			}
			else if(tree.childrens.gb.sinirlar.top > point.lat && tree.childrens.gb.sinirlar.buttom < point.lat && tree.childrens.gb.sinirlar.right > point.lng && tree.childrens.gb.sinirlar.left < point.lng){
				tree = this.karedondur(tree.childrens.gb, point);
			}
			else if(tree.childrens.gd.sinirlar.top > point.lat && tree.childrens.gd.sinirlar.buttom < point.lat && tree.childrens.gd.sinirlar.right > point.lng && tree.childrens.gd.sinirlar.left < point.lng){
				tree = this.karedondur(tree.childrens.gd, point);
			}
			return tree;
		}
		else{
			return tree;
		}
	},

	cocukolustur: function(parentkare){
		parentkare.childrens = {kd: new this.kare(), kb: new this.kare(), gd: new this.kare(), gb: new this.kare()};
		parentkare.childrens.kd.parent = parentkare;
		parentkare.childrens.kb.parent = parentkare;
		parentkare.childrens.gd.parent = parentkare;
		parentkare.childrens.gb.parent = parentkare;
		parentkare.childrens.kd.sinirlar = {top: parentkare.sinirlar.top, buttom: (parentkare.sinirlar.top + parentkare.sinirlar.buttom)/2, right: parentkare.sinirlar.right, left: (parentkare.sinirlar.left + parentkare.sinirlar.right)/2};
		parentkare.childrens.kb.sinirlar = {top: parentkare.sinirlar.top, buttom: (parentkare.sinirlar.top + parentkare.sinirlar.buttom)/2, right: (parentkare.sinirlar.right + parentkare.sinirlar.left)/2, left: parentkare.sinirlar.left};
		parentkare.childrens.gd.sinirlar = {top: (parentkare.sinirlar.top + parentkare.sinirlar.buttom)/2, buttom: parentkare.sinirlar.buttom, right: parentkare.sinirlar.right, left: (parentkare.sinirlar.left + parentkare.sinirlar.right)/2};
		parentkare.childrens.gb.sinirlar = {top: (parentkare.sinirlar.top + parentkare.sinirlar.buttom)/2, buttom: parentkare.sinirlar.buttom, right: (parentkare.sinirlar.left + parentkare.sinirlar.right)/2, left: parentkare.sinirlar.left};
	},

	kapsayanalanbul: function(tree, sinirlar){
		if(tree.childrens !== undefined){
			if(tree.childrens.kb.sinirlar.top > sinirlar.top && tree.childrens.kb.sinirlar.buttom < sinirlar.buttom && tree.childrens.kb.sinirlar.right > sinirlar.right && tree.childrens.kb.sinirlar.left < sinirlar.left){
				tree = this.kapsayanalanbul(tree.childrens.kb, sinirlar);
			}
			else if(tree.childrens.kd.sinirlar.top > sinirlar.top && tree.childrens.kd.sinirlar.buttom < sinirlar.buttom && tree.childrens.kd.sinirlar.right > sinirlar.right && tree.childrens.kd.sinirlar.left < sinirlar.left){
				tree = this.kapsayanalanbul(tree.childrens.kd, sinirlar);
			}
			else if(tree.childrens.gb.sinirlar.top > sinirlar.top && tree.childrens.gb.sinirlar.buttom < sinirlar.buttom && tree.childrens.gb.sinirlar.right > sinirlar.right && tree.childrens.gb.sinirlar.left < sinirlar.left){
				tree = this.kapsayanalanbul(tree.childrens.gb, sinirlar);
			}
			else if(tree.childrens.gd.sinirlar.top > sinirlar.top && tree.childrens.gd.sinirlar.buttom < sinirlar.buttom && tree.childrens.gd.sinirlar.right > sinirlar.right && tree.childrens.gd.sinirlar.left < sinirlar.left){
				tree = this.kapsayanalanbul(tree.childrens.gd, sinirlar);
			}
			else{
				return tree;
			}
			return tree;
		}
		else{
			return tree;
		}
	}
}