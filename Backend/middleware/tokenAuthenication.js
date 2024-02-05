const jwt = require('jsonwebtoken');
const secret = `iamawebdeveloperiamgoingtousejsonwebtokentosecret`

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token' ];
    if(!token){
        return res.status(403).json({auth:false, message: 'no token provided'})
    }
    jwt.verify(token, secret, (err, decoded)=>{
        if(err){
            return res.status(500).json({auth:false, message:"Authentication failed"})
        }
        req.user_name = decoded.user_name
        next();
    });
}
module.exports = verifyToken;