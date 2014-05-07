/**
 * Change the LED light when the button is pressed
 */

var timeTillNext = 500;
var leds = [LED1, LED2, LED3];
var currentLedIndex = 0;

function clearLeds() {
  leds.forEach(function(led) {
    digitalWrite(led, false);
  });
}

function nextLed() {
  var currentLed = leds[currentLedIndex];
  var prevLedIndex = currentLedIndex;

  clearLeds();
  digitalWrite(currentLed, true);

  // Next light
  currentLedIndex = (currentLedIndex + 1) % leds.length;
}

function buttonWatcher(e) {
  var timeDiff = e.time - lastPress;
  lastPress = e.time;
  if (timeDiff > 0.1) {
    nextLed();
  }
}

setWatch(buttonWatcher, BTN, {edge:"falling", repeat:true});