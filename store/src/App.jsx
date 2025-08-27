import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import DeleteProduct from './components/DeleteProduct';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
        <Route path="/delete-product/:productId" element={<DeleteProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
