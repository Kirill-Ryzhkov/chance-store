import Home from './pages/Home';
import ProductCard from './pages/ProductCard';
import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/cafe' />} />
          <Route path='/cafe' element={<Home page={"cafe"} />} />
          <Route path='/merch' element={<Home page={"merch"} />} />
          <Route path='/cafe/:name' element={<ProductCard page="cafe"/>} />

          <Route path='/cart/:page' element={<Cart />} />
        </Routes>
      </BrowserRouter>
  );

}

export default App;