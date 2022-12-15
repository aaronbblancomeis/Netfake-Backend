//const { default: mongoose } = require('mongoose')
const model = require('../models/serie')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const getItems = async (req, res) => {
    try{
        const data = await model.find({});
        res.send({data});
    }catch(e){
        handleHttpError(res,'ERROR_GET_ITEMS');
    }
}

const getItem = async (req, res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await model.findById(id);
        res.send({data});
    }catch(e){
        handleHttpError(res,'ERROR_GET_ITEMS');
    }
}

const createItem = async (req, res) => {
    try{
        const body = matchedData(req)
        const data = await model.create(body)
        res.send({data})
    }catch(e){
        handleHttpError(res,'ERROR_CREATE_ITEMS');
    }
};

const updateItem = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req)
        const data = await model.findOneAndUpdate(
            id,body
        )
        res.send({data})
    }catch(e){
        handleHttpError(res,'ERROR_UPDATE_ITEMS');
    }
}

const deleteItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await model.deleteOne({_id:id})
        res.send({data})
    }catch(e){
        handleHttpError(res,'ERROR_DELETE_ITEMS');
    }
}

module.exports = {getItems, getItem, createItem, updateItem, deleteItem}