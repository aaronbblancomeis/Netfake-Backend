const { matchedData } = require('express-validator')
const model = require('../models/pelicula')
const { handleHttpError } = require('../utils/handleError')

const getItems = async (req, res) => {
    try{
        const data = await model.findAllData({});
        res.send({data});
    }catch(e){
        handleHttpError(res,'ERROR_GET_ITEMS');
    }
}

const getPortada = async (req, res) => {
    try {
        const data = await model.aggregate([    { $sample: { size: 1 } }, 
                                                { $lookup: {from: "storages", localField: "mediaId", foreignField:"_id", as: "pelicula" } },
                                                { $unwind:"$pelicula" } ]);
        res.send({data});
    }catch(e){
        handleHttpError(res,'ERROR_GET_ACCION_MOVIES');
    }
}

const getGenderMovies = async (req, res) => {
    try {
        req = matchedData(req);
        const {gender} = req;
        const data = await model.aggregate( [   { $match: { $expr: { $in: [gender, "$genero"]} }}, 
                                                { $sample: { size: 12 } }, 
                                                { $limit: 12 },
                                                { $lookup: {from: "storages", localField: "mediaId", foreignField:"_id", as: "pelicula" } },
                                                { $unwind:"$pelicula" } ])
        res.send({data});
    }catch(e){
        handleHttpError(res,'ERROR_GET_ACCION_MOVIES');
    }
}

const getCategoris = async (req, res) => {
    try {
        req = matchedData(req);
        const {gender} = req;
        const ultimas = await model.aggregate( [   { $match: { $expr: { $in: [gender, "$genero"]} }}, 
                                                { $sample: { size: 20 } }, 
                                                { $limit: 20 },
                                                { $lookup: {from: "storages", localField: "mediaId", foreignField:"_id", as: "pelicula" } },
                                                { $unwind:"$pelicula" } ])
        res.send({data});
    }catch(e){
        handleHttpError(res,'ERROR_GET_ACCION_MOVIES');
    }
}

const getItem = async (req, res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        console.log(id)
        const data = await model.findOneData(id);
        res.send({data});
    }catch(e){
        handleHttpError(res,'ERROR_GET_ITEMS');
    }
}

const createItem = async (req, res) => {
    try{
        const body = matchedData(req)
        const data = await model.create(body)
        console.log(data);
        res.send({data})
    }catch(e){
        handleHttpError(res,'ERROR_CREATE_ITEMS');
    }
};

