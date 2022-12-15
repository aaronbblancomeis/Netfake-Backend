const { handleHttpError } = require('../utils/handleError')
const { verifyToken } = require('../utils/handleJwt')
const model = require('../models/user');

const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization) {            
            handleHttpError(res,"NOT_TOKEN",401)
            return 
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token)

        if(!dataToken._id){
            handleHttpError(res,"NOT_ID_TOKEN",401)
            return
        }

        const user = await model.findById(dataToken._id);
        req.user = user

        next()

    }catch(e) {
        handleHttpError(res,"NOT_SESSION",401)
    }
}

module.exports = authMiddleware;