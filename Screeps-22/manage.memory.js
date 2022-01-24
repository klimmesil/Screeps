// constants
const stuntTime = 2;

///functions/////////////////////////////////////////////////////////////////
/**
 * makes all creeps brainwashed
 * they'll forget everything as if they were kids
 */
const hardResetCreeps = function () {
    const creepMemory = _.get(Memory, `creeps`);

    for (let name in creepMemory) {
        // creep is no more
        if (!Game.creeps[name]) {
            _.set(creepMemory, name, undefined);
            continue;
        }

        // just remember the role
        const role = creepMemory[name].role;
        _.set(creepMemory, name, { role: role });
    }
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
        const source = sources[i];
        _.set(data, `sources.${source.id}`, {});
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
            const roomData = gatherRoomData(roomName);
            _.set(roomMemory, `${roomName}`, roomData);

            // add to all rooms too
            const sources = _.get(roomData, `sources`);
            for (let srcId in sources) {
                _.set(roomMemory, `all.sources.${srcId}`, sources[srcId]);
            }

            const spawns = _.get(roomData, `spawns`);
            for (let name in spawns) {
                _.set(roomMemory, `all.spawns.${name}`, spawns[name]);
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
        _.set(Memory, `spawns.${name}`, {spawnStun: stuntTime});
    }
}

/**
 * hard resets memory (EVERYTHING)
 */
const hardReset = function () {
    console.log("<span style='color: #f37d00'>MEMORY HARD RESET");

    // make creeps forget their info
    hardResetCreeps();

    // reinitialize spawn info
    hardresetSpawns();

    // reinitialize room info
    hardResetRooms();
}

module.exports = {hardResetCreeps, gatherRoomData, hardResetRooms, hardresetSpawns, hardReset};