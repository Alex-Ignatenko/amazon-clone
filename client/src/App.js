import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header/Header.jsx";
import HomePage from "./Pages/HomePage/HomePage";
import SigninPage from "./Pages/SigninPage/SigninPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import CartPage from "./Pages/CartPage/CartPage";
import ShippingAddressPage from "./Pages/ShippingAddressPage/ShippingAddressPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage/PlaceOrderPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import OrderSubmittedPage from "./Pages/OrderSubmittedPage/OrderSubmittedPage";
import Footer from "./components/Footer/Footer";
import SearchPage from "./Pages/SearchPage/SearchPage";

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Container className="main-app-container">
        <ToastContainer position="bottom-center" limit={1}/>
        <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/product/:token" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shipping" element={<ShippingAddressPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/ordersubmitted/:id" element={<OrderSubmittedPage />} />
        </Routes>
        </main>
      </Container>
      <Footer/>
  </BrowserRouter>
  );
}

export default App;
