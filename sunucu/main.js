//Socket

var http = require("http");
	 
var server = http.createServer(processRequest).listen(1111, "127.0.0.1");
 
function processRequest(request, response) {
     
    response.write("Sunucu");
 
    response.end();
 
}
 
var io = require("socket.io").listen(server);
const alg = require("./modullar/algoritma");
const qtree = require("./modullar/quadtree");

 
io.sockets.on('connection', function (socket) {

  console.log("client sunucuya bağlandı");

  socket.on("indirgeme", function (data) {
    var latlong = data.path;
    var tolerans = data.tol;

    var date = new Date();
    var d1, d2;
    
    d1 = date.getTime();
    var simplelatlong = alg.rdp(latlong, tolerans);
    d2 = date.getTime();

    var indirgemesuresi = d2 - d1;
    var indirgemeorani = (1 - (simplelatlong.length/latlong.length))*100;
    var veri = {oran: indirgemeorani, ll: simplelatlong, sure: indirgemesuresi};
    socket.emit("indirgenmisveri", veri);
  });


  socket.on("alansorgulama", function(data){
    var path = data.path;
    sinirlar = data.sinirlar;
    var kok = new qtree.kare();
    qtree.kokolustur(kok, 128, -128, -128, 128);
    socket.emit("sorgusonucu", agacolustur(kok, path, sinirlar));
  });
});

var sinirlar;
var sorgu = [];

function agacolustur(kok, path, sinirlar){
  for(var i in path){
    qtree.karebul(kok, path[i]);
    if(i == path.length-1){
      return qtree.kapsayanalanbul(kok, sinirlar);
    }
  }
}