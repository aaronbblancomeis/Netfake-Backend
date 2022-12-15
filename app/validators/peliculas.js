const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateItem = [
    check("titulo").exists().notEmpty(),
    check("fecha").exists().notEmpty(),
    check("poster").exists().notEmpty(),
    check("backposter").exists().notEmpty(),
    check("genero").exists().notEmpty(),
    check("logo").exists().notEmpty(),
    check("mediaId").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetGender = [
    check("gender").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
]

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
]
module.exports = {validatorCreateItem, validatorGetGender, validatorGetItem}