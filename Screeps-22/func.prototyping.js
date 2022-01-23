// variables
const roles = {
    harvester: require("role.harvester"),
    builder: require("role.builder"),
    hauler: require("role.hauler"),
    miner: require("role.miner"),
    upgrader: require("role.upgrader")
};

const debugs = {
    harvester: 1,
    buidler: 1,
    hauler: 1,
    miner: 1,
    upgrader:1
}

const funcCreeps = require("func.creeps");

/**
 * prototypes things
 */
const funcPrototyping = {
    /**
     * Prototypes creeps
     */
    creeps: function () {
        /**
         * runs creep function
         * @param {number|null} debug
         */
        Creep.prototype.run = function (debug = null) {
            const role = this.memory.role;

            // jobless
            if (!debugs[role] || !roles[role]) return null;

            // job exists
            if (debug === null) debug = debugs[role];

            roles[role].run(this, debug);
        }

        /**
         * creep will go to flag
         */
        Creep.prototype.sleep = function () {
            funcCreeps.sleep(this);
        }
    }
};

module.exports = funcPrototyping;