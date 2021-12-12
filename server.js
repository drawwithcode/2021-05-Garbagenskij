console.log("up and running!!");

let express = require("express");

let app = express();
let port = 3000;
let server = app.listen(port);
console.log("Server is running on http://localhost:" + port);

app.use(express.static("public"));

let serverSocket = require("socket.io");
let io = serverSocket(server);

//quando accade l'evento connection: esegui la funzione newConnection
io.on("connection", newConnection);

//RICEVO
// per il momento: la funzione newConnection console.logga  newsocket
function newConnection(newSocket) {
  console.log(newSocket.id);
  //ora aggiungo il messaggio "mouse"
  //quando ricevo la mail con oggetto "mouse", eseguo la funzione Mouse Message
  newSocket.on("mouse", mouseMessage);
  //la funzione mouseMessage cosa fa? ...
  function mouseMessage(dataReceived) {
    //...prende i dati ricevuti e li console.logga...
    console.log(dataReceived);
    //MANDO
    //... e poi manda il messaggio con oggetto Mousebroadcast, e corpo dataReceived
    newSocket.broadcast.emit("mouseBroadcast", dataReceived);
  }
}
