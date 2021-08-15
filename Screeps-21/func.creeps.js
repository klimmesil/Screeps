var funcControl = require("func.control");
var manageLists = require("manage.lists");

var funcCreeps = {
  // Source check for miners and harvesters TRIGGERS EMERGENCY
  sourceCheck: function(creep){

    // if source, send it
    if (creep.memory.source !== undefined) {
      var source = Game.getObjectById(creep.memory.source);

      if (source === undefined){
        creep.memory.source = undefined;
        creep.memory.deposit = undefined;
      } else return creep.memory.source;
    }

    // COST
    manageLists.initializeMyStructures.all();
    manageLists.initializeNatural.sources();

    // if not make emergency
    Memory.emergencies.push({type: "miningSource", creepName: creep.name});
    funcControl.emergencyControl();

    return creep.memory.source;
  },

  // Deposit check for miners and harvesters CAN TRIGGER EMERGENCY                 COST
  depositCheck: function(creep){

    // if he has a deposit, no problem
    if (creep.memory.deposit !== undefined) return creep.memory.deposit;

    // COST
    manageLists.initializeMyStructures.all();
    manageLists.initializeNatural.sources();

    // harvester emergency
    if (creep.memory.role === "harvester"){
      Memory.emergencies.push({type: "spawnFill", creepName: creep.name});
      funcControl.emergencyControl();

      return creep.memory.deposit;
    }

    // miners
    Memory.emergencies.push({type: "miningContainer", creepName: creep.name, });
    funcControl.emergencyControl();
    return creep.memory.deposit;
  }

};

module.exports = funcCreeps;
