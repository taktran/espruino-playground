"use strict";

/**
 * Change the LED light when the button is pressed
 */

var leds = [LED1, LED2, LED3];
var currentLedIndex = 0;

function clearLeds() {
  leds.forEach(function(led) {
    digitalWrite(led, false);
  });
}

function nextLed() {
  var currentLed = leds[currentLedIndex];

  clearLeds();
  digitalWrite(currentLed, true);

  // Next light
  currentLedIndex = (currentLedIndex + 1) % leds.length;
}

function buttonWatcher(e) {
  nextLed();
}

setWatch(buttonWatcher, BTN, {
  edge: "falling",
  repeat: true,
  debounce: 50
});