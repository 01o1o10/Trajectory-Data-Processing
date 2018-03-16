"use strict";

module.exports = function rdp(points, epsilon){
	var i,
		maxIndex = 0,
		maxDistance = 0,
		dist,
		leftRecursiveResults, rightRecursiveResults,
		filteredPoints = [];
	// find the point with the maximum distance
	/*for (i = 2; i < points.length - 1; i++) {
		dist = finddist(points[i], [points[1], points[points.length - 1]]);
		if (dist > maxDistance) {
			maxIndex = i;
			maxDistance = dist;
		}
	}*/
	for(i = 1; i < points.length-1; i++) {
		dist = finddist(points[i], [points[0], points[points.length - 1]]);
		if(dist > maxDistance){
			maxDistance = dist;
			maxIndex = i;
		}
	}
	// if max distance is greater than epsilon, recursively simplify
	if (maxDistance >= epsilon) {
		leftRecursiveResults = rdp(points.slice(1, maxIndex), epsilon);
		rightRecursiveResults = rdp(points.slice(maxIndex), epsilon);
		filteredPoints = leftRecursiveResults.concat(rightRecursiveResults);
	} else {
		filteredPoints.push(points[0], points[points.length-1]);
	}
	return filteredPoints;
}

function finddist(point, line) {
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

		/*slope = (lineEnd.y - lineStart.y) / (lineEnd.x - lineStart.x),
		intercept = lineStart.y - (slope * lineStart.x),
		result;
	result = Math.abs(slope * pointX - pointY + intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
	return result;*/
}