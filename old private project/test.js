// mananage mining
Memory.miningSites["5ece6c910ad73f6e796fcbeb"] = {energy: RESOURCE_ENERGY, miner: null, mining: "5bbcaf789099fc012e63aa49"};
Memory.miningSites["5ecec9a1db28dd85dcb9acc6"] = {energy: RESOURCE_ENERGY, miner: null, mining: "5bbcaf789099fc012e63aa4a"};

delete Memory.miningSites['5ece6c910ad73f6e796fcbeb'].miner;
delete Memory.miningSites['5ece6c910ad73f6e796fcbeb'].miner;

// manage spawning
Memory.spawnOrder = [];
Memory.spawnOrder[0] = {body: [MOVE, CARRY, WORK], job: "harvester", number: 0};
Memory.spawnOrder[1] = {body: [MOVE, CARRY, CARRY], job: "hauler", number: 1};
Memory.spawnOrder[2] = {body: [MOVE, CARRY, WORK], job: "miner", number: 1};

// manage crew
Game.spawns["Spawn1"].spawnCreep([MOVE, CARRY, WORK, WORK, WORK, WORK],"minerss",{memory:{job:"miner"}});

Game.creeps["builder"].memory.job = "builder";
delete Game.creeps["miner18577189"].post;
creep.moveTo(Game.getObjectById("5ecced7e929e2d96f1d302ca"));


// sleeping spot
Memory.sleepingSpot = {x: 17, y:17};

// manage repairs
Memory.repairConditions = {
  "spawn": {start: 4500, end: 5000},
  "extension": {start: 900, end: 1000},
  "road": {start: 4900, end: 25000},
  "constructedWall": {start: 40000, end: 50000},
  "rampart": {start: 900000, end: 1000000},
  "link": {start: 4000, end: 5000},
  "storage": {start: 4000, end: 5000},
  "tower": {start: 2500, end: 3000},
  "observer": {start: 4000, end: 5000},
  "powerBank": {start: 4000, end: 5000},
  "powerSpawn": {start: 4000, end: 5000},
  "extractor": {start: 4000, end: 5000},
  "lab": {start: 4000, end: 5000},
  "terminal": {start: 4000, end: 5000},
  "invaderCore": {start: 4000, end: 5000},
  "container": {start: 240000, end: 250000},
  "nuker": {start: 4000, end: 5000},
  "factory": {start: 4000, end: 5000}
};

// various
var structure = Game.getObjectById("5bbcaf789099fc012e63aa49");
JSON.stringify(structure);

{"room":{"name":"E42S34","energyAvailable":99,"energyCapacityAvailable":550,"visual":{"roomName":"E42S34"}},
"pos":{"x":10,"y":21,"roomName":"E42S34"},
"id":"5bbcaf789099fc012e63aa49",
"energy":3000,
"energyCapacity":3000}



// TODO
// givers
// auto spawning (with and without failSafe)
