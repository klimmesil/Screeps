// imports
const manageMemory = require(`manage.memory`);

// classes
class Model {
    constructor(necessary, repeating, minPrice, lowCost) {
        this.necessary = necessary;
        this.repeating = repeating;
        this.minPrice = minPrice;
        this.lowCost = lowCost;
    }
}

// constants
const tempSpawn = `Spawn1`;
const tempRoom = `sim`;

const models = {
    harvester: new Model(
        [WORK, CARRY, MOVE],
        [MOVE, WORK]),

    builder: new Model(
        [],
        [MOVE, MOVE, CARRY, WORK, WORK, WORK]),

    upgrader: new Model(
        [MOVE, CARRY],
        [WORK]),

    hauler: new Model(
        [],
        [MOVE, CARRY]),

    miner: new Model(
        [MOVE, WORK, WORK],
        [WORK])
};

/**
 * array of objects ordered by priority.
 * role: miner hauler upgrader, builder, harvester
 * 
 * needs: 
 * number: need number: number of creeps you want in total
 * basicHauling: will spawn enough haulers until max
 * spawnSourceFill: will spawn enough miners until max
 * 
 * tolerance:
 * maxed: use whatever resources you need
 * number: that's the cap
 */
const spawnOrder = [
    { need: `launch`, number: 2, tolerance: 250 }, // to launch the economy
    { role: "miner", need: "number", number: 1, tolerance: 800 },
    { role: "hauler", need: "basicHauling", max: 5, tolerance: "maxed" },
    { role: "miner", need: "spawnSourceFill", max: 5, tolerance: 800 },
    { role: "hauler", need: "number", number: 1, tolerance: "maxed" },
    { role: "upgrader", need: "number", number: 1, tolerance: "maxed" },
    { role: "builder", need: "number", number: 2, tolerance: "maxed" },
    { role: "upgrader", need: "number", number: 2, tolerance: "maxed" },
    { role: "builder", need: "number", number: 3, tolerance: "maxed" }
];

///functions/////////////////////////////////////////////////////////////////
/**
 * gives the energy cost of body
 * @param {String[]} body
 * @returns {number} energy cost
 */
const bodyCost = function (body) {
    let sum = 0;
    for (let i in body) {
        const part = body[i];
        sum += BODYPART_COST[part];
    }

    return sum;
};

/**
 * gives a body without going over cap cost
 * (unless necessary)
 * @param {String} role 
 * @param {number} cap 
 * @returns {String[]}
 */
const makeBody = function (role, cap) {
    // add necessary
    const model = models[role];
    let body = _.clone(model.necessary);

    cap -= bodyCost(body);

    // add repeating
    let i = 0;
    const len = model.repeating.length;



    for (let j = 0; j < 50; j++) {
        const part = model.repeating[i];
        cap -= BODYPART_COST[part];

        if (cap < 0) return body;

        body.push(part);

        i = (i + 1) % len;
    }
}

