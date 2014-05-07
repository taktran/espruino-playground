"use strict";

/**
 * Pressure sensor
 */

var PRESSURE_SENSOR = A9;
var counter = 0;

function pressureSensorWatcher(e) {
  counter++;
  console.log("Press " + counter);
}

setWatch(pressureSensorWatcher, PRESSURE_SENSOR, {
  repeat: true,
  debounce: 20
});