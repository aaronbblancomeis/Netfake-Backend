const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if(apiKey === 'aaron-01') {
            next()
        }else {
            res.status(403)
            res.send({error:"Algo ocurrio con el middelware"})
        }
    }catch(err){
        res.status(403)
        res.send({error:"Algo ocurrio con el middelware"})
    }
}

module.exports = customHeader;