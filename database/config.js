const mongoose = require('mongoose')


const conexionBD = async () => {

    try {
        await mongoose.connect(
            process.env.CADENA_CON_MONGO,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        )
        console.log('Base de datos en línea');
    } catch (error) {
        throw new Error('Falló la conexión a la base de datos')
    }
}


module.exports = {
    conexionBD
}