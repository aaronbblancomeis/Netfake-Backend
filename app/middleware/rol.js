const { handleHttpError } = require('../utils/handleError')

const checkRol = (rol) => (req, res, next) => {
    try {
        const { user } = req;
        const rolesByUser = user.role;

        const checkValueRol = rol.some((rolSingle) => rolesByUser.includes(rolSingle))
        if(!checkValueRol) {
            handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
            return;
        }
        next();

    } catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = checkRol;