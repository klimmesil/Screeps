// for console use
global.R = require("memoryReset").hardReset; // hardreset
global.D = function () { Memory.debugging = !Memory.debugging }; // toggle debug mode
global.F = require("logger").hardFlush;

// general use
global.clear = function () {
    console.log(
        "<script>angular.element(document.getElementsByClassName('fa fa-trash ng-scope')[0].parentNode).scope().Console.clear()</script>"
    );
};