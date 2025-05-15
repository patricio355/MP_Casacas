// Importa el framework Express para crear el servidor HTTP
const express = require("express");

// Importa Morgan, un middleware que muestra en consola las peticiones HTTP que llegan al servidor
const morgan = require("morgan");

// Importa el módulo de base de datos personalizado, donde se configura la conexión a MySQL
const database = require("./database");

// Crea una instancia de una aplicación Express (es el servidor en sí)
const app = express();

// Permite servir archivos estáticos (como imágenes, CSS, etc.) desde la carpeta "public"
// Por ejemplo: un archivo en public/logo.png estará disponible en http://localhost:4000/logo.png
app.use(express.static('public'));

// Importa y aplica el middleware CORS para permitir solicitudes desde otros orígenes (como React desde localhost:3000)
const cors = require('cors');
app.use(cors());

// Activa el middleware Morgan en modo "dev" para que muestre logs detallados de cada petición HTTP
app.use(morgan("dev"));

app.use(express.json());

// Inicia el servidor Express en el puerto 4000 y muestra un mensaje en la consola al arrancar
app.listen(4000, () => {
    console.log("Servidor corriendo en el puerto 4000"); //  pero está corriendo en 4000
});


app.get('/productos', async (req, res) => { // Define una ruta HTTP GET en "/productos" que devuelve una lista de productos desde la base de datos
    const coneccion = await database.getConnection();// Obtiene una conexión a la base de datos usando la función personalizada
    const data = await coneccion.query("SELECT * FROM producto"); // Ejecuta una consulta SQL para seleccionar todos los registros de la tabla "producto"
    res.json(data);// Devuelve los datos obtenidos como respuesta en formato JSON
});

app.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      precio,
      marca,
      color,
      talle,
      tipo_material,
      tipo_producto,
      url_imagen
    } = req.body;

    const conexion = await database.getConnection();

    const resultado = await conexion.query(
      `UPDATE producto SET
        nombre = ?,
        precio = ?,
        marca = ?,
        color = ?,
        talle = ?,
        tipo_material = ?,
        tipo_producto = ?,
        url_imagen = ?
      WHERE idproducto = ?`,
      [nombre, precio, marca, color, talle, tipo_material, tipo_producto, url_imagen, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

app.get('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const conexion = await database.getConnection();

    const resultado = await conexion.query(
      'SELECT * FROM producto WHERE idproducto = ?',
      [id]
    );

    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(resultado[0]); // Devuelve solo el primer (y único) producto
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});


app.post('/productos', async (req, res) => {
  try {
    const {
      nombre,
      precio,
      marca,
      color,
      talle,
      tipo_material,
      tipo_producto,
      url_imagen
    } = req.body;

    const conexion = await database.getConnection();

    const resultado = await conexion.query(
      `INSERT INTO producto (
        nombre,
        precio,
        marca,
        color,
        talle,
        tipo_material,
        tipo_producto,
        url_imagen
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, precio, marca, color, talle, tipo_material, tipo_producto, url_imagen]
    );

    res.status(201).json({ mensaje: 'Producto creado exitosamente', id: resultado.insertId });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

app.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const conexion = await database.getConnection();

    const resultado = await conexion.query(
      'DELETE FROM producto WHERE idproducto = ?',
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});
