// < Variables

var roles = {
  harvester: require("role.harvester")
};

var debugs = {
  "harvester" : 2,
  "miner" : 0,
  "hauler" : 0
}

// >
// < Functions

var funcControl = require("func.control");
var funcCreeps = require("func.creeps");
var funcStruct = require("func.struct");
var funcDebug = require("func.debug");
var manageLists = require("manage.lists");
var manageCrew = require("manage.crew");
var funcPrototyping = require("func.prototyping");

//>
// < Prototyping

funcPrototyping.creeps();

// >

// < Initializing

// >

// < DEBUG:
console.log("<span style='color: blue'>RESET DONE ON TICK " + Game.time);
// >

// < Main
module.exports.loop = function(){
try {
  // < DEBUG:

  console.log("<span style='color: green'>_____________" + Game.time + "___________");

  // >

  // < Creeps fooling around

  for (var name in Game.creeps){
    var creep = Game.creeps[name];
    creep.run();
  }

  // >

  // < Extra not necessary
  // console.log(Game.cpu.generatePixel());
  // >
} catch (error) {
  // < Error catching
  console.log("<span style='color: red'>Main catches exception");
  console.log("<span style='color: red'>" + error.stack);
  // >
}
}
// >
