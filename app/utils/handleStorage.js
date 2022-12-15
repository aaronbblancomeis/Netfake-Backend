const multer = require('multer');

const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`
        cb(null,pathStorage)
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname)
    }
})

const uploadMiddleware = multer({storage});

module.exports = uploadMiddleware;