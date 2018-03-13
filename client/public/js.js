$(document).ready(function(){
	const fs = require('fs');
	const socket = require('socket.io');
	latlong = [];
	$('#read-file').click(function(){
		var yol = document.getElementById('dosya').files[0].path;

		fs.readFile(yol, "utf8", function (err, data) {
			if (err) {
				alert('Error!!!');
				console.log(err);
			} else {
				alert('Dosya okunacak!');
				var ll = data.split("\n");
				for(var i = 6; i < ll.length-1; i++){
					var dizi = ll[i].split(",");
					var json = {lat: parseFloat(dizi[0]), lng: parseFloat(dizi[1])};
					latlong.push(json);
				}
				alert('Dosya okuma bitti!');
			}
		});
		$('set-map').css("display", "block");
	});

	$('#set-map').click(function(){
		$('sifirla').css("display", "block");
		initMap();
	});

	$('#sifirla').click(function(){
		latlong = [];
		initMap();
	});

	$('#indirge').click(function(){
	    var socket = io.connect("http://localhost:1111");
	    socket.emit("test", latlong);
	    alert("ham veri gonderildi");
	});

});

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: latlong[0],
		mapTypeId: 'terrain'
	});

	var flightPath = new google.maps.Polyline({
		path: latlong,
		geodesic: true,
		strokeColor: '#ff0000',
		strokeOpacity: 1.0,
		strokeWeight: 3
	});

	flightPath.setMap(map);
}
