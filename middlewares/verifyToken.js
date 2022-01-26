const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    next();
    return;
    const token = req.header('access-token');
    if (!token) return res.status(401).send("Access Denied");

    try{
        req.user = jwt.verify(token, process.env.ACCESS_KEY);
        next();
    } catch(err) {
        res.status(400).send("Invalid token");
    }
};