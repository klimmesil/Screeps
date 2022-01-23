// imports
const funcPrototyping = require(`func.prototyping`);
const manageMemory = require(`manage.memory`);
const manageCrew = require(`manage.crew`);

// prototyping
funcPrototyping.creeps();

// console ease
global.HRM = function () { manageMemory.hardReset(); }

module.exports.loop = function () {
    try {
        console.log(`________${Game.time}____________________________________`);

        // spawning
        if (_.get(Memory, `spawnStun`) == 0) manageCrew.spawning();
        else _.set(Memory, `spawnStun`, _.get(Memory, `spawnStun`) - 1);

        for (let name in Game.creeps) {
            const creep = Game.creeps[name];
            creep.run();
        }

    }
    catch (error) {
        console.log("main had an error");
        console.log("<span style='color: #f37d00'>" + error.stack);
    }
}