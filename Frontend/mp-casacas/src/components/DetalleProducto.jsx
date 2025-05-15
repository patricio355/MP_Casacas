// src/components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetalleProducto.css';

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error('Error al traer el producto:', err));
  }, [id]);

  if (!producto) return <div>Cargando...</div>;

  return (
    <main className="product-detail">
      <div className="descripcion">
        <span>Detalle {producto.categoria} &gt; {producto.nombre}</span>
      </div>
      <div className="contenedor-global">
        <div className="conteiner">
          <div className="ls">
            <ul>
              <li><img src={producto.url_imagen} alt={producto.nombre} /></li>
              <li><img src={producto.url_imagen} alt={producto.nombre} /></li>
              <li><img src={producto.url_imagen} alt={producto.nombre} /></li>
            </ul>
          </div>
          <div className="imagen">
            <img src={producto.url_imagen} className="diffumine" alt={producto.nombre} />
          </div>
        </div>
        <div className="detail">
          <div className="detalles">
            <div className="titulo">
              <p>{producto.nombre}</p>
            </div>
            <div className="calificacion">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              
            </div>
          </div>
          <div className="row">
            <hr />
          </div>
          <div className="row">
            <label>Color:</label>
            <button><span>{producto.color}</span></button>
          </div>
          <div className="row">
            <div className="talles">
              <span>Talle:</span>
              <button><span>{producto.talle}</span></button>
            </div>
          </div>
          <div className="row">
            <hr />
          </div>
          <div className="contenedor-compra">
            <div className="conteiner-precio">
              <div className="row">
                <div className="precio">
                  <label>Precio:</label>
                  <span>${producto.precio}</span>
                </div>
              </div>
              <div className="row">
                <div className="cantidad">
                  <label>Stock Disponible:</label>
                  <span>{producto.stock}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="acciones">
                <button type="button">Comprar ahora</button>
                <button type="button">Agregar al carrito</button>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <hr />
      </div>
      <div className="characteristic">
        <div className="caracteristica">
          <div className="tabla">
            <h4 className="caracteristica-titulo">Características del producto</h4>
            <table>
              <tbody>
                <tr>
                  <td>Marca</td>
                  <td>{producto.marca}</td>
                </tr>
                <tr>
                  <td>Modelo</td>
                  <td>{producto.modelo}</td>
                </tr>
                <tr>
                  <td>Género</td>
                  <td>{producto.genero}</td>
                </tr>
                <tr>
                  <td>Categoría</td>
                  <td>{producto.categoria}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="rating">
          <div className="rating-box">
            <h4 className="caracteristica-titulo">Opiniones del producto</h4>
            <div className="estrella">
              <span className="puntaje">4.6</span>
              <div className="estrellitas">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <div>547 Calificaciones</div>
              </div>
            </div>
            <div className="barrita">
              {[5, 4, 3, 2, 1].map((star) => (
                <div className="barra" key={star}>
                  <div className="track">
                    <div className={`porcentaje porcentaje-${star * 20}`}></div>
                  </div>
                  <div className="calificacion-estrella">
                    <span>{star}</span><i className="fa-solid fa-star"></i>
                  </div>
                </div>
              ))}
              <div className="comentario"><span>Ver comentarios</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row row-ultimo">
        <hr />
      </div>
      <article>
        <h4>Descripción</h4>
        <p>{producto.descripcion}</p>
      </article>
    </main>
  );
};

export default DetalleProducto;
