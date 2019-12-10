const db = require("../../data/dbConfig.js");

module.exports = {
    getAll,
    getById,
    addNew,
    update,
    remove
};

function getAll() {
    return db("images as i")
    .join("users as u", "i.uploaded_by", "u.id")
    .select({
        username: "u.username",
        title: "i.title",
        img_url: "i.img_url",
        date: "i.date",
        caption: "i.caption",
        uploaded_at: "i.uploaded_at"
    });
}

function getById(id) {
    return db("images")
    .where({ id })
    .first();
};

function addNew(image) {
    return db("images")
    .insert(image)
    .returning("id")
    .then(id => {
        return getById(id[0])
    });
};

function update(id, changes) {
    return db("images")
      .where({ id })
      .update(changes)
      .then(count => {
        if (count > 0) {
          return getById(id);
        } else {
          return null;
        }
      });
};

function remove(id) {
return db("images")
    .where({ id })
    .first()
    .del();
}