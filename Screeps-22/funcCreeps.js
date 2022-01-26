/**
 * creep go harvest (old)
 * @param {Creep} creep 
 * @returns {boolean} false if full cargo 
 */
const harvest = function(creep) {
    if (creep.store.getFreeCapacity() == 0) return false;

    const source = creep.pos.findClosestByRange(FIND_SOURCES);
    const dist = creep.pos.getRangeTo(source);

    if (dist > 1) creep.moveTo(source);
    else creep.harvest(source);

    return true;
};

/**
 * not yet done
 * @param {Creep} creep 
 * @returns {boolean}
 */
const haul = function(creep) {
    const spawn = creep.pos.findClosestByRange(Object.values(Game.spawns));
    const dist = creep.pos.getRangeTo(spawn);
    if (dist > 1) creep.moveTo(spawn)
    else creep.transfer(spawn, RESOURCE_ENERGY);

    return true;
};

module.exports = { harvest, haul };