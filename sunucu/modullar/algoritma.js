"use strict";

const per = require("./perpendicular");

function rdp(points, epsilon) {
	var i,
		maxIndex = 0,
		maxDistance = 0,
		perpendicularDistance,
		leftRecursiveResults, rightRecursiveResults,
		filteredPoints;
	// find the point with the maximum distance
	for (i = 2; i < points.length - 1; i++) {
		perpendicularDistance = per.findPerpendicularDistance(points[i], [points[1], points[points.length - 1]]);
		if (perpendicularDistance > maxDistance) {
			maxIndex = i;
			maxDistance = perpendicularDistance;
		}
	}
	// if max distance is greater than epsilon, recursively simplify
	if (maxDistance <= epsilon) {
		leftRecursiveResults = rdp(points.slice(1, maxIndex), epsilon);
		rightRecursiveResults = rdp(points.slice(maxIndex), epsilon);
		filteredPoints = leftRecursiveResults.concat(rightRecursiveResults);
	} else {
		filteredPoints = points;
	}
	return filteredPoints;
}

module.exports = rdp;