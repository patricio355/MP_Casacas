import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  return (
    <div className='navbar'>

      <div className='link'>
        <Link to="/">Inicio</Link>
      </div>

      <div className='link'>
        <Link to="/login">Ofertas</Link>
      </div>

      <div className='link'>
        <Link to="/login">Equipos</Link>
      </div>

      <div className='link'>
        <Link to="/login">Selecciones</Link>
      </div>

      <div className='link'>
        <Link to="/login">Todos</Link>
      </div>




    </div>
  )
}

export default Navbar
