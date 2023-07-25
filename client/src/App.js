import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./pages/homePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SigninPage from "./pages/signinPage";
import SignupPage from "./pages/signupPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer position="bottom-center" limit={1}/>
        <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        </main>
    </BrowserRouter>
  );
}

export default App;
