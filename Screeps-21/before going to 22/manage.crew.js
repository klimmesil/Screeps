// < Classes
class Model {
  constructor(necessary, repeating) {
    this.necessary = necessary;
    this.repeating = repeating;
  }
}
// >

// < Variables
const models = {
  builder: new Model(
  [],
  [MOVE,MOVE,CARRY,WORK,WORK,WORK]),

  upgrader: new Model(
  [MOVE, CARRY],
  [WORK]),

  hauler: new Model(
  [],
  [CARRY, MOVE]),

  miner: new Model(
  [MOVE, CARRY],
  [WORK])
}

const spawnOrder = [
  // tolerance sees how strong you want your creep to be
  // maxed: max it
  // capped: max it, with a cap.
  {job: "miner", need: "number", number: 1, tolerance: "capped", cap: 800},
  {job: "hauler", need: "basicHauling", max: 5, tolerance: "maxed"},
  {job: "miner", need: "spawnSourceFill", max: 5, tolerance: "capped", cap: 800},
  {job: "hauler", need: "number", number: 1, tolerance: "maxed"},
  {job: "upgrader", need: "number", number: 1, tolerance: "maxed"},
  {job: "builder", need: "number", number : 2, tolerance: "maxed"},
  {job: "upgrader", need: "number", number: 2, tolerance: "maxed"},
  {job: "builder", need: "number", number : 3, tolerance: "maxed"}
]
// >


var manageCrew = {
  // <
};
module.exports = manageCrew;
