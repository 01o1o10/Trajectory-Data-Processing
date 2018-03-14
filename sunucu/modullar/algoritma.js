"use strict";

exports.indirge = function(latlong, tolerans){
	return latlong;
}

/*exports.indirge = function(hamveri, tolerans){
	var uzunluk = hamveri.length - 1;
	var basitveri =[];
	basitveri.push(hamveri[0]);

	for(var bas = 0; bas+2 <= uzunluk; ){
		var son = bas + 2;
		for(var nokta = bas + 1; nokta < son; nokta++){
			var l = Math.sqrt(Math.pow((hamveri[son].lat - hamveri[bas].lat), 2) + Math.pow((hamveri[son].lng - hamveri[bas].lng), 2));
			var r = Math.sqrt(Math.pow((hamveri[nokta].lat - hamveri[bas].lat), 2) + Math.pow((hamveri[nokta].lng - hamveri[bas].lng), 2));
			//console.log("l: " + l + "   r: " + r);

			var alpha = Math.asin(Math.abs(hamveri[son].lat - hamveri[bas].lat)/l);
			var betta = Math.asin(Math.abs(hamveri[nokta].lat - hamveri[bas].lat)/r);
			//console.log("alpha: " + alpha + "   betta: " + betta);


			var gamma = Math.abs(alpha - betta);

			var sapma = Math.sin(gamma/180) * r;
			//console.log("gamma: " + gamma + "   sapma: " + sapma);
			
			if(sapma > tolerans){
				basitveri.push(hamveri[nokta]);
				bas = nokta;
				break;
			}
			//console.log(basitveri);
			console.log("bas:  " + bas + " son:  " + son + " nokta: " + nokta);
		}
		if(son < uzunluk){
			son++;
		}
		else{
			break;
		}
	}
	basitveri.push(hamveri[uzunluk]);

	return basitveri;
}*/




function findPerpendicularDistance(point, line) {
	var pointX = point[0],
		pointY = point[1],
		lineStart = {
			x: line[0][0],
			y: line[0][1]
		},
		lineEnd = {
			x: line[1][0],
			y: line[1][1]
		},
		slope = (lineEnd.y - lineStart.y) / (lineEnd.x - lineStart.x),
		intercept = lineStart.y - (slope * lineStart.x),
		result;
	result = Math.abs(slope * pointX - pointY + intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
	return result;
}

function douglasPeucker(points, epsilon) {
	var i,
		maxIndex = 0,
		maxDistance = 0,
		perpendicularDistance,
		leftRecursiveResults, rightRecursiveResults,
		filteredPoints;
	// find the point with the maximum distance
	for (i = 2; i < points.length - 1; i++) {
		perpendicularDistance = findPerpendicularDistance(points[i], [points[1], points[points.length - 1]]);
		if (perpendicularDistance > maxDistance) {
			maxIndex = i;
			maxDistance = perpendicularDistance;
		}
	}
	// if max distance is greater than epsilon, recursively simplify
	if (maxDistance >= epsilon) {
		leftRecursiveResults = douglasPeucker(points.slice(1, maxIndex), epsilon);
		rightRecursiveResults = douglasPeucker(points.slice(maxIndex), epsilon);
		filteredPoints = leftRecursiveResults.concat(rightRecursiveResults);
	} else {
		filteredPoints = points;
	}
	return filteredPoints;
}