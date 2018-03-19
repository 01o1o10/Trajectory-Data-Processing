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
		var tolerans = ($('#tolerans').val())/166985;
		var veri = {tol: tolerans, path: latlong};
		socket.emit("indirgeme", veri);
		socket.on("indirgenmisveri", function(data){

			var simplelatlong = data.ll;
			var indigemeorani = data.oran;
			var sure = data.sure;

			$('#msg').text("Indirgeme oranı: " + indigemeorani);
			$('#msg').append("</br>Indirgeme süresi: " + sure);

			color = "green";
			var flightPath = new google.maps.Polyline({
				path: simplelatlong,
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
		
		var sinir = {top: 0, buttom: 0, left: 0, right: 0};
		if(click1.lat > click2.lat){
			sinir.top = click1.lat;
			sinir.buttom = click2.lat;
		} else {
			sinir.top = click2.lat;
			sinir.buttom = click1.lat;
		}
		if(click1.lng > click2.lng){
			sinir.left = click2.lng;
			sinir.right = click1.lng;
		} else {
			sinir.right = click2.lng;
			sinir.left = click1.lng;
		}
		
		var veri = {path: latlong, sinirlar: sinir};
		socket.emit("alansorgulama", veri);
		socket.on("sorgusonucu", function(data){
			alert("veri geldi");
		});
	});
});

var clickcounter = 0;
var click1, click2;

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


	google.maps.event.addListener(map, 'click', function( event ){
		clickcounter++;
		if(clickcounter == 1){
			click1 = {lat: event.latLng.lat(), lng: event.latLng.lng()};
		}
		else if(clickcounter == 2){
			click2 = {lat: event.latLng.lat(), lng: event.latLng.lng()};
			clickcounter = 0;
		}
	});

	flightPath.setMap(map);
}

