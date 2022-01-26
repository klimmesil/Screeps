/**
 * 
 * @param {GameObject} structure 
 * @returns bool
 */
const isContainer = function (structure) {
    return structure.structureType === STRUCTURE_CONTAINER;
}

module.exports = { isContainer };