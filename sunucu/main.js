const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.





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
 
io.sockets.on('connection', function (socket) {
  console.log("client sunucuya bağlandı");
    socket.on("test", function (data) {
      console.log("alınan veri yazdırılıyor");
      console.log(data);
      console.log("ham veri yazdırıldı");

      var veri = alg(data, 0.0000001);

      if(veri.length != data.length){
        verigonder(socket, veri);
        console.log("indirgenmis veri yazdırıldı");
      }
      else{
        console.log("veri indirgenmiyor");
      }
    });


    socket.on("kayfa", function(data){
      console.log(data);
    });
});


function verigonder(socket, das) {
  socket.emit("test", das);
}