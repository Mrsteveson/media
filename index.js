require("dotenv").config();

const server = require("./API/server.js");
const port = process.env.PORT || 5000;

server.listen(port, function() {
    console.log(`\n ----- Media API Listening on http://localhost:${port} ----- \n`);
});