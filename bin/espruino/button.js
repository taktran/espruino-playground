"use strict";

/**
 * Increment a counter when the button is pressed
 */
var pressCount = 0;

function buttonWatcher(e) {
  pressCount++;
  console.log(pressCount);
}

setWatch(buttonWatcher, BTN, {
  edge: "falling",
  repeat: true,
  debounce: 100
});