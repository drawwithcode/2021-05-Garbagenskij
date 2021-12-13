console.log("up and running!!!");

let express = require("express");

let app = express();
let port = process.env.PORT || 3000;
let server = app.listen(port);
console.log("Server is running on http://localhost:" + port);

app.use(express.static("public"));

let serverSocket = require("socket.io");
let io = serverSocket(server);

//quando accade l'evento connection: esegui la funzione newConnection
io.on("connection", newConnection);

// creo l'oggetto che accoppierà alla key "id" il value "random(0,7"
let userIdentifiers = {};

//  la funzione newConnection console.logga  newsocket
function newConnection(newSocket) {
  //console.log(newSocket);
  console.log("new connection:", newSocket.id);

  //genero il numero random tra 0 e 7 (a ogni numero corrisponde una "versione" dello sketch)
  var newIdentifier = Math.floor(Math.random() * 7);
  console.log(newIdentifier);
  //aggiungo all'oggetto userIdentifier una key che ha lo stesso nome dell'id, a cui attribuisco il value random tra 0 e 7 generato con newIdentifier
  userIdentifiers[newSocket.id] = newIdentifier;

  // mando a *quel* client il suo numero random tra 0 e 7( "to" e "in" sono lo stesso secondo https://socket.io/docs/v4/rooms/??)
  io.to(newSocket.id).emit("welcome", newIdentifier);

  //ora aggiungo il messaggio "mouse"
  //quando ricevo la mail con oggetto "mouse", eseguo la funzione Mouse Message
  newSocket.on("mouse", mouseMessage);

  // la callback function viene eseguita quando ricevo "mouse"
  //la funzione mouseMessage cosa fa? ...
  function mouseMessage(dataReceived) {
    //...prende i dati ricevuti e li console.logga...
    console.log("dati ricevuti", dataReceived);
    // ... aggiunge il valore randomico tra 0 e 7 ai dati ricevuti
    dataReceived.identifier = userIdentifiers[dataReceived.id];
    //... li ri-console-logga
    console.log("dati aggiornati", dataReceived);
    //... e poi manda il messaggio con oggetto Mousebroadcast, e corpo dataReceived
    newSocket.broadcast.emit("mouseBroadcast", dataReceived);
  }
}
