import Home from "./pages/Home";
import ProductCard from "./pages/ProductCard";
import Cart from "./pages/Cart";
import Final from "./pages/Final";
import AdminLogin from "./pages/admin/Login";
import AdminHome from "./pages/admin/Home";
import AdminEdit from "./pages/admin/Edit";
import AdminCreate from "./pages/admin/Create";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Layout from "./components/Layout/Layout";
import { useGetAllStoreQuery } from "./services/redux/apiSlice";

function App() {
  useGetAllStoreQuery();

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

          {/* <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/cafe" element={<AdminHome page={"cafe"}/>} />
          <Route path="/admin/merch" element={<AdminHome page={"merch"}/>} />
          <Route path="/admin/edit/product/:name" element={<AdminEdit type={"store"} />} />
          <Route path="/admin/edit/field/:name" element={<AdminEdit type={"storeFields"} />} />
          <Route path="/admin/create/product" element={<AdminCreate type={"store"} />} />
          <Route path="/admin/create/field/cafe" element={<AdminCreate type={"storeFields"} page={"cafe"}/>} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
