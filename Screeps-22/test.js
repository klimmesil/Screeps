const funcTerrain = require(`funcTerrain`);
const funcDebug = require(`funcDebug`);
const logger = require("logger");
const html = require("html");

const test = function () {
    testt()
}

const testt = function () {
    
}

const throwErrors = function () {
    try {
        throw new Error("fuck");
    } catch (error) {
        if(Game.time%3) {
            console.log("hey")
            logger.error("an error", error, "errorcategory");
            logger.warning("a warning", error, "warningcategory");
            logger.warning("another warning", error, "warningcategory");
            logger.warning("a warning", error, "anotherwarningcategory");
            logger.warning("another warning", error, "anotherwarningcategory");
        }
    }
}

const flagNeighbours = function () {
    const src = Game.flags.Flag1;
    const array = funcTerrain.getFreeNeighbours(src.pos);

    funcDebug.markPositions(array);

    const containerPos = funcTerrain.getNeighbourContainer(src.pos);

    if (containerPos !== null) {
        funcDebug.markPositions([containerPos], "red")
    }
}

module.exports = { test }