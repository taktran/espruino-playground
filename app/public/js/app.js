'use strict';

var _ = require("lodash");
var $ = require("jquery/dist/jquery");

// There's some code in here
_.each([1, 2, 3], function(val) {
  console.log(val);
});
console.log("go!", $("body"));
