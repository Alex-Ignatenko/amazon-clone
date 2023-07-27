import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./pages/homePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SigninPage from "./pages/signinPage";
import SignupPage from "./pages/signupPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CartPage from "./pages/cartPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import { Container } from "react-bootstrap";
import PaymentPage from "./pages/paymentPage";
import PlaceOrderPage from "./pages/placeOrderPage";
import ProductPage from "./pages/productPage";

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
