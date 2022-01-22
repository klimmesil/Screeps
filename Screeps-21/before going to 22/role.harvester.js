// < Variables
var funcCreeps = require("func.creeps");
// >

// < Main Role
var roleHarvester = {
  // < run: just run it
  run: function(creep, debug = 2) {
  try {
    // < Say job (debug = 2)
    if (debug == 2) creep.say("🌾");
    // >

    // < Try harvesting
    if (funcCreeps.harvest(creep)){
      if (debug == 1) creep.say("⚡🌾");
    }
    // >

    // < Try hauling
    else if (funcCreeps.haul(creep)){
      if (debug == 1) creep.say("📩🌾");
    }
    // >

    // < Sleep
    else {
      if (debug == 1) creep.say("📩🌾");
    }
    // >

  } catch (error) {
    // < Error catching
    var name = creep.name;
    console.log("<span style='color: red'>Harvester " + name + " catches exception");
    console.log("<span style='color: red'>"+error.stack);
    // >
  }
	}
  // >
};
// >

module.exports = roleHarvester;
