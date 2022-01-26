/**
 * marks all ids' objects
 * @param {string[]} array 
 * @param {string} color 
 */
const markIds = function (array, color = "#ffffff") {
    const objArray = array.map(Game.getObjectById);
    markObjects(objArray, color);
}

/**
 * marks all objects
 * @param {GameObject[]} array 
 * @param {String} color 
 */
const markObjects = function (array, color = "#ffffff") {
    const posArray = array.map(obj => obj.pos);
    markPositions(posArray, color)
}

/**
 * marks all positions
 * @param {RoomPosition[]} array 
 * @param {String} color 
 */
const markPositions = function (array, color = `#ffffff`) {
    for (let pos of array){
        const room = Game.rooms[pos.roomName];
        
        room.visual.rect(pos.x-0.4, pos.y-0.4, 0.8, 0.8, { fill: "transparent", stroke: color });
    }
}

module.exports = { markIds, markObjects, markPositions };