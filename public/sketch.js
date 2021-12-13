//let clientSocket = io();
let clientSocket;

//VARIABILI SKETCH TORTA
let y;
let w;
//let randombg;

let ratio = 3 / 5;
let bigratio = 1 / 3;
let smallratio = 1 / 12;
let puls;
let m = 12;
//testo rotante
let sentence =
  "you are the icing on my cake you are the icing on my cake you are the icing on my cake ";
let sentenceArray = [];
let r; // raggio
let deg = 1; //rotazione
let theta = 0;

//testo stella
let STAR_sentencesArray = [
  "→ You are in charge of: blue ",
  "→ You are in charge of: green ",
  "→ You are in charge of: pink ",
  "→ You are in charge of: violet ",
  "→ You are in charge of: yellow ",
  "→ You are in charge of: spinkles ",
  "→ You are in charge of: cherries ",
];
let STAR_Sentence;
let STAR_sentenceArray = [];
let STAR_r = 75; // raggio
let STAR_deg = 0; //rotazione
let STAR_theta = 0;

let myDecorations = [];
let otherDecorations = [];

let myImageaArray = [];
let myBgColorsArray = [
  //blue
  "#00ACFC",
  //green
  "#23C23F",
  //pink
  "#FE6DB6",
  //violet
  "#B66DFF",
  //yellow
  "#F3C911",
  //orange
  "#FF994E",
  //red
  "#FD625E",
];

//superIndex sarà numero randomico tra 0 e 7 sul "generato" sul server. Ma per il momento è 0.
let superIndex = 0;
//superArray contiene la combo bg+image al click+ testo stella piccola per ciascuno identifier
let SuperArray = [];

function preload() {
  clientSocket = io();

  //quando mi connetto eseguo la funzione newConnection
  clientSocket.on("connect", connectFunction);
  clientSocket.on("welcome", welcomeFunction);
  //quando invece ricevi un messaggio...
  clientSocket.on("mouseBroadcast", mouseBroadcastFunction);
  //clientSocket.on("newUser", newUserFunction);

  cake = loadImage("./assets/cake.png");
  myImageaArray[0] = loadImage("./assets/blue.png");
  myImageaArray[1] = loadImage("./assets/green.png");
  myImageaArray[2] = loadImage("./assets/pink.png");
  myImageaArray[3] = loadImage("./assets/violet.png");
  myImageaArray[4] = loadImage("./assets/yellow.png");
  myImageaArray[5] = loadImage("./assets/sprinkle.png");
  myImageaArray[6] = loadImage("./assets/cherry.png");
}

//creo la claasse decorazioni con cui creo la MIA decorazione e pure quelle degli altri
class newDecoration {
  constructor(temp_x, temp_y, temp_image) {
    this.x = temp_x;
    this.y = temp_y;
    this.image = temp_image;
  }

  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);

    image(this.image, 0, 0);

    pop();
  }
}

//la funzione newConnection console logga il mio id
function connectFunction() {
  console.log("your id:", clientSocket.id);
}

//quando ricevo il messaggio welcome, che contiene il numero randomico attribuito a *questo* client, creo il superArray
function welcomeFunction(data) {
  superIndex = data;
  SuperArray = [
    myBgColorsArray[superIndex],
    myImageaArray[superIndex],
    STAR_sentencesArray[superIndex],
  ];
  console.log(SuperArray);
}

//quando ricevo data (il messaggio degli altri inviato a me passando per il server)
function mouseBroadcastFunction(dataReceived) {
  //... console.logga data: riconsoci che è un immagine?
  console.log(myImageaArray[dataReceived.identifier]);
  // yes...

  //... e pusha nel loro array le decorazioni che mi mandano gli altri
  // utilizzando la x e la y che mi hanno comunicato loro direttamente (sotto, con la funzione mousePressed comunicherò anche io la mia)
  // e l'identifier, che era statp attribuitogli dal server
  otherDecorations.push(
    new newDecoration(
      dataReceived.x,
      dataReceived.y,
      myImageaArray[dataReceived.identifier]
    )
  );
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  //Questo non mi serve più
  //superIndex = int(random(0, 7));

  background(SuperArray[0]);

  textAlign(CENTER);
  textSize(width / 55);
  STAR_Sentence = SuperArray[2];
  sentenceArray = sentence.split(""); // splita la stringa in un array di caratteri
  STAR_sentenceArray = STAR_Sentence.split("");

  print(sentenceArray, STAR_Sentence);
  puls = PI / 2;
}

