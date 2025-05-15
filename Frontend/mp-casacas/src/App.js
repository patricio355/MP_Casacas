import './App.css';
import Carrusel from './components/Carrusel';
import Home from './components/Home';
import ListaProductos from './components/ListaProductos';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DetalleProducto from './components/DetalleProducto';
import SubNav from './components/SubNav';
function App() {
  return (
    <div>


<Navbar></Navbar>
<SubNav></SubNav>



       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/listarProductos' element={<ListaProductos/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/detalle/:id" element={<DetalleProducto />} />
        <Route path='/carrusel' element={<Carrusel/>} />
      </Routes>



     




    </div>
  );
}

export default App;
