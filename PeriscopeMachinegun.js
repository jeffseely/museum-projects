//**code for module C: periscope machinegun

var pulser1 = null;
var count1 = 0; //counter for machine gun pulse
var gun0 = B4; //light for machine gun
var snd0 = A8; //machine gun

digitalWrite(snd0,1); //initializes to off
digitalWrite(gun0,1); //initializes to off

function delay(f,ms) {
  setTimeout(f,ms);
}

function pulse0(pulsems, num) {
  setTimeout(function() {
    digitalWrite(gun0,1);
  },pulsems);
  digitalWrite(gun0,0);
  count1+=1;
  //console.log(count1);
  if (count1>=num) {
    clearInterval(pulser1);
    count1 = 0;
  }
}

function repeater1() {
  //pulse length, pulse number, pulse interval
  pulser1 = setInterval("pulse0(30, 17)",90);
}

function s0on() { //triggers sound then turns off
  setTimeout("digitalWrite(snd0,1)",500);
  digitalWrite(snd0,0);
}

function firegun1() { //handles sound and light
  s0on();
  delay("repeater1()",100); //delay before repeated pulsing starts
}

//sensor functions

pinMode(A5, 'input_pulldown');
var delay2; //true or false depending on active or not

function report() { //this is just to report the state of OUT
  var v = digitalRead(A5); //A5 is the pin with the sensor OUT
  console.log(v);
}

function active() { //red on means active
  digitalWrite(LED1,1);
  digitalWrite(LED2,0);
  firegun1();
}

function inactive() { //green on means inactive
  digitalWrite(LED1,0);
  digitalWrite(LED2,1);
}

function onInit() {
setWatch(function() {
  if (delay2) { //aborts function if delay2 is on
    return;
  }
  setTimeout(active, 1000); //delay before gun fires
  delay2 = setTimeout(function() { //delay2 prevents rapid retriggering
    delay2 = undefined;
    inactive();
  }, 2000); //2000 is the length of delay2
}, A5, {repeat:true, edge:"rising"}); //A5 is the pin with the sensor OUT

//setInterval(report,1000); //this is just to console.log the state of OUT
}
