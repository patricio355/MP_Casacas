import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  return (
    <div className='navbar'>
      
     <div className='link'>
 <Link to="/listarProductos">Administrar Productos</Link>
     </div>

     <div className='link'>
  
      <Link to="/listarUsuarios">Administrar Usuarios</Link>
     </div>

     <div className='link'>

     </div>

     <div className='link'>

     </div>

     <div className='link'>

     </div>

     <div className='link'>

     </div>
      
 
      
    </div>
  )
}

export default Navbar
