// < Variables
var roles = {
  builder: require("role.builder"),
  harvester: require("role.harvester"),
  hauler: require("role.hauler"),
  miner: require("role.miner"),
  upgrader: require("role.upgrader")
};

var debugs = {
  "harvester" : 1,
  "miner" : 2,
  "hauler" : 2
}
// >

// < Functions
var funcCreeps = require("func.creeps");
// >

var funcPrototyping = {

  // < creeps
  creeps: function(){
    // < run
    Creep.prototype.run = function(debug = null){
      var role = this.memory.role;

      // jobless
      if (!debugs[role] || !roles[role]) return null;

      // job exists
      if (debug === null) debug = debugs[role];

      roles[role].run(this, debug);
    }
    // >

    // < sleep
    Creep.prototype.sleep = function(){
      funcCreeps.sleep(this);
    }
    // >

  }
  // >

};

module.exports = funcPrototyping;
