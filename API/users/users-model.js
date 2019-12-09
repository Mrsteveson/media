const db = require("../data/dbConfig.js");

module.exports = {
  getUsers,
  getById,
  getUserImgs,
  getUserQuotes,
  update,
  remove
};

function getUsers() {
  return db("users");
}

function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getUserImgs(userId) {
  return db("images as i")
    .join("users as u", "u.id", "i.uploaded_by")
    .select(
      "u.username",
      "i.id",
      "i.title",
      "i.img_url",
      "i.date",
      "i.caption",
      "i.uploaded_at"
    )
    .where("i.uploaded_by", userId);
}

function getUserQuotes(userId) {
  return db("quotes as q")
    .join("users as u", "q.id", "q.uploaded_by")
    .select(
      "u.username",
      "q.origin",
      "q.content",
      "q.date",
      "q.context",
      "q.uploaded_at"
    )
    .where("q.uploaded_by", userId);
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getById(id);
      } else {
        return null;
      }
    });
}

function remove(id) {
  return db("users")
    .where({ id })
    .first()
    .del();
}
