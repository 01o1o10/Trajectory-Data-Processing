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

    var veri = alg(latlong, tolerans);

    if(veri.length != latlong.length){
      socket.emit("indirgenmisveri", veri);
      console.log("veri başarıyla indirgendi");
    }
    else{
      console.log("veri indirgenmiyor");
    }
  });


  socket.on("alansorgulama", function(data){
    var path = data.path;
    var sinirlar = data.sinirlar;
    var kok = new qtree.kare();
    qtree.kokolustur(kok, 128, -128, -128, 128);
    agacolustur(kok, path);
    qtree.kapsayanalanbul(kok, sinirlar);
  });
});

var sayac = 0;

function agacolustur(kok, path){
  setTimeout(olustur(kok, path), 200);
}

function olustur(kok, path){
  if(path.length > sayac){
    qtree.addpoint(kok, path[sayac]);
    sayac++;
  }
}