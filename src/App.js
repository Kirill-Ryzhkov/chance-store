import Home from "./pages/Home";
import ProductCard from "./pages/ProductCard";
import Cart from "./pages/Cart";
import Final from "./pages/Final";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/cafe" />} />
          <Route path="/cafe" element={<Home page={"cafe"} />} />
          <Route path="/merch" element={<Home page={"merch"} />} />
          <Route path="/cafe/:slug" element={<ProductCard page="cafe" />} />

          <Route path="/cart/:page" element={<Cart />} />

          <Route path="/checkout/:page" element={<Checkout />} />

          <Route path="/final" element={<Final />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
