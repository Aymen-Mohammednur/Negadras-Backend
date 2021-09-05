const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('access-token');
    if (!token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(token, process.env.ACCESS_KEY);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send("Invalid token");
    }
}

// function auth(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.status(401).send("Access Denied");

//     jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
//         if (err) return res.status(403).send("Invalid Token");
//         req.user = user;
//         next();
//     })
// }