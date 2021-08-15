// functions
var funcControl = require("func.control");
var funcCreeps = require("func.creeps");
var funcStruct = require("func.struct");

// main role
var roleHauler = {
  run: function(creep, debugging = 2){

    // VARIABLES
    var room = creep.room;

    // store
    var freeCapacity = creep.store.getFreeCapacity();
    var usedCapacity = creep.store.getUsedCapacity(RESOURCE_ENERGY);

    // givers TODO
    var givers = funcStruct.getGivers(room);

    // requesters TODO
    var requesters = funcStruct.getRequesters(room);


    // if empty, refill
    if (usedCapacity === 0 && givers.length !== 0) {
      // chose giver TODO
      var giver = givers[0];

      var distance = creep.pos.getRangeTo(giver);

      // move to giver
      if (distance > 1){
        creep.moveTo(giver);
        if (debugging >= 2) creep.say("⚡");
      }

      // take from giver
      else {
        if (giver.amount !== undefined) creep.pickup(giver);
        else creep.withdraw(giver, RESOURCE_ENERGY);
        if (debugging >= 2) creep.say("⚡");
      }
    }

    // else go fill others
    else if (requesters.length !== 0) {
      // chose requester TODO
      var requester = requesters[0];

      var distance = creep.pos.getRangeTo(requester);

      // move to requester
      if (distance > 1){
        creep.moveTo(requester);
        if (debugging >= 2) creep.say("⚡");
      }

      // take from requester
      else {
        creep.transfer(requester, RESOURCE_ENERGY);
        if (debugging >= 2) creep.say("⚡");
      }
    }

    // extra fill dude
    else if (freeCapacity !== 0) {
      // chose giver TODO
      var giver = givers[0];

      var distance = creep.pos.getRangeTo(giver);

      // move to giver
      if (distance > 1){
        creep.moveTo(giver);
        if (debugging >= 2) creep.say("⚡");
      }

      // take from giver
      else {
        if (giver.amount !== undefined) creep.pickup(giver);
        else creep.withdraw(giver, RESOURCE_ENERGY);
        if (debugging >= 2) creep.say("⚡");
      }
    }

    else{
      // sleep TODO
      if (debugging >= 2) creep.say("😴");
      return;
    }
      console.log("yep");
  }
};

module.exports = roleHauler;
