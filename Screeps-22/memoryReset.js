// imports
const funcTerrain = require(`funcTerrain`);
const logger = require("logger");

// constants
const stuntTime = 0;

///functions/////////////////////////////////////////////////////////////////
/**
 * grabs data without using Memory
 * @param {String} sourceId 
 * @returns {Object}
 */
const gatherSourceData = function (sourceId) {
    const source = Game.getObjectById(sourceId);
    let data = { miners: [], miningPower: 0 }

    // neighbours
    const neighbours = funcTerrain.getFreeNeighbours(source.pos);
    _.set(data, "neighbours", neighbours);

    // container (if exists)
    const container = funcTerrain.getContainerWithin(neighbours);

    if (container) {
        _.set(data, "container", container.id);
    }

    return data;
}

/**
 * grabs any quick data you can find with no additional data
 * @param {string} roomName 
 * @returns {object} data
 */
const gatherRoomData = function (roomName) {
    const room = Game.rooms[roomName];
    let data = {};

    // sources
    const sources = room.find(FIND_SOURCES);
    for (let i in sources) {
        const sourceId = sources[i].id;
        const sourceData = gatherSourceData(sourceId);

        _.set(data, `sources.${sourceId}`, sourceData);
        // directly put this container in memory
        if (sourceData.container) {
            _.set(data, `containers.${sourceData.container}`, { source: sourceId });
        }
    }

    // spawns
    const spawns = room.find(FIND_MY_SPAWNS);
    for (let i in spawns) {
        const spawn = spawns[i];
        _.set(data, `spawns.${spawn.name}`, {});
    }

    // crew will be OOPE, but we need to initialize it
    _.set(data, `crew.miningPower`, 0);
    _.set(data, `crew.count`, {
        any: 0,
        harvester: 0,
        miner: 0,
        hauler: 0,
        upgrader: 0,
        builder: 0
    })

    return data;
}

/**
 * makes all creeps brainwashed
 * they'll forget everything as if they were kids
 */
const hardResetCreeps = function () {
    const creepMemory = _.get(Memory, `creeps`);

    for (let name in creepMemory) {
        const creep = Game.creeps[name];

        // creep is no more
        if (!creep) {
            _.set(creepMemory, name, undefined);
            continue;
        }
        // remember the role, and assume room if there is none
        const role = _.get(creepMemory, `${name}.role`);
        let roomName = _.get(creepMemory, `${name}.roomName`);
        let creepMiningPower = 0;


        if (!roomName) {
            // Whatever. He might become useless but it's a light loss.
            // hard resets should not happen anyway
            roomName = creep.room.name;
        }

        if (role == "miner") {
            for (let part in creep.body) {
                if (part == WORK) creepMiningPower++;
            }
        }

        // creep memory
        _.set(creepMemory, name, { role: role, roomName: roomName });

        // local room memory (crew count, miningcount)n
        let count = _.get(Memory, `rooms.${roomName}.crew.count.${role}`) + 1;
        _.set(Memory, `rooms.${roomName}.crew.count.${role}`, count);

        let miningPower = _.get(Memory, `rooms.${roomName}.crew.miningPower`) + creepMiningPower;
        _.set(Memory, `rooms.${roomName}.crew.miningPower`, miningPower);


        // all rooms
        count = _.get(Memory, `rooms.all.crew.count.${role}`) + 1;
        _.set(Memory, `rooms.all.crew.count.${role}`, count);

        miningPower = _.get(Memory, `rooms.all.crew.miningPower`) + creepMiningPower;
        _.set(Memory, `rooms.all.crew.miningPower`, miningPower);
    }
}

/**
 * will make everything disappear from room memory
 * be careful using this
 */
const hardResetRooms = function () {
    // just initialize it
    _.set(Memory, `rooms`, {
        all: {
            sources: {},
            spawns: {},
            crew: {
                miningPower: 0,
                count: {
                    any: 0,
                    harvester: 0,
                    miner: 0,
                    hauler: 0,
                    upgrader: 0,
                    builder: 0
                }
            }
        }
    });
    const roomMemory = _.get(Memory, `rooms`);

    // check rooms having spawns
    for (let spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName];
        const roomName = spawn.room.name;

        if (!(roomName in roomMemory)) {
            // only local
            const roomData = gatherRoomData(roomName);
            _.set(roomMemory, `${roomName}`, roomData);

            // sources
            const sources = _.get(roomData, `sources`);
            for (let srcId in sources) {
                _.set(roomMemory, `all.sources.${srcId}`, sources[srcId]);
            }

            // spawns
            const spawns = _.get(roomData, `spawns`);
            for (let name in spawns) {
                _.set(roomMemory, `all.spawns.${name}`, spawns[name]);
            }

            // containers
            const containers = _.get(roomData, `containers`);
            for (let containerId in containers) {
                _.set(roomMemory, `all.containers.${containerId}`, containers[containerId]);
            }
        }
    }
}

/**
 * careful
 */
const hardresetSpawns = function () {
    _.set(Memory, "spawns", {});

    for (let name in Game.spawns) {
        _.set(Memory, `spawns.${name}`, { spawnStun: stuntTime });
    }
}

/**
 * hard resets memory (EVERYTHING)
 */
const hardReset = function () {
    logger.warning("MEMORY HARD RESET");
    _.set(Memory, `HardReset`, true);

    // reinitialize room info
    hardResetRooms();

    // make creeps forget their info
    hardResetCreeps();

    // reinitialize spawn info
    hardresetSpawns();
}

module.exports = { gatherRoomData, hardResetCreeps, hardResetRooms, hardresetSpawns, hardReset };