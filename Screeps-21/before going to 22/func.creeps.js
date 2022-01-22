var funcStruct = require("func.struct");
var funcDebug = require("func.debug");

var funcCreeps = {
  // < sleep: Creep to sleep
  sleep: function(creep){
    var name = creep.name;
    var role = _.get(Memory, "creeps[name].role");
    var localFlag = creep.room.find(FIND_FLAGS, {filter: (flag) => (flag.name == role)})[0];

    creep.moveTo(localFlag, {visualizePathStyle: {}});
  }
  //>
  ,
  // < harvest: Creep go harvest THROW MEMSET
  harvest: function(creep){
    // < see if needed RETURN FALSE
    if (creep.store.getFreeCapacity() == 0) return false;
    // >

    // < variables
    var name = creep.name;
    var sourceId = _.get(Memory, "creeps[name].source");
    var source = Game.getObjectById(sourceId);
    // >

    // < find a source THROW MEMSET
    if (!sourceId || !source){
      var room = creep.room;
      var sources = room.find(FIND_SOURCES);

      source = creep.pos.findClosestByRange(sources);

      if (!source) throw ("harvester " + name + "no source");

      sourceId = source.id;

      // set source as new source
      _.set(Memory, "creeps[name].source", sourceId);

    }
    // >

    // < go refill
    if (creep.pos.getRangeTo(source) > 1) creep.moveTo(source, {visualizePathStyle: {}});
    else creep.harvest(source);
    // >

    return true;
  }
  // >
  ,
  // < haul: Creep go haul
  haul: function(creep){
    // < Enough resources?
    if (creep.store.getUsedCapacity() == 0) return false;
    // >

    // < Variables
    // < Get requesters
    var requesters = [];

    for (var name in Game.spawns){
      var spawn = Game.spawns[name];
      requesters.push(spawn);
    }
    // >

    var requester = creep.pos.findClosestByRange(requesters);
    // >

    // < go transfer
    if (creep.pos.getRangeTo(requester) > 1) creep.moveTo(requester, {visualizePathStyle: {}});
    else creep.transfer(requester, RESOURCE_ENERGY);
    // >
  }
  // >

};

module.exports = funcCreeps;
