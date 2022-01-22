var funcCreeps = require("func.creeps");

var roleMiner = {
  run: function(creep, debugging = 2){
    /////////////////////////////////////////////////////////
    // variables ////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    var sourceId = funcCreeps.sourceCheck(creep);
    var depositId = funcCreeps.depositCheck(creep);

    var source = Game.getObjectById(sourceId);
    var container = Game.getObjectById(depositId);


    // no source
    if (sourceId === undefined) {
      // sleep TODO
      if (debugging >= 2) creep.say("😴");
      return;
    }

    /////////////////////////////////////////////////////////
    // BUGS /////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    // source bug REALLY TODO
    if (source in [null, undefined]){
      if (debugging >= 2) creep.say("🤯");
      console.log("got a bug " + creep.name + " source bug");
      creep.memory.source = undefined;
      creep.memory.deposit = undefined;
      return;
    }

    // deposit bug REALLY TODO
    if (depositId !== undefined && container in [null, undefined]){
      if (debugging >= 2) creep.say("🤯");
      console.log("got a bug " + creep.name + " deposit bug");
      creep.memory.source = undefined;
      creep.memory.deposit = undefined;
      return;
    }


    /////////////////////////////////////////////////////////
    // ACTIONS //////////////////////////////////////////////
    /////////////////////////////////////////////////////////
    // no container
    if (depositId === undefined) {

      var distance = creep.pos.getRangeTo(source);

      // lets mine
      if (distance === 1){
        creep.harvest(source);
        if (debugging >= 2) creep.say("⛏️");
      }

      // lets move
      else {
        creep.moveTo(source);
        if (debugging >= 2) creep.say("🏃🏻");
      }
    }

    // has a container
    else {
      var distance = creep.pos.getRangeTo(container);

      // you are on the container
      if (distance === 0){
        creep.harvest(source);
        if (debugging >= 2) creep.say("⛏️");
      }

      // move to the container
      else {
        creep.moveTo(container);
        if (debugging >= 2) creep.say("🏃🏻");
      }
    }
  }
};

module.exports = roleMiner;
