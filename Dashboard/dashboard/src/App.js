import './App.css';
import { Route, Routes } from 'react-router-dom';
import ListaProductos from './components/ListaProductos';
import Navbar from './components/Navbar';
import ListarUsuarios from './components/ListarUsuarios';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';
function App() {
  return (
   <div>
    <Navbar></Navbar>


     <Routes>
        
        <Route path='/listarProductos' element={<ListaProductos/>} />
        <Route path='/listarUsuarios' element={<ListarUsuarios/>} />
         <Route path='/editarProducto' element={<EditarProducto/>} />
        <Route path="/nuevoProducto" element={<NuevoProducto onGuardar={producto => { /* lógica para guardar */ }} />} />
      </Routes>
   </div>




  );
}

export default App;
