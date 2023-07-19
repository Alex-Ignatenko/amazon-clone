import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./pages/homePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
