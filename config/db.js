const mongoose = require('mongoose')

const dbConnect = () => {
    mongoose.connect(
        process.env.DB_URI,
        {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err) => {
            if(err) {
                console.log('DB: ERROR CONEXION '+err);
            }else {
                console.log('Conexion correcta')
            }
        }
    )
}

module.exports = dbConnect