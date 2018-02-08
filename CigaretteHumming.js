//**code for module B: cigarette humming. This device has never been implemented.

RED1 = B4;
AMB1 = B6;
AMB2 = A8;

var i = 4;
var dir = -1;
var speed = 0.05;
var val = 0;
var runamberandom;
var runpulse;

function amberandom() {
  var level = Math.random()*val;
  analogWrite(AMB2,level);
}

function amberpulse() {
  if ((i>5.5)||(i<3.5)) dir = dir*-1;
  i = i + speed*dir;
  val = Math.sin(i)+1;
  analogWrite(AMB1,val);
}

function alloff() {
  analogWrite(RED1,0);
  analogWrite(AMB1,0);
  analogWrite(AMB2,0);
  clearInterval(runamberandom);
  clearInterval(runpulse);
}

alloff();
analogWrite(RED1,0.2); //this is the constant red background
runamberandom = setInterval(amberandom,100); //this causes flicker
runpulse = setInterval(amberpulse,100); //this causes pulse