const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const SerieScheme = new mongoose.Schema(
    {
        titulo: {
            type: String,
            unique: true,
            required: true
        },
        fecha:{
            type: String,
            required: true
        },
        poster: {
            type: String,
            unique: true,
            required: true
        },
        backposter: {
            type: String,
            unique: true,
            required: true
        },
        genero: {
            type: Array,
        },
        logo: {
            type: String,
            unique: true,
            required: true
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        }
    },
    {
        versionKey: false,
        timestamps:true
    }
)

SerieScheme.plugin(mongoosePaginate)
module.exports = mongoose.model('series', SerieScheme)