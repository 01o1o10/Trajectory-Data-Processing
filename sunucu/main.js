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

  socket.on("test", function (data) {
    console.log("alınan veri yazdırılıyor");
    console.log(data);
    console.log("ham veri yazdırıldı");

    var veri = alg(data, 0.00001);

    if(veri.length != data.length){
      socket.emit("indirgenmisveri", veri);
      console.log("indirgenmis veri yazdırıldı");
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

function agacolustur(kok, path){
  for(point in path){
    qtree.addpoint(kok, path[point]);
  }
}