import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditarProducto.css';
import { Link } from 'react-router-dom';
export default function EditarProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error('Error al cargar producto:', err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:4000/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    })
      .then(res => {
        if (res.ok) {
          alert('Producto actualizado correctamente');
          navigate('/listarProductos');
        } else {
          alert('Error al actualizar producto');
        }
      })
      .catch(err => console.error('Error al actualizar:', err));
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className='pato'>

        <Link to="/listarProductos" className="boton-l">
  Atrás
</Link>
  
    <form className="formulario-producto" onSubmit={handleSubmit}>
      <h3>Editar Camiseta</h3>

      <label>Nombre</label>
      <input name="nombre" value={producto.nombre} onChange={handleChange} />

      <label>Precio</label>
      <input type="number" name="precio" value={producto.precio} onChange={handleChange} />

      <label>Marca</label>
      <input name="marca" value={producto.marca} onChange={handleChange} />

      <label>Color</label>
      <input name="color" value={producto.color} onChange={handleChange} />

      <label>Talle</label>
      <input name="talle" value={producto.talle} onChange={handleChange} />

      <label>Tipo de Material</label>
      <input name="tipo_material" value={producto.tipo_material} onChange={handleChange} />

      <label>Tipo de Producto</label>
      <input name="tipo_producto" value={producto.tipo_producto} onChange={handleChange} />

      <label>URL de Imagen</label>
      <input name="url_imagen" value={producto.url_imagen} onChange={handleChange} />

      <button type="submit">Guardar Cambios</button>
    </form>
      </div>
  );
}
