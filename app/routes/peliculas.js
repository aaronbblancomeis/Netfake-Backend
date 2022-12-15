const express = require('express');
const router = express.Router();
const {getItems, createItems, getGenderMovies, getPortada, getItem, createItem, updateItem, deleteItem} = require("../controllers/peliculas")
const {validatorCreateItem, validatorGetItem, validatorGetGender} = require('../validators/peliculas');
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');


router.get('/', authMiddleware, getItems)
router.get(`/genero/:gender`, validatorGetGender, authMiddleware, getGenderMovies)
router.get('/portada', authMiddleware,getPortada)
router.get(`/:id`,validatorGetItem, authMiddleware, getItem)

//Rutas Ocultas
router.post(`/`, validatorCreateItem, authMiddleware, checkRol(["admin"]), createItem)
router.post(`/many`, validatorCreateItem, authMiddleware, checkRol(["admin"]), createItems)
router.put(`/:id`, validatorGetItem, validatorCreateItem, authMiddleware, checkRol(["admin"]),updateItem)
router.delete(`/:id`, validatorGetItem, authMiddleware, checkRol(["admin"]), deleteItem)

module.exports = router 