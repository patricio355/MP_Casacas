const mysql = require('promise-mysql');                    // Importa la librería promise-mysql para manejar MySQL con promesas
const dotenv = require('dotenv');                          // Importa dotenv para leer variables de entorno desde un archivo .env
dotenv.config();                                           // Carga las variables de entorno definidas en el archivo .env

const conection = mysql.createConnection({                 // Crea una conexión a la base de datos utilizando los datos del .env
    host: process.env.host,                                // Dirección del servidor MySQL (por ejemplo, localhost)
    port: 3306,                                             // Puerto por defecto de MySQL
    database: process.env.database,                        // Nombre de la base de datos
    user: process.env.user,                                // Usuario de MySQL
    password: process.env.PASSWORD || ''                   // Contraseña del usuario (vacía si no se define en el .env)
});

const getConnection = async () => await conection;         // Exporta una función que devuelve la conexión con la base de datos

module.exports = {
    getConnection                                           // Exporta la función getConnection para que otros módulos puedan usarla
}
