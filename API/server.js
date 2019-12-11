const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const userRouter = require("./users/users-router.js")
const authRouter = require("./auth/auth-router.js")
const imageRouter = require("./images/images-router.js")
const quoteRouter = require("./quotes/quotes-router.js")

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/users", userRouter);
server.use("/auth", authRouter);
server.use("/quotes", quoteRouter)
server.use("/images", imageRouter)

server.get("/", (req, res) => {
    res.status(200).send({ message: "Hello! This is the Media API by Pat Steveson." });
});
  
module.exports = server;