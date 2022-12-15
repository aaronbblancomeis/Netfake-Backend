const model = require('../models/user')
const { matchedData } = require('express-validator');
const { encrypt, compare } = require("../utils/handlePassword")
const {tokenSign} = require('../utils/handleJwt')
const { handleHttpError } = require('../utils/handleError')

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password)
        const body = {...req, password}
        const dataUser = await model.create(body);
        dataUser.set("pasword", undefined, { strict:false} );
    
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send({data});
    }catch(e){
        handleHttpError(res,'ERROR_REGISTER_USER');
    }
}

const getItems = async (req, res) => {
    try{
        const data = await model.find({});
        res.send({data});
    }catch(e){
        handleHttpError(res,'ERROR_GET_ITEMS');
    }
}

const loginCtrl = async (req, res) => {
    try {

        req = matchedData(req);
        const user = await model.findOne({email:req.email})
        .select("password name role email");

        if(!user){
            handleHttpError(res,"USER_NOT_EXISTS");
            return;
        }
        
        const hashPassword = user.get("password");
        const check = await compare(req.password, hashPassword);
        
        if(!check){
            handleHttpError(res, "PASSWORD_INVALID");
            return;
        }
        user.set('password', undefined, {strict:false})

        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data})

    } catch(e) {
        handleHttpError(res,'ERROR_LOGIN_USER');
    }
}

const updateSingle = (req, res) => {
    model.UpdateOne({ _id: parseId(req.params.id)},
        req.body,
        (err, item) => {
            if(err) {
                res.send({ error: 'Error' }, 422)
            }else {
                res.send({ items: item })
            }
        }
    )
}

const deleteItem = (req, res) => {
    model.deleteOne({ _id: parseId(req.params.id)},
        (err, item) => {
            if(err) {
                res.send({ error: 'Error' }, 422)
            }else {
                res.send({ items: item })
            }
        }
    )
}

module.exports = {registerCtrl, loginCtrl, getItems, updateSingle, deleteItem}