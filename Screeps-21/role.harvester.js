// main role
var roleHarvester = {


  // just run it
  /** @param {Creep} creep **/
  run: function(creep, debugging = 2) {

    // variables
    var sourceId = funcCreeps.sourceCheck(creep);
    var depositId = funcCreeps.depositCheck(creep);

    // mine
    if (creep.store.getFreeCapacity() > 0){
      // source unavailable
      if (sourceId === undefined) {
        // sleep TODO
        if (debugging >= 2) creep.say("😴");
        return;
      }

      // variables
      var source = Game.getObjectById(sourceId);
      var dist = creep.pos.getRangeTo(source);

      // just harvest
      if (dist <= 1){
        creep.harvest(source);
        if (debugging >= 2) creep.say("🌾");
      }

      // move
      else{
        creep.moveTo(source);
        if (debugging >= 2) creep.say("🌾");
      }

    }

    // haul back
    else {
      // deposit unavailable
      if (depositId === undefined) {
        // sleep TODO
        if (debugging >= 2) creep.say("😴");
        return;
      }

      // variables
      var deposit = Game.getObjectById(depositId);
      var dist = creep.pos.getRangeTo(deposit);

      // just transfer
      if (dist <= 1){
        creep.transfer(deposit, RESOURCE_ENERGY);
        if (debugging >= 2) creep.say("📤");
      }

      // move
      else{
        creep.moveTo(deposit);
        if (debugging >= 2) creep.say("📤");
      }
    }
	}
};

module.exports = roleHarvester;
