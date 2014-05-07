/**
 * Rotate the LED lights
 */

var timeTillNext = 500;
var leds = [LED1, LED2, LED3];
var currentLedIndex = 0;

function nextLed() {
  var currentLed = leds[currentLedIndex];
  var prevLedIndex = currentLedIndex;

  leds.forEach(function(led) {
    digitalWrite(led, false);
  });

  digitalWrite(currentLed, true);

  // Next light
  currentLedIndex = (currentLedIndex + 1) % leds.length;
}

setInterval(nextLed, timeTillNext);