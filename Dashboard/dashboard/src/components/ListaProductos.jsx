import React, { useEffect, useState } from 'react';
import './ListaProductos.css';
import { Link, useNavigate } from 'react-router-dom';

export default function TablaProductos() {
  const [camisetas, setCamisetas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/productos')
      .then(res => res.json())
      .then(data => setCamisetas(data))
      .catch(err => console.error('Error al traer camisetas:', err));
  }, []);

  const camisetasFiltradas = camisetas.filter(camiseta =>
    camiseta.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const borrarProducto = (id) => {
    if (!window.confirm('¿Estás seguro de que querés borrar este producto?')) return;

    fetch(`http://localhost:4000/productos/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setCamisetas(prev => prev.filter(prod => prod.idproducto !== id));
        } else {
          alert('Error al borrar el producto');
        }
      })
      .catch(err => console.error('Error al borrar:', err));
  };

  return (
    <div className="productos-container">
      <div className="productos-header">
        <Link to="/nuevoProducto" className="boton-anadir">
          Añadir producto
        </Link>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
      </div>
      <h2 style={{ textAlign: 'center' }}>Lista de Productos</h2>
      <table className="productos-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Marca</th>
            <th>Color</th>
            <th>Talle</th>
            <th>Tipo Material</th>
            <th>Tipo Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {camisetasFiltradas.map(camiseta => (
            <tr key={camiseta.idproducto}>
              <td>{camiseta.idproducto}</td>
              <td>
                <img src={camiseta.url_imagen} alt={camiseta.nombre} width="60" height="60" />
              </td>
              <td>{camiseta.nombre}</td>
              <td>${camiseta.precio.toLocaleString()}</td>
              <td>{camiseta.marca}</td>
              <td>{camiseta.color}</td>
              <td>{camiseta.talle}</td>
              <td>{camiseta.tipo_material}</td>
              <td>{camiseta.tipo_producto}</td>
              <td>
                <Link to={`/editarProducto?id=${camiseta.idproducto}`} className="boton-editar">
                  Editar
                </Link>
                <button onClick={() => borrarProducto(camiseta.idproducto)} className="boton-borrar">
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
