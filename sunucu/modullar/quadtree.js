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
			/*if(tree.childrens.kb.sinirlar.top > point.lat && tree.childrens.kb.sinirlar.buttom < point.lat && tree.childrens.kb.sinirlar.right > point.lng && tree.childrens.kb.sinirlar.left < point.lng){
				this.karebul(tree.childrens.kb, point);
			}
			else if(tree.childrens.kd.sinirlar.top > point.lat && tree.childrens.kd.sinirlar.buttom < point.lat && tree.childrens.kd.sinirlar.right > point.lng && tree.childrens.kd.sinirlar.left < point.lng){
				this.karebul(tree.childrens.kd, point);
			}
			else if(tree.childrens.gb.sinirlar.top > point.lat && tree.childrens.gb.sinirlar.buttom < point.lat && tree.childrens.gb.sinirlar.right > point.lng && tree.childrens.gb.sinirlar.left < point.lng){
				this.karebul(tree.childrens.gb, point);
			}
			else if(tree.childrens.gd.sinirlar.top > point.lat && tree.childrens.gd.sinirlar.buttom < point.lat && tree.childrens.gd.sinirlar.right > point.lng && tree.childrens.gd.sinirlar.left < point.lng){
				this.karebul(tree.childrens.gd, point);
			}*/
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

		/*parentkare.childrens = {kd: new this.kare(), kb: new this.kare(), gd: new this.kare(), gb: new this.kare()};
		parentkare.childrens.kd.parent = parentkare;
		parentkare.childrens.kb.parent = parentkare;
		parentkare.childrens.gd.parent = parentkare;
		parentkare.childrens.gb.parent = parentkare;*/

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
			console.log(tree.point);
		}
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