import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Rekap from "./pages/admin/Rekap";
import Stok from "./pages/admin/Stok";
import Cart from "./pages/user/Cart";
import Detail from "./pages/user/Detail";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import ScrollToTop from "./routes/ScrollToTop";
import { useEffect } from "react";
import AnimatedRoutes from "./routes/AnimatedRoutes";

function App() {
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <div className="App">
      <Router>
          <ScrollToTop />

          <div className="w-screen top-0 bg-slate-800 fixed z-10">
            <Navbar />
          </div>
          <div className="justify-center items-center mt-12">
            <AnimatedRoutes></AnimatedRoutes>
          </div>
        </Router>
    </div>
  );
}

export default App;
