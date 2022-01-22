Game.spawns.Spawn1.spawnCreep([WORK, MOVE, CARRY], "harvester", {memory: {role: "harvester"}});

Game.getObjectById("3ff0cb48da7933f18a045afe");

Game.creeps.harvester.drop();

Game.creeps.harvester.moveTo(Game.getObjectById("3ff0cb48da7933f18a045afe"));
Game.creeps.harvester.harvest(Game.getObjectById("3ff0cb48da7933f18a045afe"));


Game.creeps.harvester.memory.source = undefined;
Game.creeps.harvester.memory.deposit = undefined;

// you have to make the jobs now.
// moving behaviours, leaving spots etc
// optimize requesters
