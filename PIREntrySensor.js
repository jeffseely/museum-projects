//*code for module A: entry sensor.
//Using Espruino Pico R1_3 Firmware 1v95: https://www.espruino.com/Pico
//and PIR motion sensor: https://www.sparkfun.com/products/13285
//and Adafruit Audio FX Sound Board: https://www.adafruit.com/product/2133

//The following will need to be wrapped in a function onInit() {here} and save()'d to Pico.

digitalWrite(A5,1); //initialize sound off (trigger is low)
var oldTime = 0; //variables for tracking triggering frequency
var now = 0;
var ET = 0;

pinMode(A6,"input_pullup"); //set trigger pin - this is required for PIR
var i=0;
setWatch(function() {
  now = getTime();
  ET = now - oldTime;
  //i++;
  //console.log(i + " PIR " +ET);
  if (ET>10) { //motion triggers will be ignored for this many secs
    trigger();
  }
}, A6, {repeat: true, edge: "falling", debounce:300});

function untrigger() { //to keep soundbooard from repeating
  digitalWrite(A5,1);
  digitalWrite(LED1,0);
}

function trigger() {
  oldTime = now;
  digitalWrite(A5,0); //pulling pin low triggers sound
  digitalWrite(LED1,1);
  setTimeout(untrigger,5000);
}