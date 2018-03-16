$(document).ready(function(){
	const fs = require('fs');
	const socket = require('socket.io');
	latlong = [];
	$('#set-map').click(function(){
		var yol = document.getElementById('dosya').files[0].path;

		fs.readFile(yol, "utf8", function (err, data) {
			if (err) {
				alert('Error!!!');
				console.log(err);
			} else {
				var ll = data.split("\n");
				for(var i = 6; i < ll.length-1; i++){
					var dizi = ll[i].split(",");
					var json = {lat: parseFloat(dizi[0]), lng: parseFloat(dizi[1])};
					latlong.push(json);
				}
			}
			color = 'red';
			initMap();
		});
	});

	$('#sifirla').click(function(){
		latlong = [];
		initMap();
	});

	$('#indirge').click(function(){
	    var socket = io.connect("http://localhost:1111");
		socket.emit("test", latlong);
		socket.on("indirgenmisveri", function(data){


			color = "green";
			var flightPath = new google.maps.Polyline({
				path: data,
				geodesic: true,
				strokeColor: color,
				strokeOpacity: 1.0,
				strokeWeight: 3
			});
			
			flightPath.setMap(map);
		});
	});

	$('#sorgula').click(function(){
		var socket = io.connect("http://localhost:1111");
		var sinir = {top: latlong[10].lat, buttom: latlong[20].lat, left: latlong[10].lng, right: latlong[20].lng};
		var veri = {path: latlong, sinirlar: sinir};
		socket.emit("alansorgulama", veri);
		socket.on("sorgusonucu", function(data){
			alert("veri geldi");
		});
	});

});

function initMap() {
		global.map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: latlong[0],
		mapTypeId: 'terrain'
	});

	var flightPath = new google.maps.Polyline({
		path: latlong,
		geodesic: true,
		strokeColor: color,
		strokeOpacity: 1.0,
		strokeWeight: 3
	});

	flightPath.setMap(map);
}