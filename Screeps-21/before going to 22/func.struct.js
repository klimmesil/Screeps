var funcStruct = {
  // get things that should be filled
  getRequesters: function(room){

    // filter
    var f = (structure) => (
        // select structure type
        (
          structure.structureType == STRUCTURE_SPAWN||
          structure.structureType == STRUCTURE_EXTENSION||
          structure.structureType == STRUCTURE_STORAGE||
          structure.structureType == STRUCTURE_CONTAINER||
          structure.structureType == STRUCTURE_TOWER
        )

        &&

        // see if it has free capacity
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0

        &&

        // see if it's NOT a mining container
        !(
          structure.structureType == STRUCTURE_CONTAINER &&
          Memory.myStructures[STRUCTURE_CONTAINER][structure.room][structure.id].activity === "mining"
        )
    );

    var targets = room.find(FIND_STRUCTURES, {filter: f});

    return targets;
  },

  getGivers: function(room){

    // filter for structures
    var f1 = function(structure){
      var type = structure.type;
      var id = structure.id;
      var room = structure.room;

      return (
        type === STRUCTURE_CONTAINER &&
        Memory.myStructures[STRUCTURE_CONTAINER][room][id].activity === "mining" && // only mining containers
        structure.store.getUsedCapacity(RESOURCE_ENERGY) > 50
      )
    };

    // filter for dropped resources
    var f2 = (r) => (r.resourceType === RESOURCE_ENERGY && r.amount > 50);

    // filter for tombstones
    var f3 = (t) => (t.store.getUsedCapacity(RESOURCE_ENERGY) > 50);

    var structureTargets = room.find(FIND_STRUCTURES, {filter: f1});
    var dropTargets = room.find(FIND_DROPPED_RESOURCES, {filter: f2});
    var tombTargets = room.find(FIND_TOMBSTONES, {filter: f3});
    var targets = [].concat(structureTargets, dropTargets, tombTargets);

    return targets;
  }
};

module.exports = funcStruct;
