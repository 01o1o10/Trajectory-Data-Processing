"use strict";

exports.indirge = function(hamveri, tolerans){
	var uzunluk = hamveri.length;
	var basitveri =[];

	for(bas = 0; bas+2 <= uzunluk; ){
		son = bas + 2;
		for(var nokta = bas + 1; nokta < son; nokta++){
			var l = Math.sqrt(Math.pow((hamveri[son].lat - hamveri[bas].lat), 2) + Math.pow((hamveri[son].lng - hamveri[bas].lng), 2));
			var r = Math.sqrt(Math.pow((hamveri[nokta].lat - hamveri[bas].lat), 2) + Math.pow((hamveri[nokta].lng - hamveri[bas].lng), 2));

			var alpha = Math.asin(Math.abs(hamveri[son].lat - hamveri[bas].lat)/l);
			var betta = Math.asin(Math.abs(hamveri[nokta].lat - hamveri[bas].lat)/r);

			var gamma = Math.abs(alpha - betta);

			var sapma = Math.sin(gamma/180) * r;
			
			if(sapma > tolerans){
				basitveri.push(hamveri[nokta]);
				bas = nokta;
			}
		}
	}
	basitveri.push(uzunluk);

	return basitveri;
}