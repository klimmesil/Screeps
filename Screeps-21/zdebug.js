// DEBUG:
try {
  nonExistentFunction();
} catch (error) {
  console.log("hey");
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}
console.log("done vibing");


// DEBUG:
console.log(JSON.stringify(Memory));
_.set(Memory, "a.b", 7);

module.exports.loop = function(){
  // DEBUG:
  console.log("_____________" + Game.time + "___________");
}
