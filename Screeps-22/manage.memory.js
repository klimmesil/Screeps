// constants
const stunTime = 10;

/**
 * everything here is MEMSET or MEMGET
 * just be careful
 */
const manageMemory = {
    /**
     * makes all creeps brainwashed
     * they'll forget everything as if they were kids
     */
    hardResetCreeps: function () {
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
    },

    /**
     * grabs any quick data you can find with no additional data
     * @param {string} roomName 
     * @returns {object} data
     */
    gatherRoomData: function (roomName) {
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
            harvester: 0,
            miner: 0,
            hauler: 0,
            upgrader: 0,
            builder: 0
        })

        return data;
    },

    /**
     * will make everything disappear from room memory
     * be careful using this
     */
    hardResetRooms: function () {
        // just initialize it
        _.set(Memory, `rooms`, {
            all: {
                sources: {},
                spawns: {},
                crew: {
                    miningPower: 0,
                    count: {
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
                const roomData = this.gatherRoomData(roomName);
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
    },

    /**
     * hard resets memory (EVERYTHING)
     */
    hardReset: function () {
        Memory.spawnStun = 3;
        _.set(Memory, `spawnStun`, stunTime);

        // make creeps forget their info
        this.hardResetCreeps();

        // reinitialize room info
        this.hardResetRooms();
    }
}

module.exports = manageMemory;