const router = require("express").Router();
const db = require("./users-model.js");

router.get("/", (req, res) => {
    db.getUsers()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  });
  
  router.get("/:id", (req, res) => {
    const id = req.params.id;
  
    db.getById(id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(400).json({ message: "The specified user does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  });
  
  router.get("/:id/images", async (req, res) => {

    try {
      const images = await db.getUserImgs(req.params.id);
      res.status(200).json(images);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error getting this user's images."
      });
    }
  });
  
  router.get("/:id/quotes", async (req, res) => {

    try {
      const quotes = await db.getUserQuotes(req.params.id);
      res.status(200).json(quotes);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error getting this user's quotes."
      });
    }
  }); 

  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
  
    db.update(id, changes)
      .then(changes => {
        if (changes) {
          res.status(200).json({ message: "User successfully updated." });
        } else {
          res.status(404).json({ message: "The specified user does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  });

  router.delete("/:id", (req, res) => {
    const id = req.params.id;
  
    db.remove(id)
      .then(user => {
        res.status(200).json({ message: "User has been successfully deleted." });
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  });

module.exports = router;