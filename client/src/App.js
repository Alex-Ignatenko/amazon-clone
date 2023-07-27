import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./Pages/HomePage/HomePage";
import SigninPage from "./Pages/SigninPage/SigninPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import CartPage from "./Pages/CartPage/CartPage";
import ShippingAddressPage from "./Pages/ShippingAddressPage/ShippingAddressPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage/PlaceOrderPage";
import ProductPage from "./Pages/ProductPage/ProductPage";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Container>
        <ToastContainer position="bottom-center" limit={1}/>
        <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/product/:token" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shipping" element={<ShippingAddressPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
        </Routes>
        </main>
      </Container>
  </BrowserRouter>
  );
}

export default App;
