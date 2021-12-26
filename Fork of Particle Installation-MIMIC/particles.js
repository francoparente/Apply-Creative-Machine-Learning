//Props to the p5 Particle system, developed from natureofcode.com 
//https://p5js.org/examples/simulate-particle-system.html

let system;
var x = 0;
var y = 0;
var dx = v/2;
var dy = -v/2
let colors, currentColor;
function setup() {
  var p5Canvas = createCanvas(720, 300);
  p5Canvas.parent('sketch-holder');
  system = new ParticleSystem(createVector(width / 2, 200));
  colors = [color('#0ED779'),color('#F79994'),color('#4D42EB')]
  currentColor = colors[0];
}

function draw() {
  x += dx;
  y += dy;
  if(x < 0 || x > width)
  {
    dx = -dx
  }

  if(y < 0 || y > height)
  {
    dy = -dy
  }
  background(51);
  system.addParticle(currentColor);
  system.run();
}