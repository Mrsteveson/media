const router = require("express").Router();
const db = require("./user-model.js");

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
    console.log(req.params.id);
    try {
      const images = await db.getUserImgs(req.params.id);
      res.status(200).json(images);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error getting the images for this user."
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

module.exports = router;