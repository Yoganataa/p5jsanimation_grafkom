let bgImg;
let signalImg;
let teksImg;
let handImg;
let handVisible = true;

let signalBlink = true;
let teksOpacity = 0;
let teksY = 0;
let teksDir = 1;
let handY = 0;
let handDir = 1;

function preload() {
  bgImg = loadImage('background.jpg');
  signalImg = loadImage('signal.png');
  teksImg = loadImage('teks.png');
  handImg = loadImage('hand.png');
}

function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);
  setInterval(blinkSignal, 2000); // Ubah durasi efek signal menjadi 2 detik
  setInterval(fadeInOutTeks, 5000); // Ubah durasi efek teks menjadi 5 detik
}

function draw() {
  image(bgImg, width / 2, height / 2);

  if (signalBlink) {
    image(signalImg, width / 2, height / 2);
  }

  if (handVisible) { // Tampilkan gambar 'hand.png' ketika handVisible true
    tint(255, 255);
    image(handImg, width / 3 - handImg.width / 2, height / 2 + handY, handImg.width, handImg.height);
    noTint();
  }

  tint(255, teksOpacity);
  image(teksImg, width / 2, height / 2 + teksY, teksImg.width, teksImg.height);
  noTint();

  drawMovingHand();
}

function blinkSignal() {
  signalBlink = !signalBlink;
}

function fadeInOutTeks() {
  let duration = 5; // Ubah durasi efek menjadi 5 detik
  let steps = 10; // jumlah langkah dalam animasi (semakin besar, semakin halus)
  let stepSize = 100 / steps;
  let fadeIn = true;

  let currentStep = 0;
  let interval = setInterval(function() {
    if (fadeIn) {
      teksOpacity = stepSize * currentStep;
    } else {
      teksOpacity = 100 - stepSize * currentStep;
    }
    currentStep++;
    if (currentStep > steps) {
      fadeIn = !fadeIn;
      currentStep = 0;
      if (!fadeIn) {
        clearInterval(interval);
        setTimeout(fadeInOutTeks, 1000); // Waktu jeda sebelum memulai efek berikutnya
      }
    }
  }, (duration * 1000) / steps); // Ubah ke dalam milisekon (1000 ms = 1 detik)
}

function drawMovingHand() {
  let radius = 8;
  let smoothness = 0.5;

  handY += handDir * smoothness;
  if (handY > radius || handY < -radius) {
    handDir *= -1;
  }

  image(handImg, width / 2, height / 2 + handY);
}
