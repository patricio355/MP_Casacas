const express = require("express");
const app = express();

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});