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

// creaet the object that will handle users colors
let userColors = {};

//RICEVO
// per il momento: la funzione newConnection console.logga  newsocket
function newConnection(newSocket) {
  console.log("new connection:", newSocket.id);

  // generate a random hex code
  let newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  // add the color to the userColor object
  // we will add a property named as the id of the client
  // and give as value the new color
  userColors[newSocket.id] = newColor;

  // send the color code (are "to" the same as "in" as written on https://socket.io/docs/v4/rooms/??)
  io.to(newSocket.id).emit("welcome", newColor);
  // tell to all the others that a new user connectd
  newSocket.broadcast.emit("newUser", { id: newSocket.id, color: newColor });

  //ora aggiungo il messaggio "mouse"
  //quando ricevo la mail con oggetto "mouse", eseguo la funzione Mouse Message
  // in adavnced server.js mouseMessage is called incomingMouseMessage Instead
  newSocket.on("mouse", mouseMessage);

  // callback function run when the "mouse" message is received
  //la funzione mouseMessage cosa fa? ...
  function mouseMessage(dataReceived) {
    //...prende i dati ricevuti e li console.logga...
    console.log(dataReceived);
    // add to the data the colour
    dataReceived.color = userColors[dataReceived.id];
    //MANDO
    //... e poi manda il messaggio con oggetto Mousebroadcast, e corpo dataReceived
    newSocket.broadcast.emit("mouseBroadcast", dataReceived);
  }
}
