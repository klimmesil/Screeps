// imports
const funcCreeps = require("funcCreeps");

// variables
const roles = {
    harvester: require("roleHarvester"),
    builder: require("roleBuilder"),
    hauler: require("roleHauler"),
    miner: require("roleMiner"),
    upgrader: require("roleUpgrader")
};

const debugs = {
    harvester: 1,
    buidler: 1,
    hauler: 1,
    miner: 1,
    upgrader: 1
}

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
};

/**
 * creep will go to flag
 */
Creep.prototype.sleep = function () {
    funcCreeps.sleep(this);
};