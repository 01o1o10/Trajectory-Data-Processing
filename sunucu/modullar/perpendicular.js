"use strict";

exports.findPerpendicularDistance = function (point, line) {
	var pointX = point.lng,
		pointY = point.lat,
		lineStart = {
			x: line[0].lng,
			y: line[0].lat
		},
		lineEnd = {
			x: line[1].lng,
			y: line[1].lat
		},
		slope = (lineEnd.y - lineStart.y) / (lineEnd.x - lineStart.x),
		intercept = lineStart.y - (slope * lineStart.x),
		result;
	result = Math.abs(slope * pointX - pointY + intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
	return result;
}