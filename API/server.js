const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const userRouter = require("./users/user_router.js")
const authRouter = require("./auth/auth_router.js")
const imageRouter = require("./images/image_router.js")
const quoteRouter = require("./quotes/quote_router.js")

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/users", userRouter);
server.use("/auth", authRouter);
server.use("/", imageRouter, quoteRouter)

server.get("/", (req, res) => {
    res.status(200).send({ message: "Hello! This is the Media API by Pat Steveson." });
});
  
module.exports = server;