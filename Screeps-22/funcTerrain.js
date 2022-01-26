const blockingStruct = [
    STRUCTURE_SPAWN,
    STRUCTURE_EXTENSION,
    STRUCTURE_WALL,
    STRUCTURE_CONTROLLER,
    STRUCTURE_LINK,
    STRUCTURE_STORAGE,
    STRUCTURE_TOWER,
    STRUCTURE_OBSERVER,
    STRUCTURE_POWER_BANK,
    STRUCTURE_POWER_SPAWN,
    STRUCTURE_LAB,
    STRUCTURE_NUKER,
    STRUCTURE_FACTORY
]

/**
 * pos is walkable
 * @param {RoomPosition} pos 
 * @returns bool
 */
const isFree = function (pos) {
    const look = pos.look();

    // for each object you look at
    for (let i of look) {
        let obj = i[i.type];
        if (
            // non walkable structures
            i.type == "structure" && obj.structureType in blockingStruct
            ||
            // walls
            i.type == "terrain" && obj == "wall"
        ) return false;
    }

    return true;
};

/**
 * gives container at pos
 * @param {RoomPosition} pos 
 * @returns GameObject
 */
const getContainer = function (pos) {
    const look = pos.look();

    for (let i of look) {
        const obj = i[i.type];
        if (
            (
                // real container
                i.type == LOOK_STRUCTURES
                ||
                // construction site
                i.type == LOOK_CONSTRUCTION_SITES
            )
            && obj.structureType == STRUCTURE_CONTAINER
        ) return obj
    }
};

/**
 * gets all neighbours. low cost
 * @param {RoomPosition} pos 
 * @returns {RoomPosition[]}
 */
const getNeighbours = function (pos) {
    let neighbours = []

    // double offset loop
    for (let xOff = -1; xOff <= 1; xOff++) {
        for (let yOff = -1; yOff <= 1; yOff++) {
            // =pos
            if (xOff == 0 && yOff == 0) continue;

            const x = pos.x + xOff;
            const y = pos.y + yOff;

            // RoomPosition constructor does everything for us
            try {
                const newPos = new RoomPosition(x, y, pos.roomName);
                neighbours.push(newPos);
            } catch (e) { }
        }
    }

    return neighbours;
};

/**
 * gets all free neighbours (a little more costly)
 * @param {RoomPosition} pos 
 * @returns {RoomPosition[]}
 */
const getFreeNeighbours = function (pos) {
    const neighbours = getNeighbours(pos);
    return neighbours.filter(isFree);
};

/**
 * gets the first container pos that occurs
 * @param {RoomPosition} pos 
 * @returns {RoomPosition}
 */
const getNeighbourContainer = function (pos) {
    const neighbours = getNeighbours(pos);

    for (let n of neighbours) {
        const container = getContainer(n);
        if (container) return container;
    }

    return null;
};

const getContainerWithin = function (array) {
    for (let pos of array) {
        const container = getContainer(pos);
        if (container) return container;
    }
}

module.exports = { isFree, getContainer, getNeighbours, getFreeNeighbours, getNeighbourContainer, getContainerWithin };