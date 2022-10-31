import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Rekap from "./pages/admin/Rekap";
import Stok from "./pages/admin/Stok";
import Cart from "./pages/user/Cart";
import Detail from "./pages/user/Detail";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          {/* admin */}
          <Route path="/stok" element={<Stok />} />
          <Route path="/rekap" element={<Rekap />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
