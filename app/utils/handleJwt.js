const jwt = require("jsonwebtoken")
const JWT_SECRETE = process.env.JWT_SECRET
const tokenSign = async (user) => {
    const sign = await jwt.sign(
        {
            _id: user._id,
            role: user.role,
        },
        JWT_SECRETE,
        {
            expiresIn:"2h"
        }
    );
    return sign;
};

const verifyToken = async (tokenJWT) => {
    try{
        return jwt.verify(tokenJWT, JWT_SECRETE)
    }catch(err) {
        return null
    }
}

module.exports = { tokenSign, verifyToken }