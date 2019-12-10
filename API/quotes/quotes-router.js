const router = require("express").Router();
const db = require("./quotes-model.js");

router.get("/", (req, res) => {
    db.getAll()
      .then(quotes => {
        res.status(200).json(quotes);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  });

module.exports = router;