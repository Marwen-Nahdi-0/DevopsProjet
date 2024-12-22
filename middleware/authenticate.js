const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const tokenData =  req.params.token ;
    if (!tokenData) {
        return res.status(401).send('Authentication failed: token not found aa');
    }

    try {
        // Verify the token
        const decodedToken = jwt.verify(tokenData, process.env.JWT_SECRET);
        // Call the next middleware
        req.userId = decodedToken._id;
        next();
    } catch (error) {
        return res.status(401).send('Authentication failed: invalid token');
    }
};

module.exports = authenticate;