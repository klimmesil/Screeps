// imports
const funcPrototyping = require(`func.prototyping`);
const manageMemory = require(`manage.memory`);
const manageCrew = require(`manage.crew`);

// prototyping
funcPrototyping.creeps();

// console ease
global.R = manageMemory.hardReset;

console.log("________Global reset___________________________");

module.exports.loop = function () {

    try {
        console.log(`________${Game.time}____________________________________`);

        // creeping (lol)
        for (let name in Game.creeps) {
            try {
                const creep = Game.creeps[name];
                creep.run();
            }
            catch (error) {
                console.log("creep " + name + " had an error");
                console.log("<span style='color: #f37d00'>" + error.stack);
            }
        }

        // spawning
        for (let name in Game.spawns) {
            try {
                if (_.get(Memory, `spawns.${name}.spawnStun`) == 0) console.log(manageCrew.spawning());
                else _.set(Memory, `spawns.${name}.spawnStun`, _.get(Memory, `spawns.${name}.spawnStun`) - 1);
            }
            catch (error) {
                console.log("spawner " + name + " had an error");
                console.log("<span style='color: #f37d00'>" + error.stack);
            }
        }
    }
    catch (error) {
        console.log("main had an error");
        console.log("<span style='color: #f37d00'>" + error.stack);
    }
}