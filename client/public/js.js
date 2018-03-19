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
		var tolerans = ($('#tolerans').val())/1000000;
		var veri = {tol: tolerans, path: latlong};
		socket.emit("indirgeme", veri);
		socket.on("indirgenmisveri", function(data){

			simplelatlong = data.ll;
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
		var secim = $('select[name=secim]').val();
		var veri;
		if(secim == "ham"){
			veri = {path: latlong, sinirlar: sinir};
		}
		else{
			veri = {path: simplelatlong, sinirlar: sinir};
		}
		socket.emit("alansorgulama", veri);
		socket.on("sorgusonucu", function(data){
			alert("Nokta sayısı: " + data.length);
			for(var i in data){
				addMarker(data[i]);
			}
		});

		
		function addMarker(location) {
			// Add the marker at the clicked location, and add the next-available label
			// from the array of alphabetical characters.
			var marker = new google.maps.Marker({
			  position: location,
			  map: map
			});
		}
	});
});

var marker;
var map;
var simplelatlong;
var sinir = {top: 0, buttom: 0, left: 0, right: 0};
var clickcounter = 0;
var click1, click2;

function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
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
			
			marker = new google.maps.Marker({
				position: click1,
				map: map,
				title: 'A'
			});
		}
		else if(clickcounter == 2){
			click2 = {lat: event.latLng.lat(), lng: event.latLng.lng()};

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

			var rectangle = new google.maps.Rectangle({
				strokeColor: '#0000FF',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#00FF00',
				fillOpacity: 0.20,
				map: map,
				bounds: {
				north: sinir.top,
				south: sinir.buttom,
				east: sinir.right,
				west: sinir.left
				}
			});

			marker.setMap(null);
			rectangle.setMap(map);
			clickcounter = 0;
		}
	});

	flightPath.setMap(map);
}

