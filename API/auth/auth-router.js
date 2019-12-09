const router = require("express").Router();
const bcrypt = require("bcryptjs");

const db = require("./auth-model.js");

router.post("/register", (req, res) => {
  const user = req.body;

  if (!user.username || !user.password) {
    res.status(401).json({
      message: "A valid account requires both a username and password."
    });
  } else {
    const hash = bcrypt.hashSync(user.password, 12); //hash password
    user.password = hash;

    db.addNew(user)
      .then(registered => {
        const token = genToken(registered);
        res.status(201).json({ registered, token });
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res
          .status(200)
          .json({
            user_id: user.id,
            message: `Welcome, ${user.username}! Thank you for using the Media API.`,
            token
          });
      } else {
        res.status(401).json({ message: "Please provide valid login credentials." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

module.exports = router;