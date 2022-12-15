const handleHttpError = (res, message = 'ERROR', code = 403) => {
    res.status(code);
    res.send({error: message});
};

module.exports = {handleHttpError}