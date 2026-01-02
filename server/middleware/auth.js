const jwt = require('jsonwebtoken');

function verifyToken(req,res,next) {
    const token = req.cookies.token; // Extract token from httpOnly cookie
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified; // Add user data to the request object
        next(); // Move to the next function (the actual route)
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = verifyToken;