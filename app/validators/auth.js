const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");


const validatorRegister = [
    check("name").exists().notEmpty().isLength({min:2,max:99}),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min:8,max:25}),
    (req, res, next) => validateResults(req, res, next)
]

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min:8,max:25}),
    (req, res, next) => validateResults(req, res, next)
]

module.exports = { validatorRegister, validatorLogin }