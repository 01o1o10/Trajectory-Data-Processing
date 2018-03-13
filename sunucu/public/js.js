$(document).ready(function(){
	$('#ivg').click(function(){
	    var socket = io.connect("http://localhost:2222");
	    socket.emit("test", "indirgenmis veri");
	    alert("indirgenmis veri gonderildi");
	});
});





