"use strict";

module.exports = {rdp: function(points, epsilon, calback){
	var i,
		maxIndex = 0,
		maxDistance = 0,
		dist,
		leftRecursiveResults, rightRecursiveResults,
		filteredPoints = [];
	for(i = 1; i < points.length-1; i++) {
		dist = this.finddist(points[i], [points[0], points[points.length - 1]]);
		if(dist > maxDistance){
			maxDistance = dist;
			maxIndex = i;
		}
	}
	// if max distance is greater than epsilon, recursively simplify
	if (maxDistance >= epsilon) {
		leftRecursiveResults = this.rdp(points.slice(0, maxIndex), epsilon);
		rightRecursiveResults = this.rdp(points.slice(maxIndex), epsilon);
		filteredPoints = leftRecursiveResults.concat(rightRecursiveResults);
	} else {
		filteredPoints.push(points[0], points[points.length-1]);
	}
	return filteredPoints;
},

finddist: function(point, line) {
	var pointX = point.lng,
		pointY = point.lat,
		lineStart = {
			x: line[0].lng,
			y: line[0].lat
		},
		lineEnd = {
			x: line[1].lng,
			y: line[1].lat
		};
		var l = Math.sqrt(Math.pow((lineEnd.x-lineStart.x), 2) + Math.pow((lineEnd.y-lineStart.y), 2));
		var r = Math.sqrt(Math.pow((pointX-lineStart.x), 2) + Math.pow((pointY-lineStart.y), 2));

		var alpha = Math.asin((lineEnd.y-lineStart.y)/l);
		var betta = Math.asin((pointY-lineStart.y)/r);

		var gamma = Math.abs(alpha - betta);

		var sapma = Math.sin(gamma/180)*r;

		return sapma;
	}
}