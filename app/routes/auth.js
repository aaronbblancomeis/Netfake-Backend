const express = require('express');
const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { registerCtrl, getItems, loginCtrl } = require('../controllers/auth');


router.post(`/register`, validatorRegister, registerCtrl);

router.post(`/login`, validatorLogin, loginCtrl)

router.get(`/`, getItems)


module.exports = router