function draw() {
  //resizo tutte le immagini
  for (u = 0; u < myImageaArray.length; u++) {
    myImageaArray[u].resize(smallratio * height, 0);
  }
  //il bg è il primo elemento del superArray, per tutte le "versioni" del siper array.
  background(SuperArray[0]);
  //mostro la torta
  imageMode(CENTER);
  cake.resize(height * ratio, 0);
  r = height * bigratio;
  image(cake, width / 2, height / 2);

  //testo rotante
  push();
  translate(width / 2, height / 2);
  push();

  rotate(radians(deg));
  for (let i = 0; i < sentenceArray.length; i++) {
    rotate((2 * PI) / sentenceArray.length); // rrotazione per il gruppo di lettere. Vi dipende lo spazio tra le lettere
    push();
    translate(r * sin(theta), r * cos(theta));
    rotate(PI); // rotazione per ciascuna lettera
    fill("white");
    noStroke();
    text(sentenceArray[i], 0, 0);
    pop();
  }
  pop();
  deg += 0.4;
  pop();

  //quelle che stanno nell'array, mostrale
  for (var i = 0; i < otherDecorations.length; i++) {
    console.log(otherDecorations[i]);
    otherDecorations[i].display();
  }

  //quelle che stanno nel mioarray, mostrale
  for (var i = 0; i < myDecorations.length; i++) {
    console.log(myDecorations[i]);
    myDecorations[i].display();
    //console.log("prova");
  }

  //star
  push();
  translate((width * 3) / 5, (height * 4) / 18);
  push();
  rotate(-frameCount / 100);
  star(0, 0, 110, 150, 30);
  pop();
  push();

  rotate(frameCount / 100);
  for (let j = 0; j < STAR_sentenceArray.length; j++) {
    rotate((2 * PI) / STAR_sentenceArray.length);
    push();
    translate(STAR_r * sin(STAR_theta), STAR_r * cos(STAR_theta));
    rotate(PI);
    noStroke();
    textSize(30);
    fill("White");
    text(STAR_sentenceArray[j], 0, 0);
    pop();
  }
  pop();

  pop();

  //diamante pulsante
  push();

  // diamante
  translate((width * 3) / 8, (height * 14) / 18);
  rotate(0.4 * PI);
  //fallo pulsare
  scale(1 * sin(puls));
  //scentralo
  scale(5);

  //fill
  fill(SuperArray[0]);
  noStroke();
  beginShape();

  curveVertex(-35, 0);
  curveVertex(-35, 0);
  curveVertex(-m, m);
  curveVertex(0, 35);
  curveVertex(0, 35);

  curveVertex(0, 35);
  curveVertex(0, 35);
  curveVertex(m, m);
  curveVertex(35, 0);
  curveVertex(35, 0);

  curveVertex(35, 0);
  curveVertex(35, 0);
  curveVertex(m, -m);
  curveVertex(0, -35);
  curveVertex(0, -35);

  curveVertex(0, -35);
  curveVertex(0, -35);
  curveVertex(-m, -m);
  curveVertex(-35, 0);
  curveVertex(-35, 0);

  endShape();

  //outline
  noFill();
  stroke("white");
  strokeWeight(width / 4000);

  beginShape();
  curveVertex(-35, 0);
  curveVertex(-35, 0);
  curveVertex(-m, m);
  curveVertex(0, 35);
  curveVertex(0, 35);
  endShape();
  beginShape();
  curveVertex(0, m);
  curveVertex(0, 35);
  curveVertex(m, m);
  curveVertex(35, 0);
  curveVertex(35, 0);
  endShape();
  beginShape();
  curveVertex(35, 0);
  curveVertex(35, 0);
  curveVertex(m, -m);
  curveVertex(0, -35);
  curveVertex(0, -35);
  endShape();
  beginShape();
  curveVertex(0, -35);
  curveVertex(0, -35);
  curveVertex(-m, -m);
  curveVertex(-35, 0);
  curveVertex(-35, 0);
  endShape();

  fill("white");
  rotate(-PI / 2);
  noStroke();
  textSize(6);
  text("It's a team work!", -19, -5, 40, 80);
  pop();

  if (puls <= (PI * 3) / 4) {
    puls += 0.03;
  } else {
    puls = PI / 4;
  }
}

function mousePressed() {
  if (dist(mouseX, mouseY, width / 2, height / 2) <= 0.8 * r) {
    myDecorations.push(new newDecoration(mouseX, mouseY, SuperArray[1]));

    //quando muovo il mouse creo automaticamente un messaggio contenente queste info
    let message = {
      id: clientSocket.id,
      x: mouseX,
      y: mouseY,
    };

    //e poi lo mando: mouse è l'oggetto della mail, message il corpo.
    clientSocket.emit("mouse", message);
    console.log(message.id);
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  // match il fill
  fill(SuperArray[0]);

  // uncomment per sparaflashing
  // fill(random(myBgColorsArray));

  stroke("white");
  strokeWeight(width / 800);
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
