const db = require("../data/dbConfig.js");

module.exports = {
  addUser,
  findBy
};

function addUser(user) {
  return db("users")
    .insert(user)
    .returning("id")
    .then(newUser => {
      return getById(newUser[0]);
    });
};

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
};
