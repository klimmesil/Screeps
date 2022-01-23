// imports
const funcCreeps = require(`func.creeps`);

module.exports = {
    /**
     * 
     */
    run: function(creep, debug){
        // if debug == 2 just say job
        // if debug == 1 say activity+job

        // harvest
        if (funcCreeps.harvest(creep)){
            if (debug == 1) creep.say(`⚡🌾`)
        }

        // haul
        else if (funcCreeps.haul(creep)){
            if (debug == 1) creep.say("📩🌾");
        }

        // sleep
        else {
            if (debug == 1) creep.say(`😴🌾`);
        }
    }
}