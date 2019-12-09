const jwt = require("jsonwebtoken");

function genToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: "2h"
    };

    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, options)
};

module.exports = {genToken};