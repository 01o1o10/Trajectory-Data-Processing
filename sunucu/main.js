//Socket

var http = require("http");
	 
var server = http.createServer(processRequest).listen(1111, "127.0.0.1");
 
function processRequest(request, response) {
    
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
 
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
    var simplelatlong = alg(latlong, tolerans);
    d2 = date.getTime();

    var indirgemesuresi = d2 - d1;
    var indirgemeorani = (1 - (simplelatlong.length/latlong.length))*100;
    var veri = {oran: indirgemeorani, ll: simplelatlong, sure: indirgemesuresi};
    socket.emit("indirgenmisveri", veri);
  });


  socket.on("alansorgulama", function(data){
    var path = data.path;
    var sinirlar = data.sinirlar;
    var kok = new qtree.kare();
    qtree.kokolustur(kok, 128, -128, -128, 128);
    agacolustur(kok, path, sinirlar);
  });
});


function agacolustur(kok, path, sinirlar){
  for(i in path){
    qtree.karebul(kok, path[i]);
    console.log("Veri indeksleniyor: " + Math.round((i/path.length)*100) + "%");
    if(i == path.length-1){
      console.log("bitti abi");
    }
  }
}