/**
* spawns a boost to launch (so only if not going well)
* @param {Object} strategy 
*/
const spawnLaunch = function (strategy) {
    // initialize spawningQueue if necessary
    const harvesters = _.get(Memory, `rooms.all.crew.count.harvester`);
    const miners = _.get(Memory, `rooms.all.crew.count.miner`);
    const haulers = _.get(Memory, `rooms.all.crew.count.hauler`);

    // no need everything is fine
    if (harvesters != 0 || miners != 0 || haulers != 0 || Game.rooms[tempRoom].energyAvailable >= 1000) return false;

    // only in very poor situations
    if (miners == 0 && haulers == 0 && Game.rooms[tempRoom].energyAvailable < 350) {
        console.log("<span style='color: #f37d00'>Emergency spawning harvesters");

        const role = "harvester";
        const body = makeBody(role, Game.rooms[tempRoom].energyAvailable);
        const name = role + Game.time;
        const opt = { memory: { role: role } }

        const spawned = Game.spawns[tempSpawn].spawnCreep(body, name, opt);

        // announce a spawn
        console.log(`spawning a ${name}. result: ${spawned}`);

        // set a spawn stun
        if (spawned === OK) {
            _.set(Memory, `spawns.${tempSpawn}.spawnStun`, body.length * 3 - 1);

            // all rooms
            let val = _.get(Memory, `rooms.all.crew.count.${role}`) + 1;
            _.set(Memory, `rooms.all.crew.count.${role}`, val);

            // specific room
            val = _.get(Memory, `rooms.${tempRoom}.count.${role}`) + 1;
            _.set(Memory, `rooms.${tempRoom}.count.${role}`, val);
        }

        return true;
    }

    // spawn 1 miner and keep enough for 1 hauler (100 energy)
    const available = Game.rooms[tempRoom].energyAvailable - 100;

    console.log("eco spawning");
    const role = "miner";
    const body = makeBody(role, available);
    const name = role + Game.time;
    const opt = { memory: { role: role } };

    const spawned = Game.spawns[tempSpawn].spawnCreep(bodt, name, opt);

    // announce a spawn
    console.log(`spawning a ${name}. result: ${spawned}`);

    // set a spawn stun
    if (spawned === OK) {
        _.set(Memory, `spawns.${tempSpawn}.spawnStun`, body.length * 3 - 1);

        // all rooms
        let val = _.get(Memory, `rooms.all.crew.count.${role}`) + 1;
        _.set(Memory, `rooms.all.crew.count.${role}`, val);

        // specific room
        val = _.get(Memory, `rooms.${tempRoom}.count.${role}`) + 1;
        _.set(Memory, `rooms.${tempRoom}.count.${role}`, val);
    }

    return true;
};

/**
 * will make the spawn spawn things
 * with a number strategy
 * @param {Object} strategy see spawnOrder in manage.crew
 * @returns {boolean} false if task done
 */
const spawnNumber = function (strategy) {
    // all rooms
    const role = strategy.role;
    const actual = _.get(Memory, `rooms.all.crew.count.${role}`);

    if (actual < strategy.number) {
        // calculate cap
        let cap = Math.min(strategy.tolerance, Game.rooms[tempRoom].energyAvailable);
        if (strategy.tolerance === `maxed`) {
            cap = Game.rooms[tempRoom].energyAvailable;
        }

        // spawn creep
        const body = makeBody(role, cap);
        const name = role + Game.time
        const opt = { memory: { role: role } }

        console.log(body);

        const spawned = Game.spawns[tempSpawn].spawnCreep(body, name, opt);

        // announce a spawn
        console.log(`spawning a ${name}. result: ${spawned}`);

        // set a spawn stun
        if (spawned === OK) {
            _.set(Memory, `spawns.${tempSpawn}.spawnStun`, body.length * 3 - 1);

            // all rooms
            let val = _.get(Memory, `rooms.all.crew.count.${role}`) + 1;
            _.set(Memory, `rooms.all.crew.count.${role}`, val);

            // specific room
            val = _.get(Memory, `rooms.${tempRoom}.count.${role}`) + 1;
            _.set(Memory, `rooms.${tempRoom}.count.${role}`, val);
        }

        return true;
    }

    return false
};

// TODO
/**
 * will make the spawn spawn things
 * with a fillSources strategy (mostly for miners)
 * @param {Object} strategy see spawnOrder in manage.crew
 * @returns {boolean} false if task done
 */
const spawnSource = function (strategy) {

};

// TODO
/**
 * spawns enough haulers to haul everything (approx.)
 * until cap
 * @param {Object} strategy 
 */
const spawnHauling = function (strategy) {

}

/**
 * Spawns all creeps according to spawn order
 * @returns {boolean} false if there's nothing to spawn
 */
const spawning = function () {
    const spawningMethods = {
        launch: spawnLaunch,
        number: spawnNumber,
        spawnSourceFill: spawnSource,
        basicHauling: spawnHauling
    };

    let i = 0

    for (i in spawnOrder) {
        const strategy = spawnOrder[i];

        if (spawningMethods[strategy.need](strategy)) return i;
    }

    return i;
};

module.exports = { bodyCost, makeBody, spawnLaunch, spawnNumber, spawnSource, spawning };