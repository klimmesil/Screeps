var funcStruct = require('func.struct');
var funcDebug = {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // function that tells cost of body
  bodyCost: function(body){
    var costs = {work: 100, move: 50, carry: 50, attack: 80, ranged_attack: 150, heal: 250, claim: 600, tough:10};
    var sum = 0;
    for (var i in body){
      sum += costs[body[i]];
    }
    console.log("body cost : " + sum);
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // mark all ids
  markIds: function(array){

    for (var i in array){
      var id = array[i];
      var obj = Game.getObjectById(id);

      if (obj === undefined || obj.pos === undefined) continue;

      var room = obj.room;
      var pos = obj.pos;

      room.visual.rect(pos.x-0.6, pos.y-0.6, 1.2, 1.2, {fill: undefined, stroke: "#f00"});
    }
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // mark all objects
  markObjects: function(array, color = "#ffffff"){

    for (var i in array){
      var obj = array[i];

      if (obj === undefined || obj.pos === undefined) continue;

      var room = obj.room;
      var pos = obj.pos;

      room.visual.rect(pos.x-0.6, pos.y-0.6, 1.2, 1.2, {fill: "transparent", stroke: color});
    }
  },
};



module.exports = funcDebug;
