const { handleHttpError } = require("../utils/handleError")
const { matchedData } = require('express-validator')
const model = require('../models/storage')
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
const fs = require("fs");

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
        const {id} = matchedData(req);
        const data = await model.findById(id);
        res.send({data});
    }catch(e){
        handleHttpError(res,'ERROR_GET_ITEM_STORAGE');
    }
}

const createItem = async (req, res) => {
    const {body, file} = req
    const fileData = {
        filename: file.filename,
        url:`${PUBLIC_URL}/${file.filename}`
    }
    const data = await model.create(fileData)
    res.send({data})
};

const deleteItem = async (req, res) => {
    try{
        const {id} = matchedData(req);
        const dataFile = await model.findById(id);
        await model.deleteOne({_id:id});
        const {filename} = dataFile;
        console.log(filename)
        const filePath = `${MEDIA_PATH}/${filename}`;
        console.log(filePath)
        fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: 1
        }
        console.log(data)

        res.send({data});
    }catch(e){
        handleHttpError(res,'ERROR_DELETE_ITEM_STORAGE');
    }
}

module.exports = {getItems, getItem, createItem, deleteItem}


/*
Intentar implementar el storage directamente en la pelicula o serie, y mirar si es mas facil
asi o de la manera que lo estoy haciendo ahora.
**/
