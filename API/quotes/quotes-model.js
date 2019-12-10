const db = require("../../data/dbConfig.js");

module.exports = {
    getAll,
    getById,
    addNew,
    update,
    remove
};

function getAll() {
    return db("quotes as q")
    .join("users as u", "q.uploaded_by", "u.id")
    .select({
        username: "u.username",
        title: "q.title",
        img_url: "i.img_url",
        date: "i.date",
        caption: "i.caption",
        uploaded_at: "i.uploaded_at"
    });
}

function getById(id) {
    return db("quotes")
    .where({ id })
    .first();
};

function addNew(image) {
    return db("quotes")
    .insert(image)
    .returning("id")
    .then(id => {
        return getById(id[0])
    });
};

function update(id, changes) {
    return db("quotes")
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
return db("quotes")
    .where({ id })
    .first()
    .del();
};