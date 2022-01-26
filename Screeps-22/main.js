// imports
try {
    const logger = require("logger");
    const testing = require("test");
    const manageCrew = require(`manageCrew`);


    // prototyping
    require("propsCreeps");
    require("propsGlobal"); // includes console ease

    logger.log("________Global reset___________________________", { color: "green", size: "20px" });

    module.exports.loop = function () {

        try {
            logger.log(`________${Game.time}____________________________________`, { color: "green" });

            // hard reset
            try {
                if (!_.get(Memory, `HardReset`)) global.R();
            }
            catch (error) {
                logger.error("memory", error);

            }

            // creeping (lol)
            for (let name in Game.creeps) {
                try {
                    const creep = Game.creeps[name];
                    creep.run();
                }
                catch (error) {
                    logger.error(name, error, Game.creeps[name].memory.role);
                }
            }

            // spawning
            for (let name in Game.spawns) {
                try {
                    if (_.get(Memory, `spawns.${name}.spawnStun`) == 0) manageCrew.spawning();
                    else _.set(Memory, `spawns.${name}.spawnStun`, _.get(Memory, `spawns.${name}.spawnStun`) - 1);
                }
                catch (error) {
                    logger.error(name, error, Game.spawns.spawn.room.name);
                }
            }

            // test zone
            try {
                testing.test();
            }
            catch (error) {
                logger.warning("testing", error);
            }
        }
        catch (error) {
            console.log("problem");
            logger.error("main", error, "FATAL");
        }

        if (!(Game.time % 30)) global.clear();
        logger.backup();
        logger.display();
        logger.flush();
    }
} catch (error) {
    const logger = require("logger");

    logger.error("FATAL", error, "FATAL");
    logger.display();
    logger.flush();
    if (error.stack === undefined) throw error;
}

