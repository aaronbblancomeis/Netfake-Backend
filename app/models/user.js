const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const userScheme = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        password:{
            type: String,
            select:false

        },
        name: {
            type: String,
            required: true
        },
        role: {
            type: ["admin", "user"],
            default: "user"
        }
    },
    {
        versionKey: false,
        timestamps:true
    }
)
userScheme.plugin(mongoosePaginate)
module.exports = mongoose.model('users', userScheme)