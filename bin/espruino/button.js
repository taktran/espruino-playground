/**
 * Increment a counter when the button is pressed
 */
var pressCount = 0;

function onPress(timeDiff) {
  pressCount++;
  console.log(pressCount);
}

function buttonWatcher(e) {
  var timeDiff = e.time - lastPress;
  lastPress = e.time;
  if (timeDiff > 0.1) onPress(timeDiff);
}

setWatch(buttonWatcher, BTN, {edge:"falling", repeat:true});