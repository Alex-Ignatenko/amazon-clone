import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./pages/homePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SigninPage from "./pages/signinPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
      <ToastContainer position="bottom-center" limit={1}/>
        <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
