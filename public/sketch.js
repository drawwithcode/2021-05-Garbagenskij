let clientSocket = io();
//quando mi connetto eseguo la funzione newConnection
clientSocket.on("connect", newConnection);

//la funzione newConnection console logga il mio id
function newConnection() {
  console.log(clientSocket.id);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 20);
}
