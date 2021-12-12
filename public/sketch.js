//let clientSocket = io();
let clientSocket;
let myColor = "white";

function preload() {
  clientSocket = io();

  //quando mi connetto eseguo la funzione newConnection
  // in adavnced sketch: new Connection is called connectFunction instead
  clientSocket.on("connect", connectFunction);
  clientSocket.on("welcome", welcomeFunction);
  //quando invece ricevi un messaggio...
  // in adavnced sketch: newBrtoadcast is called mouseBroadcastFunction instead
  clientSocket.on("mouseBroadcast", mouseBroadcastFunction);
  clientSocket.on("newUser", newUserFunction);
}

//la funzione newConnection console logga il mio id
// in adavnced sketch: new Connection is called connectFunction instead
function connectFunction() {
  console.log("your id:", clientSocket.id);
}

function welcomeFunction(data) {
  myColor = data;
  fill(myColor);
  textAlign(CENTER);
  text("Welcome " + clientSocket.id, width / 2, height / 2);
}

//quando ricevo data (il messaggio degli altri inviato a me passando per il server), console.logga data
// in adavnced sketch: newBrtoadcast is called mouseBroadcastFunction instead
// in adavnced sketch:their data is called dataReceived instead
function mouseBroadcastFunction(dataReceived) {
  console.log(dataReceived);
  console.log("funziono");
  fill(dataReceived.color);
  console.log("crasho");
  circle(dataReceived.x, dataReceived.y, 10);
}

// when a new user connects, print a welcome text
// in adavnced sketch: newdata is called data instead
function newUserFunction(data) {
  fill(data.color);
  text("New user: " + data.id, width / 2, height / 2);
}

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  // draw contain my circle only in tha beginner version
  // in advanced, it's moved to MouseMoved, so I commented them out
  //fill("red");
  //circle(mouseX, mouseY, 20);
}

function mouseMoved() {
  fill(myColor);
  circle(mouseX, mouseY, 10);

  //quando muovo il mouse creo automaticamente un messaggio contenente queste info al server
  let message = {
    id: clientSocket.id,
    x: mouseX,
    y: mouseY,
  };
  //e poi lo mando: mouse è l'oggetto della mail, message il corpo.
  clientSocket.emit("mouse", message);
}