const createItems = async (req, res) => {
    try{
        const body = matchedData(req)
        const data = await model.insertMany(many)
        console.log(data);
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

const many = [
    {
        "titulo":"Spider-Man: Homecoming",
        "fecha":"05/07/2017",
        "poster":"https://image.tmdb.org/t/p/w500/yJfPC6pjSJ5VOsVyXhx5PXBe0mR.jpg",
        "backposter":"https://image.tmdb.org//t/p/w1920_and_h800_multi_faces/tTlAA0REGPXSZPBfWyTW9ipIv1I.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Peter Parker asume su nueva identidad como Spiderman y regresa a vivir con su tía después de su aventura con los Vengadores. Al volver descubre que ha surgido un nuevo y despiadado enemigo que pretende destruir todo lo que ama: el Buitre.",
        "logo": "https://www.themoviedb.org/t/p/original/pkIgItid7nj84SIwDdkSGXBEJ69.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Spider-Man: Lejos de casa",
        "fecha":"05/07/2019",
        "poster":"https://image.tmdb.org/t/p/w500/iKVR1ba3W1wCm9bVCcpnNvxQUWX.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/uHuM6lErhDQS5oLqN3cMT5QGIDx.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Peter Parker decide pasar unas merecidas vacaciones en Europa junto a MJ, Ned y el resto de sus amigos. Sin embargo, Peter debe volver a ponerse el traje de Spider-Man cuando Nick Fury le encomienda una nueva misión: frenar el ataque de unas criaturas que están causando el caos en el continente.",
        "logo":"https://www.themoviedb.org/t/p/original/4jjHZNyuNKPeMLZ1uHEnTkpqldY.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Spider-Man: Sin camino a casa",
        "fecha":"16/12/2021",
        "poster":"https://www.themoviedb.org/t/p/original/osYbtvqjMUhEXgkuFJOsRYVpq6N.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Tras descubrirse la identidad secreta de Peter Parker como Spider-Man, la vida del joven se vuelve una locura. Peter decide pedirle ayuda al Doctor Extraño para recuperar su vida. Pero algo sale mal y provoca una fractura en el multiverso.",
        "logo":"https://www.themoviedb.org/t/p/original/iTssYtQcC9fk9AiENAgisXjUmJ5.png", 
        "mediaId":"634ed742b894a57f6a518c63"
    },
    {
        "titulo":"Iron Man",
        "fecha":"30/04/2008",
        "poster":"https://www.themoviedb.org/t/p/original/7eQcoQTso47n1krihCljowitRvM.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/cyecB7godJ6kNHGONFjUyVN9OX5.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Tony Stark es un inventor de armamento brillante que es secuestrado en el extranjero. Sus captores son unos terroristas que le obligan a construir una máquina destructiva pero Tony se construirá una armadura para poder enfrentarse a ellos y escapar.",
        "logo":"https://www.themoviedb.org/t/p/original/x0fsBZ5dOSVTkW3szVPQU3kyJeK.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Iron Man 2",
        "fecha":"30/04/2010",
        "poster":"https://www.themoviedb.org/t/p/original/p5LXVALvoTZA5cmxjOmjJBGtWfQ.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/7lmBufEG7P7Y1HClYK3gCxYrkgS.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Con el mundo ahora consciente de que él es Iron Man, el millonario inventor Tony Stark debe forjar nuevas alianzas y enfrentarse a un nuevo y poderoso enemigo.",
        "logo":"https://www.themoviedb.org/t/p/original/hdrK6kTvEPh5cHKDE7uMHO57iux.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Iron Man 3",
        "fecha":"26/04/2013",
        "poster":"https://www.themoviedb.org/t/p/original/upQED5VfXknJDEQsc4p2w9EEaGs.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/4TSqtluelcWByj8YZdqwzQVjI0O.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"El descarado y brillante Tony Stark, tras ver destruido todo su universo personal, debe encontrar y enfrentarse a un enemigo cuyo poder no conoce límites. Este viaje pondrá a prueba su entereza una y otra vez, y le obligará a confiar en su ingenio.",
        "logo":"https://www.themoviedb.org/t/p/original/tKbLuG9R3rZsDbo40qLcxIXijhP.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Capitán América: El primer vengador",
        "fecha":"05/08/2011",
        "poster":"https://www.themoviedb.org/t/p/original/82ucHZ4ioVGiweT1XMl1mUZaodq.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Tras tres meses de someterse a un programa de entrenamiento físico y táctico, Steve Rogers es encomendado su primera misión como Capitán América. Armado con un escudo indestructible, emprenderá la guerra contra el Mal como líder de los Vengadores.",
        "logo":"https://www.themoviedb.org/t/p/original/aj3CJ20qaYC9upO9i6p1kf4uwKk.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Capitán América: El soldado de invierno",
        "fecha":"28/03/2014",
        "poster":"https://www.themoviedb.org/t/p/original/6QBRnyvJHD7slOlX6aukvMwcEu.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/aZBZtLCM90QHDCuZFR6oc4NXCWu.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "arguento":"Tras los devastadores acontecimientos vividos en Nueva York, el superhéroe vive tranquilamente en Washington D.C., intentando adaptarse al mundo moderno. Sin embargo, cuando un colega de es amenazado, Rogers se ve envuelto en una trama de intrigas.",
        "logo":"https://www.themoviedb.org/t/p/original/j3qfatOtBaETO8nme8dLvefD2mx.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Capitán América: Civil War",
        "fecha":"29/04/2016",
        "poster":"https://www.themoviedb.org/t/p/original/jPPy7tCfglppQo6J9nGwU6UmJ8X.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/7FWlcZq3r6525LWOcvO9kNWurN1.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Mientras intentan detener a Rumlow en Lagos, Capitán América, Falcon, Viuda Negra y Bruja Escarlata se ven obligados a realizar una intervención para evitar el robo de una muestra letal en el Instituto de Enfermedades Infecciosas.",
        "logo":"https://www.themoviedb.org/t/p/original/b0RA6crfrFTvUPEJqQxcw5nvrnV.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Thor",
        "fecha":"29/04/2011",
        "poster":"https://www.themoviedb.org/t/p/original/qFAVW4XJaxhj7PcpiUI5hhO9bOX.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/cDJ61O1STtbWNBwefuqVrRe3d7l.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Tras desatar una antigua guerra, el codicioso guerrero Thor es desterrado a la Tierra por su padre para que viva entre los hombres y descubra así el verdadero sentido de la humildad. Allí, sin sus poderes, Thor deberá enfrentarse a las fuerzas más oscuras que su mayor enemigo le enviará desde Asgard.",
        "logo":"https://www.themoviedb.org/t/p/original/jE6T4AD9ZmMdaAsW2K2CsQamxqb.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Thor: el mundo oscuro",
        "fecha":"31/10/2013",
        "poster":"https://www.themoviedb.org/t/p/original/gPAmH41VpK5UPaNhAiNJePzrL8z.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/uhYoytlNaq46dG81wLmHqaSuzWu.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Cuando Malekith regresa para cumplir su plan, Thor debe enfrentarse a un enemigo al que ni siquiera Odín parece poder hacer frente.",
        "logo":"https://www.themoviedb.org/t/p/original/dPuqqMnBv3uvFNdxZhlcekFkQ67.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Thor: Ragnarok",
        "fecha":"27/10/2017",
        "poster":"https://www.themoviedb.org/t/p/original/6VFzRo4lKsEy5jlcRREctOWR2IC.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Thor, hijo de Odín, está atrapado en la guarida del gigante de fuego Surtur, destinado a acabar con Asgard según la profecía del Ragnarok. Tras escapar de Surtur, y aparentemente acabar con el peligro, Thor regresa a Asgard, donde un nuevo enemigo acecha.",
        "logo":"https://www.themoviedb.org/t/p/original/6bzUoeiYKMBzL06iZkDiuJWgT8N.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Thor: Love and Thunder",
        "fecha":"08/07/2022",
        "poster":"https://www.themoviedb.org/t/p/original/4VkGlhGHUzZjnkoYNasW0qhoP3R.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Secuela de Thor: Ragnarok en la que el Dios del Trueno contará con Lady Thor como acompañante.",
        "logo":"https://www.themoviedb.org/t/p/original/7hkhpPTWNM83JkRasjIcly8GGjS.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Ant-Man",
        "fecha":"14/08/2015",
        "poster":"https://www.themoviedb.org/t/p/original/gj0BpRmZ58BgYsk1nXEqui394Qv.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/a7sAqMKv5tkAdMzFfIhPqIBmQ9g.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Armado con la asombrosa capacidad de reducir su tamaño a la dimensiones de un insecto, el estafador Scott Lang debe sacar a relucir al héroe que lleva dentro y ayudar a su mentor, el doctor Hank Pym, a proteger de una nueva generación de amenazas el secreto que se esconde tras el traje de Ant-Man, con un casco que le permite comunicarse con las hormigas. A pesar de los obstáculos aparentemente insuperables que les acechan, Pym y Lang deben planear y llevar a cabo un atraco para intentar salvar al mundo.",
        "logo":"https://www.themoviedb.org/t/p/original/tS1n23EbzstyXAYjU4YG7fA9MAD.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Captina Marvel",
        "fecha":"08/03/2019",
        "poster":"https://www.themoviedb.org/t/p/original/5SPa7dZ85p54xa7E9tHRmfKq5ce.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"La historia sigue a Carol Danvers mientras se convierte en uno de los héroes más poderosos del universo, cuando la Tierra se encuentra atrapada en medio de una guerra galáctica entre dos razas alienígenas. Situada en los años 90, 'Capitana Marvel' es una historia nueva de un período de tiempo nunca antes visto en la historia del Universo Cinematográfico de Marvel.",
        "logo":"https://www.themoviedb.org/t/p/original/aJEf0ZAcHT0WGwmozrFgLQBw1Vh.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Doctor Strange in the Multiverse of Madness",
        "fecha":"06/05/2022",
        "poster":"https://www.themoviedb.org/t/p/original/uOnutpXJdDWyWzUCkApkahPSKuy.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/gUNRlH66yNDH3NQblYMIwgZXJ2u.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Viaja a lo desconocido con el Doctor Strange, quien, con la ayuda de tanto antiguos como nuevos aliados místicos, recorre las complejas y peligrosas realidades alternativas del multiverso para enfrentarse a un nuevo y misterioso adversario.",
        "logo":"https://www.themoviedb.org/t/p/original/6PaRKeCVDysn8OuwwCButVJzuh7.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    },
    {
        "titulo":"Morbius",
        "fecha":"01/04/2022",
        "poster":"https://www.themoviedb.org/t/p/original/4jcJHqIVsb4MFdYrDajXeEVlDvH.jpg",
        "backposter":"https://www.themoviedb.org/t/p/original/jzWT0zd8U77fqWg5WgUfYaMzSFz.jpg",
        "genero":["Accion","Aventuras","Fantasia","Superheroes","Ciencia Ficcion"],
        "argumento":"Peligrosamente enfermo de un extraño trastorno sanguíneo, y determinado a salvar a otras personas que padecen su mismo destino, el doctor Morbius intenta una apuesta desesperada. Lo que en un principio parece ser un éxito radical, pronto se revela como un remedio potencialmente peor que la enfermedad.",
        "logo":"https://www.themoviedb.org/t/p/original/kTOkWpuJxuNCMfAV4R9I4iii5pr.png", 
        "mediaId":"634db05dbf04813a77cd56a3"
    }
    
];
module.exports = {getItems, createItems, getPortada, getGenderMovies, getItem, createItem, updateItem, deleteItem}