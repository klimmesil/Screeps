// imports
const manageMemory = require(`manage.memory`);

// classes
class Model {
    constructor(necessary, repeating) {
        this.necessary = necessary;
        this.repeating = repeating;
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
        [CARRY, MOVE]),

    miner: new Model(
        [MOVE, CARRY],
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
    { role: `harvester`, need: `launch`, number: 2, tolerance: 250 },
    { role: "miner", need: "number", number: 1, tolerance: 800 },
    { role: "hauler", need: "basicHauling", max: 5, tolerance: "maxed" },
    { role: "miner", need: "spawnSourceFill", max: 5, tolerance: 800 },
    { role: "hauler", need: "number", number: 1, tolerance: "maxed" },
    { role: "upgrader", need: "number", number: 1, tolerance: "maxed" },
    { role: "builder", need: "number", number: 2, tolerance: "maxed" },
    { role: "upgrader", need: "number", number: 2, tolerance: "maxed" },
    { role: "builder", need: "number", number: 3, tolerance: "maxed" }
];

const manageCrew = {
    /**
     * gives the energy cost of body
     * @param {string Array} body
     * @returns {number} energy cost
     */
    bodyCost: function (body) {
        let sum = 0;
        for (let part in body) {
            sum += BODYPART_COST[part];
        }

        return sum;
    },

    makeBody: function (role, cap) {
        return `haha`;
    },

    /**
     * will make the spawn spawn things
     * with a number strategy
     * @param {Object} strategy see spawnOrder in manage.crew
     * @returns {boolean} false if task done
     */
    spawnNumber: function (strategy) {
        // all rooms
        const role = strategy.role;
        const actual = _.get(Memory, `rooms.all.crew.count.${role}`);

        if (actual < strategy.number) {
            // calculate cap
            let cap = strategy.tolerance;
            if (strategy.tolerance === `maxed`){
                cap = Game.rooms[tempRoom].energyAvailable;
            }
            
            // calculate body
            const body = this.makeBody(role, cap);

            // spawn creep
            const name = role + Game.time
            const opt = { memory: { role: role } }
            const spawned = Game.spawns[tempSpawn].spawnCreep(body, name, opt);

            // set a spawn stun
            if (spawned === 0) {
                _.set(Memory, `spawnStun`, stunTime);
            }

            console.log(`should be ok`);

            return true;
        }

        return false
    },

    /**
     * will make the spawn spawn things
     * with a fillSources strategy (mostly for miners)
     * @param {Object} strategy see spawnOrder in manage.crew
     * @returns {boolean} false if task done
     */
    spawnSource: function (strategy) {

    },

    spawnLaunch: function (strategy) {

    },

    /**
     * Spawns all creeps according to spawn order
     * @returns {boolean} false if there's nothing to spawn
     */
    spawning: function () {
        const spawningMethods = {
            launch: function (strat) { return false },
            number: this.spawnNumber,
            spawnSourceFill: this.spawnSource,
            basicHauling: function (strat) { return false }
        };

        let working = false;

        for (let i in spawnOrder) {
            const strategy = spawnOrder[i];

            if (spawningMethods[strategy.need](strategy)) {
                working = true;
                break;
            }
        }

        return working;
    }
};

module.exports = manageCrew;