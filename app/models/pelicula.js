const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const peliculaScheme = new mongoose.Schema(
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
            required: true
        },
        backposter: {
            type: String,
            required: true
        },
        genero: {
            type: Array,
        },
        argumento: {
            type: String,
        },
        logo: {
            type: String,
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

/**
 * Implementar metodo propio con relacion a storage
 */

peliculaScheme.statics.findAllData = function () {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: "storages",
                localField: "mediaId",
                foreignField:"_id",
                as: "pelicula"
            }
        },
        {
            $unwind:"$pelicula"
        }
    ])
    return joinData
}

peliculaScheme.statics.findOneData = function (id) {
    const joinData = this.aggregate([
        {
            $match: {
                _id:mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "storages",
                localField: "mediaId",
                foreignField:"_id",
                as: "pelicula"
            }
        },
        {
            $unwind:"$pelicula"
        }
    ])
    return joinData
}


peliculaScheme.plugin(mongoosePaginate)
module.exports = mongoose.model('peliculas', peliculaScheme)