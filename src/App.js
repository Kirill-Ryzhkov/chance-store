import Home from './pages/Home';
import ProductCard from './pages/ProductCard';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/cafe' />} />
          <Route path='/cafe' element={<Home page={"cafe"} />} />
          <Route path='/merch' element={<Home page={"merch"} />} />
          <Route path='/cafe/:name' element={<ProductCard page="cafe"/>} />
        </Routes>
      </BrowserRouter>
  );

}

export default App;