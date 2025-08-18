const jwt = require("jsonwebtoken");

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

const verifyAccessToken = (req, res, next) =>{
    const authToken = req.cookies.accessToken;
    if(!authToken) {
        return res.sendStatus(401);
    }

    jwt.verify(
        authToken,
        JWT_ACCESS_SECRET,
        (e, decode) =>{
            if(e){
                return res.sendStatus(403);
            }
            req.user = decode;
            next();
        }
    );
}

module.exports = { verifyAccessToken };