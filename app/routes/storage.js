const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const {createItem, getItems, getItem, deleteItem, updateItem} = require('../controllers/storage');
const {validatorGetItem} = require('../validators/storage');

router.get('/', getItems)
router.get('/:id', validatorGetItem, getItem)
router.delete('/:id', validatorGetItem, deleteItem)
router.post("/", uploadMiddleware.single("myfile"), createItem)

module.exports = router