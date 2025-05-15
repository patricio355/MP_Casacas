import React, { useState } from 'react';
import './NuevoProducto.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function NuevoProducto({ onGuardar }) {
    const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    marca: '',
    color: '',
    talle: '',
    tpo_material: '',
    tpo_producto: '',
    url_imagen: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!producto.nombre || !producto.precio || !producto.url_imagen) {
    alert('Por favor completa los campos obligatorios.');
    return;
  }

  try {
    const respuesta = await fetch('http://localhost:4000/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });

    if (!respuesta.ok) throw new Error('Error al guardar el producto');
navigate('/listarProductos');
    alert('Producto guardado correctamente');
    setProducto({
      nombre: '',
      precio: '',
      marca: '',
      color: '',
      talle: '',
      tpo_material: '',
      tpo_producto: '',
      url_imagen: ''
    });
  } catch (error) {
    console.error(error);
    alert('Hubo un error al guardar el producto');
  }
};


  return (
    <div className='pato'>

<Link to="/listarProductos" className="boton-l">
  Atrás
</Link>
   
    <form className="formulario-producto" onSubmit={handleSubmit}>
      <h3>Agregar Nueva Camiseta</h3>

      <label>Nombre*</label>
      <input name="nombre" value={producto.nombre} onChange={handleChange} required />

      <label>Precio*</label>
      <input type="number" name="precio" value={producto.precio} onChange={handleChange} required />

      <label>Marca</label>
      <input name="marca" value={producto.marca} onChange={handleChange} />

      <label>Color</label>
      <input name="color" value={producto.color} onChange={handleChange} />

      <label>Talle</label>
      <input name="talle" value={producto.talle} onChange={handleChange} />

      <label>Tipo de Material</label>
      <input name="tpo_material" value={producto.tpo_material} onChange={handleChange} />

      <label>Tipo de Producto</label>
      <input name="tpo_producto" value={producto.tpo_producto} onChange={handleChange} />

      <label>URL de Imagen*</label>
      <input name="url_imagen" value={producto.url_imagen} onChange={handleChange} required />

      <button type="submit">Guardar Producto</button>
    </form> 
    </div>
  );
}
