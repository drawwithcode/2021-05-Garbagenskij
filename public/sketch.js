let clientSocket = io();
//quando mi connetto eseguo la funzione newConnection
clientSocket.on("connect", newConnection);
//quando invece ricevi un messaggio...
clientSocket.on("mouseBroadcast", newBroadcast);

//la funzione newConnection console logga il mio id
function newConnection() {
  console.log("my id is", clientSocket.id);
}

//quando ricevo data (il messaggio degli altri inviato a me passando per il server), console.logga data
function newBroadcast(data) {
  console.log(data);
  fill("blue");
  circle(data.x, data.y, 20);
}

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  fill("red");
  circle(mouseX, mouseY, 20);
}

function mouseMoved() {
  //quando muovo il mouse creo automaticamente un messaggio contenente queste info al server
  let message = {
    x: mouseX,
    y: mouseY,
  };
  //e poi lo mando: mouse è l'oggetto della mail, message il corpo.
  clientSocket.emit("mouse", message);
}
