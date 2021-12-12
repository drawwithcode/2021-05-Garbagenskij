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

// per il momento: la funzione newConnection console.logga  newsocket
function newConnection(newSocket) {
  console.log(newSocket.id);
}
