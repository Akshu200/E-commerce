import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './components/AddProduct';
import Footer from './components/Footer';
import Login from './components/Login';
import Nav from './components/Nav';
import PrivateComponent from './components/PrivateComponent';
import ProductList from './components/ProductList';
import Signup from './components/Signup';
import UpdateProduct from './components/UpdateProduct';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent/>}>
       
          <Route path='/' element={<ProductList />}/>
          <Route path='/add' element={<AddProduct />}/>
          <Route path='/update/:id' element={<UpdateProduct />}/>
          <Route path='/logout' element={<h1 >this is logout</h1>}/>
          <Route path='/profile' element={<h1 >this is profile</h1>} />

          </Route>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
       
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
