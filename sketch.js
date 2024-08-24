let vidRef, dejavu;
let asciiChars = `          '''"ia#░▒▓████`;
let portada = true;

function preload() {
  vidRef = createVideo("dino.mp4");
  dejavu = loadFont("./fonts/DejaVuSansMono.ttf");
}

function setup() {
  createCanvas(540, 960);
  windowResized()

  textFont(dejavu, 10);
  textAlign(CENTER, CENTER);
  frameRate(12);

  vidRef.pause();
  vidRef.hide();
}

function draw() {
  background(0);

  if (portada) {
    push();
    translate(270, 593);
    fill(255);
    textSize(50);
    text("CLICK", 0, 0);
    pop();
  } 

  image(vidRef, 456, 30);

  for (let iy = 96; iy > 0; iy--) {
    for (let jx = 54; jx > 0; jx--) {

      let rgba = get(456 + jx, 30 + iy);
      let luma = (rgba[0] + rgba[1] + rgba[2]) / 3;
      let posi = Math.floor((luma * asciiChars.length) / 255);

      if (iy == 13) {
        push();
        fill(0);
        rect(456, 84, 54, 42);
        pop();
      } 

      if (
        iy * 10 < 84 &&
        iy * 10 > 20 &&
        jx * 10 < 520 &&
        jx * 10 > 456
        ) continue;

      fill(255);
      text(asciiChars[posi], jx * 10, iy * 10);
    }
  } 
}


function mouseReleased() {
  portada = false;
  vidRef.loop();
}

function windowResized() {
  
  let pag = document.getElementsByTagName("body")[0];
  let cnv = document.getElementById("defaultCanvas0");
  
  // margen <== EDITABLE porcentaje entre 0% y 50%
  let mrg = 1; 
  
  // color de fondo <== EDITABLE pero mejor es hacerlo en css
  pag.style.backgroundColor = "rgb(40, 60, 60)";
  
  pag.style.overflow = "hidden";
  pag.style.display = "flex";
  pag.style.justifyContent = "center";
  pag.style.alignItems = "center";
  pag.style.height = "100svh";
 
  if (windowWidth * height > windowHeight * width) {
    cnv.style.height = (100 - mrg * 2) + "svh";
    cnv.style.width = ((100 - mrg * 2) / height) * width + "svh";
  }
  else {
    cnv.style.width = (100 - mrg * 2) + "vw";
    cnv.style.height = ((100 - mrg * 2) / width) * height + "vw";
  }
}