//*code for module A: entry sensor

digitalWrite(A5,1); //initialize sound off
var sdist = 170; //initialize to range
var sens1 = require("HC-SR04").connect(A8, B7, function(dist) { //trig,echo
    sdist = Math.round(dist);
  });

function untrigger() {
  digitalWrite(A5,1);
  digitalWrite(LED1,0);
}

function trigger() {
  digitalWrite(A5,0);
  digitalWrite(LED1,1);
  setTimeout(untrigger,5000);
}

function senscheck() {
 sens1.trigger();
 console.log(sdist);
  if ((sdist<160)||(sdist>250)) { //distance to wall
    setTimeout(trigger,100); //delay before sound
  }
}

setInterval(senscheck,100);
